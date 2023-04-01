import { ethers, run, network } from "hardhat";

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract....");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  console.log(network.config);
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 6 blocks to be mined....");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(5);
  await transactionResponse.wait(1);
  const updatedvalue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedvalue}`);
};

const verify = async (contractAddress: string, args: any[] = []) => {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already verified");
    } else {
      console.error(error);
      throw error;
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

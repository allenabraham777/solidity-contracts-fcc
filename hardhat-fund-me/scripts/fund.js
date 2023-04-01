const { Contract } = require("ethers");
const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
    const { deployer } = await getNamedAccounts();
    const fundMe = await ethers.getContract("FundMe", deployer);
    console.log("Funding Contract....");
    const transactionResponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.3"),
    });
    await transactionResponse.wait(1);
    console.log("Funded");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});

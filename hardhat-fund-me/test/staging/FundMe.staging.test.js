const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { developmetChains } = require("../../helper-hardhat-config");

developmetChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let deployer;
          let fundMe;
          const sendValue = ethers.utils.parseEther("0.1");
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("allows people to fund and withdraw", async function () {
              const fundTxResponse = await fundMe.fund({ value: sendValue });
              await fundTxResponse.wait(1);
              const withdrawTxResponse = await fundMe.withdraw();
              await withdrawTxResponse.wait(1);

              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endingFundMeBalance.toString(), "0");
          });
      });

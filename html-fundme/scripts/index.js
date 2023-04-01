import { ethers } from "./vendor/ethers-5.6.esm.min.js";
import abi from "./constants/abi.js";
import { address as contractAddress } from "./constants/contract.js";

async function main() {
  const connectButton = document.getElementById("connect-button");
  const balanceButton = document.getElementById("balance-button");
  const withdrawButton = document.getElementById("withdraw-button");
  const fundForm = document.getElementById("fund-form");

  connectButton.addEventListener("click", () => {
    connect();
  });
  fundForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fund();
  });

  balanceButton.addEventListener("click", getBalance);
  withdrawButton.addEventListener("click", withdraw);

  async function connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.innerHTML = "Wallet Connected!";
      const hiddenElements = document.querySelectorAll(".only-connected");
      hiddenElements.forEach((element) => {
        element.classList.remove("only-connected");
      });
      console.log(ethers);
    } else {
      connectButton.innerHTML = "Please install metamask!";
    }
  }

  async function fund() {
    const fundInput = document.getElementById("fund-input");
    const ethAmount = fundInput.value;

    console.log(`Funding with ${ethAmount}`);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const value = ethers.utils.parseEther(ethAmount);
      console.log(contract, value.toString());
      try {
        const transactionResponse = await contract.fund({
          value,
        });
        await listenForTransactionMine(transactionResponse, provider);
        fundInput.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getBalance() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(contractAddress);
      alert(
        `The contract have balance: ${ethers.utils.formatEther(balance)} ETH`
      );
    }
  }

  async function withdraw() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        const transactionResponse = await contract.withdraw();
        await listenForTransactionMine(transactionResponse, provider);
        alert("Withdraw successful");
      } catch (error) {
        console.error(error);
      }
    }
  }

  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}......`);
    return new Promise((resolve, reject) => {
      try {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
          alert(
            `Completed transaction ${transactionResponse.hash} with ${transactionReceipt.confirmations} confirmations.`
          );
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

main();

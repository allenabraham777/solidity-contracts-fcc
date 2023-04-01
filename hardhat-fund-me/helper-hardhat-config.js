const networkConfig = {
    11155111: {
        name: "Sepolia",
        ethUsdPriceFeedAddress: "0x694aa1769357215de4fac081bf1f309adc325306",
    },
    5: {
        name: "Goerli",
        ethUsdPriceFeedAddress: "0xd4a33860578de61dbabdc8bfdb98fd742fa7028e",
    },
};

const developmetChains = ["hardhat", "localhost"];
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
    networkConfig,
    developmetChains,
    DECIMALS,
    INITIAL_ANSWER,
};

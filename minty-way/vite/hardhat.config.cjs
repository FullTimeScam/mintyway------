/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // 환경 변수 로드

module.exports = {
  solidity: "0.8.24",
  networks: {
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc", // Arbitrum RPC URL
      accounts: [process.env.VITE_ARBITRUM_PRIVATE_KEY], // 여기서 VITE_ARBITRUM_PRIVATE_KEY를 사용
    },
  },
};

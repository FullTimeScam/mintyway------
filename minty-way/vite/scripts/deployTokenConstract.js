import { ethers } from "ethers";
import process from "process";
import dotenv from "dotenv";
import erc20PermissionsControlData from "../artifacts/contracts/Permissions/Permissions.sol/ERC20PermissionsControl.json" assert { type: "json" };

dotenv.config();

async function deployERC20PermissionsControl() {
  const provider = new ethers.JsonRpcProvider("https://arb1.arbitrum.io/rpc");
  const wallet = new ethers.Wallet(
    process.env.VITE_ARBITRUM_PRIVATE_KEY,
    provider
  );

  const erc20Abi = erc20PermissionsControlData.abi;
  const erc20Bytecode = erc20PermissionsControlData.bytecode;
  const contractFactory = new ethers.ContractFactory(
    erc20Abi,
    erc20Bytecode,
    wallet
  );

  // 컨트랙트 배포
  const contract = await contractFactory.deploy("TokenName", "TOKEN", 1000000);
  //   await contract.deployed();

  console.log("Contract deployed at:", contract.address);
}

deployERC20PermissionsControl().catch((error) => {
  console.error("Error deploying contract:", error);
});

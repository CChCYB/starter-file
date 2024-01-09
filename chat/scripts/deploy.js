const hre = require("hardhat");

async function main() {
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy();

  await chatApp.deployed();

  console.log(`ChatApp Contract Address: ${chatApp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

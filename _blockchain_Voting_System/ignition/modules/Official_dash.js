const { ethers, run, network } = require("hardhat");
require('dotenv').config();
const fs = require('fs');

async function main() {
    const ContractFactory = await ethers.getContractFactory("Official_dash");
    const contract = await ContractFactory.deploy();
    await contract.getDeployedCode();
    const contractAddress = await contract.getAddress();
    console.log(`Contract deployed to: ${contractAddress}`);
    console.log("Transaction successful");
    // Save the address in the .env file
    fs.writeFileSync('.env', `OFFICIAL_CONTRACT_ADDRESS=${contractAddress}\n`, { flag: 'a' });
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

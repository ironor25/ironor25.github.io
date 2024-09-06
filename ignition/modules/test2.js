// scripts/interact.js
const readline = require('readline');
require('dotenv').config();
const { ethers } = require("hardhat");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    // Load the contract address from .env
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!contractAddress) {
        console.error("CONTRACT_ADDRESS is not set in the .env file");
        process.exit(1);
    }

    // Get the contract instance
    const ContractFactory = await ethers.getContractFactory("Official_dash");
    const contract = ContractFactory.attach(contractAddress);
    const currentValue = await contract.add_candidate("AAP","AAM Party","Kanpur",0);
    await currentValue.wait(1);
    console.log("Transaction successful");}
   
    // Interact with the contract
    const answer = await askQuestion('Do you want to continue? (yes/no): ');
    const choice = answer.toLowerCase().trim();
    const details = await contract.get_details("CP")
    console.log(`details of Party : ${details}`)
    console.log("All data submitted successfully.")


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
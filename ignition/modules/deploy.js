//import
//if we use ethers then it doesn't know about compiled
//contract or about its artifacts which hardhat knows.
const { ethers, run, network } = require("hardhat");

//async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying contract ...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.getDeployedCode();
  console.log(`Deployed contract to : ${await simpleStorage.getAddress()}`);
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //ABOVE IF process.ethescan_api_key exist then it is true
    //else false.
    await simpleStorage.deployTransaction.waitForDeployment;
    await verify(simpleStorage.getAddress(), []);
  }
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current valueis : ${currentValue}`);

  //update the value
  const transacResponse = await simpleStorage.store(5);
  await transacResponse.waitForDeployment();
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

//we can verify the contract using command manually
//everytime we want to verify thats why we created a function

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified..");
    } else {
      console.log(e);
    }
  }
}

//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

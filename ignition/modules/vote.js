const { ethers, run, network } = require("hardhat");
const fs = require("fs");
async function main() {
    const init_vote = 0
    const VoteFactory = await ethers.getContractFactory("Vote");
    console.log("Deploying contract ...");
    const vote = await VoteFactory.deploy();
    await vote.getDeployedCode();
    console.log(`Deployed contract to : ${await vote.getAddress()}`);
    const entry = await vote.add_candidate("BJP","BHARTIYA JANTA PARTY","KANPUR",init_vote)
    await entry.wait(1)
    console.log("Successfully added candidate")
    const details  = await vote.get_details("BJP")
    console.log(details)
    const contractAddress = await vote.getAddress()
    fs.writeFileSync('.env', `VOTE_CONTRACT_ADDRESS=${contractAddress}\n`, { flag: 'a' });
}


//main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  

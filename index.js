import {ethers } from "./ethers-5.2.esm.min.js"
import { abi ,contractAddress} from "./constants.js";


// const connectbutton = document.getElementById("connect")
// const votebutton = document.getElementById("vote_cast")
// connectbutton.onclick=connect
// votebutton.onclick=vote
// let text =""
const private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
const provider =new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/")
const signer = new ethers.Wallet(private_key,provider)
const contract = new ethers.Contract(contractAddress,abi,signer)

async function connect() {
    if (typeof ethereum !== "undefined") {
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            
            document.getElementById("connect").textContent = "Connected"
            text =document.getElementById("connect").textContent
        } catch (error) {
            console.error("Error connecting to MetaMask: ", error);
        }
    } else {
        document.getElementById("connect").textContent = "Install MetaMask"
    }
}

async function vote(token) {

   
        const cast_vote = await contract.cast_vote(token)
        await cast_vote.wait(1)

        // return contract
    
        // const newdiv = document.createElement("div2")
        // const currentdiv = document.getElementById("div1")
        // const newcontent = document.createTextNode("Voted Sucessfully")
        // newdiv.appendChild(newcontent)
        // document.body.after(currentdiv,newdiv)
 
}
async function authentication(aadhaar) {

        const val = await contract.isRegistered(aadhaar)  
        console.log(val)
        if (typeof val == true){
            return val
        }
        else{
            return val
        }
    }

async function regstrAadhaar(aadhaar) {
    
    const entry = await contract.registerAadhaar(aadhaar)
    await entry.wait(1)
    return false
}
async function add_candidate(token,party_nm,area,vote_ct) {
    const val = await contract.add_candidate(token,party_nm,area,vote_ct)
    await val.wait(1)
}
async function get_all_details() {
    let arr= await contract.get_arr()
    let val = Object.entries(arr).length
    let detailsArray = [];
    for (let i=0;i<val;i++){
        const details = await contract.get_details(arr[i])
        detailsArray.push(details);
     }
     return detailsArray;
    
}
async function login(id,pass) {
    const arr = await contract.login(id,pass)
    return arr
    
}
export {vote,authentication,regstrAadhaar,get_all_details,add_candidate,login}
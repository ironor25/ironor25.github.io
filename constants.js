export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const abi =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_loginId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "addCredential",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "party_token",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_party",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_area",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "vt_ct",
        "type": "uint256"
      }
    ],
    "name": "add_candidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "arr",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "token",
        "type": "string"
      }
    ],
    "name": "cast_vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_loginId",
        "type": "string"
      }
    ],
    "name": "getPassword",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_arr",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "party_token",
        "type": "string"
      }
    ],
    "name": "get_details",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "token",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "party_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "area",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "vote_ct",
            "type": "uint256"
          }
        ],
        "internalType": "struct Vote.details",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "aadhaar",
        "type": "uint256"
      }
    ],
    "name": "isRegistered",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_loginId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "login",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "aadhaar",
        "type": "uint256"
      }
    ],
    "name": "registerAadhaar",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
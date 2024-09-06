//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vote{
        // Mapping to store login IDs and their associated passwords
    mapping(string => string) private credentials;

    // // Event to log successful login attempts
    // event LoginSuccessful(address indexed user);

    // // Event to log failed login attempts
    // event LoginFailed(address indexed user);


        // Constructor to initialize predefined credentials
    constructor() {
        // Initialize with some predefined credentials
        credentials["admin1"] = "ironor25";
        credentials["admin2"] = "mark42";
        credentials["admin3"] ="sih2024";
    }

    // Function to add new credentials (for admin or initial setup)
    function addCredential(string memory _loginId, string memory _password) public {
        credentials[_loginId] = _password;
    }

    // Function to verify login credentials
    function login(string memory _loginId, string memory _password) public view returns (bool) {
        if (keccak256(abi.encodePacked(credentials[_loginId])) == keccak256(abi.encodePacked(_password))) {
   //         emit LoginSuccessful(msg.sender);
            return true;
        } else {
//            emit LoginFailed(msg.sender);
            return false;
        }
    }

    // Function to get the password for a given login ID (for testing only)
    function getPassword(string memory _loginId) public view returns (string memory) {
        return credentials[_loginId];
    }

    mapping(bytes32 => bool) private aadhaarHashes;

    function registerAadhaar(uint256 aadhaar) public {
        bytes32 aadhaarHash = keccak256(abi.encodePacked(aadhaar));
        require(!aadhaarHashes[aadhaarHash], "Aadhaar already registered");
        aadhaarHashes[aadhaarHash] = true;
    }

    function isRegistered(uint256 aadhaar) public view returns (bool) {
        bytes32 aadhaarHash = keccak256(abi.encodePacked(aadhaar));
        return aadhaarHashes[aadhaarHash];
    }
    

    struct details{
       // address account;
       string token;
        string party_name;
        string area;
        uint256 vote_ct;
        
    }
    string[]  public arr ;
     mapping (string=>details) ledger;
    function  add_candidate(string memory party_token,string memory _party,string memory _area,uint256 vt_ct) public {
        ledger[party_token] = details(party_token, _party, _area,vt_ct);
        arr.push(party_token);
    }

    function  get_arr() public view returns(string[] memory){
        return arr; 
     }

     function get_details(string memory party_token ) public view returns (details memory){
        return ledger[party_token];
     }
     
     function cast_vote(string memory token) public {
        ledger[token].vote_ct++; 
     }
}


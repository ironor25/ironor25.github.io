
import {authentication,vote,regstrAadhaar, add_candidate,get_all_details,login} from "./index.js"

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function renderLandingPage() {
        app.innerHTML = `
            <div class="text-content">
                <h1 class="mb-3 fw-semibold lh-1">Welcome To 2024 Elections</h1>
                <h1>VOTE !<br><span>At Your HOME</span></h1>
                <h2>YOUR VOTE IS SAFE!!</h2>
                <div class="button-container">
                <button class="learn-more" id="voter-btn"> VOTER</button>
                </div>
            </div>
        `;
//  <button class="learn-more" id="official-btn">OFFICIAL</button>
        document.getElementById('voter-btn').addEventListener('click', renderVoterPage);
        document.getElementById('official-btn').addEventListener('click', renderLoginPage);//renderOfficialPage
    }
// /* From Uiverse.io by 0xnihilism */ 

    function renderVoterPage() {
        app.innerHTML = `

                <div class="voter-page">
                <div class="brutalist-container">
             <input
                    placeholder="12-digit Aadhaar Number"
                     id="aadhaar-input"
                    class="brutalist-input smooth-type"
                    type="text" />
                    <label class="brutalist-label">Enter Adhaar Number</label>
                    </div>
                    <button class="learn-more" id="aadhaar-submit">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">SUBMIT</span>
                        </button>
                <p class="error" id="error-message"></p>
                <button class="button" id="back-btn">Back</button>

                </div>
                
        `;
        document.getElementById('back-btn').addEventListener('click', renderLandingPage);
        document.getElementById('aadhaar-submit').addEventListener('click', handleAadhaarSubmit);
    }

 async function handleAadhaarSubmit() {
        const aadhaarInput = document.getElementById('aadhaar-input').value;
        const errorMessage = document.getElementById('error-message');
//| authentication(aadhaarInput)==true
        const data =  await authentication(aadhaarInput)
        console.log(data)
        if (!/^\d{12}$/.test(aadhaarInput) ) { 
            console.log(data,"not 12")
            errorMessage.textContent = 'Invalid Aadhaar number. Please enter a 12-digit Aadhaar number.'; 
            return
        }
        if (data == true){
            console.log(data,"reegistered")
            errorMessage.textContent = 'Aadhaar number is already registered.';
            return
        }
        
        // Here you would check the Aadhaar number uniqueness using blockchain logic
   //   const isUnique = true; // Assume true for now

        if ( data !== true) {
            console.log(data,"unique")
            regstrAadhaar(aadhaarInput)
            renderVotePage();
            return
        } 
    }

async function renderVotePage() {
        // Example array of participating parties
        const app = document.getElementById('app');
        const parties = await get_all_details(); // Fetch all party details from the contract
    
        // Generate the HTML for each party using the fetched details
        const partyListHTML = parties.map(party => `
            <li class="party-item">
                <img src="images/${party.token.toLowerCase()}.png" alt="${party.token} Logo">
                <span>${party.party_name} (${party.token})</span>
                
               <button class="vote-btn" data-party="${party.token}">VOTE
               </button>
            </li>
               
            </li>
        `).join("");
    
        // Inject the generated HTML into the app element
        app.innerHTML = `
            <div class="voter-page">
                <div class="modal">
                <h2>Select Your Preferred Party</h2>
                <ul class="party-list">
                    ${partyListHTML}
                </ul>
                </div>
            </div>
        `;
    
        // Attach event listeners to each vote button
        const voteButtons = document.querySelectorAll('.vote-btn');
        console.log(voteButtons)
        voteButtons.forEach(button => button.addEventListener('click', handleVote));
    }
    

    function handleVote(event) {
        const partyToken = event.target.getAttribute("data-party"); // Get the token from the button's data attribute
        const confirmation = confirm(`Are you sure you want to vote for ${partyToken}?`);
        console.log(partyToken)
        if (confirmation) {
            vote(partyToken) // Call the vote function with the party token
                .then(() => {
                    alert('You Voted Successfully!');
                    renderLandingPage(); // Redirect to the landing page after successful voting
                })
                .catch(error => {
                    console.error("Voting failed:", error);
                    alert("There was an issue with casting your vote. Please try again.");
                });
        }
    }
    


    function renderLoginPage() {
        app.innerHTML = `
            <div class="login-page">
                <div class="modal">
                    <h2>Login to Access Official Dashboard</h2>
                    <div class="login-container">
                        <label for="login-id">Login ID</label>
                        <input type="text" id="login-id" placeholder="Enter Login ID">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Password">
                       <div id = "login-btn">
                        <button class="button" id="login-submit">Login</button>
                         <button class="button" id="back-btn">Back</button>
                         </div>
                        <p class="error" id="login-error"></p>
                    </div>
                   
                </div>
                
            </div>
        `;
        document.getElementById('back-btn').addEventListener('click', renderLandingPage);
        document.getElementById('login-submit').addEventListener('click', handleLoginSubmit);
    }

    async function handleLoginSubmit() {
        const loginId = document.getElementById('login-id').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');

        // Validate inputs
        if (!loginId || !password) {
            errorMessage.textContent = 'Please enter both Login ID and Password.';
            return;
        }

        try {
            // Call the function to verify credentials
            const isValid = await login(loginId, password);
            if (isValid) {
                renderOfficialPage();
            } else {
                errorMessage.textContent = 'Invalid Login ID or Password.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'An error occurred during login. Please try again.';
        }
    }

    function renderOfficialPage() {
        app.innerHTML = `
            <div class="official-page">
               <div class="modal">
                <h2>Official Dashboard</h2>
                
                <div class="button-container">
                    <button class="op-button" id="add-candidate-btn">Add Candidate</button>
                    <button class="op-button" id="get-details-btn">Get Details</button>
                    
                    </div>
                  <button class="button" id="back-btn">Back</button>
            </div>
      
        </div>
        `;
        document.getElementById('back-btn').addEventListener('click',renderLoginPage);
        document.getElementById('add-candidate-btn').addEventListener('click', renderAddCandidatePage);
        document.getElementById('get-details-btn').addEventListener('click', renderGetDetailsPage);
    }

    function renderAddCandidatePage() {
        app.innerHTML = `
            <div class="official-page">
                <div class="modal">
                <h2>Add a New Candidate</h2>
                <input type="text" id="party-name" placeholder="Party Name">
                <input type="text" id="short-name" placeholder="Short Name">
                <input type="text" id="area" placeholder="Area">
                <input type="file" id="party-logo" accept="image/*">
                
            </div>
            <div id="off-btn">
           <button class="button" id="back-btn">Back</button>
            <button class="button" id="add-party-submit">Add Party</button>
              </div>
               
              </div>
        `;

        document.getElementById('add-party-submit').addEventListener('click', handleAddParty);
        document.getElementById('back-btn').addEventListener('click', renderOfficialPage);
    }
    async function handleAddParty() {
        const partyName = document.getElementById("party-name").value;
        const shortName = document.getElementById("short-name").value;
        const area = document.getElementById("area").value;
        const logoInput = document.getElementById("party-logo");
        const voteCount = 0;
    
        // Validate inputs
        if (!partyName || !shortName || !area || !logoInput.files.length) {
            alert('Please fill all fields and upload a logo.');
            return;
        }
    
        // Handle file upload
        const file = logoInput.files[0];
        const reader = new FileReader();
        
        reader.onload = async function(event) {
            const logoDataUrl = event.target.result;
            console.log('Logo Data URL:', logoDataUrl);
            try {
                // Call the smart contract function to add a candidate
                await add_candidate(shortName, partyName, area, voteCount);
        
                // Notify user of success
                alert('Party added successfully!');
        
                // Optionally, re-render the official page or clear the form
                renderOfficialPage(); // Ensure this function is defined to handle post-submission UI update
            } catch (error) {
                console.error("Error adding party:", error);
                alert('Failed to add party. Please check the console for details.');
            }
        };
    
        reader.onerror = function(error) {
            console.error("File reading error:", error);
            alert('Failed to read the image file. Please check the console for details.');
        };
    
        reader.readAsDataURL(file);
    }
    
    
// async function handleAddParty() {
//         let party_nm = document.getElementById("party-name").value
//         let token = document.getElementById("short-name").value
//         let area = document.getElementById("area").value
//         const vote_ct = 0
//         try {
//             // Call the smart contract function to add a candidate
//             await add_candidate(token, party_nm, area, vote_ct)
    
//             // Notify user of success
//             alert('Party added successfully!');
    
//             // Optionally, re-render the official page or clear the form
//             renderOfficialPage(); // Ensure this function is defined to handle post-submission UI update
//         } catch (error) {
//             console.error("Error adding party:", error);
//             alert('Failed to add party. Please check the console for details.');
//         }
//     }

async  function renderGetDetailsPage() {
        const detailsArray = await get_all_details(); // Fetch all details
    
        let partyListHTML = `
            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
    `;
    let index = 1
        detailsArray.forEach(details => {
              
                partyListHTML += `
                    <tr>
                        <th scope="row">${index}</th>
                        <td><img src="images/${details.token}.png" alt="${details.party_name}" style="width:50px; height:50px;"></td>
                        <td>${details.party_name} (${details.token})</td>
                        <td>${details.area}</td>
                        <td>${details.vote_ct}</td>
                    </tr>
                `;
                index++;
        });
        
        partyListHTML += `
            </tbody>
        </table>`

    
        // Inject the HTML into the app element
        app.innerHTML = `
            <div class="official-page">
                <div class="modal">
                <h2>Party Details</h2>
                <ul class="party-list">
                    ${partyListHTML}
                </ul>
            </div>
             <button class="button" id="back-btn">Back</button>
             </div>
        `;
    
        document.getElementById('back-btn').addEventListener('click', renderOfficialPage);
    }

    // Initialize the app by rendering the landing page
    renderLandingPage();
});

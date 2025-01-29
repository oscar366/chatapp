//import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoBnit2wTxsVkufCOOJUHj6dThGaVfu0k",
  authDomain: "chato-saurus.firebaseapp.com",
  databaseURL: "https://chato-saurus-default-rtdb.firebaseio.com",
  projectId: "chato-saurus",
  storageBucket: "chato-saurus.firebasestorage.app",
  messagingSenderId: "1083073882669",
  appId: "1:1083073882669:web:6cc8bc8216337149e466a4",
  measurementId: "G-YDRLK45H7N"
};


// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// Get the username from the user using prompt
let username = prompt("Please enter your username:");
if (!username) {
  username = "Anonymous"; // Default to Anonymous if no username is entered
} else {
//admin stuff
if(username==="Oscar") {
let Admin = prompt("What is the password?")
if (Admin==="Oscar!12345") {
alert("hello admin oscar")
username = `<p style="color: blue">Admin – Oscar</p>`
window.isAdmin = true; 
} else {
alert("ur stinkey")
username = `<p style="color:brown;">POOPEY</p>`;
}
}
if (username.length > 50) {
alert("invaled username - Js Ln92")
username = "TO LONG"
}
}
document.getElementById("usrname").innerHTML = username;
// Handle sending messages
const msgForm = document.getElementById("msgForm");
msgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputBox = document.getElementById("inputBox");
  const message = inputBox.value.trim();


  if (message === "") return;


  // Format the message with bolded username
  const messageWithUsername = `<strong>${username}:</strong> ${message}`;


  // Push the message to the database
  push(ref(db, "messages"), {
    message: messageWithUsername,
    timestamp: Date.now(),
  });


  inputBox.value = ""; // Clear the input box
});


// Listen for new messages
const messagesDiv = document.getElementById("messages");
onChildAdded(ref(db, "messages"), (snapshot) => {
  const data = snapshot.val();
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("msgCtn");


  // Insert the message as HTML to render the bold username
  messageDiv.innerHTML = data.message;
  
//admin delete
if (window.isAdmin) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");

  // Add event listener to handle message deletion
  deleteButton.addEventListener("click", () => {
    remove(ref(db, "messages/" + snapshot.key));  // Delete message from Firebase
    messageDiv.remove();  // Remove message from the DOM
  });

  messageDiv.appendChild(deleteButton);
}

  messagesDiv.appendChild(messageDiv);


  // Scroll to the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

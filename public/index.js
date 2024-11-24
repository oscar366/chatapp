import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";

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

// Get the username from the user using prompt
let username = prompt("Please enter your username:");
if (!username) {
  username = "Anonymous"; // Default to Anonymous if no username is entered
}

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

  messagesDiv.appendChild(messageDiv);

  // Scroll to the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Handle form submission
const form = document.getElementById("msgForm");
const messagesDiv = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputBox = document.getElementById("inputBox");
  const message = inputBox.value;

  if (message.trim() === "") return;

  // Push the message to the database
  push(ref(db, "messages"), {
    message: message,
    timestamp: Date.now(),
  });

  inputBox.value = ""; // Clear the input box
});

// Listen for new messages in the database
onChildAdded(ref(db, "messages"), (snapshot) => {
  const data = snapshot.val();
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("msgCtn");
  messageDiv.textContent = data.message;
  messagesDiv.appendChild(messageDiv);
});

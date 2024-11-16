import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Chat functionality in index.js
const messagesRef = ref(db, 'messages/');

// When a new message is sent
function sendMessage(msg) {
  const newMessageRef = ref(db, 'messages/' + Date.now());
  set(newMessageRef, {
    username: username,   // Use the prompt username
    message: msg,
    timestamp: Date.now()
  });
}

// Listen for new messages
onValue(messagesRef, (snapshot) => {
  const messages = snapshot.val();
  displayMessages(messages);
});

function displayMessages(messages) {
  const messageContainer = document.getElementById("messages");
  messageContainer.innerHTML = ''; // Clear previous messages
  for (const key in messages) {
    const message = messages[key];
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${message.username}: ${message.message}`;
    messageContainer.appendChild(messageDiv);
  }
}

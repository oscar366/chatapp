import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';

// Store messages in memory (could also be in a database if needed)
const messages = [];

// Serve static files from the "public" directory
const server = createServer((req, res) => {
    return staticHandler(req, res, { public: 'public' });
});

// Create a WebSocket server
const wss = new WebSocketServer({ server });

// Handle new connections
wss.on('connection', (client) => {
    console.log('Client connected!');

    // Send previous messages to the new client
    client.send(JSON.stringify({ type: 'history', messages }));

    // Handle incoming messages from clients
    client.on('message', (msg) => {
        console.log(`Message received: ${msg}`);

        // Assuming messages are in the format "username: message"
        const message = msg.toString();  // Convert buffer to string
        messages.push(message);          // Store the message in memory

        // Broadcast the new message to all connected clients
        broadcast(message);
    });

    client.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to broadcast messages to all connected clients
function broadcast(msg) {
    for (const client of wss.clients) {
        if (client.readyState === ws.OPEN) {
            client.send(msg);  // Send the message to all open WebSocket clients
        }
    }
}

// Start the server
server.listen(process.argv[2] || 8080, () => {
    console.log('Server listening...');
});
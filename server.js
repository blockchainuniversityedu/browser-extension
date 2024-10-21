const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

let posts = []; // Store published posts

// Endpoint to publish new content
app.post('/publish', (req, res) => {
  const { title, body, links } = req.body;
  const newPost = { id: Date.now(), title, body, links };
  posts.push(newPost);

  // Notify all connected clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newPost));
    }
  });

  res.status(201).json(newPost);
});

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

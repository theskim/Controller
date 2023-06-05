const WebSocket = require('ws');
const controllerURL = 'ws://localhost:8080';

// Establish a client
const ws = new WebSocket(controllerURL);

// Handle connection established
ws.on('open', () => {
  console.log('Connected to controller.');
  // Send a handshake message to the controller
  const handshakeMsg = {
    type: 'handshake',
    nodeId: 1010,
  };
  ws.send(JSON.stringify(handshakeMsg));
});

// Handle receiving messages from the controller
ws.on('message', (message) => {
  console.log('Received message from controller:', message);
});

// Close connection
ws.on('close', () => {
  console.log('Connection to controller closed.');
});
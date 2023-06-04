// The Controller class manages WebSocket connections and handles node-related functionality
class Controller {
    constructor() {
      // Map to store nodes with their associated WebSocket connections
      this.nodes = new Map();
  
      // Server listening on port 8080
      this.wsServer = new WebSocket.Server({ port: 8080 });
  
      // Handle new WebSocket connections
      this.wsServer.on('connection', (ws) => {
        this.handleNodeConnection(ws);
      });
    }
  
    // Handle a new WebSocket connection 
    handleNodeConnection(ws) {
      // Generate a unique ID
      const nodeId = this.generateNodeId();
  
      // Store the WebSocket connection using the node ID as the key
      this.nodes.set(nodeId, ws);
      console.log(`Node connected: ID ${nodeId}`);
  
      // Listen for messages 
      ws.on('message', (message) => {
        this.handleNodeMessage(nodeId, message);
      });

      // Handle disconnection
      ws.on('close', () => {
        this.handleNodeDisconnection(nodeId);
      });
    }
  
    // Handle a message received from a node
    handleNodeMessage(nodeId, message) {
      console.log(`Received message from Node ID ${nodeId}: ${message}`);
  
      // Parse the message as JSON and extract the command and payload
      const { command, payload } = JSON.parse(message);
  
      // Perform the appropriate action based on the command
      switch (command) {
        case 'addNode':
          this.addNode(payload);
          break;
        case 'installFlow':
          this.installFlow(payload);
          break;
        default:
          console.log(`Unknown command received from Node ID ${nodeId}`);
      }
    }
  
    // Handle disconnection of a node
    // Remove the node's WebSocket connection from the Map
    handleNodeDisconnection(nodeId) {
      this.nodes.delete(nodeId);
      console.log(`Node disconnected: ID ${nodeId}`);
    }
  
    // Add a new node to the system.
    addNode(nodeInfo) {
      const { nodeId, nodeData } = nodeInfo;
      console.log(`Added node: ID ${nodeId}, Data: ${JSON.stringify(nodeData)}`);
    }
  
    // Install flow rules on a node
    installFlow(flowInfo) {
      const { nodeId, flowRules } = flowInfo;
      console.log(`Installed flow rules on Node ID ${nodeId}:`, flowRules);
    }
  
    // Generate a random node ID
    generateNodeId() {
      return Math.floor(1000 + Math.random() * 9000);
    }
}
  
module.exports = Controller;  
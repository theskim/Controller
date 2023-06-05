const Controller = require('../index');

const controller = new Controller();
console.log('Controller started');

const nodeInfo = {
  nodeId: 1,
  nodeData: {
    nodeName: "Switch1",
    nodeType: "Switch",
    nodeLocation: "Data Center",
  },
};
controller.addNode(nodeInfo);

const flowInfo = {
  nodeId: 1,
  flowRules: [
    {
      sourceAddress: "192.168.0.0/24",
      destinationAddress: "10.0.0.0/16",
      protocol: "TCP",
      action: "forward",
    },
  ],
};
controller.installFlow(flowInfo);
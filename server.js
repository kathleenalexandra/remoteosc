const osc = require("osc");

// Create an osc.js UDP Port listening on port 5300 
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 5300,
    metadata: true
});

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {
    console.log("An OSC message just arrived!", oscMsg);
    console.log("Remote info is: ", info);
    /* read specific data */ 
    console.log("specific message data" + oscMsg.args[0].value);
    
});

// Open the socket.
udpPort.open();


const osc = require("osc");

/* initialize send address to local host */ 
let sendAdress = "127.0.0.1"; 
let udpPort; 

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Please enter an IP address!', ip => {
  console.log(`This app will send to ${ip} enter the letter s to send the message`);
  /* change send address to entered IP address, does not validate input!  */ 
  sendAdress = ip; 
  listenForS(); 
});


function listenForS() {
 process.stdin.on('keypress', (str, key) => {
      console.log(key);

  if (key.name == "s") {
    console.log("s was pressed"); 
    openPort();
    sendMessage(); 
} 

  /* allow ctrl c to exit the program */ 
  else if (key.sequence == '\u0003') {
    console.log("exiting program!"); 
    process.exit();
  } 
})}


function openPort() {
  console.log("port is open"); 
  udpPort = new osc.UDPPort({
      localAddress: "127.0.0.1",
      localPort: 57121,
      remoteAddress: sendAdress,
      remotePort: 5300,
      metadata: true
  });

  udpPort.open();
}

/* sends a packet of data, specific message can be read by reading object on other end as oscMsg.args[0].value*/ 
function sendMessage() {
    var msg = {
        address: "/messageFromNVE",
        args: [
            {
                type: "s",
                value: "/cue/1/go"
            }
        ]
    };

    console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
    udpPort.send(msg);
}
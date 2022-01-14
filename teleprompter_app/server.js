const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// send 3 random numbers
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function sendData (connection, message) {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python3',["matcher.py", message])
  pythonProcess.stdout.on('data', async function(data) {
      result = data.toString();
      console.log(result);
      connection.send(JSON.stringify({
        type: "message",
        msg: result,
      }));
      console.log("Sent!");
      await sleep(100);
  });
  /*
  console.log("Sending script!");
  const words = message.split(" ");
  console.log(words);
  for (const w in words) {
    console.log(words[w]);
    let reply = words[w];
    connection.send(JSON.stringify({
      type: "word",
      msg: reply,
    }));
    console.log("sent ", reply);
    await sleep(1000);
  }
  */
}

var script = "";
wsServer.on('request', function(request) {
  console.log(" Received a new connection from origin " + request.origin + ".");
  const connection = request.accept(null, request.origin);

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      let content = JSON.parse(message.utf8Data).msg
      console.log("message received: ", content)
      if (content != "ready to display") {
        script = content;
      } else {
        console.log("Sending script");
        sendData(connection, script);
        console.log("Sent!");
      }
    }
  });
});
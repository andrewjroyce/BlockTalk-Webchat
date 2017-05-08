const SocketServer = require('ws');
const uuid = require('uuid/v4');
const PORT = 3001;
let onlineUsers = 0;
const wss = new SocketServer.Server({ port: PORT });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      console.log(client.readyState)
      client.send(data);
    }
  });
};
wss.on('connection', (ws) => {
  onlineUsers += 1;
  const welcomeMessage = {
    type: "userChange",
    // id: uuid(),
    username: "",
    userCount: onlineUsers,
    content: "New user signed on"
  };
  wss.broadcast(JSON.stringify(welcomeMessage));

  ws.on('message', function incoming(data) {
    var incoming = JSON.parse(data);
    switch (incoming.type) {
      case "postMessage":
        const processedMessage = {
          type: "incomingMessage",
          id: uuid(),
          username: incoming.username,
          content: incoming.content
        };
        wss.broadcast(JSON.stringify(processedMessage));
        break;
      case "postNotification":
        const notifcationMessage = {
          type: "incomingNotification",
          username: incoming.username,
          // id: uuid(), 
          content: incoming.content
        };
        wss.broadcast(JSON.stringify(notifcationMessage));
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }

  });

  ws.on('close', () => {
    onlineUsers -= 1;
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        type: 'userChange',
        userCount: onlineUsers
      }));
    })
  });
});

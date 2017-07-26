const SocketServer = require('ws').Server;
const PORT = 3001;
const wss = new SocketServer({ port: PORT });
const uuidv4 = require('uuid/v4');
let connectedUsers = 4;


wss.on('connection', (ws) => {
  connectedUsers += 1;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      type: 'userCount',
      userCount: connectedUsers
    }));
  })

  ws.on('message', (data) => {
    const incoming = JSON.parse(data);
    const uuid = uuidv4();
    let messageOut = {};

    switch (incoming.type){
      case 'postMessage':
        messageOut = {
          type: 'incomingMessage',
          id: uuid,
          username: incoming.username,
          content: incoming.content
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(messageOut));
        })
        break;
      case "postNotification":
        messageOut = {
          type: 'incomingNotification',
          id: uuid,
          oldName: incoming.oldName,
          newName: incoming.newName
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(messageOut));
        })
        break;
      default :
        ws.send("Error")
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    connectedUsers -= 1;
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
      type: 'userCount',
      userCount: connectedUsers
      }));
    })
  });
});

console.log('socket server running on PORT :', PORT);
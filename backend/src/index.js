const ws = require('ws');

const port = 8080;
const wss = new ws.WebSocketServer({port});

wss.on('listening', () => {
    console.log(`Listening on port ${port}`);
});

wss.on('connection', (client, req) => {
    console.log('Client connected');
    // CLIENT -> SERVER
    client.on('message', (messageBuffer) => {
        const messageString = messageBuffer.toString();
        console.log(`Received message => \n${messageString}`);
        wss.clients.forEach((client) => {
            client.send(messageString);
        });
    });
});


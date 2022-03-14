const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // ici, on peut authentifier l'utilisateur
  console.log('a user connected');

});

server.listen(8080, () => {
  console.log("Listening on *:8080");
})

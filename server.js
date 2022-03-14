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
  console.log(`Socket ${socket.id} connected`);
  io.emit('notify', `Socket ${socket.id} connected`);

  //socket.broadcast.emit('notify', `Broadcast from ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })

  socket.on('message', (data) => {
    const now = (new Date()).toLocaleString('fr-FR');
    io.emit('message', `[${now}] ${socket.id} : ${data}`);
  })

  //socket.on('ping', () => {
  //  console.log('PING');
  //  socket.emit('pong');
  //})
});

server.listen(8080, () => {
  console.log("Listening on *:8080");
})

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

  console.log(socket.id);

  io.emit('enter', socket.id);

  socket.on('disconnect', () => {
    io.emit('leave', socket.id);
  })

  socket.on('message', (data) => {
    const now = (new Date()).toLocaleString('fr-FR');
    io.emit('message', `${now} ${socket.id} : ${data}`);
  })
});

server.listen(8080, () => {
  console.log("Listening on *:8080");
})

const express = require('express');
const socket = require('socket.io');
const colors = require('colors');

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});

// Static Files
app.use(express.static('public'));

// Socket Setup
const io = socket(server);

io.on('connection', socket => {
  console.log(`Socket connection established (${socket.id})`.blue);

  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });
});

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('new user', (username) => {
    users[socket.id] = username;
    io.emit('user list', Object.values(users));
  });

  // Broadcast messages to everyone
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Handle typing indicator
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete users[socket.id];
    io.emit('user list', Object.values(users));
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

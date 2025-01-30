const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast messages to everyone
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('stop typing', (data) => {
    socket.broadcast.emit('stop typing', data);
  });

  // Handle message editing
  socket.on('edit message', (data) => {
    io.emit('edit message', data);
  });

  // Handle message deleting
  socket.on('delete message', (data) => {
    io.emit('delete message', data);
  });

  // Handle message reactions
  socket.on('react message', (data) => {
    io.emit('react message', data);
  });

  // Handle message pinning
  socket.on('pin message', (data) => {
    io.emit('pin message', data);
  });

  // Handle file sharing
  socket.on('share file', (data) => {
    io.emit('share file', data);
  });

  // Handle voice message playback speed
  socket.on('playback speed', (data) => {
    io.emit('playback speed', data);
  });

  // Handle user status
  socket.on('user status', (data) => {
    io.emit('user status', data);
  });

  // Handle chat rooms
  socket.on('join room', (data) => {
    socket.join(data.room);
    io.to(data.room).emit('join room', data);
  });

  socket.on('leave room', (data) => {
    socket.leave(data.room);
    io.to(data.room).emit('leave room', data);
  });

  // Handle message translation
  socket.on('translate message', (data) => {
    io.emit('translate message', data);
  });

  // Handle gamification
  socket.on('gamification', (data) => {
    io.emit('gamification', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

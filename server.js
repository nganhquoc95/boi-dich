const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chokidar = require('chokidar');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Watch files in the "public" directory
chokidar.watch('public').on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  io.emit('reload');
});

// Client connection
io.on('connection', (socket) => {
  console.log('Client connected');
});

server.listen(PORT, () => {
  console.log(`Live server running at http://localhost:${PORT}`);
});

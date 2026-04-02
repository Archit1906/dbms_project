require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('A user connected via socket.io');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

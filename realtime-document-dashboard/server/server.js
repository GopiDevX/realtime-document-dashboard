const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const PORT = process.env.PORT || 5000;
const corsMiddleware = require('./middleware/corsMiddleware');
const fileRoutes = require('./routes/fileRoutes');
const db = require('./config/db');

db();

app.use(corsMiddleware);
app.use(express.json());
app.use('/api/files', fileRoutes);

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
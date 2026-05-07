const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const fileRoutes = require('./routes/fileRoutes');
const corsMiddleware = require('./middleware/corsMiddleware');
const db = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

db(); // Connect to MongoDB

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/files', fileRoutes);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

module.exports = { app, server };
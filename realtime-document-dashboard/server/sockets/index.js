import { Server } from 'socket.io';

export const setupSockets = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Example event: join a document room
    socket.on('join-document', (documentId) => {
      socket.join(documentId);
      console.log(`User ${socket.id} joined document ${documentId}`);
    });

    // Example event: document changes
    socket.on('send-changes', (data) => {
      // Broadcast changes to everyone in the room except the sender
      socket.to(data.documentId).emit('receive-changes', data.delta);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

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

    // Handle bulk upload completion from client
    socket.on('bulk-upload-complete', async (data) => {
      console.log(`User ${socket.id} completed bulk upload of ${data.count} files`);
      
      try {
        const { default: Notification } = await import('../models/Notification.js');
        const notification = await Notification.create({
          message: `Successfully processed a bulk upload of ${data.count} documents.`,
          type: 'success'
        });
        
        io.emit('bulk-upload-success', data);
        io.emit('notification-received', notification);
      } catch (err) {
        console.error('Failed to create bulk notification', err);
        io.emit('bulk-upload-success', data);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const socket = io(URL, {
  autoConnect: false, // Prevents automatic connection until we manually call connect()
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

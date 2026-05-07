import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { setupSockets } from './sockets/index.js';
import { upload } from './middleware/upload.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

// Setup Socket.IO
const io = setupSockets(httpServer);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Make io accessible in routes if needed
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Realtime Document Dashboard API is running...');
});

// Upload route
app.post('/api/upload', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Here we would typically save document info to MongoDB
  // Emitting an event to notify clients of a new document
  req.io.emit('document-uploaded', {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size
  });

  res.status(200).json({ 
    message: 'File uploaded successfully',
    file: req.file 
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
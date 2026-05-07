import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './config/db.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Realtime Document Dashboard API is running...');
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
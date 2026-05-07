# Realtime Document Dashboard

A modern, full-stack web application for uploading, managing, and collaborating on PDF documents in real-time. Built with a beautiful SaaS-inspired UI, drag-and-drop capabilities, and live socket connections.

## Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS 3
- Socket.IO Client
- React Router DOM
- Axios

**Backend:**
- Node.js + Express
- MongoDB (Mongoose)
- Socket.IO
- Multer (File Uploads)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally (default: `mongodb://localhost:27017`) or a MongoDB Atlas URI

### 2. Backend Setup
Navigate into the server directory and install dependencies:
```bash
cd server
npm install
```

Ensure your `.env` file in the `server` directory is configured:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtime-document-dashboard
CLIENT_URL=http://localhost:3000
```

Start the backend development server:
```bash
npm run dev
```
*The server will start on `http://localhost:5000`*

### 3. Frontend Setup
Open a new terminal window, navigate into the client directory and install dependencies:
```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```
*The frontend will start on `http://localhost:3000`*

---

## 🌟 Key Features

- **Drag & Drop Uploads**: Support for single and multiple PDF file uploads with a smooth, interactive dropzone.
- **Real-time Progress Tracking**: Live visual progress bars and animated network speed indicators using Axios.
- **Socket Integration**: Real-time event broadcasting when documents are uploaded.
- **Modern UI/UX**: Built with Tailwind CSS, featuring subtle micro-animations, a clean layout, and the beautiful Livvic font.
- **Robust Validation**: Strict frontend and backend validation allowing only `.pdf` files and enforcing size limits.

---

## Folder Structure

```text
realtime-document-dashboard/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components (UploadZone, FilePreview)
│   │   ├── layouts/        # Page layouts (DashboardLayout)
│   │   ├── pages/          # Main views (Dashboard, Uploads)
│   │   └── socket/         # Socket.IO client utilities
│   ├── tailwind.config.js
│   └── package.json
└── server/
    ├── config/             # Database connection setup
    ├── controllers/        # Route logic and database interactions
    ├── middleware/         # Multer configuration and file validation
    ├── models/             # Mongoose schemas
    ├── routes/             # Express API routes
    ├── sockets/            # Socket.IO server handling
    ├── uploads/            # Local storage for uploaded documents
    └── server.js           # Main Express application
```
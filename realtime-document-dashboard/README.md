# realtime-document-dashboard

## Overview
The Realtime Document Dashboard is a full-stack application that allows users to upload and manage documents in real-time. It features a responsive dashboard built with React, Vite, and Tailwind CSS for the frontend, and a Node.js and Express backend with MongoDB for data storage.

## Project Structure
```
realtime-document-dashboard
├── client                # Frontend application
│   ├── public            # Static assets
│   ├── src               # Source code
│   │   ├── components    # React components
│   │   ├── pages         # Application pages
│   │   ├── styles        # CSS styles
│   │   ├── App.jsx       # Main application component
│   │   └── main.jsx      # Entry point for Vite
│   ├── index.html        # Main HTML file
│   ├── package.json       # Frontend dependencies
│   ├── postcss.config.js  # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.js     # Vite configuration
├── server                # Backend application
│   ├── config            # Configuration files
│   │   └── db.js        # MongoDB connection
│   ├── controllers       # Controller functions
│   │   └── fileController.js # File handling
│   ├── middleware        # Middleware functions
│   │   └── corsMiddleware.js # CORS support
│   ├── models            # Mongoose models
│   │   └── File.js      # File schema
│   ├── routes            # API routes
│   │   └── fileRoutes.js # File upload routes
│   ├── app.js            # Express app setup
│   ├── server.js         # Server entry point
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- Git (optional, for version control)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/realtime-document-dashboard.git
   cd realtime-document-dashboard
   ```

2. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

### Running the Application

1. Start the backend server:
   ```
   cd server
   node server.js
   ```

2. Start the frontend application:
   ```
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features
- Real-time document upload and management
- Responsive dashboard layout
- File upload support with Multer
- CORS enabled for cross-origin requests

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
import Document from '../models/Document.js';
import Notification from '../models/Notification.js';

// @desc    Upload a document
// @route   POST /api/upload
// @access  Public
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded or invalid file type' });
    }

    const { filename, originalname, path, size, mimetype } = req.file;

    // Save document info to MongoDB
    const newDocument = await Document.create({
      filename,
      originalName: originalname,
      path,
      size,
      mimetype
    });

    // Create a notification for the newly uploaded document
    const notification = await Notification.create({
      message: `Document "${originalname}" was uploaded successfully.`,
      type: 'success'
    });

    // Emit event via Socket.io
    if (req.io) {
      req.io.emit('document-uploaded', {
        id: newDocument._id,
        filename: newDocument.filename,
        originalName: newDocument.originalName,
        size: newDocument.size,
        status: newDocument.status,
        uploadDate: newDocument.uploadDate
      });

      // Emit new notification
      req.io.emit('notification-received', notification);
    }

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: newDocument
    });

  } catch (error) {
    console.error(`Upload error: ${error.message}`);
    
    // Attempt to create an error notification if io is available
    if (req.io && req.file) {
      const errorNotif = await Notification.create({
        message: `Failed to upload document "${req.file.originalname}".`,
        type: 'error'
      }).catch(e => console.error(e));
      
      if (errorNotif) req.io.emit('notification-received', errorNotif);
    }

    return res.status(500).json({ success: false, error: 'Server error during upload' });
  }
};

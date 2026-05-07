import express from 'express';
import { upload } from '../middleware/upload.js';
import { uploadDocument } from '../controllers/uploadController.js';

const router = express.Router();

// Error handling middleware specific to multer
const handleMulterError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ success: false, error: err.message || err });
  }
  next();
};

router.post('/', (req, res, next) => {
  upload.single('document')(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next);
    }
    next();
  });
}, uploadDocument);

export default router;

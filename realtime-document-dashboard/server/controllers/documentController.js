import Document from '../models/Document.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all documents
// @route   GET /api/documents
// @access  Public
export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ uploadDate: -1 });
    return res.status(200).json({ success: true, data: documents });
  } catch (error) {
    console.error(`Error fetching documents: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Download a document
// @route   GET /api/documents/download/:id
// @access  Public
export const downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    const filePath = path.join(__dirname, '..', document.path);

    if (fs.existsSync(filePath)) {
      res.download(filePath, document.originalName);
    } else {
      return res.status(404).json({ success: false, error: 'File not found on server' });
    }
  } catch (error) {
    console.error(`Error downloading document: ${error.message}`);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

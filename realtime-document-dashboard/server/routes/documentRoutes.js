import express from 'express';
import { getDocuments, downloadDocument } from '../controllers/documentController.js';

const router = express.Router();

router.route('/')
  .get(getDocuments);

router.route('/download/:id')
  .get(downloadDocument);

export default router;

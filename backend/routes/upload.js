import { Router } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import app from '../app.js';
import { uploadController } from '../controllers/upload/index.js';
import CloudinaryService from '../services/CloudinaryService.js';

const router = new Router();
const cloudinary = app.get(CloudinaryService.serviceName);
// @todo: Add optional drivers for Storage
const uploadMulter = multer({ storage: cloudinary.storage });

router.post('/', uploadMulter.single('file'), uploadController);

export default router;

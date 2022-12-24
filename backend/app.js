import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import process from 'node:process';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongooseService from './services/mongooseService.js';
import currentUserMiddleware from './middlewares/currentUserMiddleware.js';
import Auth0Service from './services/Auth0Service.js';
import CloudinaryService from './services/CloudinaryService.js';

dotenv.config();

mongooseService(
  process.env.DB_HOST,
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD
);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Add your Global Services to be part of the app
app.set(
  Auth0Service.serviceName,
  new Auth0Service(
    process.env.AUTH0_DOMAIN,
    process.env.AUTH0_CLIENT_ID,
    process.env.AUTH0_CLIENT_SECRET
  )
);

app.set(
  CloudinaryService.serviceName,
  new CloudinaryService(
    process.env.CLOUDINARY_CLOUD_NAME,
    process.env.CLOUDINARY_API_KEY,
    process.env.CLOUDINARY_API_SECRET,
    process.env.CLOUDINARY_UPLOAD_PRESET
  )
);

// Add your Global middlewares here
app.use(express.json());
app.use(cors());
app.use(currentUserMiddleware);

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.use((err, _, res, __) => {
  console.error(err.stack);

  return res.status(500).json({
    error: err?.message ?? 'Something went wrong',
  });
});

// We create this file to easily get the instance of Express App, without initializing it
// Or when we cannot access the Request (req.app)
export default app;

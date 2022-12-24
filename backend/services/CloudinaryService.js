import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

class CloudinaryService {
  static serviceName = 'CloudinaryService';

  constructor(cloudName, apiKey, apiSecret, uploadPreset) {
    this.cloudinary = cloudinary.v2;
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
    this.config = this.cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  get uploader() {
    return this.cloudinary.uploader;
  }

  get storage() {
    return new CloudinaryStorage({
      cloudinary: this.cloudinary,
      params: {
        upload_preset: this.uploadPreset,
      },
    });
  }
}

export default CloudinaryService;

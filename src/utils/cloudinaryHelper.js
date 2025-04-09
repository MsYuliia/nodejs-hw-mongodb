import cloudinary from 'cloudinary';
import fs from 'fs/promises';

export const initCloudinary = () => {
  const CLOUDINARY_CONFIG = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  cloudinary.v2.config(CLOUDINARY_CONFIG);
};

export const saveFileToCloudinary = async (file) => {
  if (!file) {
    console.log('No file provided for upload to Cloudinary');
    return null;
  }

  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};

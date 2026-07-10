import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // ✅ Kuch versions me bina {} ke 'import CloudinaryStorage' chalte hai, yeh standard safe import hai
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config(); // Yeh ensure karega ki process.env values load ho chuki hain

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pics', // Cloudinary mein folder ka naam
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Auto resize
  },
});

// ✅ Export Default kiya taaki router me 'import upload from ...' bina {} ke chal sake
const upload = multer({ storage: storage });
export default upload;
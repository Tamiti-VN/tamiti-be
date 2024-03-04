import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    format: 'jpeg',
    resource_type: 'image',
    public_id: (req, file) => {
      const timeStamp = format(new Date(), 'yyyy-MM-dd-HHmmss');
      const uniqueIdentifier = uuidv4();
      return `${uniqueIdentifier}_${timeStamp}`;
    },
  },
});
export const upload = multer({ storage: storage });
export const deleteImage = async (file) => {
  try {
    const result = await cloudinary.uploader.destroy(file);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// import { v2 as cloudinary } from "cloudinary";
// import { format } from "date-fns";
// import "dotenv/config";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { v4 as uuidv4 } from "uuid";

// const MAX_LIMIT = 2 * 1024 * 1024;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// const storageForCarousel = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     format: "jpeg",
//     folder: "carousels",
//     resource_type: "image",
//     public_id: (req, file) => {
//       const timeStamp = format(new Date(), "yyyy-MM-dd-HHmmss");
//       const uniqueIdentifier = uuidv4();
//       return `${uniqueIdentifier}_${timeStamp}`;
//     },
//   },
// });
// const storageForProduct = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     format: "jpeg",
//     folder: "products",
//     resource_type: "image",
//     public_id: (req, file) => {
//       const timeStamp = format(new Date(), "yyyy-MM-dd-HHmmss");
//       const uniqueIdentifier = uuidv4();
//       return `${uniqueIdentifier}_${timeStamp}`;
//     },
//   },
// });
// export const uploadCarousel = multer({ storage: storageForCarousel });
// export const uploadProductImage = multer({ storage: storageForProduct });

// export const deleteImage = async (files) => {
//   try {
//     const result = await cloudinary.uploader.destroy(files);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

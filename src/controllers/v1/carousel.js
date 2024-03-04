import { Carousel } from '../../models/carousel.js';
import { v2 as cloudinary } from 'cloudinary';

export const getCarouselList = async (req, res) => {
  try {
    const carousels = await Carousel.find();

    if (!carousels.length > 0) {
      return res.json({ message: 'There is no carousels!!' });
    }
    return res.json({ data: carousels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const addCarousel = async (req, res) => {
  const imgs = req.files;
  const uploadedImages = [];

  try {
    if (imgs) {
      const uploadImage = async (path) =>
        await cloudinary.uploader.upload(path, { folder: 'carousels' });

      for (const img of imgs) {
        const { path } = img;
        const result = await uploadImage(path);
        const carousel = await Carousel.create({
          imgPath: result.public_id,
        });

        uploadedImages.push(carousel);
      }

      return res.status(201).json({ message: 'Images upload successfully', data: uploadedImages });
    }
    return res.status(400).json({ message: 'Please upload at least 1 image' });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

export const deleteCarousel = async (req, res) => {
  try {
    return res.status(201).json({ message: 'Delete success' });
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
};

import { Carousel } from '../../models/carousel.js';
import { deleteImage } from '../../utils/cloudinary.js';

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
  try {
    const images = req.files;
    const carouselList = [];

    if (!images || images.length == 0) {
      return res.status(400).json({ message: 'Please upload at least 1 image' });
    }

    for (const image of images) {
      const carousel = await Carousel.create({
        fileName: image.filename,
      });
      carouselList.push(carousel);
    }

    return res.status(201).json({ message: 'Images upload successfully', data: carouselList });
  } catch (error) {
    console.error(error);
    deleteImage(req.files);
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

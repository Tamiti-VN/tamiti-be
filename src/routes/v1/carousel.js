import express from 'express';
import { addCarousel, getCarouselList } from '../../controllers/v1/carousel.js';
import { isAllowedRoleMiddleware } from '../../middlewares/authMiddleware.js';
import { upload } from '../../utils/cloudinary.js';

const carouselRoutes = express.Router();
//Public route
carouselRoutes.get('/', getCarouselList);

//Protected route

carouselRoutes.post('/', upload.array('img', 5), addCarousel);

export { carouselRoutes };

import express from 'express';
import { productRoutes } from './product.js';
import { authRoutes } from './user.js';
import { categoryRoutes } from './category.js';
import { carouselRoutes } from './carousel.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/carousels', carouselRoutes);
export { router as routes };

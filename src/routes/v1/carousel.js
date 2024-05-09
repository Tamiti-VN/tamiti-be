import express from "express";
import { addCarousel, getCarouselList } from "../../controllers/v1/carousel.controller.js";
import { isAllowedRoleMiddleware } from "../../middlewares/authMiddleware.js";
import { uploadCarousel } from "../../utils/cloudinary.js";

const carouselRoutes = express.Router();
//Public route
carouselRoutes.get("/", getCarouselList);

//Protected route

carouselRoutes.post("/", uploadCarousel.array("images", 5), addCarousel);

export { carouselRoutes };

import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsWithPage,
  getProductDetail,
  updateProduct,
} from "../../controllers/v1/product.controller.js";
import { isAllowedRoleMiddleware } from "../../middlewares/authMiddleware.js";
import { uploadProductImage } from "../../utils/cloudinary.js";

const productRoutes = express.Router();

//Public route
productRoutes.get("/", getAllProducts);
// productRoutes.get('/', getAllProductsWithPage);
productRoutes.get("/:id", getProductDetail);

//Protected route
// productRoutes.use(upload.single('img'));
productRoutes.post(
  "/",
  uploadProductImage.fields([
    { name: "images", maxCount: 5 },
    { name: "thumb", maxCount: 1 },
  ]),
  isAllowedRoleMiddleware("admin", "staff"),
  createProduct
);
productRoutes.patch("/:id", isAllowedRoleMiddleware("admin", "staff"), updateProduct);
productRoutes.delete("/:id", isAllowedRoleMiddleware("admin"), deleteProduct);
export { productRoutes };

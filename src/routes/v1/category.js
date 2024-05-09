import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../controllers/v1/category.controller.js";
import { isAllowedRoleMiddleware } from "../../middlewares/authMiddleware.js";

const categoryRoutes = express.Router();

//Public route
categoryRoutes.get("/", getCategories);

//Protected route

categoryRoutes.post("/", isAllowedRoleMiddleware("admin", "staff"), createCategory);
categoryRoutes.patch("/:id", isAllowedRoleMiddleware("admin", "staff"), updateCategory);
categoryRoutes.delete("/:id", isAllowedRoleMiddleware("admin"), deleteCategory);
export { categoryRoutes };

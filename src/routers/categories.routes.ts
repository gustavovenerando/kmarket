import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  updateCategoryController,
} from "../controllers/categories.controllers";

const categoriesRoutes = Router();

categoriesRoutes.post("", createCategoryController);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.patch("/:id", updateCategoryController);
categoriesRoutes.delete("/:id", deleteCategoryController);

export default categoriesRoutes;

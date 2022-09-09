import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  listProdByCategoryController,
  updateCategoryController,
} from "../controllers/categories.controllers";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post("", validationAdmMiddleware,  createCategoryController);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/products", validationAdmMiddleware, listProdByCategoryController);
categoriesRoutes.patch("/:id", validationAdmMiddleware, updateCategoryController);
categoriesRoutes.delete("/:id", validationAdmMiddleware, deleteCategoryController);

export default categoriesRoutes;

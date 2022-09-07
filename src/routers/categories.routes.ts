import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  listCategoriesController,
  updateCategoryController,
} from "../controllers/categories.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";

const categoriesRoutes = Router();

// categoriesRoutes.post('/categories', authTokenMiddleware, validationAdmMiddleware, createCategoryController)
// categoriesRoutes.get("", authTokenMiddleware, listCategoriesController);

categoriesRoutes.post("", createCategoryController);
categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.patch("/:id", updateCategoryController);
categoriesRoutes.delete("/:id", deleteCategoryController);

export default categoriesRoutes;

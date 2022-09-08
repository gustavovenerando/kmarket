import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import deleteCategoryService from "../services/categories/deleteCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listProdByCategoryIdService from "../services/categories/listProdByCategoryId.service";
import updateCategoryService from "../services/categories/updateCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const response = await createCategoryService(name);
  res.status(201).json(response);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const response = await listCategoriesService();
  res.status(200).json(response);
};

const listProdByCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await listProdByCategoryIdService(id);
  res.status(200).json(response);
};

const updateCategoryController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  const response = await updateCategoryService(id, name);

  res.status(202).json({
    message: "Updated with success",
    category: response,
  });
};

const deleteCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteCategoryService(id);
  res.status(204).json(response);
};

export {
  createCategoryController,
  listCategoriesController,
  deleteCategoryController,
  updateCategoryController,
};

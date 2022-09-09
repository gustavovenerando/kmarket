import { Request, Response } from "express";
import { ISupplierProductsRequest } from "../interfaces/supplierProducts";
import createSupplierProductService from "../services/supplierProducts/createSupplierProduct.service";
import deleteSupplierProductService from "../services/supplierProducts/deleteSupplierProduct.service";
import listSupplierProductsService from "../services/supplierProducts/listSupplierProducts.service";

export const createSupplierProductController = async (
  req: Request,
  res: Response
) => {
  const { categoryId, costPrice, name, supplierId }: ISupplierProductsRequest =
    req.body;

  const newProduct = await createSupplierProductService({
    categoryId,
    costPrice,
    name,
    supplierId,
  });

  return res.status(201).json(newProduct);
};

export const listSupplierProductsController = async (
  req: Request,
  res: Response
) => {
  const supplierProducts = await listSupplierProductsService();

  return res.status(200).json(supplierProducts);
};

export const deleteSupplierProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const deleteSupplierProduct = await deleteSupplierProductService(id);

  return res.status(204).json(deleteSupplierProduct);
};

import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import createProductCartService from "../services/productsCart/createProductCart.service";
import listProductsCartService from "../services/productsCart/listProductsCart.service";
import deleteProductCartService from "../services/productsCart/deleteProductCart.service";
import listProductsCartByProductService from "../services/productsCart/listProductsCartByProduct.service";
import { IProductCartRequest } from "../interfaces/productsCart";

export const createProductCartController = async (
  req: Request,
  res: Response
) => {
  const { cartId } = req.params
  const { quantity, productId }: IProductCartRequest = req.body;
  const productCart = await createProductCartService({ quantity, productId }, cartId );
  return res.status(201).json(instanceToPlain(productCart));
};

export const listProductsCartController = async (
  req: Request,
  res: Response
) => {

  const productsCart = await listProductsCartService();
  return res.status(200).json(instanceToPlain(productsCart));
};

export const deleteProductCartController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params
  const productCart = await deleteProductCartService(id);
  return res.status(204).json();
};

export const listProductsCartByProductController = async (
  req: Request,
  res: Response
) => {
  const { productId } = req.params
  const productsCart = await listProductsCartByProductService(productId);
  return res.status(200).json(instanceToPlain(productsCart));
};
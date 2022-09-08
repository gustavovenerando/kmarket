import { Request, Response } from "express";
import { IOrderProductsRequest } from "../interfaces/orderProducts";
import createOrderProductService from "../services/orderProducts/createOrderProduct.service";
import deleteOrderProductService from "../services/orderProducts/deleteOrderProduct.service";
import listOrdersProductsService from "../services/orderProducts/listOrdersProducts.service";

export const createOrderProductController = async (
  req: Request,
  res: Response
) => {
  const {
    costPrice,
    deliverySchedule,
    productId,
    quantity,
    supplierProductId,
    isDelivered,
  }: IOrderProductsRequest = req.body;

  const newOrder = await createOrderProductService({
    costPrice,
    deliverySchedule,
    productId,
    quantity,
    supplierProductId,
    isDelivered,
  });

  return res.status(201).json(newOrder);
};

export const listOrdersProductController = async (
  req: Request,
  res: Response
) => {
  const orders = await listOrdersProductsService();

  return res.status(200).json(orders);
};

export const deleteOrderProductController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const deletedOrder = await deleteOrderProductService(id);

  return res.status(204).json(deletedOrder);
};

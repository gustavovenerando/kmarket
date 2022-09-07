import { Request, Response } from "express";
import { ICartRequest } from "../interfaces/employee";
import createCartService from "../services/carts/createCart.service";

const createCartController = async (req: Request, res: Response) => {
  const { employeeId, loyaltyCustomerId }: ICartRequest = req.body;
  const response = await createCartService({ employeeId, loyaltyCustomerId });
  res.status(201).json(response);
};
export { createCartController };

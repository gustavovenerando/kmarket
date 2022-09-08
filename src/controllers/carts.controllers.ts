import { Request, Response } from "express";
import { ICartRequest } from "../interfaces/employee";
import createCartService from "../services/carts/createCart.service";
import deleteCartService from "../services/carts/deleteCart.service";
import listCartsService from "../services/carts/listCart.service";
import listCartByIdService from "../services/carts/listCartById.service";
import soldCartService from "../services/carts/soldCart.service";

const createCartController = async (req: Request, res: Response) => {
	const { employeeId, loyaltyCustomerId }: ICartRequest = req.body;
	const response = await createCartService({ employeeId, loyaltyCustomerId });
	return res.status(201).json(response);
};

const listCartsController = async (req: Request, res: Response) => {
	const response = await listCartsService();
	return res.status(200).json(response);
};

const listCartByIdController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const response = await listCartByIdService(id);
	return res.status(200).json(response);
};

const soldCartController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const response = await soldCartService(id);
	return res.status(204).json();
};

const deleteCartController = async (req: Request, res: Response) => {
	const { id } = req.params;
	const response = await deleteCartService(id);
	return res.status(204).json(response);
};

export {
	createCartController,
	listCartsController,
	listCartByIdController,
	soldCartController,
	deleteCartController,
};

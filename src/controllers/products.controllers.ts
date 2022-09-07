import { Request, Response } from "express";

export const createProductsController = async (req: Request, res: Response) => {
	// const {name, marketPrice, stock, description, discount, categoryId}: ICreateProducts = req.body

	return res.status(200).send();
};
export const listProductsController = async (req: Request, res: Response) => {
	return res.status(200).send();
};
export const listOneProductController = async (req: Request, res: Response) => {
	return res.status(200).send();
};

export const updateProductsController = async (req: Request, res: Response) => {
	return res.status(200).send();
};

export const deleteProductsController = async (req: Request, res: Response) => {
	return res.status(200).send();
};

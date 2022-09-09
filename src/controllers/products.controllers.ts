import { Request, Response } from "express";
import { ICreateProducts, IUpdateProducts } from "../interfaces/products";
import createProductsService from "../services/products/createProducts.service";
import deleteProductsService from "../services/products/deleteProducts.service";
import listOneProductsService from "../services/products/listOneProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductsService from "../services/products/updadeProducts.service";

export const createProductsController = async (req: Request, res: Response) => {
	const {
		name,
		marketPrice,
		stock,
		description,
		discount,
		categoryId,
	}: ICreateProducts = req.body;

	const product = await createProductsService({
		name,
		marketPrice,
		stock,
		description,
		discount,
		categoryId,
	});

	return res.status(201).send(product);
};

export const listProductsController = async (req: Request, res: Response) => {
	const products = await listProductsService();

	return res.status(200).send(products);
};

export const listOneProductController = async (req: Request, res: Response) => {
	const id: string = req.params.id;

	const product = await listOneProductsService(id);

	return res.status(200).send(product);
};

export const updateProductsController = async (req: Request, res: Response) => {
	const id: string = req.params.id;

	const {
		name,
		marketPrice,
		stock,
		description,
		discount,
		categoryId,
	}: IUpdateProducts = req.body;

	const updatedProduct = await updateProductsService({
		id,
		name,
		marketPrice,
		stock,
		description,
		discount,
		categoryId,
	});

	return res.status(200).send(updatedProduct);
};

export const deleteProductsController = async (req: Request, res: Response) => {
	const id: string = req.params.id;

	await deleteProductsService(id);

	return res.status(204).send();
};

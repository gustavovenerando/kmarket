import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateProducts, IUpdateProductsSchema } from "../interfaces/products";

export const productsSchema: SchemaOf<ICreateProducts> = yup.object().shape({
	name: yup.string().required(),
	marketPrice: yup.number().required(),
	stock: yup.number().required(),
	description: yup.string().required(),
	discount: yup.number().required(),
	categoryId: yup.string().required(),
});

export const productsUpdateSchema: SchemaOf<IUpdateProductsSchema> = yup
	.object()
	.shape({
		name: yup.string(),
		marketPrice: yup.number(),
		stock: yup.number(),
		description: yup.string(),
		discount: yup.number(),
		categoryId: yup.string(),
});

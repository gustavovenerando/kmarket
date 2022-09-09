import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";
import { ICreateProducts } from "../../interfaces/products";

const createProductsService = async ({
	name,
	marketPrice,
	stock,
	description,
	discount,
	categoryId,
}: ICreateProducts): Promise<Products> => {
	const productsRepository = AppDataSource.getRepository(Products);
	const categoryRepository = AppDataSource.getRepository(Category);

	const categorySelected = await categoryRepository.findOne({
		where: { id: categoryId },
	});

	if (!categorySelected) {
		throw new AppError(404, "Category not found.");
	}

	if (Number(discount) > 1 || Number(discount) < 0) {
		throw new AppError(400, "Discount must be a number between 0 and 1");
	}

	const productExists = await productsRepository.findOneBy({ name })
	if (productExists) {
		throw new AppError(409, "Name of product already exists")
	}

	const product = productsRepository.create({
		name,
		marketPrice,
		stock,
		description,
		discount,
		category: categorySelected,
	});

	await productsRepository.save(product);

	return product;
};

export default createProductsService;

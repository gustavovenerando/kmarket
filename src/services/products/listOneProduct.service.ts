import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const listOneProductsService = async (id: string) => {
	const productsRepository = AppDataSource.getRepository(Products);

	const product = productsRepository.findOneBy({ id });

	if (!product) {
		throw new AppError(404, "Product not found");
	}

	return product;
};

export default listOneProductsService;

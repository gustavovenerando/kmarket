import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const listOneProductsService = async (id: string) => {
	if (id.length !== 36) { throw new AppError(400, "Id format not valid.") }

	const productsRepository = AppDataSource.getRepository(Products);

	const product = await productsRepository.findOneBy({ id });

	if (!product) {
		throw new AppError(404, "Product not found");
	}

	return product;
};

export default listOneProductsService;

import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";

const listProductsService = async (): Promise<{ products: Products[] }> => {
	const productsRepository = AppDataSource.getRepository(Products);

	const products = await productsRepository.find();

	return { products };
};

export default listProductsService;

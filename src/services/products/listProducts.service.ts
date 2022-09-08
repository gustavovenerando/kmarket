import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";

const listProductsService = async (): Promise<Products[]> => {
	const productsRepository = AppDataSource.getRepository(Products);

	const products = productsRepository.find();

	return products;
};

export default listProductsService;

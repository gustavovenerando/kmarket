import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";

const deleteProductsService = async (id: string): Promise<void> => {
	const productsRepository = AppDataSource.getRepository(Products);

	await productsRepository.delete({ id });
};

export default deleteProductsService;

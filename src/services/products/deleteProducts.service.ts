import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const deleteProductsService = async (id: string): Promise<void> => {
	const productsRepository = AppDataSource.getRepository(Products);

	if (id.length !== 36) { throw new AppError(400, "Id format not valid.") }

	const product = productsRepository.findOneBy({ id })

	if (!product) { throw new AppError(404, "Purchase order not found."); }

	await productsRepository.delete({ id });
};

export default deleteProductsService;

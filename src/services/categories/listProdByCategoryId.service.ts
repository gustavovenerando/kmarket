import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const listProdByCategoryIdService = async (id: string) => {
	if (id.length !== 36) {
		throw new AppError(400, "Id format not valid.");
	}

	const productRepository = AppDataSource.getRepository(Products);
	const categoryRepository = AppDataSource.getRepository(Category);

	const category = await categoryRepository.findOne({
		where: { id },
		relations: { products: true },
	});

	if (!category) {
		throw new AppError(404, "Category not found");
	}

	return category;
};

export default listProdByCategoryIdService;

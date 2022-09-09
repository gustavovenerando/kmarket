import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const createCategoryService = async (name: string) => {
	const categoryRepository = AppDataSource.getRepository(Category);

	const categoryAlreadyExists = await categoryRepository.findOneBy({ name });

	if (categoryAlreadyExists) {
		throw new AppError(409, "Category already exists.");
	}

	const categoryCreated = await categoryRepository.save({ name });
	return categoryCreated;
};
export default createCategoryService;

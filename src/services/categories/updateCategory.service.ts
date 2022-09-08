import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const updateCategoryService = async (id: string, name: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOneBy({ id });

  const checkName = await categoryRepository.findOneBy({ name });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  if (checkName) {
    throw new AppError(400, "Category already exists");
  }

  await categoryRepository.update(category!.id, { name });

  return category;
};

export default updateCategoryService;

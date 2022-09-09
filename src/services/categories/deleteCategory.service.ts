import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const deleteCategoryService = async (id: string) => {
  if (id.length !== 36) { throw new AppError(400, "Id format not valid.") }

  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOneBy({ id });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  await categoryRepository.delete({ id });

  return true;
};

export default deleteCategoryService;

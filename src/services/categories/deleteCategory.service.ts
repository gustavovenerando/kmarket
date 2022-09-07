import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const deleteCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOneBy({ id });

  console.log(category);
  if (!category) {
    throw new AppError(404, "Category not found");
  }

  await categoryRepository.delete({ id });
  return "Deleted with success";
};

export default deleteCategoryService;

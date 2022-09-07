import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";

const updateCategoryService = async (id: string, name: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOneBy({ id });

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  category.name = name;

  categoryRepository.save(category);

  return "Updated with success";
};

export default updateCategoryService;

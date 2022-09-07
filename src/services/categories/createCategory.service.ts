import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";

const createCategoryService = async (name: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categoryCreated = await categoryRepository.save({ name });
  return categoryCreated;
};
export default createCategoryService;

import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const listProdByCategoryIdService = async (id: string) => {
  if (id.length !== 36) { throw new AppError(400, "Id format not valid.") }

  const productRepository = AppDataSource.getRepository(Products);
  const categoryRepository = AppDataSource.getRepository(Category)

  const category = await categoryRepository.findOneBy({ id })

  if (!category) { throw new AppError(404, "Category not found") }
  const nameCategory = category.name

  const products = await productRepository.find({
    where: { category: { id } },
  });

  return { [nameCategory]: products }
};

export default listProdByCategoryIdService;

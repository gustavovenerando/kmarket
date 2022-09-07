import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Products from "../../entities/products.entity";

const listProdByCategoryIdService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const productRepository = AppDataSource.getRepository(Products);

  const products = await productRepository.find({
    where: { category: { id } },
  });

  return products;
};

export default listProdByCategoryIdService;

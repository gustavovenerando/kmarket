import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";
import { IUpdateProducts } from "../../interfaces/products";

const updateProductsService = async ({
  id,
  name,
  marketPrice,
  stock,
  description,
  discount,
  categoryId,
}: IUpdateProducts) => {
  if (id?.length !== 36) {
    throw new AppError(400, "Id format not valid.");
  }

  const productsRepository = AppDataSource.getRepository(Products);
  const categoryRepository = AppDataSource.getRepository(Category);
  let categorySelected = null;

  if (categoryId) {
    categorySelected = await categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!categorySelected) {
      throw new AppError(404, "Category not found.");
    }
  }

  const productToUpdate = await productsRepository.findOneBy({ id });

  if (!productToUpdate) {
    throw new AppError(404, "Product not found");
  }

  const newProduct = {
    name: name ? name : productToUpdate?.name,
    marketPrice: marketPrice ? marketPrice : productToUpdate?.marketPrice,
    stock: stock ? stock : productToUpdate?.stock,
    description: description ? description : productToUpdate?.description,
    discount: discount ? discount : productToUpdate?.discount,
    category: categorySelected ? categorySelected : productToUpdate?.category,
  };

  await productsRepository.update(productToUpdate.id, newProduct);

  const productUpToDate = await productsRepository.findOneBy({ id });

  return productUpToDate;
};

export default updateProductsService;

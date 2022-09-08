import AppDataSource from "../../data-source";
import Products from "../../entities/products.entity";
import ProductsCart from "../../entities/productsCart.entity";
import AppError from "../../errors/AppError";

const listProductsCartByProductService = async (productId: string) => {
  const productsCartRepository = AppDataSource.getRepository(ProductsCart);
  const productsRepository = AppDataSource.getRepository(Products);
  const product = await productsRepository.findOneBy({
    id: productId
  })

  if(!product) {
    throw new AppError(404, "Product not found.");
  }

  const productsCart = await productsCartRepository.findBy({
    product: {
      id: productId
    }
  });

  return productsCart;
};

export default listProductsCartByProductService;

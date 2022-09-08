import AppDataSource from "../../data-source";
import ProductsCart from "../../entities/productsCart.entity";

const listProductsCartService = async () => {
  const productsCartRepository = AppDataSource.getRepository(ProductsCart);

  const productsCart = await productsCartRepository.find();

  return productsCart;
};

export default listProductsCartService;

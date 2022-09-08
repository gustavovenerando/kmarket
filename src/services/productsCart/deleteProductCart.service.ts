import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Products from "../../entities/products.entity";
import ProductsCart from "../../entities/productsCart.entity";
import AppError from "../../errors/AppError";

const deleteProductCartService = async (id: string) => {
  const productsCartRepository = AppDataSource.getRepository(ProductsCart);
  const productsRepository = AppDataSource.getRepository(Products);
  const cartRepository = AppDataSource.getRepository(Cart);

  const productCart = await productsCartRepository.findOneBy({
    id,
  });

  const cart = await cartRepository.findOneBy({
    id: productCart?.cart.id
  });

  if (!productCart) {
    throw new AppError(404, "Product not found in cart.");
  }

  if (cart!.sold === true) {
    throw new AppError(409, "Cart already sold.");
  }

  const product = await productsRepository.findOneBy({
    id: productCart?.product.id
  });

  if(!product) {
    throw new AppError(404, "Product not found.");
  }

  const newStock = product.stock + productCart.quantity
  await productsRepository.update(product.id, {stock: newStock});

  await productsCartRepository.delete({ id: productCart.id });
  return true;
};

export default deleteProductCartService;

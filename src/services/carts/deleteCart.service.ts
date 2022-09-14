import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Products from "../../entities/products.entity";
import ProductsCart from "../../entities/productsCart.entity";
import AppError from "../../errors/AppError";

const deleteCartService = async (id: string): Promise<boolean> => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const productsRepository = AppDataSource.getRepository(Products);

  const cart = await cartRepository.findOneBy({ id });

  if (!cart) {
    throw new AppError(404, "Cart not found.");
  }

  if (cart.sold) {
    throw new AppError(400, "Cart already sold.");
  }

  cart.productsCart.forEach(async (item) => {
    let product = await productsRepository.findOneBy({ id: item.product.id });

    product!.stock += item.quantity;

    await productsRepository.update(product!.id, { stock: product!.stock });
  });

  await cartRepository.delete({ id: cart.id });

  return true;
};

export default deleteCartService;

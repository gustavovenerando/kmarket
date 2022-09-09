import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import AppError from "../../errors/AppError";

const soldCartService = async (id: string) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOneBy({ id });

  if (!cart) {
    throw new AppError(404, "Cart not found.");
  }

  if (cart.sold === true) {
    throw new AppError(409, "Cart already sold.");
  }

  if (cart.productsCart.length === 0) {
    throw new AppError(400, "No products in Cart.");
  }

  cart.sold = true;

  const cartSold = await cartRepository.save(cart);
};

export default soldCartService;

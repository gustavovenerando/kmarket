import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import AppError from "../../errors/AppError";

const listCartByIdService = async (id: string) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  if (id.length !== 36) {
    throw new AppError(400, "Id format not valid.");
  }

  const cart = await cartRepository.findOneBy({ id });

  if (!cart) {
    throw new AppError(404, "Cart not found.");
  }

  return cart;
};

export default listCartByIdService;

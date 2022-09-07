import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import AppError from "../../errors/AppError";

const deleteCartService = async (id: string) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const cart = await cartRepository.findOneBy({ id });
  if (!cart) {
    throw new AppError(404, "Cart not found");
  }
  console.log("DELEEEEETE", cart);
  await cartRepository.delete({ id: cart.id });
  return true;
};

export default deleteCartService;

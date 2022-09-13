import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";
import AppError from "../../errors/AppError";
import sendEmailUtil from "../../utils/nodemailer.util";

const bronzeTierPoints = 200;
const silverTierPoints = 1000;
const goldTierPoints = 5000;

const soldCartService = async (id: string) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const loyaltyCustomerRepository =
    AppDataSource.getRepository(LoyaltyCustomer);

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

  if (cart.loyaltyCustomer) {
    const loyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
      id: cart!.loyaltyCustomer.id,
    });

    const totalFidelityPoints = Number(cart.loyaltyCustomer.fidelityPoints);

    let fidelityDiscount = 0;

    if (totalFidelityPoints >= goldTierPoints) {
      fidelityDiscount = 0.15;
    } else if (totalFidelityPoints >= silverTierPoints) {
      fidelityDiscount = 0.1;
    } else if (totalFidelityPoints >= bronzeTierPoints) {
      fidelityDiscount = 0.05;
    }

    const totalPrice = cart.productsCart.reduce(
      (a, b) => a + b.product.marketPrice * b.quantity,
      0
    );

    const totalPriceAfterDiscount =
      Number(cart.totalPrice) * (1 - fidelityDiscount);

    const priceOff = totalPrice - totalPriceAfterDiscount;

    const formattedPrice = priceOff.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    await cartRepository.update(cart!.id, {
      totalPrice: totalPriceAfterDiscount,
      sold: true,
    });

    const loyalCustomerId = cart!.loyaltyCustomer.id;
    const convertionRate = 10;
    const fidelityPointsToGive = totalPriceAfterDiscount / convertionRate;
    const newFidelityPoints = Math.round(
      totalFidelityPoints + fidelityPointsToGive
    );

    const subject = "Compra no KMARKET";

    let text = `Parabéns pela compra, agora você tem ${newFidelityPoints} pontos de fidelidade, nessa compra você economizou ${formattedPrice}. `;

    let to = loyaltyCustomer!.email;

    await loyaltyCustomerRepository.update(loyalCustomerId, {
      fidelityPoints: newFidelityPoints,
    });

    const response = await sendEmailUtil({ subject, text, to });

    return response;
  } else {
    await cartRepository.update(cart!.id, {
      sold: true,
    });
  }
};

export default soldCartService;

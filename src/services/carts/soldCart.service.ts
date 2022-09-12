import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";
import AppError from "../../errors/AppError";

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
		const totalFidelityPoints = Number(cart.loyaltyCustomer.fidelityPoints);
		let fidelityDiscount = 0;

		if (totalFidelityPoints >= 5000) {
			fidelityDiscount = 0.15;
		} else if (totalFidelityPoints >= 1000) {
			fidelityDiscount = 0.1;
		} else if (totalFidelityPoints >= 200) {
			fidelityDiscount = 0.05;
		}

		const totalPriceAfterDiscount =
			Number(cart.totalPrice) * (1 - fidelityDiscount);

		await cartRepository.update(cart!.id, {
			totalPrice: totalPriceAfterDiscount,
			sold: true,
		});

		const loyalCustomerId = cart.loyaltyCustomer.id;
		const convertionRate = 10;
		const fidelityPointsToGive = totalPriceAfterDiscount / convertionRate;
		const newFidelityPoints = Math.round(
			totalFidelityPoints + fidelityPointsToGive
		);

		await loyaltyCustomerRepository.update(loyalCustomerId, {
			fidelityPoints: newFidelityPoints,
		});
	} else {
		await cartRepository.update(cart!.id, {
			sold: true,
		});
	}
};

export default soldCartService;

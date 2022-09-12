import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Products from "../../entities/products.entity";
import ProductsCart from "../../entities/productsCart.entity";
import AppError from "../../errors/AppError";
import { IProductCartRequest } from "../../interfaces/productsCart";

const createProductCartService = async (
	{ quantity, productId }: IProductCartRequest,
	cartId: string
): Promise<ProductsCart> => {
	const productsRepository = AppDataSource.getRepository(Products);
	const cartRepository = AppDataSource.getRepository(Cart);
	const productsCartRepository = AppDataSource.getRepository(ProductsCart);
	let productCartId: string = "";

	const cart = await cartRepository.findOneBy({
		id: cartId,
	});

	const product = await productsRepository.findOneBy({
		id: productId,
	});

	if (!cart) {
		throw new AppError(404, "Cart not found.");
	}

	if (cart.sold === true) {
		throw new AppError(409, "Cart already sold.");
	}

	if (!product) {
		throw new AppError(404, "Product not found.");
	}

	const newStock = product.stock - quantity;
	await productsRepository.update(product.id, { stock: newStock });

	cart.productsCart.map(async (elem) => {
		if (elem.product.id === productId) {
			productCartId = elem.id;
		}
	});

	if (productCartId === "") {
		const newProductCart = productsCartRepository.create({
			quantity,
			product: product,
			cart: cart,
		});
		await productsCartRepository.save(newProductCart);
		return newProductCart;
	} else {
		const productCart = await productsCartRepository.findOneBy({
			id: productCartId,
		});
		const newQuantity = productCart!.quantity + quantity;
		await productsCartRepository.update(productCart!.id, {
			quantity: newQuantity,
		});

		const cartAfterUpdate = await cartRepository.findOneBy({
			id: cartId,
		});

		const cartTotalPrice = cartAfterUpdate!.productsCart.reduce(
			(acum, currElem) => {
				if (Number(currElem.product.discount) > 0) {
					return (
						acum +
						currElem.quantity *
							Number(currElem.product.marketPrice) *
							(1 - Number(currElem.product.discount))
					);
				} else {
					return (
						acum +
						currElem.quantity * Number(currElem.product.marketPrice)
					);
				}
			},
			0
		);

		await cartRepository.update(cart!.id, { totalPrice: cartTotalPrice });

		return productCart!;
	}
};

export default createProductCartService;

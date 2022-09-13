import AppDataSource from "../../data-source";
import OrderSuppliersProducts from "../../entities/orderSuppliersProducts.entity";
import Products from "../../entities/products.entity";
import SupplierProduct from "../../entities/supplierProducts.entity";
import AppError from "../../errors/AppError";
import { IOrderProductsRequest } from "../../interfaces/orderProducts";

const createOrderProductService = async ({
	deliverySchedule,
	productId,
	quantity,
	supplierProductId,
	isDelivered,
}: IOrderProductsRequest): Promise<OrderSuppliersProducts> => {
	const orderProductsRepository = AppDataSource.getRepository(
		OrderSuppliersProducts
	);

	const supplierProductsRepository =
		AppDataSource.getRepository(SupplierProduct);

	const productsRepository = AppDataSource.getRepository(Products);

	const product = await productsRepository.findOneBy({ id: productId });

	const supplierProduct = await supplierProductsRepository.findOneBy({
		id: supplierProductId,
	});

	if (!product) {
		throw new AppError(404, "Product not found in market products.");
	}

	if (!supplierProduct) {
		throw new AppError(404, "Product not found in supplier's products.");
	}

	const costProduct = supplierProduct.costPrice;

	const newOrder = orderProductsRepository.create({
		costPrice: costProduct,
		deliverySchedule,
		isDelivered,
		product,
		quantity,
		supplierProduct,
		totalPrice: costProduct * quantity,
	});

	await orderProductsRepository.save(newOrder);

	return newOrder;
};

export default createOrderProductService;

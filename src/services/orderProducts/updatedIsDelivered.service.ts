import AppDataSource from "../../data-source";
import OrderSuppliersProducts from "../../entities/orderSuppliersProducts.entity";
import Products from "../../entities/products.entity";
import AppError from "../../errors/AppError";

const updateIsDeliveredService = async (
  orderId: string
): Promise<OrderSuppliersProducts> => {
  const orderProductsRepository = AppDataSource.getRepository(
    OrderSuppliersProducts
  );

  const productRepository = AppDataSource.getRepository(Products);

  const order = await orderProductsRepository.findOneBy({ id: orderId });

  console.log("ordem", order);

  if (!order) {
    throw new AppError(404, "Purchase order not found.");
  }

  const product = await productRepository.findOneBy({ id: order?.product.id });

  product!.stock += order.quantity;

  order.isDelivered = true;

  await productRepository.save(product!);

  await orderProductsRepository.save(order);

  return order;
};

export default updateIsDeliveredService;

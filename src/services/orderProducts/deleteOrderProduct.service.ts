import AppDataSource from "../../data-source";
import OrderSuppliersProducts from "../../entities/orderSuppliersProducts.entity";
import AppError from "../../errors/AppError";

const deleteOrderProductService = async (orderId: string): Promise<boolean> => {
  if (orderId.length !== 36) { throw new AppError(400, "Id format not valid.") }

  const orderProductsRepository = AppDataSource.getRepository(
    OrderSuppliersProducts
  );

  const orderedProduct = await orderProductsRepository.findOneBy({
    id: orderId,
  });

  if (!orderedProduct) {
    throw new AppError(404, "Purchase order not found.");
  }

  orderProductsRepository.delete({ id: orderedProduct.id });

  return true;
};

export default deleteOrderProductService;

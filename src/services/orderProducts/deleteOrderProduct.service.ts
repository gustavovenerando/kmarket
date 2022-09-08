import AppDataSource from "../../data-source";
import OrderSuppliersProducts from "../../entities/orderSuppliersProducts.entity";
import AppError from "../../errors/AppError";

const deleteOrderProductService = async (orderId: string): Promise<boolean> => {
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

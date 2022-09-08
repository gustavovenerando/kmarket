import AppDataSource from "../../data-source";
import OrderSuppliersProducts from "../../entities/orderSuppliersProducts.entity";

const listOrdersProductsService = async (): Promise<
  OrderSuppliersProducts[]
> => {
  const orderProductsRepository = AppDataSource.getRepository(
    OrderSuppliersProducts
  );

  const orders = await orderProductsRepository.find();

  return orders;
};

export default listOrdersProductsService;

import AppDataSource from "../../data-source";
import SupplierProduct from "../../entities/supplierProducts.entity";

const listSupplierProductsService = async (): Promise<SupplierProduct[]> => {
  const supplierProductsRepository =
    AppDataSource.getRepository(SupplierProduct);

  const supplierProducts = await supplierProductsRepository.find();

  return supplierProducts;
};

export default listSupplierProductsService;

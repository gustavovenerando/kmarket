import AppDataSource from "../../data-source";
import SupplierProduct from "../../entities/supplierProducts.entity";
import AppError from "../../errors/AppError";

const deleteSupplierProductService = async (supplierProductId: string) => {
  const supplierProductRepository =
    AppDataSource.getRepository(SupplierProduct);

  const deleteSupplierProduct = await supplierProductRepository.findOneBy({
    id: supplierProductId,
  });

  if (!deleteSupplierProduct) {
    throw new AppError(404, "Product not found in supplier's products.");
  }

  await supplierProductRepository.delete({ id: deleteSupplierProduct.id });

  return true;
};

export default deleteSupplierProductService;

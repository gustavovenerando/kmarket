import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";

const deleteSupplierService = async (supplierId: string): Promise<boolean> => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const checkSupplier = await supplierRepository.findOneBy({ id: supplierId });

  if (!checkSupplier) {
    throw new AppError(404, "Supplier not found.");
  }

  await supplierRepository.delete({ id: supplierId });

  return true;
};

export default deleteSupplierService;

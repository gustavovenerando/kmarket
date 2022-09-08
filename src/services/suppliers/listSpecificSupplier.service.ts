import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";

const listSpecificSupplierService = async (
  supplierId: string
): Promise<Supplier> => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const supplier = await supplierRepository.findOneBy({ id: supplierId });

  if (!supplier) {
    throw new AppError(404, "Supplier not found.");
  }

  return supplier;
};

export default listSpecificSupplierService;

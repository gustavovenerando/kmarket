import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";

const listSpecificSupplierService = async (
  supplierId: string
): Promise<Supplier> => {
  if (supplierId.length !== 36) { throw new AppError(400, "Id format not valid.") }

  const supplierRepository = AppDataSource.getRepository(Supplier);

  const supplier = await supplierRepository.findOneBy({ id: supplierId });

  if (!supplier) {
    throw new AppError(404, "Supplier not found.");
  }

  return supplier;
};

export default listSpecificSupplierService;

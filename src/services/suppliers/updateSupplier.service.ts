import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";
import { ISupplierUpdateRequest } from "../../interfaces/supplier";

const updateSupplierService = async (
  supplierId: string,
  supplierData: ISupplierUpdateRequest
) => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const supplier = await supplierRepository.findOneBy({ id: supplierId });

  if (!supplier) {
    throw new AppError(404, "Supplier not found.");
  }

  await supplierRepository.update(supplier!.id, { ...supplierData });

  const updatedUser = await supplierRepository.findOneBy({ id: supplier.id });

  return updatedUser;
};

export default updateSupplierService;

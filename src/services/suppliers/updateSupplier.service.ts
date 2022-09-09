import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";
import { ISupplierUpdateRequest } from "../../interfaces/supplier";

const updateSupplierService = async (
  supplierId: string,
  supplierData: ISupplierUpdateRequest
): Promise<Supplier | null> => {
  if (supplierId.length !== 36){ throw new AppError(400, "Id format not valid.")}

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

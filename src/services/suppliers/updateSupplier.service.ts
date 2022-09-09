import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";
import { ISupplierUpdateRequest } from "../../interfaces/supplier";

const updateSupplierService = async (
  supplierId: string,
  { cnpj, email, name, phone }: ISupplierUpdateRequest
): Promise<Supplier | null> => {
  if (supplierId.length !== 36) {
    throw new AppError(400, "Id format not valid.");
  }

  if (!cnpj && !email && !name && !phone) {
    throw new AppError(400, "Insert a valid option");
  }

  const supplierRepository = AppDataSource.getRepository(Supplier);

  const supplier = await supplierRepository.findOneBy({ id: supplierId });

  const checkEmail = await supplierRepository.findOneBy({ email });

  const checkCnpj = await supplierRepository.findOneBy({ cnpj });

  if (email && checkEmail) {
    throw new AppError(409, "Email already registered.");
  }

  if (cnpj && checkCnpj) {
    throw new AppError(409, "Cnpj already registered.");
  }

  if (!supplier) {
    throw new AppError(404, "Supplier not found.");
  }

  await supplierRepository.update(supplier!.id, {
    cnpj: cnpj ? cnpj : supplier.cnpj,
    email: email ? email : supplier.email,
    name: name ? name : supplier.name,
    phone: phone ? phone : supplier.phone,
  });

  const updatedUser = await supplierRepository.findOneBy({ id: supplier.id });

  return updatedUser;
};

export default updateSupplierService;

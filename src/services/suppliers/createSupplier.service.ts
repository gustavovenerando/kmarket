import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";
import { ISupplierRequest } from "../../interfaces/supplier";

const createSupplierService = async ({
  name,
  cnpj,
  email,
  phone,
}: ISupplierRequest): Promise<Supplier> => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const emailCheck = await supplierRepository.findOneBy({ email });

  if (emailCheck) {
    throw new AppError(409, "Email already registered as supplier.");
  }

  const cnpjCheck = await supplierRepository.findOneBy({ cnpj });

  if (cnpjCheck) {
    throw new AppError(409, "CNPJ already registered as supplier.");
  }

  const newSupplier = supplierRepository.create({
    name,
    cnpj,
    email,
    phone,
  });

  await supplierRepository.save(newSupplier);

  return newSupplier;
};

export default createSupplierService;

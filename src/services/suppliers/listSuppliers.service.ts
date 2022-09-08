import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";

const listSuppliersService = async (): Promise<Supplier[]> => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const suppliers = await supplierRepository.find();

  return suppliers;
};

export default listSuppliersService;

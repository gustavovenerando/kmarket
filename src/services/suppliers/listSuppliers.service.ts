import AppDataSource from "../../data-source";
import Supplier from "../../entities/suppliers.entity";

const listSuppliersService = async () => {
  const supplierRepository = AppDataSource.getRepository(Supplier);

  const suppliers = await supplierRepository.find();

  return {suppliers};
};

export default listSuppliersService;

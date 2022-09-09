import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import SupplierProduct from "../../entities/supplierProducts.entity";
import Supplier from "../../entities/suppliers.entity";
import AppError from "../../errors/AppError";
import { ISupplierProductsRequest } from "../../interfaces/supplierProducts";

const createSupplierProductService = async ({
  categoryId,
  costPrice,
  name,
  supplierId,
}: ISupplierProductsRequest): Promise<SupplierProduct> => {
  const supplierProductsRepository =
    AppDataSource.getRepository(SupplierProduct);

  const categoryRepository = AppDataSource.getRepository(Category);

  const supplierRepository = AppDataSource.getRepository(Supplier);

  const categoryFound = await categoryRepository.findOneBy({ id: categoryId });

  const supplierFound = await supplierRepository.findOneBy({ id: supplierId });

  if (!categoryFound) {
    throw new AppError(404, "Category not found.");
  }

  if (!supplierFound) {
    throw new AppError(404, "Supplier not found.");
  }

  const newProduct = supplierProductsRepository.create({
    category: categoryFound,
    costPrice,
    name,
    supplier: supplierFound,
  });

  await supplierProductsRepository.save(newProduct);

  return newProduct;
};

export default createSupplierProductService;

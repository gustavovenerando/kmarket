import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISupplierProductsRequest } from "../interfaces/supplierProducts";

export const supplierProductsSchema: SchemaOf<ISupplierProductsRequest> = yup
  .object()
  .shape({
    name: yup.string().required(),
    costPrice: yup.number().required(),
    categoryId: yup.string().required(),
    supplierId: yup.string().required(),
  });

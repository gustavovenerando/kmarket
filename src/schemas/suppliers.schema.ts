import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISupplierRequest } from "../interfaces/supplier";

export const supplierSchema: SchemaOf<ISupplierRequest> = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.number().required(),
  phone: yup.string().required(),
  email: yup.string().required(),
});

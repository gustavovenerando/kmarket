import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ISupplierRequest,
  ISupplierUpdateRequest,
} from "../interfaces/supplier";

export const supplierSchema: SchemaOf<ISupplierRequest> = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

export const supplierUpdateSchema: SchemaOf<ISupplierUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string(),
    cnpj: yup.string(),
    phone: yup.string(),
<<<<<<< HEAD
    email: yup.string().email(),
=======
    email: yup.string(),
>>>>>>> ab715c4 (fixing merge)
  });

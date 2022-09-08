import * as yup from "yup";
import { SchemaOf } from "yup";
import { IProductCartRequest } from "../interfaces/productsCart";

export const productsCartSchema: SchemaOf<IProductCartRequest> = yup.object().shape({
  quantity: yup.number().required(),
  productId: yup.string().required()
});
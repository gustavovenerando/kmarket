import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOrderProductsRequest } from "../interfaces/orderProducts";

export const orderProductsSchema: SchemaOf<IOrderProductsRequest> = yup
  .object()
  .shape({
    quantity: yup.number().required(),
    costPrice: yup.number().required(),
    deliverySchedule: yup.date().required(),
    isDelivered: yup.boolean(),
    supplierProductId: yup.string().required(),
    productId: yup.string().required(),
  });

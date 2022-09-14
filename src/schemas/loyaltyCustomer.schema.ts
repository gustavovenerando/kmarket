import * as yup from "yup";
import { SchemaOf } from "yup";
import { ILoyaltyCustomerRequest, ILoyaltyCustomerUpdateRequest } from "../interfaces/loyaltyCustomer";


export const loyaltyCustomerSchema: SchemaOf<ILoyaltyCustomerRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export const loyaltyCustomerUpdateSchema: SchemaOf<ILoyaltyCustomerUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string(),
    email: yup.string().email(),
    fidelityPoints: yup.number(),
    isActive: yup.boolean()
  });
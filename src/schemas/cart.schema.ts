import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICartRequest } from "../interfaces/employee";

export const cartSchema: SchemaOf<ICartRequest> = yup.object().shape({
  employeeId: yup.string().required(),
  loyaltyCustomerId: yup.string(),
});

import { Router } from "express";
import {
  createLoyaltyCustomerController,
  listLoyaltyCustomerController,
  listLoyaltyCustomersController,
  softDeleteLoyaltyCustomerController,
  updateLoyaltyCustomersController,
} from "../controllers/loyaltyCustomer.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { loyaltyCustomerSchema } from "../schemas/loyaltyCustomer.schema";

const loyaltyCustomerRoutes = Router();

loyaltyCustomerRoutes.post(
  "",
  authTokenMiddleware,
  validationSchemaMiddleware(loyaltyCustomerSchema),
  createLoyaltyCustomerController
);
loyaltyCustomerRoutes.get(
  "",
  authTokenMiddleware,
  listLoyaltyCustomersController
);
loyaltyCustomerRoutes.get(
  "/:id",
  authTokenMiddleware,
  validationAdmMiddleware,
  listLoyaltyCustomerController
);
loyaltyCustomerRoutes.patch(
  "/:id",
  authTokenMiddleware,
  validationAdmMiddleware,
  validationSchemaMiddleware(loyaltyCustomerSchema),
  updateLoyaltyCustomersController
);
loyaltyCustomerRoutes.delete(
  "/:id",
  authTokenMiddleware,
  validationAdmMiddleware,
  softDeleteLoyaltyCustomerController
);

export default loyaltyCustomerRoutes;

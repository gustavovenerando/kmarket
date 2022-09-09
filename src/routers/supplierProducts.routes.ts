import { Router } from "express";
import {
  createSupplierProductController,
  deleteSupplierProductController,
  listSupplierProductsController,
} from "../controllers/supplierProducts.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { supplierProductsSchema } from "../schemas/supplierProducts.schema";

const supplierProductsRoutes = Router();

supplierProductsRoutes.post(
  "",
  authTokenMiddleware,
  validationAdmMiddleware,
  validationSchemaMiddleware(supplierProductsSchema),
  createSupplierProductController
);
supplierProductsRoutes.get(
  "",
  authTokenMiddleware,
  validationAdmMiddleware,
  listSupplierProductsController
);
supplierProductsRoutes.delete(
  "/:id",
  authTokenMiddleware,
  validationAdmMiddleware,
  deleteSupplierProductController
);

export default supplierProductsRoutes;

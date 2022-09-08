import { Router } from "express";
import {
  createSupplierController,
  deleteSupplierController,
  listSpecificSupplierController,
  listSuppliersController,
  updatedSupplierController,
} from "../controllers/suppliers.controllers";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import {
  supplierSchema,
  supplierUpdateSchema,
} from "../schemas/suppliers.schema";

const supplierRoutes = Router();

supplierRoutes.post(
  "",
  validationSchemaMiddleware(supplierSchema),
  createSupplierController
);
supplierRoutes.get("", listSuppliersController);
supplierRoutes.get("/:id", listSpecificSupplierController);
supplierRoutes.patch("/:id", updatedSupplierController);
supplierRoutes.delete(
  "/:id",
  validationSchemaMiddleware(supplierUpdateSchema),
  deleteSupplierController
);

export default supplierRoutes;

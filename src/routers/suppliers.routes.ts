import { Router } from "express";
import {
	createSupplierController,
	deleteSupplierController,
	listSpecificSupplierController,
	listSuppliersController,
	updatedSupplierController,
} from "../controllers/suppliers.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import {
	 supplierSchema,
	 
	  supplierUpdateSchema,
	} from "../schemas/suppliers.schema";


const supplierRoutes = Router();

supplierRoutes.post(
	"",
	authTokenMiddleware,
	validationAdmMiddleware,
	validationSchemaMiddleware(supplierSchema),
	createSupplierController
);
supplierRoutes.get(
	"",
	authTokenMiddleware,
	validationAdmMiddleware,
	listSuppliersController
);
supplierRoutes.get(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	listSpecificSupplierController
);
supplierRoutes.patch(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	validationSchemaMiddleware(supplierUpdateSchema),
	updatedSupplierController
);
supplierRoutes.delete(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	deleteSupplierController
);

export default supplierRoutes;

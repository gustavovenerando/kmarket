import { Router } from "express";
import {
	createProductsController,
	deleteProductsController,
	listOneProductController,
	listProductsController,
	updateProductsController,
} from "../controllers/products.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import {
	productsSchema,
	productsUpdateSchema,
} from "../schemas/products.schema";

const productsRouter = Router();

productsRouter.post(
	"",
	authTokenMiddleware,
	validationAdmMiddleware,
	validationSchemaMiddleware(productsSchema),
	createProductsController
);
productsRouter.get("", authTokenMiddleware, listProductsController);
productsRouter.get("/:id", authTokenMiddleware, listOneProductController);
productsRouter.patch(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	updateProductsController
);
productsRouter.delete(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	validationSchemaMiddleware(productsUpdateSchema),
	deleteProductsController
);

export default productsRouter;

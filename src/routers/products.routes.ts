import { Router } from "express";
import {
	createProductsController,
	deleteProductsController,
	listOneProductController,
	listProductsController,
	updateProductsController,
} from "../controllers/products.controllers";

const productsRouter = Router();

productsRouter.post("", createProductsController);
productsRouter.get("", listProductsController);
productsRouter.get("/:id", listOneProductController);
productsRouter.patch("/:id", updateProductsController);
productsRouter.delete("/:id", deleteProductsController);

export default productsRouter;

import { Router } from "express";
import {
  createOrderProductController,
  deleteOrderProductController,
  listOrdersProductController,
} from "../controllers/orderProducts.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { orderProductsSchema } from "../schemas/orderProducts.schema";

const orderProductsRoutes = Router();

orderProductsRoutes.post(
  "",
  authTokenMiddleware,
  validationAdmMiddleware,
  validationSchemaMiddleware(orderProductsSchema),
  createOrderProductController
);
orderProductsRoutes.get(
  "",
  authTokenMiddleware,
  validationAdmMiddleware,
  listOrdersProductController
);
orderProductsRoutes.delete(
  "/:id",
  authTokenMiddleware,
  validationAdmMiddleware,
  deleteOrderProductController
);

export default orderProductsRoutes;

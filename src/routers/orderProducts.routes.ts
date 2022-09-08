import { Router } from "express";
import {
  createOrderProductController,
  deleteOrderProductController,
  listOrdersProductController,
} from "../controllers/orderProducts.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";

const orderProductsRoutes = Router();

orderProductsRoutes.post(
  "",
  authTokenMiddleware,
  validationAdmMiddleware,
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

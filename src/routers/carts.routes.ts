import { Router } from "express";
import {
  createCartController,
  deleteCartController,
  listCartByIdController,
  listCartsController,
  soldCartController,
} from "../controllers/carts.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { cartSchema } from "../schemas/cart.schema";

const cartRoutes = Router();

cartRoutes.post(
  "",
  validationSchemaMiddleware(cartSchema),
  createCartController
);
cartRoutes.patch("/:id", soldCartController);
cartRoutes.get("/:id", listCartByIdController);
cartRoutes.delete("/:id", validationAdmMiddleware, deleteCartController);
cartRoutes.get("", listCartsController);

export default cartRoutes;

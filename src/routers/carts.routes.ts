import { Router } from "express";
import { createCartController } from "../controllers/carts.controllers";

const cartRoutes = Router();

cartRoutes.post("", createCartController);

export default cartRoutes;

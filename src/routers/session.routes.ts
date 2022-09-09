import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";

const sessionRouter = Router();

sessionRouter.post("", createSessionController);

export default sessionRouter;

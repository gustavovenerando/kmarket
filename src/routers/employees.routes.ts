import { Router } from "express";

//controllers here
import { createEmployeesController } from "../controllers/employees.controllers";

//midleweres here

const employeeRouter = Router();

employeeRouter.post("", createEmployeesController);

export default employeeRouter;

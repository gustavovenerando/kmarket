import { Router } from "express";
import { createEmployeesController } from "../controllers/employees.controllers";
import { listEmployeesController } from "../controllers/employees.controllers";
import { listOneEmployeesController } from "../controllers/employees.controllers";
import { updateEmployeesController } from "../controllers/employees.controllers";
import { deleteEmployeesController } from '../controllers/employees.controllers'

const employeeRouter = Router();

employeeRouter.post("", createEmployeesController);
employeeRouter.get("", listEmployeesController);
employeeRouter.get("/:id", listOneEmployeesController);
employeeRouter.patch("/:id", updateEmployeesController);
employeeRouter.delete("/:id", deleteEmployeesController);

export default employeeRouter;

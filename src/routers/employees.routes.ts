import { Router } from "express";
import { createEmployeesController } from "../controllers/employees.controllers";
import { listEmployeesController } from "../controllers/employees.controllers";
import { listOneEmployeesController } from "../controllers/employees.controllers";
import { updateEmployeesController } from "../controllers/employees.controllers";
import { deleteEmployeesController } from "../controllers/employees.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";

const employeeRouter = Router();

employeeRouter.post("", createEmployeesController);
employeeRouter.get(
	"",
	authTokenMiddleware,
	validationAdmMiddleware,
	listEmployeesController
);
employeeRouter.get(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	listOneEmployeesController
);
employeeRouter.patch(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	updateEmployeesController
);
employeeRouter.delete(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	deleteEmployeesController
);

export default employeeRouter;

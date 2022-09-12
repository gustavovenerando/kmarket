import { Router } from "express";
import { createEmployeesController } from "../controllers/employees.controllers";
import { listEmployeesController } from "../controllers/employees.controllers";
import { listOneEmployeesController } from "../controllers/employees.controllers";
import { updateEmployeesController } from "../controllers/employees.controllers";
import { deleteEmployeesController } from "../controllers/employees.controllers";
import authTokenMiddleware from "../middlewares/authToken.middleware";
import validationAdmMiddleware from "../middlewares/validationAdm.middleware";
import validationSchemaMiddleware from "../middlewares/validationSchema.middleware";
import { employeeSchema, employeeUpdateSchema } from "../schemas/employees";

const employeeRouter = Router();

employeeRouter.post("", createEmployeesController);
employeeRouter.get(
	"",
	authTokenMiddleware,
	validationAdmMiddleware,
	validationSchemaMiddleware(employeeSchema),
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
	validationSchemaMiddleware(employeeUpdateSchema),
	updateEmployeesController
);
employeeRouter.delete(
	"/:id",
	authTokenMiddleware,
	validationAdmMiddleware,
	deleteEmployeesController
);

export default employeeRouter;

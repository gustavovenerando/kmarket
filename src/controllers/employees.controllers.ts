import { Request, Response } from "express";
import { createEmployeesService } from "../services/employees/createEmployees.services";
import { IEmployeeRequest } from "../interfaces/employee";
import { instanceToPlain } from "class-transformer";

export const createEmployeesController = async (
	req: Request,
	res: Response
) => {
	const { name, email, password, isAdm, isActive }: IEmployeeRequest =
		req.body;

	const employee = await createEmployeesService({
		name,
		email,
		password,
		isAdm,
		isActive,
	});

	return res.status(201).json(instanceToPlain(employee));
};

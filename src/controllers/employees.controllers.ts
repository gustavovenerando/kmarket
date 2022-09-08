import { Request, Response } from "express";
import { createEmployeesService } from "../services/employees/createEmployees.service";
import { listEmployeesService } from '../services/employees/listEmployees.service'
import { listOneEmployeesService } from "../services/employees/listOneEmployees.service";
import { updateEmployeesService } from "../services/employees/updateEmployees.service";
import { deleteEmployeesService } from '../services/employees/deleteEmployees.service'

import { IEmployeeRequest } from "../interfaces/employee";
import { instanceToPlain } from "class-transformer";

export const createEmployeesController = async (req: Request,res: Response) => {
	const { name, email, password, isAdm}: IEmployeeRequest = req.body;

	const employee = await createEmployeesService({name,email,password,isAdm});
	return res.status(201).json(instanceToPlain(employee));
};

export const listEmployeesController = async (req: Request,res: Response) => {
	const employee = await listEmployeesService();
	return res.status(200).json(instanceToPlain(employee));
};

export const listOneEmployeesController = async (req: Request,res: Response) => {
	const id = req.params.id
	const employee = await listOneEmployeesService(id);
	return res.status(200).json(instanceToPlain(employee));
};


export const updateEmployeesController = async (req: Request,res: Response) => {
	const id = req.params.id
	const { name, email, password, isAdm }: IEmployeeRequest = req.body

	const employee = await updateEmployeesService(id,{name, email, password, isAdm});
	return res.status(200).json(instanceToPlain(employee));
};

export const deleteEmployeesController = async (req: Request,res: Response) => {
	const id = req.params.id

	const employee = await deleteEmployeesService(id);
	return res.status(204).json(instanceToPlain(employee));
};





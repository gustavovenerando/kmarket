import * as yup from "yup";
import { SchemaOf } from "yup";
import { IEmployeeRequest, IUpdateEmployeeSchema } from "../interfaces/employee";

export const employeeSchema: SchemaOf<IEmployeeRequest> = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().required(),
	password: yup.string().required(),
	isAdm: yup.boolean().required(),
	isActive: yup.boolean().required()

});

export const employeeUpdateSchema: SchemaOf<IUpdateEmployeeSchema> = yup.object().shape({
	name: yup.string(),
	email: yup.string(),
	password: yup.string(),
	isAdm: yup.boolean(),
	isActive: yup.boolean()
});

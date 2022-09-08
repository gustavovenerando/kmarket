import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";

export const listEmployeesService = async ()=> {
	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

	return employees
};

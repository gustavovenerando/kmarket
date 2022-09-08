import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";

export const listOneEmployeesService = async (id:string) => {
	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

    const isEmployee = employees.find(employee => employee.id === id)
    
	return isEmployee
};

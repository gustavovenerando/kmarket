import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";
import AppError from "../../errors/AppError";

export const deleteEmployeesService = async (id:string) => {
	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

    const isEmployee = employees.find(employee => employee.id === id)

    if(!isEmployee){
        throw new AppError(404,'Employee not found')
    }

    if(!isEmployee.isActive){
        throw new AppError(404,'Employee is not active')
    }
    
    await employeesRepository.update(isEmployee!.id, {isActive: false})
	return true
};

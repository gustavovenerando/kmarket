import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";
import { IEmployeeRequest } from "../../interfaces/employee";
import bcrypt from 'bcryptjs'
import AppError from "../../errors/AppError";

export const updateEmployeesService = async (id:string,{name, email, password, isAdm}:IEmployeeRequest) => {
	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

    const isEmployee = employees.find(employee => employee.id === id)

    if(!isEmployee){
        throw new AppError(404,'Employee not found')
    }
    
    if (bcrypt.compareSync(password, isEmployee!.password)) {
        throw new AppError(400,"Inform a different password.")
    }

    const newPassword = bcrypt.hashSync(password,10)
    
    const employee = new Employee()
    employee.name = name
    employee.email = email
    employee.password = newPassword
    employee.isAdm = isAdm

    await employeesRepository.update(isEmployee!.id, employee)
	return employees
};

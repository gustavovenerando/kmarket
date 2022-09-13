import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";
import { IEmployeeRequest } from "../../interfaces/employee";
import bcrypt from 'bcryptjs'
import AppError from "../../errors/AppError";

export const updateEmployeesService = async (id:string,{name, email, password, isAdm, isActive}:IEmployeeRequest) => {
	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

    let isEmployee = employees.find(employee => employee.id === id)

    if(!isEmployee){
        throw new AppError(404,'Employee not found')
    }
    
    let newPassword = ''
    if(password){
        if(bcrypt.compareSync(password, isEmployee!.password)) {
            throw new AppError(400,"Inform a different password.")
        }
        newPassword = bcrypt.hashSync(password,10)
    }

    const employee = new Employee()
    employee.name = name? name : isEmployee.name
    employee.email = email? email : isEmployee.email
    employee.password = password? newPassword : isEmployee.password
    employee.isAdm = isAdm? isAdm : isEmployee.isAdm
    employee.isActive = isAdm? isAdm : isEmployee.isActive

    await employeesRepository.update(isEmployee!.id, employee)
    const employeeUpdate = await employeesRepository.findOneBy({id})

	return employeeUpdate
};

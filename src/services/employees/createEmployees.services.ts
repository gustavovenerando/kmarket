import AppDataSource from '../../data-source'
import Employee from '../../entities/employee.entity'
import { IEmployeeRequest } from '../../interfaces/employee/index'
import { hash } from 'bcryptjs'

import AppError from '../../errors/AppError'

export const createEmployeesService = async ({name,email,password,isAdm,isActive}:IEmployeeRequest):Promise<Employee> =>{
    
    const employeesRepository = AppDataSource.getRepository(Employee)
    const employees = await employeesRepository.find()

    const emailAlreadyExists = employees.find(employee => employee.email === email)
    if(emailAlreadyExists){
        throw new AppError(400, 'Email already exists')
    }

    if(name !== undefined || email !== undefined || password !== undefined || isAdm !== undefined || isActive !== undefined){
        throw new AppError(400, 'Required field')
    }

    const employee = new Employee()
    employee.name = name
    employee.email = email
    let hashPassword = await hash(password, 10)
    employee.password = hashPassword
    employee.isAdm = isAdm
    employee.isActive = isActive

    employeesRepository.create(employee)
    await employeesRepository.save(employee)
    
    return employee
}
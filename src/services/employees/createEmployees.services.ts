import AppDataSource from "../../data-source";
import Employee from "../../entities/employee.entity";
import { IEmployeeRequest } from "../../interfaces/employee/index";
import { hash } from "bcryptjs";

import AppError from "../../errors/AppError";

<<<<<<< HEAD
export const createEmployeesService = async ({
  name,
  email,
  password,
  isAdm,
  isActive,
}: IEmployeeRequest): Promise<Employee> => {
  const employeesRepository = AppDataSource.getRepository(Employee);
  const employees = await employeesRepository.find();

  const emailAlreadyExists = employees.find(
    (employee) => employee.email === email
  );
=======
export const createEmployeesService = async ({name,email,password,isAdm,isActive}: IEmployeeRequest): Promise<Employee> => {

	const employeesRepository = AppDataSource.getRepository(Employee);
	const employees = await employeesRepository.find();

	const emailAlreadyExists = employees.find((employee) => employee.email === email);
>>>>>>> 7236ffb85a288193bccc232a918b5d22d31dc197

  if (emailAlreadyExists) {
    throw new AppError(400, "Email already exists");
  }

<<<<<<< HEAD
  if (
    name !== undefined ||
    email !== undefined ||
    password !== undefined ||
    isAdm !== undefined ||
    isActive !== undefined
  ) {
    throw new AppError(400, "Required field");
  }
=======
	if (name === undefined || email === undefined || password === undefined || isAdm === undefined) {
		throw new AppError(400, "Required field");
	}
>>>>>>> 7236ffb85a288193bccc232a918b5d22d31dc197

  const hashPassword = await hash(password, 10);

<<<<<<< HEAD
  const employee = employeesRepository.create({
    name,
    email,
    password: hashPassword,
    isAdm,
    isActive,
  });

  // const employee = new Employee()
  // employee.name = name
  // employee.email = email
  // employee.password = hashPassword
  // employee.isAdm = isAdm
  // employee.isActive = isActive

  // employeesRepository.create(employee)
  await employeesRepository.save(employee);
=======
	const employee = employeesRepository.create({
		name,
		email,
		password: hashPassword,
		isAdm,
		isActive
	});

	await employeesRepository.save(employee);
>>>>>>> 7236ffb85a288193bccc232a918b5d22d31dc197

  return employee;
};

import { compare } from "bcryptjs";
import AppError from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { IEmployeeLogin } from "../../interfaces/employee";
import Employee from "../../entities/employee.entity";
import AppDataSource from "../../data-source";

export const createSessionService = async ({
  email,
  password,
}: IEmployeeLogin): Promise<string> => {
  const employeeRepository = AppDataSource.getRepository(Employee);

  const employee = await employeeRepository.findOne({
    where: {
      email,
    },
  });

  if (!employee) {
    throw new AppError(403, "Invalid email or password");
  }

  if (!employee.isActive) {
    throw new AppError(400, "Invalid employee");
  }

  const matchPassword = await compare(password, employee.password);

  if (!matchPassword) {
    throw new AppError(403, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      isAdm: employee.isAdm,
      isActive: employee.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      subject: employee.id,
      expiresIn: "2h",
    }
  );

  return token;
};

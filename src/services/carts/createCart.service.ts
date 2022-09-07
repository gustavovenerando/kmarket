import AppDataSource from "../../data-source";
import Cart from "../../entities/cart.entity";
import Employee from "../../entities/employee.entity";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";
import AppError from "../../errors/AppError";
import { ICartRequest } from "../../interfaces/employee";

const createCartService = async ({
  employeeId,
  loyaltyCustomerId,
}: ICartRequest) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const employeeRepository = AppDataSource.getRepository(Employee);
  const loyaltyCustomerRepository =
    AppDataSource.getRepository(LoyaltyCustomer);

  const employee = await employeeRepository.findOneBy({ id: employeeId });
  const loyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
    id: loyaltyCustomerId,
  });

  if (!loyaltyCustomer && loyaltyCustomerId) {
    throw new AppError(400, "Loyalty Customer not Found.");
  }

  if (!employee) {
    throw new AppError(400, "Incorrect parameters.");
  }

  const cart = new Cart();
  cart.employee = employee;
  if (loyaltyCustomer) {
    cart.loyaltyCustomer = loyaltyCustomer;
  }

  const cartCreated = await cartRepository.save(cart);

  return cartCreated;
};

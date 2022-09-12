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

  let loyaltyCustomer;

  if (loyaltyCustomerId) {
    loyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
      id: loyaltyCustomerId,
    });
  }

  if (!loyaltyCustomer && loyaltyCustomerId) {
    throw new AppError(404, "Loyalty Customer not Found.");
  }

  if (!loyaltyCustomer?.isActive && loyaltyCustomerId) {
    throw new AppError(409, "Loyalty Customer is not active.");
  }

  if (!employee) {
    throw new AppError(404, "Employee not found.");
  }

  const cart = new Cart();
  cart.employee = employee;
  cart.totalPrice = 0;

  if (loyaltyCustomer) {
    cart.loyaltyCustomer = loyaltyCustomer;
  }

  const cartCreated = cartRepository.create(cart);
  await cartRepository.save(cartCreated);

  return cartCreated;
};

export default createCartService;

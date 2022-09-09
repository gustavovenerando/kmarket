import AppDataSource from "../../data-source";
import { ILoyaltyCustomerRequest } from "../../interfaces/loyaltyCustomer";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";
import AppError from "../../errors/AppError";

const createLoyaltyCustomerService = async ({
  email,
  name,
}: ILoyaltyCustomerRequest): Promise<LoyaltyCustomer> => {

  const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer);
  const loyaltyCustomers = await loyaltyCustomerRepository.find();

  loyaltyCustomers.map((elem) => {
    if (elem.email === email) {
      throw new AppError(409, "Email already registered.");
    }
  });

  const loyaltyCustomer = loyaltyCustomerRepository.create({
    name,
    email,
  });

  await loyaltyCustomerRepository.save(loyaltyCustomer);

  return loyaltyCustomer;
};

export default createLoyaltyCustomerService;

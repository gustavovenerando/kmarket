import AppDataSource from "../../data-source";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";

const listLoyaltyCustomersService = async (): Promise<LoyaltyCustomer[]> => {

  const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer);

  const loyaltyCustomers = await loyaltyCustomerRepository.find();

  return loyaltyCustomers;
};

export default listLoyaltyCustomersService;

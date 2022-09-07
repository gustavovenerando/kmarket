import AppDataSource from "../../data-source";
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity";
import AppError from "../../errors/AppError";

const listLoyaltyCustomerService = async (
  id: string,
): Promise<LoyaltyCustomer> => {

  const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer);

  const loyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
    id: id,
  });

  if (!loyaltyCustomer) {
    throw new AppError(404, "Customer not found.");
  }

  return loyaltyCustomer;
};

export default listLoyaltyCustomerService;

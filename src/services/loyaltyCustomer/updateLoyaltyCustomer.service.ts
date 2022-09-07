
import AppDataSource from '../../data-source'
import { ILoyaltyCustomerUpdateRequest } from '../../interfaces/loyaltyCustomer'
import LoyaltyCustomer from '../../entities/loyaltyCustomer.entity'
import AppError from '../../errors/AppError'

const updateLoyaltyCustomerService = async(id: string, {email, name, fidelityPoints}: ILoyaltyCustomerUpdateRequest): Promise<LoyaltyCustomer> => {

    const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer)

    const loyaltyCustomers = await loyaltyCustomerRepository.find();

    loyaltyCustomers.map((elem) => {
      if (elem.email === email && elem.id !== id) {
        throw new AppError(409, "Email already registered.");
      }
    });

    const findLoyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
        id
    })

    if(!findLoyaltyCustomer){
        throw new AppError(404, 'Customer not found.')
    }

    await loyaltyCustomerRepository.update(
        id,
        {
            email: email ? email : findLoyaltyCustomer.email,
            name: name ? name : findLoyaltyCustomer.name,
            fidelityPoints: fidelityPoints ? fidelityPoints : findLoyaltyCustomer.fidelityPoints
        }
    )

    const loyaltyCustomer = await loyaltyCustomerRepository.findOneBy({
        id
    })

    if(!loyaltyCustomer){
      throw new AppError(404, 'Customer not found.')
    }

    return loyaltyCustomer
}

export default updateLoyaltyCustomerService
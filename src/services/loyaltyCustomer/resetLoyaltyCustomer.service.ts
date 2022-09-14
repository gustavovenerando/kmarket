import AppDataSource from "../../data-source"
import LoyaltyCustomer from "../../entities/loyaltyCustomer.entity"

const resetLoyaltyCustomersService = async () => {
    const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer)

    const loyalties = await loyaltyCustomerRepository.find()

    await loyalties.forEach(async (customer) => {
        customer.fidelityPoints = 0
        await loyaltyCustomerRepository.save(customer)
    })
    const loyaltiesUpdated = await loyaltyCustomerRepository.find()

    return loyaltiesUpdated
}

export default resetLoyaltyCustomersService
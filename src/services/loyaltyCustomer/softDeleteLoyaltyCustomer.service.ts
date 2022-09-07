import AppDataSource from '../../data-source'
import LoyaltyCustomer from '../../entities/loyaltyCustomer.entity'
import AppError from '../../errors/AppError'

const softDeleteLoyaltyCustomerService = async (id: string): Promise<LoyaltyCustomer> => {

    const loyaltyCustomerRepository = AppDataSource.getRepository(LoyaltyCustomer)

    const loyaltyCustomer = await loyaltyCustomerRepository.findOne({
        where: {
            id: id
        }
    })

    if(!loyaltyCustomer) {
        throw new AppError(404, 'Customer not found')
    }

    if(!loyaltyCustomer?.isActive) {
        throw new AppError(400, 'Customer already not active')
    }

    await loyaltyCustomerRepository.update(loyaltyCustomer!.id, { isActive: false})

    return loyaltyCustomer

}

export default softDeleteLoyaltyCustomerService
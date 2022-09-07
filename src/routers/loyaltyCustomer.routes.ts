import { Router } from 'express'
import { createLoyaltyCustomerController, listLoyaltyCustomerController, listLoyaltyCustomersController, softDeleteLoyaltyCustomerController, updateLoyaltyCustomersController } from '../controllers/loyaltyCustomer.controllers'
import authTokenMiddleware from '../middlewares/authToken.middleware'
import validationAdmMiddleware from '../middlewares/validationAdm.middleware'

const loyaltyCustomerRoutes = Router()

loyaltyCustomerRoutes.post('', authTokenMiddleware, createLoyaltyCustomerController)
loyaltyCustomerRoutes.get('', authTokenMiddleware, listLoyaltyCustomersController)
loyaltyCustomerRoutes.get('/:id', authTokenMiddleware , validationAdmMiddleware , listLoyaltyCustomersController)
loyaltyCustomerRoutes.patch('/:id', authTokenMiddleware , validationAdmMiddleware ,updateLoyaltyCustomersController)
loyaltyCustomerRoutes.delete('/:id',authTokenMiddleware, validationAdmMiddleware, softDeleteLoyaltyCustomerController)

export default loyaltyCustomerRoutes

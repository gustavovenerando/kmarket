import { Router } from 'express'
import { createProductCartController, deleteProductCartController, listProductsCartByProductController, listProductsCartController } from '../controllers/productsCart.controllers'
import validationAdmMiddleware from '../middlewares/validationAdm.middleware'
import validationSchemaMiddleware from '../middlewares/validationSchema.middleware'
import { productsCartSchema } from '../schemas/productsCart.schema'

const productsCartRoutes = Router()

productsCartRoutes.post('/:cartId', validationSchemaMiddleware(productsCartSchema), createProductCartController)
productsCartRoutes.get('',validationAdmMiddleware, listProductsCartController)
productsCartRoutes.get('/:productId',validationAdmMiddleware, listProductsCartByProductController)
productsCartRoutes.delete('/:id', validationAdmMiddleware, deleteProductCartController)

export default productsCartRoutes

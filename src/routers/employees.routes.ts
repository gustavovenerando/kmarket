import { Router } from 'express'

//controllers here
import { createEmployeesController } from '../controllers/employees.controllers'

//midleweres here

const routes = Router()

const employeeRouter = () =>{
   /*  routes.get('', )
    routes.get('/:id', ) */
    routes.post('',createEmployeesController)
    /* routes.patch('/:id', )
    routes.delete('/:id', ) */

    return routes
}
export default employeeRouter
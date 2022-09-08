import { ILoyaltyCustomerRequest } from '../../interfaces/loyaltyCustomer/index';
import { ICartRequest } from "../../interfaces/employee";
import { IEmployeeRequest } from "../../interfaces/employee";
import { ISupplierProductsRequest } from '../../interfaces/supplierProducts';
import { ISupplierRequest } from '../../interfaces/supplier';

export const mockedSuplier : ISupplierRequest = {
    name:"Wagner",
    cnpj:"37.572.899/0001-27",
    phone:"(89) 2351-2857",
    email:"wagner@empresa.com",
}

export const mockedEmployee :IEmployeeRequest = {
	name: "Carlos",
	email: "carlos@carlos.com",
	password: "123",
	isAdm: false,
}

<<<<<<< HEAD
export const mockedEmployeEmpty :IEmployeeRequest = {
	name: "",
	email: "",
	password: "",
	isAdm: false,
=======
export const mockedSupplierEmailAgain = {
	name:"Wagner",
    cnpj:"37.572.899/0001-20",
    phone:"(89) 2351-2857",
    email:"wagner@empresa.com",
}

export const mockedSupplierCpnjAgain = {
	name:"Wagner",
    cnpj:"37.572.899/0001-27",
    phone:"(89) 2351-2857",
    email:"wagnerzin@empresa.com",
>>>>>>> f2559ffb3e6508cf456029e16b00cd3a9b3c82ad
}

export const mockedAdm :IEmployeeRequest = {
	name: "Roberval",
	email: "roberval@roberval.com",
	password: "123",
	isAdm: true,
}


export const mockedLoginAdm = {
    email: "roberval@roberval.com",
	password: "123",
}

export const mockedLoginEmployee = {
    email: "carlos@carlos.com",
	password: "123",
}

export const mockedCategory = {
    name:"Bebidas"
}

export const mockedProducts = {
    name: "Coquinha",
	marketPrice: 8,
	stock: 0,
	description: "coquinha gelada",
	discount: 0.1,
	categoryId: "",
}

export const mockedSupplierProduct = {
    name: "Coca 350ml",
    costPrice: 4,
    supplierId: "",
    categoryId: ""
}
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
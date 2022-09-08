import { IEmployeeLogin } from "../../interfaces/employee";
import { IEmployeeRequest } from "../../interfaces/employee";
import { ISupplierRequest } from "../../interfaces/supplier";

export const mockedSuplier: ISupplierRequest = {
	name: "Wagner",
	cnpj: "37.572.899/0001-27",
	phone: "(89) 2351-2857",
	email: "wagner@empresa.com",
};

export const mockedEmployee: IEmployeeRequest = {
	name: "Carlos",
	email: "carlos@carlos.com",
	password: "123",
	isAdm: false,
};

<<<<<<< HEAD
export const mockedEmployeEmpty :IEmployeeRequest = {
=======
export const mockedEmployeEmpty: IEmployeeRequest = {
>>>>>>> b9430098882e99a124fcd57aee4a936e76c4d6b7
	name: "",
	email: "",
	password: "",
	isAdm: false,
<<<<<<< HEAD
}
export const mockedSupplierEmailAgain :ISupplierRequest = {
	name:"Wagner",
    cnpj:"37.572.899/0001-20",
    phone:"(89) 2351-2857",
    email:"wagner@empresa.com",
}

export const mockedSupplierCpnjAgain :ISupplierRequest = {
	name:"Wagner",
    cnpj:"37.572.899/0001-27",
    phone:"(89) 2351-2857",
    email:"wagnerzin@empresa.com",
}
=======
};

export const mockedSupplierEmailAgain = {
	name: "Wagner",
	cnpj: "37.572.899/0001-20",
	phone: "(89) 2351-2857",
	email: "wagner@empresa.com",
};

export const mockedSupplierCpnjAgain = {
	name: "Wagner",
	cnpj: "37.572.899/0001-27",
	phone: "(89) 2351-2857",
	email: "wagnerzin@empresa.com",
};
>>>>>>> b9430098882e99a124fcd57aee4a936e76c4d6b7

export const mockedAdm: IEmployeeRequest = {
	name: "Roberval",
	email: "roberval@roberval.com",
	password: "123",
	isAdm: true,
};

export const mockedLoginAdm : IEmployeeLogin = {
    email: "roberval@roberval.com",
	password: "123",
};

export const mockedLoginEmployee : IEmployeeLogin = {
    email: "carlos@carlos.com",
	password: "123",
};

export const mockedCategory = {
	name: "Bebidas",
};

export const mockedProducts = {
	name: "Coquinha",
	marketPrice: 8,
	stock: 0,
	description: "coquinha gelada",
	discount: 0.1,
	categoryId: "",
};

export const mockedSupplierProduct = {
	name: "Coca 350ml",
	costPrice: 4,
	supplierId: "",
	categoryId: "",
};

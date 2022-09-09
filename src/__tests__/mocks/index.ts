import { ILoyaltyCustomerRequest } from "../../interfaces/loyaltyCustomer/index";
import { ICartRequest, IEmployeeResponse } from "../../interfaces/employee";
import { ISupplierProductsRequest } from "../../interfaces/supplierProducts";
import { AfterInsert } from "typeorm";
import { IEmployeeLogin } from "../../interfaces/employee";
import { IEmployeeRequest } from "../../interfaces/employee";
import {
	ISupplierRequest,
	ISupplierUpdateRequest,
} from "../../interfaces/supplier";
import { ICreateProducts, IUpdateProductsSchema } from "../../interfaces/products";

export const mockedSuplier: ISupplierRequest = {
	name: "Wagner",
	cnpj: "37.572.899/0001-27",
	phone: "(89) 2351-2857",
	email: "wagner@empresa.com",
};

export const mockedSupliertestSupplierId: ISupplierRequest = {
	name: "Walmir",
	cnpj: "37.572.899/0002-22",
	phone: "(89) 2351-2555",
	email: "walmir@empresa.com",
};

export const mockedEmployee: IEmployeeRequest = {
	name: "Carlos",
	email: "carlos@carlos.com",
	password: "123",
	isAdm: false,
};

export const mockedEmployeEmpty: IEmployeeRequest = {
	name: "",
	email: "",
	password: "",
	isAdm: false,
};

export const mockedSupplierEmailAgain: ISupplierRequest = {
	name: "Wagner",
	cnpj: "37.572.899/0001-20",
	phone: "(89) 2351-2857",
	email: "wagner@empresa.com",
};

export const mockedSupplierCpnjAgain: ISupplierRequest = {
	name: "Wagner",
	cnpj: "37.572.899/0001-27",
	phone: "(89) 2351-2857",
	email: "wagnerzin@empresa.com",
};

export const mockedAdm: IEmployeeRequest = {
	name: "Roberval",
	email: "roberval@roberval.com",
	password: "123",
	isAdm: true,
};

export const mockedAdmAgain: IEmployeeRequest = {
	name: "José",
	email: "jose@mail.com",
	password: "123",
	isAdm: true,
};

export const mockedIsActiveFalse: IEmployeeRequest = {
	name: "José",
	email: "jose@mail.com",
	password: "123",
	isAdm: true,
};

export const mockedUpdateEmployee: IEmployeeRequest = {
	name: "lima",
	email: "lima@mail.com",
	password: "123",
	isAdm: true,
};

export const mockedIsActiveTrue: IEmployeeRequest = {
	name: "josias",
	email: "josias@mail.com",
	password: "123",
	isAdm: true,
	isActive: true,
};

export const mockedLoginAdm: IEmployeeLogin = {
	email: "roberval@roberval.com",
	password: "123",
};

export const mockedLoginAdmAgain = {
	email: "jose@mail.com",
	password: "123",
};

export const mockedLoginEmployee: IEmployeeLogin = {
	email: "carlos@carlos.com",
	password: "123",
};

export const mockedEmployeePatch: IEmployeeResponse = {
	name: "Daniel",
	email: "daniel@mail.com",
};

export const mockedCategory = {
	name: "Bebidas",
};

export const mockedCategoryTestCategoryId = {
	name: "Mercearia",
};

export let mockedProducts: ICreateProducts = {
	name: "Coquinha",
	marketPrice: 8,
	stock: 0,
	description: "coquinha gelada",
	discount: 0.1,
	categoryId: "",
};

export let mockedProductsInvalidDiscount1: ICreateProducts = {
	name: "Coquinha",
	marketPrice: 8,
	stock: 0,
	description: "coquinha gelada",
	discount: -2,
	categoryId: "",
};

export let mockedProductsInvalidDiscount2: ICreateProducts = {
	name: "Coquinha",
	marketPrice: 8,
	stock: 0,
	description: "coquinha gelada",
	discount: 3,
	categoryId: "",
};

export let mockedProductUpdateAll: IUpdateProductsSchema = {
	name: "Coca-cola",
	marketPrice: 12,
	stock: 50,
	description: "coca-cola gelada",
	discount: 0.2,
};

export let mockedProductUpdateName: IUpdateProductsSchema = { name: "Coquinha" };

export let mockedProductMarketPrice: IUpdateProductsSchema = { marketPrice: 12 };

export let mockedProductStock: IUpdateProductsSchema = { stock: 0 };

export let mockedProductDescription: IUpdateProductsSchema = { description: "coquinha gelada" };

export let mockedProductDiscount: IUpdateProductsSchema = { discount: 0.1 };


export const mockedSupplierProduct = {
	name: "Coca 350ml",
	costPrice: 4,
	supplierId: "",
	categoryId: "",
};

export const mockedSupplierUpdateAll: ISupplierUpdateRequest = {
	name: "Wagnerzão",
	cnpj: "000.000.000/0000-00",
	phone: "(00) 0000-0000",
	email: "empresa@wagner.com",
};
export const mockedSupplierUpdateName: ISupplierUpdateRequest = {
	name: "Wagner",
};

export const mockedSupplierUpdateCnpj: ISupplierUpdateRequest = {
	cnpj: "37.572.899/0001-27",
};

export const mockedSupplierUpdatePhone: ISupplierUpdateRequest = {
	phone: "(89) 2351-2857",
};

export const mockedSupplierUpdateEmail: ISupplierUpdateRequest = {
	email: "wagner@empresa.com",
};

export const mockedNotFormatedId: string = "FormatoInválido";

export const mockedIdNotExist: string = "00000000-0000-0000-0000-000000000000";

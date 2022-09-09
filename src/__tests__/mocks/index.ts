import { IEmployeeLogin } from "../../interfaces/employee";
import { IEmployeeRequest } from "../../interfaces/employee";
import { ISupplierRequest, ISupplierUpdateRequest } from "../../interfaces/supplier";

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

export const mockedEmployeEmpty :IEmployeeRequest = {
	name: "",
	email: "",
	password: "",
	isAdm: false,
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

export const mockedCategoryTestCategoryId = {
	name: "Mercearia",
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

export const mockedSupplierUpdateAll: ISupplierUpdateRequest = {
	name: "Wagnerzão",
	cnpj: "000.000.000/0000-00",
	phone: "(00) 0000-0000",
	email: "empresa@wagner.com",
}
export const mockedSupplierUpdateName: ISupplierUpdateRequest = {name: "Wagner"}

export const mockedSupplierUpdateCnpj: ISupplierUpdateRequest = {cnpj: "37.572.899/0001-27"}

export const mockedSupplierUpdatePhone: ISupplierUpdateRequest = {phone: "(89) 2351-2857"}

export const mockedSupplierUpdateEmail: ISupplierUpdateRequest = {email: "wagner@empresa.com"}


export const mockedNotFormatedId: string = "FormatoInválido"

export const mockedIdNotExist: string = "00000000-0000-0000-0000-000000000000"

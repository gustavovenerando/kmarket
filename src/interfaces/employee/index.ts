export interface IEmployeeLogin {
	email: string;
	password: string;
}

export interface IEmployeeRequest {
	name: string;
	email: string;
	password: string;
	isAdm: boolean;
	isActive?: boolean;
}

export interface IUpdateEmployee{
	name?: string;
	email?: string;
	password?: string;
	isAdm?: boolean;
	isActive?: boolean;
}

export interface IUpdateEmployeeSchema{
	name?: string;
	email?: string;
	password?: string;
	isAdm?: boolean;
	isActive?: boolean;
}

export interface ICartRequest {
	employeeId: string;
	loyaltyCustomerId?: string;
}

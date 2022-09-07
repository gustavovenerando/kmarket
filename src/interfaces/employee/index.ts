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
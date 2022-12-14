export interface ICreateProducts {
	name: string;
	marketPrice: number;
	stock: number;
	description: string;
	discount: number;
	categoryId: string;
}

export interface IUpdateProducts {
	id?: string;
	name?: string;
	marketPrice?: number;
	stock?: number;
	description?: string;
	discount?: number;
	categoryId?: string;
}

export interface IUpdateProductsSchema {
	name?: string;
	marketPrice?: number;
	stock?: number;
	description?: string;
	discount?: number;
	categoryId?: string;
}

export interface IProductsResponse {
	name: string;
	marketPrice: number;
	stock: number;
	description: string;
	discount: number;
	categoryId: string;
	id: string;
	createdAt: string;
	updatedAt: string;
}
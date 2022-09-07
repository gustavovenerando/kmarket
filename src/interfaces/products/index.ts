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

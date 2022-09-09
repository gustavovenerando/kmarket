export interface ISupplierRequest {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
}

export interface ISupplierUpdateRequest {
  name?: string;
  cnpj?: string;
  phone?: string;
  email?: string;
}

export interface ISupplierResponse {
  id:string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  createdAt:string;
  updatedAt:string;
}

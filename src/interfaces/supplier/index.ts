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

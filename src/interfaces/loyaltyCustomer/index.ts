export interface ILoyaltyCustomerRequest {
  name: string;
  email: string;
}

export interface ILoyaltyCustomerUpdateRequest {
  name?: string;
  email?: string;
  fidelityPoints?: number;
}

export interface IUpdateLoyaltyCustomerName {
  name: string;
  email: string;
}

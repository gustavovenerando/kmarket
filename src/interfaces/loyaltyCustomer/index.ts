export interface ILoyaltyCustomerRequest {
  name: string;
	email: string;
}

export interface ILoyaltyCustomerUpdateRequest {
  name: string;
	email: string;
  fidelityPoints: number;
}


export interface IOrderProductsRequest {
  quantity: number;
  costPrice: number;
  deliverySchedule: Date;
  isDelivered?: boolean;
  supplierProductId: string;
  productId: string;
}

export interface IOrderProductsResponse {
  id: string;
  quantity: number;
  costPrice: number;
  deliverySchedule: Date;
  isDelivered?: boolean;
  supplierProductId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date
}

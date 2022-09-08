export interface IOrderProductsRequest {
  quantity: number;
  costPrice: number;
  deliverySchedule: Date;
  isDelivered?: boolean;
  supplierProductId: string;
  productId: string;
}

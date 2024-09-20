export type OrderSummary = {
  readonly id: string;
  readonly userId: string;
  readonly orderTotal: number;
  readonly nameOnCard: string;
  readonly amount: null;
  readonly cardInfo: string;
  readonly expiryDate: string;
  readonly cvv: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly last4Digits: string;
  readonly status: OrderStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly productId: string;
  readonly Delivery: Delivery[];
  readonly product: Product;
};

export type Delivery = {
  readonly id: string;
  readonly orderId: string;
  readonly status: DeliveryStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type Product = {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly stock: number;
  readonly description: string;
  readonly price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type OrderStatus = "COMPLETED" | "DECLINED" | "PENDING";
export type DeliveryStatus = "DELIVERED" | "PENDING";

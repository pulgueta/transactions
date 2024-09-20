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
  id: string;
  orderId: string;
  status: "PENDING" | "DELIVERED" | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  stock: number;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus = "COMPLETED" | "DECLINED" | "PENDING";
export type DeliveryStatus = "DELIVERED" | "PENDING";

export type OrderSummary = {
  id: string;
  userId: string | null;
  orderTotal: number | null;
  nameOnCard: string | null;
  amount: number | null;
  cardInfo: string | null;
  expiryDate: string | null;
  cvv: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  last4Digits: string | null;
  status: OrderStatus | null;
  createdAt: Date;
  updatedAt: Date;
  productId: string | null;
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

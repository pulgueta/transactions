import { Delivery, Order, User, Product, DeliveryStatus } from '@prisma/client';

export type FrontendOrder = Order;
export type FrontendUser = User;
export type FrontendDelivery = Delivery;
export type FrontendProduct = Product;
export type FrontendDeliveryStatus = DeliveryStatus;

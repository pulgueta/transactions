import type { TypeOf } from "zod";

import {
  createDelivery,
  createOrder,
  createProduct,
  createUser,
  selectDelivery,
  selectOrder,
  selectProduct,
  selectUser,
} from "@/zod";

export type CreateUser = TypeOf<typeof createUser>;
export type SelectUser = TypeOf<typeof selectUser>;

export type CreateProduct = TypeOf<typeof createProduct>;
export type SelectProduct = TypeOf<typeof selectProduct>;

export type CreateOrder = TypeOf<typeof createOrder>;
export type SelectOrder = TypeOf<typeof selectOrder>;

export type CreateDelivery = TypeOf<typeof createDelivery>;
export type SelectDelivery = TypeOf<typeof selectDelivery>;

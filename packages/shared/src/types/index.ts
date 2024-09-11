import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { TypeOf } from "zod";
import { number, preprocess, string } from "zod";

import { usersTable } from "@/schemas/user";
import { productsTable } from "@/schemas/product";
import { ordersTable } from "@/schemas/order";
import { deliveriesTable } from "@/schemas/delivery";

const selectUser = createSelectSchema(usersTable);
const createUser = createInsertSchema(usersTable, {
  name: string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: string({ required_error: "Email is required" })
    .email({ message: "Invalid email" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email must be at most 100 characters long" }),
  phoneNum: string({ required_error: "Phone number is required" })
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(10, { message: "Phone number must be at most 10 characters long" }),
  cardInfo: string({ required_error: "Card info is required" })
    .min(4, { message: "Card info must be at least 4 characters long" })
    .max(16, { message: "Card info must be at most 16 characters long" })
    .regex(
      /^(4\d{12}(\d{3})?|5[1-5]\d{14}|3[47]\d{13}|2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)\d{12})$/,
      "You must provide a full valid card number"
    ),
  address: string({ required_error: "Address is required" })
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address must be at most 100 characters long" }),
  state: string({ required_error: "State is required" })
    .min(2, { message: "State must be at least 2 characters long" })
    .max(50, { message: "State must be at most 50 characters long" }),
  city: string({ required_error: "City is required" })
    .min(2, {
      message: "City must be at least 2 characters long",
    })
    .max(50, {
      message: "City must be at most 50 characters long",
    }),
  zip: string({ required_error: "Zip code is required" })
    .min(5, {
      message: "Zip code must be at least 5 characters long",
    })
    .max(10, {
      message: "Zip code must be at most 10 characters long",
    }),
});

const selectProduct = createSelectSchema(productsTable);
const createProduct = createInsertSchema(productsTable, {
  description: string({ required_error: "Description is required" })
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(100, { message: "Description must be at most 100 characters long" }),
  price: preprocess(
    (i) => {
      const processed = string().regex(/^\d+$/).transform(Number).safeParse(i);

      return processed.success ? processed.data : i;
    },
    number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
      .positive({ message: "Price must be a positive number" })
      .int({ message: "Price must be an integer" })
      .finite({ message: "Price must be a finite number" })
      .gte(5000, {
        message: "Price must be at least $5000 COP",
      })
      .lte(10000000, {
        message: "Price must be at most $10,000,000 COP",
      })
      .safe()
  ),
  name: string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
});

const selectOrder = createSelectSchema(ordersTable);
const createOrder = createInsertSchema(ordersTable);

const selectDelivery = createSelectSchema(deliveriesTable);
const createDelivery = createInsertSchema(deliveriesTable);

export type CreateUser = TypeOf<typeof createUser>;
export type SelectUser = TypeOf<typeof selectUser>;

export type CreateProduct = TypeOf<typeof createProduct>;
export type SelectProduct = TypeOf<typeof selectProduct>;

export type CreateOrder = TypeOf<typeof createOrder>;
export type SelectOrder = TypeOf<typeof selectOrder>;

export type CreateDelivery = TypeOf<typeof createDelivery>;
export type SelectDelivery = TypeOf<typeof selectDelivery>;

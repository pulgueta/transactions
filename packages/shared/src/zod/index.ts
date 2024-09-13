import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { number, preprocess, string } from "zod";

import { usersTable } from "@/schemas/user";
import { productsTable } from "@/schemas/product";
import { ordersTable } from "@/schemas/order";
import { deliveriesTable } from "@/schemas/delivery";

export const selectUser = createSelectSchema(usersTable);
export const createUser = createInsertSchema(usersTable, {
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
});

export const selectProduct = createSelectSchema(productsTable);
export const createProduct = createInsertSchema(productsTable, {
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

// const luhnCheck = (cardNumber: string) => {
//   let sum = 0;

//   let isEven = false;

//   for (let i = cardNumber.length - 1; i >= 0; i--) {
//     let digit = parseInt(cardNumber.charAt(i), 10);

//     if (isEven) {
//       digit *= 2;

//       if (digit > 9) {
//         digit -= 9;
//       }
//     }
//     sum += digit;

//     isEven = !isEven;
//   }

//   return sum % 10 === 0;
// };

export const selectOrder = createSelectSchema(ordersTable);
export const createOrder = createInsertSchema(ordersTable, {
  nameOnCard: string({ required_error: "Name on card is required" })
    .min(2, { message: "Name on card must be at least 2 characters long" })
    .max(50, { message: "Name on card must be at most 50 characters long" }),
  cardInfo: string({ required_error: "Card info is required" })
    .min(4, { message: "Card info must be at least 4 characters long" })
    .max(16, { message: "Card info must be at most 16 characters long" })
    .regex(/^[0-9]+$/, { message: "Card number must contain only digits" }),
  // .refine((val) => luhnCheck(val.replace(/\s/g, "")), {
  //   message: "Invalid credit card number",
  // }),
  expiryDate: string({
    required_error: "Expiry date is required",
  }).regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Invalid expiry date format (use MM/YY)",
  }),
  cvv: string()
    .regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" })
    .nonempty({ message: "CVV is required" }),
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

export const selectDelivery = createSelectSchema(deliveriesTable);
export const createDelivery = createInsertSchema(deliveriesTable);

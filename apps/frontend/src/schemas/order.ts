import { object, string } from "zod";

const luhnCheck = (val: string) => {
  let sum = 0;

  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1));

    if (i % 2 == 0) {
      intVal *= 2;

      if (intVal > 9) intVal -= 9;
    }

    sum += intVal;
  }

  return sum % 10 == 0;
};

export const createOrder = object({
  nameOnCard: string({ required_error: "Name on card is required" })
    .min(2, { message: "Name on card must be at least 2 characters long" })
    .max(50, { message: "Name on card must be at most 50 characters long" }),
  cardInfo: string({ required_error: "Card info is required" })
    .min(4, { message: "Card info must be at least 4 characters long" })
    .max(16, { message: "Card info must be at most 16 characters long" })
    .regex(/^[0-9]+$/, { message: "Card number must contain only digits" })
    .refine((val) => luhnCheck(val), { message: "Invalid card number" }),
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

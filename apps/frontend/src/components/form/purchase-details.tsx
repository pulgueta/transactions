import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreditCard } from "lucide-react";

import { Form, FormComponent } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateFormField } from "@/store/slices/formSlice";
import { toggleDrawer } from "@/store/slices/drawerSlice";
import { createOrder } from "@/schemas/order";
import { OrderSummary } from "@/types";

type FormProps = Pick<
  OrderSummary,
  | "address"
  | "cardInfo"
  | "city"
  | "cvv"
  | "expiryDate"
  | "nameOnCard"
  | "state"
  | "zip"
>;

export const PurchaseDetails = () => {
  const [cardType, setCardType] = useState<string>("");

  const dispatch = useAppDispatch();

  const savedFormData = useAppSelector((state) => state.form);

  const form = useForm<FormProps>({
    resolver: zodResolver(createOrder),
    defaultValues: savedFormData,
    resetOptions: {
      keepDefaultValues: true,
      keepDirty: false,
    },
  });

  const onCreditCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    form.setValue("cardInfo", value);

    setCardType(getCardType(value));
    dispatch(updateFormField({ field: "cardInfo", value }));
  };

  const getCardType = (number: string) => {
    const re = {
      Visa: /^4/,
      Mastercard: /^5[1-5]/,
      AMEX: /^3[47]/,
      Discover: /^6(?:011|5)/,
    };

    for (const [key, regex] of Object.entries(re)) {
      if (regex.test(number)) return key;
    }
    return "Unknown card provider";
  };

  const onSubmit = form.handleSubmit(() => {
    dispatch(toggleDrawer());
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      (Object.keys(value) as Array<keyof FormProps>).forEach((field) => {
        if (value[field] !== savedFormData[field]) {
          dispatch(
            updateFormField({
              field,
              value: value[field]!,
            })
          );
        }
      });
    });

    return () => subscription.unsubscribe();
  }, [form.watch, dispatch, savedFormData, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center gap-4"
      >
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <FormComponent
            name="nameOnCard"
            label="Name on card"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Yeison Barajas"
                autoComplete="billing name"
                min={4}
                max={100}
              />
            )}
          />

          <div>
            <FormComponent
              name="cardInfo"
              label="Card information"
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={onCreditCardChange}
                  autoComplete="cc-number"
                  placeholder="1234 1234 1234 1234"
                  minLength={4}
                  maxLength={16}
                />
              )}
            />

            {cardType && (
              <div className="mt-2 inline-flex items-center gap-x-2 text-sm font-semibold">
                <CreditCard />{" "}
                {
                  <span
                    className={cn({
                      "text-blue-600": cardType === "Visa",
                      "bg-gradient-to-l from-red-600 to-yellow-600 bg-clip-text text-transparent":
                        cardType === "Mastercard",
                      "text-green-200": cardType === "AMEX",
                      "text-blue-400": cardType === "Discover",
                    })}
                  >
                    {" "}
                    {cardType}
                  </span>
                }
              </div>
            )}
          </div>

          <FormComponent
            name="expiryDate"
            label="Expiration date"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="MM/YY"
                autoComplete="cc-exp"
                maxLength={5}
              />
            )}
          />

          <FormComponent
            name="cvv"
            label="CVV"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="123"
                autoComplete="cc-csc"
                maxLength={4}
              />
            )}
          />

          <FormComponent
            name="address"
            label="Address"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="123 Main St"
                autoComplete="shipping street-address"
                maxLength={100}
              />
            )}
          />

          <FormComponent
            name="city"
            label="City"
            render={({ field }) => <Input {...field} placeholder="Jackson" />}
          />

          <FormComponent
            name="state"
            label="State"
            render={({ field }) => (
              <Input {...field} placeholder="New Jersey" />
            )}
          />

          <FormComponent
            name="zip"
            label="Zip Code"
            render={({ field }) => <Input {...field} placeholder="123 678" />}
          />
        </div>
        <Button>Go to order details</Button>
      </form>
    </Form>
  );
};

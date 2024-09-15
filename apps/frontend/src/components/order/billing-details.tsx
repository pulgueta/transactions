import type { FC } from "react";

import type { FormState } from "@/store/slices/formSlice";

type BillingDetails = Pick<
  FormState,
  "nameOnCard" | "cardInfo" | "expiryDate" | "cvv"
>;

export const BillingDetails: FC<BillingDetails> = (order) => {
  const formatCardNumber = (cn: string) => {
    const maskedCardNumber = cn.slice(0, -4).replace(/\d/g, "*") + cn.slice(-4);

    return maskedCardNumber.replace(/(.{4})/g, "$1 ");
  };

  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight">Billing details</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {order.nameOnCard && (
          <div>
            <h2 className="text-md font-semibold tracking-tight">
              Name on card
            </h2>
            <p className="text-muted-foreground">{order.nameOnCard}</p>
          </div>
        )}

        {order.cardInfo && (
          <div>
            <h2 className="text-md font-semibold tracking-tight">
              Card information
            </h2>
            <p className="text-muted-foreground">
              {formatCardNumber(order.cardInfo)}
            </p>
          </div>
        )}

        {order.expiryDate && (
          <div>
            <h2 className="text-md font-semibold tracking-tight">
              Expiration date
            </h2>
            <p className="text-muted-foreground">{order.expiryDate}</p>
          </div>
        )}

        {order.cvv && (
          <div>
            <h2 className="text-md font-semibold tracking-tight">CVV</h2>
            <p className="text-muted-foreground">{order.cvv}</p>
          </div>
        )}
      </div>
    </>
  );
};

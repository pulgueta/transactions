import type { FC } from "react";

import type { OrderSummary } from "@/types";
import { formatCurrency } from "@/lib/currency";

export const OrderDetails: FC<OrderSummary> = (order) => {
  return (
    <article key={order.id} className="h-auto rounded border p-4">
      <h2 className="text-balance text-xl font-semibold tracking-tight">
        {order.product.name}{" "}
        {order.status === "COMPLETED" && `x${order.amount}`}
      </h2>

      {order.status === "COMPLETED" && (
        <>
          <p className="text-lg font-semibold">
            {formatCurrency(order.orderTotal)}
          </p>
          <p className="text-muted-foreground">
            Card used: {order.last4Digits}
          </p>
          <p className="text-lg">Delivery status: {order.Delivery[0].status}</p>
        </>
      )}
      <p className="text-lg">Order status: {order.status}</p>
    </article>
  );
};

import type { FC } from "react";

import type { FormState } from "@/store/slices/formSlice";

type DeliveryDetailsProps = Pick<
  FormState,
  "address" | "state" | "city" | "zip"
>;

export const DeliveryDetails: FC<DeliveryDetailsProps> = (order) => {
  return (
    <>
      <h1 className="text-xl font-semibold tracking-tight">Delivery details</h1>
      {order.address && order.state && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-md font-semibold tracking-tight">Address</h2>
            <p className="text-muted-foreground">{order.address}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold tracking-tight">State</h2>
            <p className="text-muted-foreground">{order.state}</p>
          </div>
        </div>
      )}

      {order.city && order.zip && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-md font-semibold tracking-tight">City</h2>
            <p className="text-muted-foreground">{order.city}</p>
          </div>
          <div>
            <h2 className="text-md font-semibold tracking-tight">Zip code</h2>
            <p className="text-muted-foreground">{order.zip}</p>
          </div>
        </div>
      )}
    </>
  );
};

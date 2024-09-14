import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { RootState } from "@/store";
import { formatCurrency } from "@/lib/currency";
import { closeDrawer } from "@/store/slices/drawerSlice";

export const OrderSummary = () => {
  const [snap, setSnap] = useState<number | string | null>("140px");

  const isOpen = useSelector((state: RootState) => state.drawer);

  const dispatch = useDispatch();

  const order = useSelector((state: RootState) => state.form);

  const close = () => {
    dispatch(closeDrawer());
  };

  const formatCardNumber = (cn: string) => {
    const maskedCardNumber = cn.slice(0, -4).replace(/\d/g, "*") + cn.slice(-4);

    return maskedCardNumber.replace(/(.{4})/g, "$1 ");
  };

  const DELIVERY_FEE_BASE = 2;
  const DELIVERY_FEE = formatCurrency(DELIVERY_FEE_BASE);

  return (
    <Drawer
      open={isOpen}
      onOpenChange={close}
      snapPoints={["480px", "540px", 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Your order details</DrawerTitle>
          <DrawerDescription>Please check for any mistakes</DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 p-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Billing details
          </h1>

          {order.nameOnCard && (
            <div>
              <h2 className="text-md font-semibold tracking-tight">
                Name on card
              </h2>
              <p className="ml-2 text-muted-foreground">{order.nameOnCard}</p>
            </div>
          )}

          {order.cardInfo && (
            <div>
              <h2 className="text-md font-semibold tracking-tight">
                Card information
              </h2>
              <p className="ml-2 text-muted-foreground">
                {formatCardNumber(order.cardInfo)}
              </p>
            </div>
          )}

          {order.expiryDate && order.cvv && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-md font-semibold tracking-tight">
                  Expiration date
                </h2>
                <p className="ml-2 text-muted-foreground">{order.expiryDate}</p>
              </div>
              <div>
                <h2 className="text-md font-semibold tracking-tight">CVV</h2>
                <p className="ml-2 text-muted-foreground">{order.cvv}</p>
              </div>
            </div>
          )}

          <h1 className="text-xl font-semibold tracking-tight">
            Delivery details
          </h1>

          {order.address && order.state && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-md font-semibold tracking-tight">
                  Address
                </h2>
                <p className="ml-2 text-muted-foreground">{order.address}</p>
              </div>
              <div>
                <h2 className="text-md font-semibold tracking-tight">State</h2>
                <p className="ml-2 text-muted-foreground">{order.state}</p>
              </div>
            </div>
          )}

          {order.city && order.zip && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-md font-semibold tracking-tight">City</h2>
                <p className="ml-2 text-muted-foreground">{order.city}</p>
              </div>
              <div>
                <h2 className="text-md font-semibold tracking-tight">
                  Zip code
                </h2>
                <p className="ml-2 text-muted-foreground">{order.zip}</p>
              </div>
            </div>
          )}
        </div>
        <DrawerFooter>
          <h1 className="text-xl font-semibold tracking-tight">Order total</h1>

          <div className="mb-4 mt-2 flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-md font-semibold tracking-tight">Subtotal</h2>
              <p className="ml-2 text-muted-foreground">$100</p>
            </div>

            <div className="flex w-full items-center justify-between">
              <h2 className="text-md font-semibold tracking-tight">
                Delivery fee
              </h2>
              <p className="ml-2 text-muted-foreground">{DELIVERY_FEE}</p>
            </div>
          </div>

          <Button>Confirm order</Button>
          <Button variant="destructive">Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

import type { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PurchaseDetails } from "./form/purchase-details";
import { OrderSummary } from "./order/order-summary";
import { useAppDispatch } from "@/store";
import { addProduct } from "@/store/slices/productSlice";
import type { SliceProduct } from "@/store/slices/productSlice";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export const PurchaseProductDialog: FC<SliceProduct> = (prod) => {
  const dispatch = useAppDispatch();

  const setProduct = () => {
    dispatch(addProduct(prod));
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={setProduct} disabled={prod.stock === 0}>
            Pay with credit card
          </Button>
        </DialogTrigger>
        <DialogContent className="h-full max-h-[36rem] w-full max-w-xs overflow-y-scroll rounded md:max-h-[36rem] md:max-w-2xl md:overflow-auto lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Purchase product</DialogTitle>
            <DialogDescription>
              Please enter your credit card information and delivery address to
              complete the purchase.
            </DialogDescription>
          </DialogHeader>

          <LazyLoadComponent>
            <PurchaseDetails />
          </LazyLoadComponent>
        </DialogContent>
      </Dialog>

      <LazyLoadComponent>
        <OrderSummary />
      </LazyLoadComponent>
    </>
  );
};

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
import { OrderSummary } from "./order-summary";

export const PurchaseProductDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Pay with credit card</Button>
        </DialogTrigger>
        <DialogContent className="h-full max-h-[32rem] w-full max-w-xs overflow-y-scroll rounded md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Purchase product</DialogTitle>
            <DialogDescription>
              Please enter your credit card information and delivery address to
              complete the purchase.
            </DialogDescription>
          </DialogHeader>

          <PurchaseDetails />
        </DialogContent>
      </Dialog>
      <OrderSummary />
    </>
  );
};

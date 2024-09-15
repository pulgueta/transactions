import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleDrawer } from "@/store/slices/drawerSlice";
import { Separator } from "../ui/separator";
import { OrderTotal } from "./order-total";
import { DeliveryDetails } from "./delivery-details";
import { BillingDetails } from "./billing-details";

export const OrderSummary = () => {
  const isOpen = useAppSelector((state) => state.drawer);

  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.form);

  const close = () => {
    dispatch(toggleDrawer());
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={close}>
      <AlertDialogContent className="h-full max-h-[36rem] w-full max-w-xs overflow-y-scroll rounded md:max-h-[46rem] md:max-w-2xl md:overflow-auto lg:max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Your order details</AlertDialogTitle>
          <AlertDialogDescription>
            Please check for any mistakes
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <BillingDetails {...order} />

          <Separator />

          <DeliveryDetails {...order} />
        </div>

        <Separator />

        <OrderTotal />
      </AlertDialogContent>
    </AlertDialog>
  );
};

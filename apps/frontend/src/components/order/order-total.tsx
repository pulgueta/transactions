import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/currency";
import { toggleDrawer } from "@/store/slices/drawerSlice";
import { useCreateOrderMutation } from "@/api";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrderTotal = () => {
  const [createTask, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const form = useAppSelector((state) => state.form);
  const product = useAppSelector((state) => state.products);
  const quantity_ = useAppSelector((state) => state.quantity);

  const quantity = quantity_[product.id] || 1;

  const BASE_FEE_ = 4;
  const DELIVERY_FEE_BASE = 9;

  const DELIVERY_FEE = formatCurrency(DELIVERY_FEE_BASE);
  const BASE_FEE = formatCurrency(BASE_FEE_);
  const SUBTOTAL = formatCurrency(
    product.price * quantity + BASE_FEE_ + DELIVERY_FEE_BASE
  );

  const close = () => {
    dispatch(toggleDrawer());
  };

  if (isError) {
    toast.error("Transaction not aproved. Please try again.");
  }

  if (isSuccess) {
    toast.success("Order placed successfully.");
    localStorage.setItem("nameOnCard", form.nameOnCard ?? "");
  }

  const handleCreateOrder = async () => {
    await createTask({
      address: form.address || "",
      cardInfo: form.cardInfo || "",
      city: form.city || "",
      cvv: form.cvv || "",
      expiryDate: form.expiryDate || "",
      nameOnCard: form.nameOnCard || "",
      state: form.state || "",
      zip: form.zip || "",
      last4Digits: form.cardInfo?.slice(-4) || "",
      amount: quantity,
      orderTotal: product.price * quantity + BASE_FEE_ + DELIVERY_FEE_BASE,
      product: product.id,
    }).unwrap();

    close();

    navigate("/orders");
    window.location.reload();
  };

  return (
    <>
      <div>
        <h1 className="mb-2 text-xl font-semibold tracking-tight">
          Order total
        </h1>

        <div className="mb-4 space-y-2">
          {product && (
            <div
              key={product.id}
              className="flex w-full items-center justify-between"
            >
              <h2 className="text-md font-semibold tracking-tight">
                {product.name} (x{quantity})
              </h2>
              <p className="text-muted-foreground">
                {formatCurrency(product.price * quantity)}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 flex w-full flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-md font-semibold tracking-tight">
              Delivery fee
            </h2>
            <p className="text-muted-foreground">{DELIVERY_FEE}</p>
          </div>

          <div className="flex w-full items-center justify-between">
            <h2 className="text-md font-semibold tracking-tight">Base fee</h2>
            <p className="text-muted-foreground">{BASE_FEE}</p>
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <h2 className="text-md font-semibold tracking-tight">Subtotal</h2>
          <p className="text-muted-foreground">{SUBTOTAL}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button disabled={isLoading} onClick={handleCreateOrder}>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Confirm order"
          )}
        </Button>

        <Button variant="destructive" onClick={close} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </>
  );
};

import { useAppSelector } from "@/store";
import { Button } from "../ui/button";
import { formatCurrency } from "@/lib/currency";

export const OrderTotal = () => {
  const products = useAppSelector((state) => state.products);

  const DELIVERY_FEE_BASE = 2;
  const DELIVERY_FEE = formatCurrency(DELIVERY_FEE_BASE);

  const subtotal =
    products &&
    formatCurrency(products.reduce((acc, product) => acc + product.price, 0));

  return (
    <>
      <div>
        <h1 className="mb-2 text-xl font-semibold tracking-tight">
          Order total
        </h1>

        <div className="mb-4 space-y-2">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="flex w-full items-center justify-between"
              >
                <h2 className="text-md font-semibold tracking-tight">
                  {product.name}
                </h2>
                <p className="text-muted-foreground">
                  {formatCurrency(product.price)}
                </p>
              </div>
            ))}
        </div>

        <div className="mb-4 flex w-full flex-col items-center gap-4">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-md font-semibold tracking-tight">Subtotal</h2>
            <p className="text-muted-foreground">{subtotal}</p>
          </div>

          <div className="flex w-full items-center justify-between">
            <h2 className="text-md font-semibold tracking-tight">
              Delivery fee
            </h2>
            <p className="text-muted-foreground">{DELIVERY_FEE}</p>
          </div>

          <div className="flex w-full items-center justify-between">
            <h2 className="text-md font-semibold tracking-tight">Base fee</h2>
            <p className="text-muted-foreground">{DELIVERY_FEE}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button>Confirm order</Button>

        <Button variant="destructive" onClick={close}>
          Cancel
        </Button>
      </div>
    </>
  );
};

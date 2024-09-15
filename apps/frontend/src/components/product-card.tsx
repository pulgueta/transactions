import "react-lazy-load-image-component/src/effects/blur.css";

import type { FC } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import type { Product } from "@/types";

import { PurchaseProductDialog } from "./purchase-product-dialog";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { decrement, increment } from "@/store/slices/quantitySlice";
import { formatCurrency } from "@/lib/currency";

export const ProductCard: FC<Product> = (product) => {
  const dispatch = useAppDispatch();

  const quantity = useAppSelector((state) => state.quantity[product.id] || 1);

  const decreasedDisabled = quantity === 1;
  const incrementDisabled = quantity === product.stock || product.stock === 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      dispatch(increment(product.id));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(decrement(product.id));
    }
  };

  const prod = {
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    stock: product.stock,
    description: product.description,
    quantity,
  };

  return (
    <article
      key={product.id}
      className="flex w-full max-w-sm flex-col items-start justify-between rounded border p-4"
    >
      <LazyLoadImage
        src={product.imageUrl}
        alt={product.name}
        effect="blur"
        className="h-full max-h-64 min-h-64 w-full rounded object-cover"
      />

      <h2 className="text-xl font-semibold tracking-tight">{product.name}</h2>
      <p className="text-pretty text-muted-foreground">{product.description}</p>
      <p className="text-lg font-semibold tracking-tight">
        {formatCurrency(product.price * quantity)}
      </p>

      <div className="my-4 flex items-center gap-4">
        <Button
          variant="outline"
          disabled={decreasedDisabled}
          onClick={handleDecrement}
        >
          -
        </Button>
        <span>{quantity}</span>
        <Button
          variant="outline"
          disabled={incrementDisabled}
          onClick={handleIncrement}
        >
          +
        </Button>
        <p className="text-muted-foreground">{product.stock} Available</p>
      </div>

      <PurchaseProductDialog {...prod} />
    </article>
  );
};

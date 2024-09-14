import { PurchaseProductDialog } from "@/components/purchase-product-dialog";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Query the /api/products endpoint
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <main className="min-h-dvh p-4">
      <h1>Products view</h1>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="w-full max-w-sm rounded border p-4"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full max-h-64 w-full max-w-xs object-cover"
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <PurchaseProductDialog />
          </article>
        ))}
      </section>
      {/* <article className="w-full max-w-sm rounded border p-4 shadow">
        <h2>Product title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          necessitatibus dicta odio, qui iste recusandae autem quasi mollitia
          cupiditate, pariatur quisquam voluptatum dolor sint unde debitis.
          Dignissimos consequatur quos culpa?
        </p>
        <PurchaseProductDialog />
      </article> */}
    </main>
  );
};

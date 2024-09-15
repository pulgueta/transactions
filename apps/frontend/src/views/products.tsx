import { PurchaseProductDialog } from "@/components/purchase-product-dialog";

import { useGetProductsQuery } from "@/api";

export const Products = () => {
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery();

  return (
    <main className="min-h-dvh p-4">
      <h1>Products view</h1>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p>Loading...</p>}

        {isError && <p>Something went wrong</p>}

        {data &&
          isSuccess &&
          data.map((product) => (
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

              <PurchaseProductDialog {...product} />
            </article>
          ))}
      </section>
    </main>
  );
};

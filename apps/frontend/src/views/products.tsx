import { useGetProductsQuery } from "../api";
import { ProductCard } from "@/components/product-card";

export const Products = () => {
  const { data, isLoading, isError, isSuccess } = useGetProductsQuery();

  return (
    <main className="min-h-[95.35dvh] space-y-4 p-4">
      <h1 className="text-3xl font-bold tracking-tight">Available products</h1>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p>Loading...</p>}

        {isError && <p>Something went wrong</p>}

        {data &&
          isSuccess &&
          data.map((product) => <ProductCard key={product.id} {...product} />)}
      </section>
    </main>
  );
};

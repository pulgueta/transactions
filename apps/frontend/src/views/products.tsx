import { PurchaseProductDialog } from "@/components/purchase-product-dialog";

export const Products = () => {
  return (
    <main className="min-h-dvh p-4">
      <h1>Products view</h1>
      <article className="w-full max-w-sm rounded border p-4 shadow">
        <h2>Product title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
          necessitatibus dicta odio, qui iste recusandae autem quasi mollitia
          cupiditate, pariatur quisquam voluptatum dolor sint unde debitis.
          Dignissimos consequatur quos culpa?
        </p>
        <PurchaseProductDialog />
      </article>
    </main>
  );
};

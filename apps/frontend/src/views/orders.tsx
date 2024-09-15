import { useGetOrdersQuery } from "../api";
import { OrderDetails } from "@/components/order/order-details";

export const Orders = () => {
  const name = localStorage.getItem("nameOnCard");

  const { data, isLoading, isSuccess, isError } = useGetOrdersQuery(name ?? "");

  return (
    <div className="min-h-dvh space-y-4 p-4">
      <h1 className="text-3xl font-bold tracking-tight">Your recent orders</h1>

      {data?.length === undefined && isError && (
        <p className="text-center text-xl font-bold">
          You have not placed any orders yet
        </p>
      )}

      {isLoading && <p className="text-center text-xl font-bold">Loading...</p>}

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isSuccess && data.map((o) => <OrderDetails key={o.id} {...o} />)}
      </div>
    </div>
  );
};

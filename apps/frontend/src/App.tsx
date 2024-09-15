import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Products } from "@/views/products";
import { Orders } from "@/views/orders";
import { Layout } from "./layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Products />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;

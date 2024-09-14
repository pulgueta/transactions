import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Products } from "@/views/products";
import { Summary } from "@/views/summary";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Products />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
]);

export const App = () => <RouterProvider router={router} />;

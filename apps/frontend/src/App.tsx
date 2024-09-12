import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Products } from "./views/products";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Products />,
  },
]);

export const App = () => <RouterProvider router={router} />;

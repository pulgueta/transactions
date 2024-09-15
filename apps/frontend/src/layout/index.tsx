import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header className="space-x-4 border-b p-4 text-xl font-semibold tracking-tight">
        <Link to="/">Products</Link>
        <Link to="/orders">Your orders</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

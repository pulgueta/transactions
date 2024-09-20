import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Layout } from "../../layout";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet-mock" />,
  };
});

describe("Layout", () => {
  it("renders header with navigation links", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const productsLink = screen.getByRole("link", { name: /products/i });
    const ordersLink = screen.getByRole("link", { name: /your orders/i });

    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute("href", "/");
    expect(ordersLink).toBeInTheDocument();
    expect(ordersLink).toHaveAttribute("href", "/orders");
  });

  it("renders Outlet component", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByTestId("outlet-mock")).toBeInTheDocument();
  });

  it("applies correct CSS classes to header", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "space-x-4",
      "border-b",
      "p-4",
      "text-xl",
      "font-semibold",
      "tracking-tight"
    );
  });
});

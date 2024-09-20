/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { Products } from "../../views/products";
import { useGetProductsQuery } from "../../api";

vi.mock("../../api", () => ({
  useGetProductsQuery: vi.fn(),
}));

vi.mock("@/components/product-card", () => ({
  ProductCard: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

describe("Products", () => {
  it("renders loading state", () => {
    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: undefined,
    } as any);

    render(<Products />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: undefined,
    } as any);

    render(<Products />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders products when data is available", () => {
    const mockProducts = [
      { id: "1", name: "Product 1" },
      { id: "2", name: "Product 2" },
    ];

    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockProducts,
    } as any);

    render(<Products />);
    expect(screen.getByText("Available products")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("does not render products when data is empty", () => {
    vi.mocked(useGetProductsQuery).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: [],
    } as any);

    render(<Products />);
    expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { Orders } from "../../views/orders";
import { useGetOrdersQuery } from "@/api";

vi.mock("@/api", () => ({
  useGetOrdersQuery: vi.fn(),
}));

vi.mock("@/components/order/order-details", () => ({
  OrderDetails: ({ id }: { id: string }) => (
    <div data-testid="order-details">{id}</div>
  ),
}));

describe("Orders", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders loading state", () => {
    vi.mocked(useGetOrdersQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isSuccess: false,
      isError: false,
    } as any);

    render(<Orders />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when no orders", () => {
    vi.mocked(useGetOrdersQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isSuccess: false,
      isError: true,
    } as any);

    render(<Orders />);
    expect(
      screen.getByText("You have not placed any orders yet")
    ).toBeInTheDocument();
  });

  it("renders orders when data is available", () => {
    const mockOrders = [{ id: "1" }, { id: "2" }];

    vi.mocked(useGetOrdersQuery).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      isSuccess: true,
      isError: false,
    } as any);

    render(<Orders />);
    expect(screen.getByText("Your recent orders")).toBeInTheDocument();
    expect(screen.getAllByTestId("order-details")).toHaveLength(2);
  });

  it("uses name from localStorage in query", () => {
    localStorage.setItem("nameOnCard", "John Doe");

    vi.mocked(useGetOrdersQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    } as any);

    render(<Orders />);

    expect(useGetOrdersQuery).toHaveBeenCalledWith("John Doe");
  });

  it("uses empty string in query when localStorage is empty", () => {
    vi.mocked(useGetOrdersQuery).mockReturnValue({
      data: [],
      isLoading: false,
      isSuccess: true,
      isError: false,
    } as any);

    render(<Orders />);

    expect(useGetOrdersQuery).toHaveBeenCalledWith("");
  });
});

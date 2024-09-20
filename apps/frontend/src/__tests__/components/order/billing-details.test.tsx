import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { BillingDetails } from "../../../components/order/billing-details";

describe("BillingDetails", () => {
  it("renders billing details correctly", () => {
    const mockOrder = {
      nameOnCard: "John Doe",
      cardInfo: "1234567890123456",
      expiryDate: "12/25",
      cvv: "123",
    };

    render(<BillingDetails {...mockOrder} />);

    expect(screen.getByText("Billing details")).toBeInTheDocument();
    expect(screen.getByText("Name on card")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Card information")).toBeInTheDocument();
    expect(screen.getByText("**** **** **** 3456")).toBeInTheDocument();
    expect(screen.getByText("Expiration date")).toBeInTheDocument();
    expect(screen.getByText("12/25")).toBeInTheDocument();
    expect(screen.getByText("CVV")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
  });

  it("does not render fields with missing information", () => {
    const mockOrder = {
      nameOnCard: "John Doe",
      cardInfo: "",
      expiryDate: "",
      cvv: "",
    };

    render(<BillingDetails {...mockOrder} />);

    expect(screen.getByText("Billing details")).toBeInTheDocument();
    expect(screen.getByText("Name on card")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Card information")).not.toBeInTheDocument();
    expect(screen.queryByText("Expiration date")).not.toBeInTheDocument();
    expect(screen.queryByText("CVV")).not.toBeInTheDocument();
  });
});

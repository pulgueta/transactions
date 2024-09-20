import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DeliveryDetails } from "../../../components/order/delivery-details";

describe("DeliveryDetails", () => {
  it("renders delivery details correctly", () => {
    const mockOrder = {
      address: "123 Main St",
      state: "CA",
      city: "Los Angeles",
      zip: "90001",
    };

    render(<DeliveryDetails {...mockOrder} />);

    expect(screen.getByText("Delivery details")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
    expect(screen.getByText("Zip code")).toBeInTheDocument();
    expect(screen.getByText("90001")).toBeInTheDocument();
  });

  it("does not render fields with missing information", () => {
    const mockOrder = {
      address: "123 Main St",
      state: "CA",
      city: "",
      zip: "",
    };

    render(<DeliveryDetails {...mockOrder} />);

    expect(screen.getByText("Delivery details")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("State")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
    expect(screen.queryByText("City")).not.toBeInTheDocument();
    expect(screen.queryByText("Zip code")).not.toBeInTheDocument();
  });
});

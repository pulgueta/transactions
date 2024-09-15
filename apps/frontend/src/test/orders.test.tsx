import { render } from "@testing-library/react";

import { Orders } from "../views/orders";

describe("Orders", () => {
  it("Renders orders", () => {
    render(<Orders />);
  });
});

import { describe, it, expect } from "vitest";

import quantityReducer, {
  increment,
  decrement,
  setQuantity,
} from "../../../store/slices/quantitySlice";

describe("quantity slice", () => {
  it("should handle initial state", () => {
    expect(quantityReducer(undefined, { type: "unknown" })).toEqual({});
  });

  it("should handle increment", () => {
    expect(quantityReducer({}, increment("1"))).toEqual({ "1": 2 });
    expect(quantityReducer({ "1": 1 }, increment("1"))).toEqual({ "1": 2 });
  });

  it("should handle decrement", () => {
    expect(quantityReducer({ "1": 2 }, decrement("1"))).toEqual({ "1": 1 });
    expect(quantityReducer({ "1": 1 }, decrement("1"))).toEqual({ "1": 1 });
  });

  it("should handle setQuantity", () => {
    expect(
      quantityReducer({}, setQuantity({ productId: "1", quantity: 5 }))
    ).toEqual({ "1": 5 });
    expect(
      quantityReducer({ "1": 2 }, setQuantity({ productId: "1", quantity: 5 }))
    ).toEqual({ "1": 5 });
  });
});

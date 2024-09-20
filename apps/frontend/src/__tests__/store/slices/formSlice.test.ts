import { describe, it, expect, beforeEach, vi } from "vitest";

import formReducer, {
  updateFormField,
  resetForm,
} from "../../../store/slices/formSlice";

describe("form slice", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
  });

  it("should handle initial state", () => {
    expect(formReducer(undefined, { type: "unknown" })).toEqual({
      nameOnCard: "",
      cardInfo: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });
  });

  it("should handle updateFormField", () => {
    const initialState = {
      nameOnCard: "",
      cardInfo: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    };
    expect(
      formReducer(
        initialState,
        updateFormField({ field: "nameOnCard", value: "John Doe" })
      )
    ).toEqual({
      ...initialState,
      nameOnCard: "John Doe",
    });
  });

  it("should handle resetForm", () => {
    const filledState = {
      nameOnCard: "John Doe",
      cardInfo: "1234567890123456",
      expiryDate: "12/25",
      cvv: "123",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    };
    expect(formReducer(filledState, resetForm())).toEqual({
      nameOnCard: "",
      cardInfo: "",
      expiryDate: "",
      cvv: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    });
  });
});

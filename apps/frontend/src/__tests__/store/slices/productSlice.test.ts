import { describe, it, expect } from "vitest";

import productReducer, {
  addProduct,
  updateQuantity,
  removeProduct,
} from "../../../store/slices/productSlice";

describe("product slice", () => {
  const initialState = {
    id: "",
    name: "",
    imageUrl: "",
    stock: 0,
    description: "",
    price: 0,
    quantity: 1,
  };

  it("should handle initial state", () => {
    expect(productReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle addProduct", () => {
    const product = {
      id: "1",
      name: "Test Product",
      imageUrl: "test.jpg",
      stock: 10,
      description: "A test product",
      price: 9.99,
      quantity: 1,
    };
    expect(productReducer(initialState, addProduct(product))).toEqual(product);
  });

  it("should handle updateQuantity", () => {
    const state = {
      id: "1",
      name: "Test Product",
      imageUrl: "test.jpg",
      stock: 10,
      description: "A test product",
      price: 9.99,
      quantity: 1,
    };
    expect(productReducer(state, updateQuantity(5))).toEqual({
      ...state,
      quantity: 5,
    });
  });

  it("should handle removeProduct", () => {
    const state = {
      id: "1",
      name: "Test Product",
      imageUrl: "test.jpg",
      stock: 10,
      description: "A test product",
      price: 9.99,
      quantity: 5,
    };
    expect(productReducer(state, removeProduct())).toEqual(initialState);
  });
});

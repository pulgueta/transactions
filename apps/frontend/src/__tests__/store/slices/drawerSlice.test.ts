import { describe, it, expect } from "vitest";

import drawerReducer, {
  toggleDrawer,
  openDrawer,
  closeDrawer,
} from "../../../store/slices/drawerSlice";

describe("drawer slice", () => {
  it("should handle initial state", () => {
    expect(drawerReducer(undefined, { type: "unknown" })).toBe(false);
  });

  it("should handle toggleDrawer", () => {
    expect(drawerReducer(false, toggleDrawer())).toBe(true);
    expect(drawerReducer(true, toggleDrawer())).toBe(false);
  });

  it("should handle openDrawer", () => {
    expect(drawerReducer(false, openDrawer())).toBe(true);
    expect(drawerReducer(true, openDrawer())).toBe(true);
  });

  it("should handle closeDrawer", () => {
    expect(drawerReducer(true, closeDrawer())).toBe(false);
    expect(drawerReducer(false, closeDrawer())).toBe(false);
  });
});

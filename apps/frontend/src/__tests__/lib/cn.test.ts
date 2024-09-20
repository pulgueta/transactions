import { describe, it, expect } from "vitest";

import { cn } from "../../lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", { bar: true })).toBe("foo bar");
    expect(cn("foo", { bar: false })).toBe("foo");
    expect(cn("foo", ["bar", "baz"])).toBe("foo bar baz");
  });

  it("should handle conditional classes", () => {
    const result = cn("foo", {
      bar: true,
      baz: false,
    });

    expect(result).toBe("foo bar");
  });

  it("should merge Tailwind classes correctly", () => {
    const result = cn("px-2 py-1 bg-red-500", "p-3 bg-blue-500");

    expect(result).toBe("p-3 bg-blue-500");
  });

  it("should handle undefined and null inputs", () => {
    expect(cn("foo", undefined, "bar", null)).toBe("foo bar");
  });

  it("should handle numeric class names", () => {
    expect(cn("foo", 123)).toBe("foo 123");
  });
});

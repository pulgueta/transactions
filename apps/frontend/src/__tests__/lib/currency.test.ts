import { it } from "vitest";

import { formatCurrency } from "../../lib/currency";

it("Format a given currency", async ({ expect }) => {
  const rawCurrencies = [1000, 2000, 3000, 4000, 5000];

  const formattedCurrency = rawCurrencies.map((currency) =>
    formatCurrency(currency)
  );

  expect(formattedCurrency).toEqual([
    "$1,000.00",
    "$2,000.00",
    "$3,000.00",
    "$4,000.00",
    "$5,000.00",
  ]);
});

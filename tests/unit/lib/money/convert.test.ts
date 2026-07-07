import { describe, expect, it } from "vitest";
import {
  buildEquivalentBalances,
  convertXafToEstimate,
} from "@/lib/money/convert";

describe("convertXafToEstimate", () => {
  it("derives eur and usdc estimates from one xaf wallet balance", () => {
    const eur = convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "EUR",
      sourceMinor: 245000000,
      rate: 0.001524,
    });

    const usdc = convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "USDC",
      sourceMinor: 245000000,
      rate: 0.00162457,
    });

    expect(eur.sourceCurrency).toBe("XAF");
    expect(eur.destinationCurrency).toBe("EUR");
    expect(usdc.destinationCurrency).toBe("USDC");
    expect(buildEquivalentBalances(245000000)).toHaveLength(2);
  });
});

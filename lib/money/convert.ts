export type CurrencyCode = "XAF" | "EUR" | "USDC";

type EstimateInput = {
  sourceCurrency: "XAF";
  destinationCurrency: Exclude<CurrencyCode, "XAF">;
  sourceMinor: number;
  rate: number;
};

export function convertXafToEstimate(input: EstimateInput) {
  const destinationMinor = Math.round(
    (input.sourceMinor / 100) * input.rate * 100,
  );

  return {
    sourceCurrency: input.sourceCurrency,
    destinationCurrency: input.destinationCurrency,
    sourceMinor: input.sourceMinor,
    destinationMinor,
    label: "Estimated equivalent",
  };
}

export function buildEquivalentBalances(sourceMinor: number) {
  return [
    convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "EUR",
      sourceMinor,
      rate: 0.001524,
    }),
    convertXafToEstimate({
      sourceCurrency: "XAF",
      destinationCurrency: "USDC",
      sourceMinor,
      rate: 0.00162457,
    }),
  ];
}

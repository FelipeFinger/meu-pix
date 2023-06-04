export const maskCurrency = (value?: number) =>
  (value || 0).toLocaleString(`pt-br`, {
    style: `currency`,
    currency: `BRL`,
  });

export const unMaskCurrency = (value?: string) =>
  Number((value || `0`).replace(/[^0-9,]/gi, ``).replace(/,/, `.`));

export const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const numberFormat = new Intl.NumberFormat('en-EN',
  { maximumSignificantDigits: 10 });

import { priceFormatter, numberFormat } from '../../utils/format'

describe('Format utils functions', () => {
  it('should be able to return the correct value for the priceFormatter function', () => {
    expect(priceFormatter.format(Number('100000.00'))).toBe('$100,000.00')
  });

  it('should be able to return the correct value for the numberFormat function', () => {
    expect(numberFormat.format(Number(10000))).toBe('10,000')
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import { Widget } from '../../components';

describe('Widget component', () => {
  it('should be able to render a new widget', () => {
    const { getByTestId } = render(
      <Widget
        propId='1'
        imageStr='property-1.jpg'
        price='$120,000.00'
        views='15,000'
      />,
    );

    expect(getByTestId('widget-component')).toBeTruthy();
  });

  it('should be able to render a new widget with the right data', () => {
    const { getByText } = render(
      <Widget
        propId='1'
        imageStr='property-1.jpg'
        price='$120,000.00'
        views='15,000'
      />,
    );

    expect(getByText('$120,000.00')).toBeInTheDocument();
    expect(getByText('Total View(s): 15,000')).toBeInTheDocument();
  });
});

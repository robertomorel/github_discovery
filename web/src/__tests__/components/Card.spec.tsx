import React from 'react';
import { wait, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom/extend-expect';

import { Card } from '../../components';
import { renderPage, renderWithAllProviders, createHistoryForRoute } from '../../utils/tests';

describe('Widget component', () => {
  it('should be able to render a new widget', async () => {
    renderWithAllProviders({ ui: <Card
      propId='1'
      imageStr='property-detail-1.jpg'
      header='Miami - Kendall'
      price='$100,000.00'
      beds={5}
      baths={4.5}
      address='1234 SW 11th ave'
      zipCode='12345'
      available={true}
    /> })

    expect(screen.getByTestId('card-component')).toBeTruthy();
    await wait(() =>
      expect(screen.getByRole('img', { name: 'Casa'})).toBeInTheDocument(),
    )
  });

  it('should be able to focus on it', async () => {
    //createHistoryForRoute('/listing');

    renderWithAllProviders({ ui: <Card
      propId='1'
      imageStr='property-detail-1.jpg'
      header='Miami - Kendall'
      price='$100,000.00'
      beds={5}
      baths={4.5}
      address='1234 SW 11th ave'
      zipCode='12345'
      available={true}
    /> })

    createHistoryForRoute('/listing');

    expect(screen.getByTestId('card-component')).toBeTruthy();

    const button = screen.getByTestId('card-component-link')
    await wait(() =>
      expect(button).toBeInTheDocument(),
    );

    fireEvent.mouseOver(button);

    expect(button).toHaveStyle({ cursor: 'pointer' })
  });
});

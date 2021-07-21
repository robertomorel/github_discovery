import React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from '../../components/Spinner';

describe('Input component', () => {
  it('should be able to render a spinner', () => {
    const { queryByTestId } = render(
      <Spinner />,
    );

    expect(queryByTestId('app-spinner')).toBeTruthy();
  });
});

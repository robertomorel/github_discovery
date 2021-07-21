import React from 'react';
import { render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Input component', () => {
  it('should be able to render a button', () => {
    const { getByPlaceholderText } = render(
      <Button placeholder="submit" type="submit" />,
    );

    expect(getByPlaceholderText('submit')).toBeTruthy();
  });
});

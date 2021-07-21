import React, { ReactElement } from 'react';
import { render, wait } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { MainHeader } from '../../components';

interface WrapperComponentProps {
  children: ReactElement;
}

const WrapperComponent: React.FC<WrapperComponentProps> = ({ children }) => (
  <Router history={createMemoryHistory()}>
    {children}
  </Router>
)

describe('Widget component', () => {
  it('should be able to render the main header', () => {
    const { getByTestId, getByText } = render(
      <WrapperComponent>
        <MainHeader />
      </WrapperComponent>,
    );

    expect(getByTestId('main-header-component')).toBeTruthy();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
  });

  it('should be able to render the main header with no menu', async () => {
    const { getByTestId, getByRole } = render(
      <WrapperComponent>
        <MainHeader hideMenu={true} />
      </WrapperComponent>,
    );

    expect(getByTestId('main-header-component')).toBeTruthy();

    const gobackButton = getByRole('button', { name: '' })
    await wait(() => expect(gobackButton).toBeInTheDocument())
  });
});

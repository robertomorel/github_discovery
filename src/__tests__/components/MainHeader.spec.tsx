import React from 'react';
import { screen } from '@testing-library/react';
import { Router } from 'react-router-dom';

import { MainHeader } from '../../components';
import { Storage } from '../../utils/storage';
import { createHistoryForRoute, renderWithAllProviders } from '../../utils/tests';

const avatarUrl = 'https://avatars.githubusercontent.com/u/49918342?s=400&u=8d5765a21f6b67e45735501315b98f5da3fff7d2&v=4';

describe('Widget component', () => {
  afterEach(async () => {
    await Storage.clear();
  })

  it('should be able to render the main header', async () => {
    await Storage.set('app_github_discovery#user', 'robertomorel');

    const { container } = renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <MainHeader />
      </Router>
    })

    expect(screen.getByTestId('main-header-component')).toBeTruthy();

    expect(screen.queryByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile' })).toBeInTheDocument();
  });

  it('should be able to render the main header with no store', async () => {
    const { container } = renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <MainHeader />
      </Router>
    })

    expect(screen.getByTestId('main-header-component')).toBeTruthy();

    expect(screen.queryByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile' })).toBeInTheDocument();
  });

  it('should be able to render Listing menu', async () => {
    //axios.get.mockImplementationOnce(() => Promise.resolve('127.0.0.1'));

    const { container } = renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <MainHeader />
      </Router>,
      initialState: {
        profile: {
          error: null,
          loading: false,
          profile: [{
            login: 'robertomorel',
            type: 'User',
            avatar_url: avatarUrl,
          }]
        }
      }
    })

    expect(screen.getByTestId('main-header-component')).toBeTruthy();

    expect(screen.queryByText('Home')).toBeInTheDocument();
    expect(screen.queryByText('Listing')).toBeInTheDocument();
  });

  it('should be able to hire menu', async () => {
    //axios.get.mockImplementationOnce(() => Promise.resolve('127.0.0.1'));

    const { container } = renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <MainHeader hideMenu={true} />
      </Router>
    })

    expect(screen.getByTestId('main-header-component')).toBeTruthy();
  });
});

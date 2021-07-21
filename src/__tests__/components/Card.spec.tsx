import React from 'react';
import { wait, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { act } from 'react-test-renderer';

import '@testing-library/jest-dom/extend-expect';

import { Card } from '../../components';
import { renderWithAllProviders, createHistoryForRoute } from '../../utils/tests';

const avatarUrl = 'https://avatars.githubusercontent.com/u/49918342?s=400&u=8d5765a21f6b67e45735501315b98f5da3fff7d2&v=4';
const API_REQUEST_DELAY = 200 //ms

describe('Widget component', () => {
  beforeEach(async () => {
    jest.useFakeTimers()
  })

  it('should be able to render a new widget', async () => {
    const { container } = renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <Card
          key={1}
          login='robertomorel'
          type='User'
          avatar_url={avatarUrl}
        />
      </Router>
    })

    expect(screen.getByTestId('card-component')).toBeTruthy();
    await wait(() =>
      expect(screen.getByRole('link', { name: 'Avatar User User name: robertomorel'})).toBeInTheDocument(),
    )
  });

  it('should be able to focus on it', async () => {
    renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <Card
          key={1}
          login='robertomorel'
          type='User'
          avatar_url={avatarUrl}
        />
      </Router>
    })

    expect(screen.getByTestId('card-component')).toBeTruthy();

    const button = screen.getByTestId('card-component-link')
    await wait(() =>
      expect(button).toBeInTheDocument(),
    );

    fireEvent.mouseOver(button);

    expect(button).toHaveStyle({ cursor: 'pointer' })
  });

  it('should be able to navigate to GitHub page', async () => {
    renderWithAllProviders({
      ui:
      <Router history={createHistoryForRoute('/')}>
        <Card
          key={1}
          login='robertomorel'
          type='User'
          avatar_url={avatarUrl}
        />
      </Router>
    })

    expect(screen.getByTestId('card-component')).toBeTruthy();

    const button = screen.getByTestId('card-component-link')
    await wait(() =>
      expect(button).toBeInTheDocument(),
    );

    fireEvent.click(button);

    act(() => jest.advanceTimersByTime(API_REQUEST_DELAY))

    await wait(() =>
      expect(screen.getByText('User')).toBeInTheDocument(),
    );
  });
});

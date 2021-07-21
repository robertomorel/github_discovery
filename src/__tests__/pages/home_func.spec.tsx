import { wait, screen, within, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';
import userEvent from '@testing-library/user-event'
import enUS from 'date-fns/locale/en-US';

import '@testing-library/jest-dom/extend-expect';

import { createHistoryForRoute, renderPage } from '../../utils/tests';
import profileMock from '../../mocks/profile.json';
import { ProfileProps } from '../../types';
import { createMemoryHistory } from 'history';
import { Storage } from '../../utils/storage';

describe('Home page error tests', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await Storage.clear();
  })

  it('should be able to render an error when trying to search with an invalid string', async () => {
    renderPage({
      routePath: '/',
      initialState: {
        profile: {
          error: null,
          loading: false,
          profile: (profileMock as unknown) as ProfileProps[],
        }
      }
    })

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const inputElem = screen.getByPlaceholderText('Find GitHub profiles');

    expect(inputElem).toBeInTheDocument();

    fireEvent.change(inputElem, { target: { value: 'r' } })

    const button = screen.getByRole('button', { name: 'Search' });

    await wait(expect(button).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(button, leftClick);

    await wait(() =>
      expect(screen.getByText('Invalid format!')).toBeInTheDocument(),
    )
  });

  it('should be able to dispatch a function', async () => {
    await Storage.set('app_github_discovery#user', 'robertomorel');

    renderPage({
      routePath: '/',
      initialState: {
        profile: {
          error: null,
          loading: false,
          profile: undefined,
        }
      }
    });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const inputElem = screen.getByPlaceholderText('Find GitHub profiles');

    expect(inputElem).toBeInTheDocument();

    fireEvent.change(inputElem, { target: { value: 'robertomorel' } })

    const button = screen.getByRole('button', { name: 'Search' });

    await wait(expect(button).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(button, leftClick);

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());
  });
});

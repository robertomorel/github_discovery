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

describe('Home page', () => {
  afterEach(async () => {
    jest.clearAllMocks();
    await Storage.clear();
  })

  it('should be able to render the home page', async () => {
    renderPage({ routePath: '/' });

    expect(screen.getByTestId('home_page')).toBeTruthy();

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    await wait(() =>
      expect(screen.getByText('Find Your GitHub Profiles')).toBeInTheDocument(),
    )

    const dataStr = format(new Date(), "MMMM dd'th'", {
      locale: enUS,
    });
    const weekStr = format(new Date(), 'cccc', {
      locale: enUS,
    });

    expect(screen.getByText(dataStr)).toBeInTheDocument()
    expect(screen.getByText(weekStr)).toBeInTheDocument()
  });

  it('should be able to run small features', async () => {
    renderPage({ routePath: '/' });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    expect(screen.queryByText('Welcome,')).toBeInTheDocument();
    expect(screen.queryByText('Home')).toBeInTheDocument();
  });

  it('should be able to seach for profiles', async () => {
    renderPage({ routePath: '/' });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const inputElem = screen.getByPlaceholderText('Find GitHub profiles');

    expect(inputElem).toBeInTheDocument();

    fireEvent.change(inputElem, { target: { value: 'robertomorel' } })

    const button = screen.getByRole('button', { name: 'Search' });

    await wait(expect(button).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(button, leftClick);

    await wait(() => expect(screen.queryByTestId('app-spinner')).toBeInTheDocument());
  });

  it('should be able to navigate to the listing page', async () => {
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

    fireEvent.change(inputElem, { target: { value: 'robertomorel' } })

    const button = screen.getByRole('button', { name: 'Search' });

    await wait(expect(button).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(button, leftClick);

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    expect(screen.getByTestId('listing_page')).toBeTruthy();
  });
});

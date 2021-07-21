import { wait, screen, within, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom/extend-expect';

import profileMock from '../../mocks/profile.json';
import { ProfileProps } from '../../types';
import { renderPage } from '../../utils/tests';

describe('Listing page', () => {
  it('should be able to render the listing page', async () => {
    renderPage({
      routePath: '/listing',
      history: createMemoryHistory({
        initialEntries: ['/'],
      }),
      initialState: {
        profile: {
          error: null,
          loading: false,
          profile: (profileMock as unknown) as ProfileProps[],
        }
      }
    });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    //expect(screen.getByTestId('listing_page')).toBeTruthy();
    expect(screen.queryByText('Home')).toBeInTheDocument();
  });
});

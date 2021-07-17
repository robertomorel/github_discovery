import { wait, screen, within, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history'

import '@testing-library/jest-dom/extend-expect';

import { renderPage } from '../../utils/tests';

jest.mock('@apollo/react-hooks', () => ({ useQuery: () => ({
    loading: false,
    data: [],
    networkStatus: 7
})}));

describe('Listing page', () => {
  it('should be able to render the listing page', async () => {
    renderPage({
      routePath: '/listing',
      history: createMemoryHistory({
        initialEntries: ['/'],
        initialIndex: 0,
      }),
    });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    //expect(screen.getByTestId('listing_page')).toBeTruthy();
  });
});

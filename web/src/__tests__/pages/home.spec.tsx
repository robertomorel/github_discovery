import { wait, screen, within, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';
import userEvent from '@testing-library/user-event'
import enUS from 'date-fns/locale/en-US';

import '@testing-library/jest-dom/extend-expect';

import { renderPage } from '../../utils/tests';
import propertyMock from '../../mocks/property.json';
import { PropertyProps } from '../../types';

jest.mock('@apollo/react-hooks', () => ({ useQuery: () => ({
    loading: false,
    data: [],
    networkStatus: 7
})}));

describe('Home page', () => {
  it('should be able to render the home page', async () => {
    renderPage({ routePath: '/' })

    expect(screen.getByTestId('home_page')).toBeTruthy();

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    await wait(() =>
      expect(screen.getByText('Find Your New Home')).toBeInTheDocument(),
    )

    expect(screen.getByText('Most Visited')).toBeInTheDocument()
    expect(screen.getByText('Last Visited')).toBeInTheDocument()

    const dataStr = format(new Date(), "MMMM dd'th'", {
      locale: enUS,
    });
    const weekStr = format(new Date(), 'cccc', {
      locale: enUS,
    });

    expect(screen.getByText(dataStr)).toBeInTheDocument()
    expect(screen.getByText(weekStr)).toBeInTheDocument()
  });

  it('should be able to render the home page with all the widgets', async () => {
    renderPage({
      routePath: '/',
      initialState: {
        property: {
          error: null,
          loading: false,
          property: (propertyMock as unknown) as PropertyProps[],
        }
      }
    })

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    expect(screen.getAllByText('$100,000.00')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Total View(s): 15,000')[0]).toBeInTheDocument();

    expect(screen.getAllByText('$120,000.00')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Total View(s): 12,000')[0]).toBeInTheDocument();

    expect(screen.getAllByText('$160,000.00')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Total View(s): 11,000')[0]).toBeInTheDocument();
  });

  it('should be able to focus in any widget', async () => {
    const { container } = renderPage({
      routePath: '/',
      initialState: {
        property: {
          error: null,
          loading: false,
          property: (propertyMock as unknown) as PropertyProps[],
        }
      }
    })

    //console.log('>>> ', container.innerHTML)

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const widget = screen.queryAllByTestId('widget-component')[0];

    await wait(() => expect(widget).toBeInTheDocument());

    /*
    expect(widget).toHaveStyle({
      border: '2px solid #999591',
    });
    */

    fireEvent.mouseEnter(widget);

    /*
    expect(widget).toHaveStyle({
      border: '2px solid #ff9f1c',
    });
    */
  });

  it('should be able to filter a property', async () => {
    const { container } = renderPage({
      routePath: '/',
      initialState: {
        property: {
          error: null,
          loading: false,
          property: (propertyMock as unknown) as PropertyProps[],
        }
      }
    })

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const inputElem = screen.getByPlaceholderText('Find your home by neighborhood, city, or a ZIP code');

    expect(inputElem).toBeInTheDocument();

    fireEvent.change(inputElem, { target: { value: 'Miami' } })

    const button = screen.getByRole('button', { name: 'Search' });

    await wait(expect(button).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(button, leftClick);

    await wait(expect(screen.queryAllByText('$160,000.00')[0]).toBeFalsy());
    await wait(expect(screen.queryAllByText('Total View(s): 11,000')[0]).toBeFalsy());
  });

  it('should be able to navigate to the listing page', async () => {
    renderPage({ routePath: '/' });

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    const postsLink = screen.getByRole('link', { name: 'Posts' });

    await wait(expect(postsLink).toBeInTheDocument());

    const leftClick = { button: 0 };

    userEvent.click(postsLink, leftClick);

    await wait(() => expect(screen.queryByTestId('app-spinner')).not.toBeInTheDocument());

    expect(screen.getByTestId('listing_page')).toBeTruthy();
  });
});

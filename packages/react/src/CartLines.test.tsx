import {vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {CartLines} from './CartLines.js';
import {getCartMock, getCartLineMock} from './CartProvider.test.helpers.js';
import {CartProvider} from './CartProvider.js';
import {ShopifyProvider} from './ShopifyProvider.js';
import {getShopifyConfig} from './ShopifyProvider.test.js';
import {useCartLine} from './CartLineProvider.js';

function Component() {
  const cartLine = useCartLine();

  return <div>{cartLine.merchandise.product.title}</div>;
}

describe('CartLines', () => {
  const fetch = global.fetch;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = vi.fn(async (_url, _init) => {
      return {
        json: async () =>
          JSON.stringify({
            data: {},
          }),
      };
    });
  });

  afterEach(() => {
    global.fetch = fetch;
  });

  it('renders items', () => {
    render(
      <CartProvider data={cart}>
        <CartLines>
          <Component />
        </CartLines>
      </CartProvider>,
      {
        wrapper: ({children}) => (
          <ShopifyProvider shopifyConfig={getShopifyConfig()}>
            {children}
          </ShopifyProvider>
        ),
      }
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('renders items in li if ul is provided as tag', () => {
    const {container} = render(
      <CartProvider data={cart}>
        <CartLines as="ul">
          <Component />
        </CartLines>
      </CartProvider>,
      {
        wrapper: ({children}) => (
          <ShopifyProvider shopifyConfig={getShopifyConfig()}>
            {children}
          </ShopifyProvider>
        ),
      }
    );

    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});

const cartLine = getCartLineMock();

const cart = {
  ...getCartMock(),
  lines: {
    edges: [
      {
        node: {
          ...cartLine,
          id: 'abc',
          merchandise: {
            ...cartLine.merchandise,
            product: {
              ...(cartLine?.merchandise?.product ?? {}),
              title: 'Product 1',
            },
          },
        },
      },
      {
        node: {
          ...cartLine,
          id: 'def',
          merchandise: {
            ...cartLine.merchandise,
            product: {
              ...cartLine.merchandise.product,
              title: 'Product 2',
            },
          },
        },
      },
    ],
  },
};

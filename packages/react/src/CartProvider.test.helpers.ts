import {flattenConnection} from './flatten-connection.js';
import {getPrice} from './Money.test.helpers.js';

const CurrencyCode = {
  Usd: 'USD',
};

export const CART_LINE = {
  attributes: [{key: 'color', value: 'red'}],
  quantity: 1,
  id: 'abc',
  merchandise: {
    id: 'def',
    availableForSale: true,
    priceV2: {
      amount: '123',
      currencyCode: CurrencyCode.Usd,
    },
    product: {
      handle: 'foo',
      title: 'Product Name',
    },
    requiresShipping: true,
    selectedOptions: [{name: 'size', value: 'large'}],
    title: 'Product Name - Large',
  },
  cost: {
    totalAmount: {
      amount: '123',
      currencyCode: CurrencyCode.Usd,
    },
    compareAtAmount: {
      amount: '125',
      currencyCode: CurrencyCode.Usd,
    },
  },
};

export const CART = {
  id: 'abc',
  checkoutUrl: 'https://shopify.com/checkout',
  attributes: [],
  buyerIdentity: {
    countryCode: 'US',
    email: '',
    phone: '',
  },
  discountCodes: [],
  totalQuantity: 0,
  cost: {
    subtotalAmount: getPrice(),
    totalAmount: getPrice(),
    totalTaxAmount: getPrice(),
    totalDutyAmount: getPrice(),
  },
  lines: {edges: []},
  note: '',
} as CartFragmentFragment;

export function getCartMock(options?: Partial<CartFragmentFragment>) {
  return {...CART, ...options};
}

export const CART_WITH_LINES = {
  ...CART,
  lines: {edges: [{node: CART_LINE}]},
};

export const CART_WITH_LINES_FLATTENED = {
  ...CART,
  lines: flattenConnection(CART_WITH_LINES.lines),
};

export function getCartLineMock(
  options?: Partial<CartFragmentFragment['lines']['edges'][0]['node']>
) {
  return {...CART_LINE, ...options};
}

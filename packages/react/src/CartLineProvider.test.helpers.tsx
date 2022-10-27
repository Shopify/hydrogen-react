import type {CartLine} from './storefront-api-types.js';
import type {PartialDeep} from 'type-fest';

const CART_LINE = {
  attributes: [{key: 'color', value: 'red'}],
  quantity: 1,
  id: 'abc',
  merchandise: {
    id: 'def',
    availableForSale: true,
    priceV2: {
      amount: '123',
      currencyCode: 'USD',
    },
    product: {
      handle: 'foo',
      title: 'Product Name',
      metafields: [],
    },
    requiresShipping: true,
    selectedOptions: [{name: 'size', value: 'large'}],
    title: 'Product Name - Large',
  },
  cost: {
    totalAmount: {
      amount: '123',
      currencyCode: 'USD',
    },
    compareAtAmountPerQuantity: {
      amount: '125',
      currencyCode: 'USD',
    },
    subtotalAmount: {
      amount: '123',
      currencyCode: 'USD',
    },
    amountPerQuantity: {
      amount: '123',
      currencyCode: 'USD',
    },
  },
};

export function getCartLineMock(options?: PartialDeep<CartLine>) {
  return {...CART_LINE, ...options} as CartLine;
}

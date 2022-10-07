import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartProvider} from './CartProvider.js';
import {useCart} from './useCart/useCart.js';
import {ShopifyContextValue, ShopifyProvider} from '../ShopifyProvider.js';

function MockComponent() {
  const {status, lines, linesAdd} = useCart();
  return (
    <>
      <div>
        <button
          onClick={() => {
            linesAdd([
              {
                merchandiseId: 'gid://shopify/ProductVariant/41007289630776',
                quantity: 1,
              },
            ]);
          }}
        >
          Add to cart
        </button>
      </div>
      <h2>Cart status:</h2>
      <div>{status}</div>
      <h2>Cart lines:</h2>
      <div>{JSON.stringify(lines)}</div>
    </>
  );
}

const config: ShopifyContextValue = {
  storeDomain: 'hydrogen-preview.myshopify.com',
  storefrontToken: '3b580e70970c4528da70c98e097c2fa0',
  storefrontApiVersion: '2022-07',
  country: {
    isoCode: 'CA',
  },
  language: {
    isoCode: 'EN',
  },
  locale: 'en-CA',
};

const Template: Story<React.ComponentProps<typeof CartProvider>> = (props) => {
  return (
    <ShopifyProvider shopifyConfig={config}>
      <CartProvider {...props}>
        <MockComponent />
      </CartProvider>
    </ShopifyProvider>
  );
};

export const Start = Template.bind({});
Start.args = {};

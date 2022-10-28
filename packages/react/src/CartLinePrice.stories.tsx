import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartLinePrice} from './CartLinePrice.js';
import {CartProvider} from './CartProvider.js';
import {getCartLinesMock, getCartMock} from './CartProvider.test.helpers.js';
import {CartLines} from './CartLines.js';

type CartLinePriceProps = React.ComponentPropsWithoutRef<typeof CartLinePrice>;

const cartMock = getCartMock({
  lines: getCartLinesMock(
    {
      cost: {
        totalAmount: {
          amount: '100',
          currencyCode: 'USD',
        },
        compareAtAmountPerQuantity: {
          amount: '200',
          currencyCode: 'USD',
        },
      },
    },
    1
  ),
});

const Template: Story<{priceType: CartLinePriceProps['priceType']}> = (
  props
) => (
  <CartProvider data={cartMock}>
    <CartLines>
      <CartLinePrice {...props} />
    </CartLines>
  </CartProvider>
);

export const Default = Template.bind({});
Default.argTypes = {
  priceType: {
    options: ['regular', 'compareAt'],
    control: {
      type: 'select',
    },
    defaultValue: 'regular',
  },
};

export const CompareAt = Template.bind({});
CompareAt.argTypes = {
  priceType: {
    options: ['regular', 'compareAt'],
    control: {
      type: 'select',
    },
    defaultValue: 'compareAt',
  },
};

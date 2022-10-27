import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartLines} from './CartLines.js';
import {CartProvider} from './CartProvider.js';
import {CART_WITH_LINES} from './CartProvider.test.helpers.js';

type CartCostProps = React.ComponentPropsWithoutRef<typeof CartLines>;

const Template: Story<{amountType: CartCostProps['amountType']}> = (props) => {
  return (
    <CartProvider data={CART_WITH_LINES}>
      <CartLines {...props}>
        <p>
          This is printed for each cart line, we need to actually test that the
          context is set up and all that. Probably start with some helpers to
          generate the cart in a better way.
        </p>
      </CartLines>
    </CartProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  amountType: 'total',
};
Default.argTypes = {
  amountType: {
    options: ['total', 'subtotal', 'tax', 'duty'],
    control: {type: 'radio'},
    defaultValue: 'total',
  },
};

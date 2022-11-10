import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartShopPayButton} from './CartShopPayButton.js';
import {CartProvider} from './CartProvider.js';
import {getCartMock} from './CartProvider.test.helpers.js';

type CartShopPayButtonProps = React.ComponentPropsWithoutRef<
  typeof CartShopPayButton
>;

const cart = getCartMock();

const Template: Story<CartShopPayButtonProps> = (props) => {
  return (
    <CartProvider data={cart}>
      <CartShopPayButton {...props}>Add to cart</CartShopPayButton>
    </CartProvider>
  );
};

export const Default = Template.bind({});

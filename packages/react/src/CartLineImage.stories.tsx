import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartLineImage} from './CartLineImage.js';
import {CartProvider} from './CartProvider.js';
import {CartLines} from './CartLines.js';
import {
  getCartLineMock,
  getCartLinesMock,
  getCartMock,
} from './CartProvider.test.helpers.js';

type CartLineImageProps = React.ComponentPropsWithoutRef<typeof CartLineImage>;

const cartLineMock = getCartLineMock();

if (cartLineMock.merchandise) {
  cartLineMock.merchandise.image = {
    url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/products/Main.jpg',
    src: '',
    originalSrc: '',
    transformedSrc: '',
  };
}

const cartMock = getCartMock({
  lines: getCartLinesMock(
    {
      merchandise: {
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/products/Main.jpg',
          src: '',
          originalSrc: '',
          transformedSrc: '',
          width: 400,
          height: 400,
        },
      },
    },
    1
  ),
});

const Template: Story<CartLineImageProps> = (props) => (
  <CartProvider data={cartMock}>
    <CartLines {...props}>
      <CartLineImage {...props} />
    </CartLines>
  </CartProvider>
);

export const Default = Template.bind({});

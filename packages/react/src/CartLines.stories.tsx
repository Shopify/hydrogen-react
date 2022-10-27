import {ComponentProps} from 'react';
import type {Story} from '@ladle/react';
import {CartLines} from './CartLines.js';
import {CartProvider} from './CartProvider.js';
import {useCartLine} from './CartLineProvider.js';
import {getCartMock, getCartLinesMock} from './CartProvider.test.helpers.js';

function Item() {
  const line = useCartLine();
  return <>{line.id}</>;
}

const Template: Story<ComponentProps<typeof CartLines>> = (props) => {
  return (
    <CartProvider
      data={getCartMock({
        lines: getCartLinesMock({}, 5),
      })}
    >
      <CartLines {...props}>
        <Item />
      </CartLines>
    </CartProvider>
  );
};

export const Default = Template.bind({});

export const AsList = Template.bind({});
AsList.args = {
  as: 'ul',
};

import * as React from 'react';
import type {Story} from '@ladle/react';
import {CartLines} from './CartLines.js';
import {CartLineProvider} from './CartLineProvider.js';
import {getCartLine} from './CartLineProvider.test.helpers.js';

type CartLinesProps = React.ComponentPropsWithoutRef<typeof CartLines>;

const Template: Story<CartLinesProps> = (props) => {
  const cartLine = getCartLine();

  return (
    <CartLineProvider line={cartLine}>
      <CartLines {...props}>Cart Lines</CartLines>
    </CartLineProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.argTypes = {};

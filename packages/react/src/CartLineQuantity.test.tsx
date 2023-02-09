import {render, screen} from '@testing-library/react';
import {CartLineProvider} from './CartLineProvider.js';
import {CartLineQuantity} from './CartLineQuantity.js';
import {CART_LINE} from './CartProvider.test.helpers.js';

describe('<CartLineQuantity />', () => {
  it('displays the quantity', () => {
    render(
      <CartLineProvider line={CART_LINE}>
        <CartLineQuantity />
      </CartLineProvider>
    );

    expect(screen.getByText(CART_LINE?.quantity ?? '')).toBeInTheDocument();
  });

  it('allows a custom tag', () => {
    render(
      <CartLineProvider line={CART_LINE}>
        <CartLineQuantity as="p" />
      </CartLineProvider>
    );

    const quantity = screen.getByText(CART_LINE?.quantity ?? '');

    expect(quantity).toBeInTheDocument();
    expect(quantity.tagName).toBe('P');
  });

  it(`validates props for a component passed to the 'as' prop`, () => {
    render(
      <CartLineProvider line={CART_LINE}>
        <CartLineQuantity as={FakeComponentWithRequiredProp} testing />
        <CartLineQuantity
          as={FakeComponentWithRequiredProp}
          // @ts-expect-error Testing should be a boolean
          testing="alsdkjf"
        />
      </CartLineProvider>
    );

    const quantity = screen.getByRole('link', {
      name: `${CART_LINE?.quantity ?? ''}`,
    });

    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveAttribute('href', '/test');
  });
});

function FakeComponentWithRequiredProp({testing}: {testing: boolean}) {
  return <div>{testing}</div>;
}

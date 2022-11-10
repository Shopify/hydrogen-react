import {CartShopPayButton} from './CartShopPayButton.js';
import {CartProvider, useCart} from './CartProvider.js';
import {render, screen} from '@testing-library/react';
import {vi} from 'vitest';
import {getCartActionsMock} from './CartProvider.test.helpers.js';

vi.mock('./CartProvider.js');

vi.mock('./ShopPayButton.js', () => ({
  ShopPayButton: (props: unknown) => (
    <div data-testid="shop-pay-button">{JSON.stringify(props)}</div>
  ),
}));

describe('CartShopPayButton', () => {
  it('renders a ShopPayButton with the cart data', () => {
    vi.mocked(useCart).mockImplementation(() => ({
      ...getCartActionsMock(),
      lines: [{quantity: 2, merchandise: {id: '123'}}],
    }));

    render(<CartShopPayButton />, {wrapper: CartProvider});

    const shopPayButton = screen.getAllByTestId('shop-pay-button');

    expect(shopPayButton.length).toBe(1);

    expect(
      JSON.parse(shopPayButton.at(0)?.textContent as string)
    ).toStrictEqual({
      variantIdsAndQuantities: [{id: '123', quantity: 2}],
    });
  });
});

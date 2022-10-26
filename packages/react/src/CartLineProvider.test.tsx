import {render} from '@testing-library/react';
import {useCartLine, CartLineProvider} from './CartLineProvider.js';
import {getCartLine} from './CartLineProvider.test.helpers.js';

it('provides a hook to access cart line data', () => {
  const cartLine = getCartLine();
  function Data() {
    const line = useCartLine();

    return <div>{JSON.stringify(line)}</div>;
  }

  const {container} = render(
    <CartLineProvider line={cartLine}>
      <Data />
    </CartLineProvider>
  );

  expect(container.querySelector('div')).toHaveTextContent(
    JSON.stringify(cartLine)
  );
});

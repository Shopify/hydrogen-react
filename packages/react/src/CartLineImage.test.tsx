import {CartLineProvider} from './CartLineProvider.js';
import {CartLineImage} from './CartLineImage.js';
import {getCartLineMock} from './CartProvider.test.helpers.js';
import {render, screen} from '@testing-library/react';
import {CartLine} from './storefront-api-types.js';

const cartMerchandiseImage = {
  url: 'https://cdn.shopify.com/someimage.jpg',
  altText: 'The product',
  width: 200,
  height: 300,
};

describe('<CartLineImage/>', () => {
  it('displays the image', () => {
    const line = getCartLineMock({
      merchandise: {
        image: {
          ...cartMerchandiseImage,
        },
      },
    });

    render(
      <CartLineProvider line={line as CartLine}>
        <CartLineImage />
      </CartLineProvider>
    );

    const image = screen.getByRole('img');

    expect(image.getAttribute('src')).toContain(line!.merchandise!.image!.url);
    expect(image).toHaveAttribute(
      'height',
      `${line!.merchandise!.image!.height}`
    );
    expect(image).toHaveAttribute(
      'width',
      `${line!.merchandise!.image!.width}`
    );
    expect(image).toHaveAccessibleName(line!.merchandise!.image!.altText!);
  });

  it('allows passthrough props', () => {
    const line = getCartLineMock({
      merchandise: {
        image: {
          ...cartMerchandiseImage,
        },
      },
    });

    render(
      <CartLineProvider line={line as CartLine}>
        <CartLineImage className="w-full" />
      </CartLineProvider>
    );

    const image = screen.getByRole('img');

    expect(image.getAttribute('src')).toContain(line!.merchandise!.image!.url);
    expect(image).toHaveAttribute(
      'height',
      `${line!.merchandise!.image!.height}`
    );
    expect(image).toHaveAttribute(
      'width',
      `${line!.merchandise!.image!.width}`
    );
    expect(image).toHaveAccessibleName(line!.merchandise!.image!.altText!);
    expect(image).toHaveClass('w-full');
  });

  it('displays nothing if there is no image', () => {
    const line = getCartLineMock({
      merchandise: {
        image: undefined,
      },
    });

    render(
      <CartLineProvider line={line as CartLine}>
        <CartLineImage />
      </CartLineProvider>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it.skip(`typescript types`, () => {
    // this test is actually just using //@ts-expect-error as the assertion, and don't need to execute in order to have TS validation on them
    // I don't love this idea, but at the moment I also don't have other great ideas for how to easily test our component TS types

    // no errors in these situations
    <CartLineImage />;

    // @ts-expect-error no need to pass data
    <CartLineImage data={{}} />;
    // @ts-expect-error no need to pass src
    <CartLineImage src="" />;

    // @ts-expect-error foo is invalid
    <CartLineImage data={{url: ''}} foo="bar" />;
  });
});

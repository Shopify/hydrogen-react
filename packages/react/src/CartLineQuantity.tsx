import type {ComponentPropsWithoutRef, ElementType} from 'react';
import {useCartLine} from './CartLineProvider.js';

type BaseProps<ComponentGeneric extends ElementType = 'span'> = {
  as?: ComponentGeneric;
};

export type CartLineQuantityProps<ComponentGeneric extends ElementType> =
  BaseProps<ComponentGeneric> &
    Omit<
      ComponentPropsWithoutRef<ComponentGeneric>,
      keyof BaseProps<ComponentGeneric>
    >;

/**
 * The `CartLineQuantity` component renders a `span` element (or the type of HTML element
 * specified by the `as` prop) with the cart line's quantity. It must be a descendent of a `CartLineProvider` component.
 */
export function CartLineQuantity<ComponentGeneric extends ElementType = 'span'>(
  props: CartLineQuantityProps<ComponentGeneric>
): JSX.Element {
  const cartLine = useCartLine();
  const {as, ...passthroughProps} = props;

  const Wrapper = as ? as : 'span';

  return <Wrapper {...passthroughProps}>{cartLine.quantity}</Wrapper>;
}

import {useCartLine} from './CartLineProvider.js';
import {Image, type ShopifyImageProps} from './Image.js';
import type {Simplify} from 'type-fest';

type PropsWeControl = 'data';

/**
 * The `CartLineImage` component renders an `Image` component for the cart line merchandise's image.
 * It must be a descendent of a `CartLineProvider` component.
 */
export function CartLineImage(
  props: Simplify<Omit<ShopifyImageProps, PropsWeControl>>
) {
  const cartLine = useCartLine();

  return cartLine.merchandise.image ? (
    <Image {...props} data={cartLine.merchandise.image} />
  ) : null;
}

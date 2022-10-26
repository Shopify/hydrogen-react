import {
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
  Fragment,
} from 'react';
import type {CartLine} from './storefront-api-types.js';
import {useCart} from './CartProvider.js';
import {CartLineProvider} from './CartLineProvider.js';

interface BaseProps<ComponentGeneric extends ElementType> {
  /** A `ReactNode` element. Valid values: `ul` or `undefined`. If `ul`, then each child will
   * be wrapped with a `li` element.
   */
  as?: ComponentGeneric;
  /** A `ReactNode` element */
  children: ReactNode;
}

export type CartLinesProps<ComponentGeneric extends ElementType> =
  ComponentPropsWithoutRef<ComponentGeneric> & BaseProps<ComponentGeneric>;

/**
 * The `CartLines` component iterates over each cart line and renders its `children` within
 * a `CartLineProvider` for each cart line.
 */
export function CartLine<ComponentGeneric extends ElementType>(
  props: CartLinesProps<ComponentGeneric>
) {
  const {lines} = useCart();
  const {as, children, ...passthroughProps} = props;

  const Wrapper = as ?? Fragment;
  const ChildWrapper = Wrapper === 'ul' ? 'li' : Fragment;

  return (
    <Wrapper {...passthroughProps}>
      {lines?.map((line) => {
        if (!line) {
          return null;
        }
        return (
          <ChildWrapper key={line?.id}>
            <CartLineProvider line={line as CartLine}>
              {children}
            </CartLineProvider>
          </ChildWrapper>
        );
      })}
    </Wrapper>
  );
}

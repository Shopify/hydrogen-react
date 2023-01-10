import {Money} from './Money.js';
import {CartLine} from './storefront-api-types.js';
import {PartialDeep} from 'type-fest';

interface CartLinePriceProps {
  /** A [CartLine object](https://shopify.dev/api/storefront/reference/objects/CartLine). */
  data: PartialDeep<CartLine, {recurseIntoArrays: true}>;
  /** The type of price. Valid values:`regular` (default) or `compareAt`. */
  priceType?: 'regular' | 'compareAt';
}

/**
 * The `CartLinePrice` component renders a `Money` component for the cart line merchandise's price or
 * compare at price.
 */
export function CartLinePrice(
  props: Omit<React.ComponentProps<typeof Money>, 'data'> & CartLinePriceProps
) {
  const {data: cartLine, priceType = 'regular', ...passthroughProps} = props;

  if (cartLine == null) {
    throw new Error(`<CartLinePrice/> requires a cart line as the 'data' prop`);
  }

  const moneyV2 =
    priceType === 'regular'
      ? cartLine.cost?.totalAmount
      : cartLine.cost?.compareAtAmountPerQuantity;

  if (!moneyV2 || !moneyV2.amount || !moneyV2.currencyCode) {
    return null;
  }

  return (
    <Money
      {...passthroughProps}
      amount={moneyV2.amount}
      currencyCode={moneyV2.currencyCode}
    />
  );
}

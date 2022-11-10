import {useMemo} from 'react';
import {useCart} from './CartProvider.js';
import {ShopPayButton} from './ShopPayButton.js';

/**
 * The `CartShopPayButton` component renders a `ShopPayButton` for the items in the cart.
 * It must be a descendent of a `CartProvider` component.
 */
export function CartShopPayButton(
  props: Omit<React.ComponentProps<typeof ShopPayButton>, 'variantIds'>
) {
  const {lines} = useCart();

  const idsAndQuantities = useMemo(() => {
    return lines?.map((line) => ({
      id: line?.merchandise?.id || '',
      quantity: line?.quantity || 1,
    }));
  }, [lines]);

  if (!idsAndQuantities) {
    return null;
  }

  return (
    <ShopPayButton
      variantIdsAndQuantities={idsAndQuantities}
      {...props}
    ></ShopPayButton>
  );
}

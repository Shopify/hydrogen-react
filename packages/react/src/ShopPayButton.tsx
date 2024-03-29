import {useShop} from './ShopifyProvider.js';
import {useLoadScript} from './load-script.js';
import {parseGid} from './analytics-utils.js';

// By using 'never' in the "or" cases below, it makes these props "exclusive" and means that you cannot pass both of them; you must pass either one OR the other.
type ShopPayButtonProps = ShopPayButtonStyleProps &
  (ShopPayVariantIds | ShopPayVariantAndQuantities);

type ShopPayButtonStyleProps = {
  /** A string of classes to apply to the `div` that wraps the Shop Pay button. */
  className?: string;
  /** A string that's applied to the [CSS custom property (variable)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) `--shop-pay-button-width` for the [Buy with Shop Pay component](https://shopify.dev/custom-storefronts/tools/web-components#buy-with-shop-pay-component). */
  width?: string;
};

type ShopPayVariantIds = {
  /** An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`. */
  variantIds: string[];
  /** An array of variant IDs and quantities to purchase with Shop Pay. */
  variantIdsAndQuantities?: never;
};

type ShopPayVariantAndQuantities = {
  /** An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`. */
  variantIds?: never;
  /** An array of variant IDs and quantities to purchase with Shop Pay. */
  variantIdsAndQuantities: Array<{
    id: string;
    quantity: number;
  }>;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'shop-pay-button': {
        variants: string;
        'store-url': string;
      };
    }
  }
}

const SHOPJS_URL =
  'https://cdn.shopify.com/shopifycloud/shop-js/v1.0/client.js';

/**
 * The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout.
 * It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.
 * It relies on the `<ShopProvider>` context provider.
 */
export function ShopPayButton({
  variantIds,
  className,
  variantIdsAndQuantities,
  width,
}: ShopPayButtonProps): JSX.Element {
  const {storeDomain} = useShop();
  const shopPayLoadedStatus = useLoadScript(SHOPJS_URL);

  let ids: string[] = [];

  if (variantIds && variantIdsAndQuantities) {
    throw new Error(DoublePropsErrorMessage);
  }

  if (variantIds) {
    ids = variantIds.reduce<string[]>((prev, curr) => {
      const bareId = parseGid(curr).id;
      if (bareId) {
        prev.push(bareId);
      }
      return prev;
    }, []);
  } else if (variantIdsAndQuantities) {
    ids = variantIdsAndQuantities.reduce<string[]>((prev, curr) => {
      const bareId = parseGid(curr?.id).id;
      if (bareId) {
        prev.push(`${bareId}:${curr?.quantity ?? 1}`);
      }
      return prev;
    }, []);
  } else {
    throw new Error(MissingPropsErrorMessage);
  }

  if (ids.length === 0) {
    throw new Error(InvalidPropsErrorMessage);
  }

  const style = width
    ? ({
        '--shop-pay-button-width': width,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className={className} style={style}>
      {shopPayLoadedStatus === 'done' && (
        <shop-pay-button store-url={storeDomain} variants={ids.join(',')} />
      )}
    </div>
  );
}

export const InvalidPropsErrorMessage = `You must pass in "variantIds" in the form of ["gid://shopify/ProductVariant/1"]`;
export const MissingPropsErrorMessage = `You must pass in either "variantIds" or "variantIdsAndQuantities" to ShopPayButton`;
export const DoublePropsErrorMessage = `You must provide either a variantIds or variantIdsAndQuantities prop, but not both in the ShopPayButton component`;

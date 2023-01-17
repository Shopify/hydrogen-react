import {useState, useCallback} from 'react';
import {useShop} from './ShopifyProvider.js';
import {flattenConnection} from './flatten-connection.js';
import {CartInput, Cart as CartType} from './storefront-api-types.js';
import {CartCreate, defaultCartFragment} from './cart-queries.js';
import {Cart} from './cart-types.js';
import {
  SHOPIFY_STOREFRONT_ID_HEADER,
  SHOPIFY_STOREFRONT_Y_HEADER,
  SHOPIFY_STOREFRONT_S_HEADER,
  SHOPIFY_Y,
  SHOPIFY_S,
} from './cart-constants.js';
import {parse} from 'worktop/cookie';
import type {StorefrontApiResponseOkPartial} from './storefront-api-response.types.js';

interface UseCartFetchProps {
  /**
   * Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. This uses the public Storefront API token.
   *
   * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getPublicTokenHeaders({...})`:
   *
   * - `contentType`
   * - `storefrontToken`
   */
  getPublicTokenHeaders?: (props: {
    /**
     * Customizes which `"content-type"` header is added when using `getPrivateTokenHeaders()` and `getPublicTokenHeaders()`. When fetching with a `JSON.stringify()`-ed `body`, use `"json"`. When fetching with a `body` that is a plain string, use `"graphql"`. Defaults to `"json"`
     */
    contentType: 'json' | 'graphql';
    /** The Storefront API access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
    storefrontToken?: string;
  }) => Record<string, string>;
  /**
   * Creates the fully-qualified URL to your store's GraphQL endpoint.
   *
   * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getStorefrontApiUrl({...})`:
   *
   * - `storeDomain`
   * - `storefrontApiVersion`
   */
  getStorefrontApiUrl?: (props?: {
    /** The host name of the domain (eg: `{shop}.myshopify.com`). */
    storeDomain?: string;
    /** The Storefront API version. This should almost always be the same as the version Hydrogen-UI was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details. */
    storefrontApiVersion?: string;
  }) => string;

  /** The globally-unique identifier for the Shop */
  storefrontId?: string;
}

export function useCartFetch(props?: UseCartFetchProps) {
  const shop = useShop();

  const storefrontId = props?.storefrontId ?? shop?.storefrontId;
  const getPublicTokenHeaders =
    props?.getPublicTokenHeaders ?? shop?.getPublicTokenHeaders;
  const getStorefrontApiUrl =
    props?.getStorefrontApiUrl ?? shop?.getStorefrontApiUrl;

  if (!getStorefrontApiUrl) {
    throw new Error(
      'You must pass a `getStorefrontApiUrl` prop to the `useCartFetch` component, or wrap it in a `ShopProvider` component.'
    );
  }

  if (!getPublicTokenHeaders) {
    throw new Error(
      'You must pass a `getPublicTokenHeaders` prop to the `useCartFetch` component, or wrap it in a `ShopProvider` component.'
    );
  }

  return useCallback(
    <ReturnDataGeneric,>({
      query,
      variables,
    }: {
      query: string;
      variables: Record<string, unknown>;
    }): Promise<StorefrontApiResponseOkPartial<ReturnDataGeneric>> => {
      const headers = getPublicTokenHeaders({contentType: 'json'});

      if (storefrontId) {
        headers[SHOPIFY_STOREFRONT_ID_HEADER] = storefrontId;
      }

      // Find Shopify cookies
      const cookieData = parse(document.cookie);
      if (cookieData[SHOPIFY_Y] && cookieData[SHOPIFY_S]) {
        headers[SHOPIFY_STOREFRONT_Y_HEADER] = cookieData[SHOPIFY_Y];
        headers[SHOPIFY_STOREFRONT_S_HEADER] = cookieData[SHOPIFY_S];
      }

      return fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: query.toString(),
          variables,
        }),
      })
        .then((res) => res.json())
        .catch((error) => {
          return {
            data: undefined,
            errors: error.toString(),
          };
        });
    },
    [getPublicTokenHeaders, storefrontId, getStorefrontApiUrl]
  );
}

export function useInstantCheckout() {
  const [cart, updateCart] = useState<Cart | undefined>();
  const [checkoutUrl, updateCheckoutUrl] = useState<Cart['checkoutUrl']>();
  const [error, updateError] = useState<string | undefined>();

  const fetch = useCartFetch();

  const createInstantCheckout = useCallback(
    async (cartInput: CartInput) => {
      const {data, errors} = await fetch<{
        cartCreate: {cart: CartType};
      }>({
        query: CartCreate(defaultCartFragment),
        variables: {
          input: cartInput,
        },
      });

      if (errors) {
        updateError(errors.toString());
        updateCart(undefined);
        updateCheckoutUrl(undefined);
      }

      if (data?.cartCreate?.cart) {
        const dataCart = data.cartCreate.cart;
        updateCart({
          ...dataCart,
          lines: flattenConnection(dataCart.lines),
          note: dataCart.note ?? undefined,
        });
        updateCheckoutUrl(dataCart.checkoutUrl);
      }
    },
    [fetch]
  );

  return {cart, checkoutUrl, error, createInstantCheckout};
}

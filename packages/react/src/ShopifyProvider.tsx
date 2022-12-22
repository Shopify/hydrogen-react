import {createContext, useContext, useMemo, type ReactNode} from 'react';
import type {LanguageCode, CountryCode} from './storefront-api-types.js';
import {SFAPI_VERSION} from './storefront-api-constants.js';
import {getPublicTokenHeadersRaw} from './storefront-client.js';

const ShopifyContext = createContext<ShopifyContextValue>({
  storeDomain: 'test',
  storefrontToken: 'abc123',
  storefrontApiVersion: SFAPI_VERSION,
  country: {
    isoCode: 'US',
  },
  language: {
    isoCode: 'EN',
  },
  locale: 'EN-US',
  getStorefrontApiUrl() {
    return '';
  },
  getPublicTokenHeaders() {
    return {};
  },
  getShopifyDomain() {
    return '';
  },
});

type ShopifyProviderProps = {
  children: ReactNode;
  shopifyConfig: ShopifyContextProps;
};

/**
 * The `<ShopifyProvider/>` component enables use of the `useShop()` hook. The component should wrap your app.
 */
export function ShopifyProvider({
  children,
  shopifyConfig,
}: ShopifyProviderProps) {
  if (!shopifyConfig) {
    throw new Error(
      `The 'shopifyConfig' prop must be passed to '<ShopifyProvider/>'`
    );
  }

  if (shopifyConfig.storefrontApiVersion !== SFAPI_VERSION) {
    console.warn(
      `<ShopifyProvider/>: This version of Hydrogen-UI is built for Shopify's Storefront API version ${SFAPI_VERSION}, but it looks like you're using version ${shopifyConfig.storefrontApiVersion}. There may be issues or bugs if you use a mismatched version of Hydrogen-UI and the Storefront API.`
    );
  }

  const finalConfig = useMemo<ShopifyContextValue>(() => {
    const storeDomain = shopifyConfig.storeDomain.replace(/^https?:\/\//, '');

    // @deprecated remove the ability to pass in '.myshopify.com' strings in the future
    if (storeDomain.includes('.myshopify.com')) {
      if (__HYDROGEN_DEV__) {
        console.warn(
          `<ShopifyProvider/>: passing a 'storeDomain' prop that includes '.myshopify.com' will be unsupported in the future. Passing only the subdomain (for example, if the URL is 'test.myshopify.com', passing in 'test') will be the supported way going forward.`
        );
      }
    }

    function getShopifyDomain(overrideProps?: {storeDomain?: string}) {
      let subDomain = overrideProps?.storeDomain ?? storeDomain;
      subDomain = subDomain.replace('.myshopify.com', '');

      return `https://${subDomain}.myshopify.com`;
    }

    return {
      ...shopifyConfig,
      storeDomain,
      getPublicTokenHeaders(overrideProps) {
        return getPublicTokenHeadersRaw(
          overrideProps.contentType,
          shopifyConfig.storefrontApiVersion,
          overrideProps.storefrontToken ?? shopifyConfig.storefrontToken
        );
      },
      getShopifyDomain,
      getStorefrontApiUrl(overrideProps) {
        if (overrideProps?.storeDomain?.includes('.myshopify.com')) {
          if (__HYDROGEN_DEV__) {
            console.warn(
              `<ShopifyProvider/>: passing a 'storeDomain' prop that includes '.myshopify.com' will be unsupported in the future. Passing only the subdomain (for example, if the URL is 'test.myshopify.com', passing in 'test') will be the supported way going forward.`
            );
          }
        }
        return `${getShopifyDomain({
          storeDomain: overrideProps?.storeDomain ?? storeDomain,
        })}/api/${
          overrideProps?.storefrontApiVersion ??
          shopifyConfig.storefrontApiVersion
        }/graphql.json`;
      },
    };
  }, [shopifyConfig]);

  return (
    <ShopifyContext.Provider value={finalConfig}>
      {children}
    </ShopifyContext.Provider>
  );
}

/**
 * Provides access to the `shopifyConfig` prop of `<ShopifyProvider/>`. Must be a descendent of `<ShopifyProvider/>`.
 */
export function useShop() {
  const shopContext = useContext(ShopifyContext);
  if (!shopContext) {
    throw new Error(`'useShop()' must be a descendent of <ShopifyProvider/>`);
  }
  return shopContext;
}

/**
 * Shopify-specific values that are used in various Hydrogen-UI components and hooks.
 */
export type ShopifyContextProps = {
  /** The globally-unique identifier for the Shop */
  storefrontId?: string;
  /** The subdomain of your Shopify storefront URL (eg: `{subdomain}.myshopify.com`). */
  storeDomain: string;
  /** The Storefront API public access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
  storefrontToken: string;
  /** The Storefront API version. This should almost always be the same as the version Hydrogen-UI was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details.  */
  storefrontApiVersion: string;
  country?: ContextCountry;
  language?: ContextLanguage;
  /**
   * The locale string based on `country` and `language`.
   */
  locale?: string;
};

type ContextCountry = {
  /**
   * The code designating a country, which generally follows ISO 3166-1 alpha-2 guidelines. If a territory doesn't have a country code value in the `CountryCode` enum, it might be considered a subdivision of another country. For example, the territories associated with Spain are represented by the country code `ES`, and the territories associated with the United States of America are represented by the country code `US`.
   */
  isoCode: CountryCode;
};

type ContextLanguage = {
  /**
   * `ISO 369` language codes supported by Shopify.
   */
  isoCode: LanguageCode;
};

export type ShopifyContextValue = ShopifyContextProps & ShopifyContextReturn;

type ShopifyContextReturn = {
  /**
   * Creates the fully-qualified URL to your store's GraphQL endpoint.
   *
   * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getStorefrontApiUrl({...})`:
   *
   * - `storeDomain`
   * - `storefrontApiVersion`
   */
  getStorefrontApiUrl: (props?: GetStorefrontApiUrlProps) => string;
  /**
   * Returns an object that contains headers that are needed for each query to Storefront API GraphQL endpoint. This uses the public Storefront API token.
   *
   * By default, it will use the config you passed in when creating `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getPublicTokenHeaders({...})`:
   *
   * - `contentType`
   * - `storefrontToken`
   *
   */
  getPublicTokenHeaders: (
    props: GetPublicTokenHeadersProps
  ) => Record<string, string>;
  /**
   * Creates the fully-qualified URL to your myshopify.com domain.
   *
   * By default, it will use the config you passed in when calling `<ShopifyProvider/>`. However, you can override the following settings on each invocation of `getShopifyDomain({...})`:
   *
   * - `storeDomain`
   */
  getShopifyDomain: (props?: GetShopifyDomainProps) => string;
};

type GetStorefrontApiUrlProps = {
  /** The host name of the domain (eg: `{shop}.myshopify.com`). */
  storeDomain?: string;
  /** The Storefront API version. This should almost always be the same as the version Hydrogen-UI was built for. Learn more about Shopify [API versioning](https://shopify.dev/api/usage/versioning) for more details. */
  storefrontApiVersion?: string;
};

type GetPublicTokenHeadersProps = {
  /**
   * Customizes which `"content-type"` header is added when using `getPrivateTokenHeaders()` and `getPublicTokenHeaders()`. When fetching with a `JSON.stringify()`-ed `body`, use `"json"`. When fetching with a `body` that is a plain string, use `"graphql"`. Defaults to `"json"`
   */
  contentType: 'json' | 'graphql';
  /** The Storefront API access token. Refer to the [authentication](https://shopify.dev/api/storefront#authentication) documentation for more details. */
  storefrontToken?: string;
};

type GetShopifyDomainProps = {storeDomain?: string};

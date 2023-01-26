import type {Product, ProductVariant} from './storefront-api-types.js';
import {AnalyticsEventName, ShopifyAppSource} from './analytics-constants.js';
import {SHOPIFY_Y, SHOPIFY_S} from './cart-constants.js';

export type ClientBrowserParameters = {
  /** Shopify unique user token: Value of `_shopify_y` cookie */
  uniqueToken: string;
  /** Shopify session token: Value of `_shopify_s` cookie */
  visitToken: string;
  /** `window.location.href` */
  url: string;
  /** `window.location.pathname` */
  path: string;
  /** `window.location.href` */
  search: string;
  /** `window.location.search` */
  referrer: string;
  /** `document.referrer` */
  title: string;
  /** `navigator.userAgent` */
  userAgent: string;
  /** 'navigate' | 'reload' | 'back_forward' | 'prerender' | 'unknown <number>' */
  navigationType: string;
  /** 'PerformanceNavigationTiming' | 'performance.navigation' */
  navigationApi: string;
};

export type ShopifyAnalyticsProduct = {
  productGid: Product['id'];
  variantGid?: ProductVariant['id'];
  name: Product['title'];
  variantName?: ProductVariant['title'];
  brand: Product['vendor'];
  category?: Product['productType'];
  price: ProductVariant['price']['amount'];
  sku?: ProductVariant['sku'];
  quantity?: number;
};

export type ShopifyAppSources = keyof typeof ShopifyAppSource;
export type AnalyticsEventNames = keyof typeof AnalyticsEventName;

export type ShopifyCommonPayload = ClientBrowserParameters & {
  shopifyAppSource?: ShopifyAppSources;
  hasUserConsent: boolean;
  shopId: string;
  currency: string;
  storefrontId?: string;
  acceptedLanguage?: string;
  customerId?: string;
  totalValue?: number;
  products?: ShopifyAnalyticsProduct[];
};

export type ShopifyPageViewPayload = ShopifyCommonPayload & {
  canonicalUrl?: string;
  pageType?: string;
  resourceId?: string;
  collectionHandle?: string;
  searchString?: string;
};

export type ShopifyPageView = {
  eventName: string;
  payload: ShopifyPageViewPayload;
};

export type ShopifyAddToCartPayload = ShopifyCommonPayload & {
  /** The cart's ID if it has been created through the Storefront API. */
  cartId: string;
};

export type ShopifyAddToCart = {
  eventName: string;
  payload: ShopifyAddToCartPayload;
};

export type ShopifyMonorailPayload = {
  products?: string[];
  [key: string]: unknown;
};

export type ShopifyMonorailEvent = {
  schema_id: string;
  payload: ShopifyMonorailPayload;
  metadata: {
    event_created_at_ms: number;
  };
};

export type ShopifyAnalyticsPayload =
  | ShopifyPageViewPayload
  | ShopifyAddToCartPayload;
export type ShopifyAnalytics = ShopifyPageView | ShopifyAddToCart;

export type ShopifyCookies = {
  [SHOPIFY_Y]: string;
  [SHOPIFY_S]: string;
};

export type ShopifyGId = {
  id: string;
  resource: string | null;
};

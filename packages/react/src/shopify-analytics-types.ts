import {AnalyticsEventName} from "./shopify-analytics/shopify-analytics-constants";

export type ClientBrowserParameters = {
  uniqueToken: string;
  visitToken: string;
  url: string;
  path: string;
  search: string;
  referrer: string;
  title: string;
  userAgent: string;
  navigationType: string;
  navigationApi: string;
};

export type ShopifyCommonPayload = ClientBrowserParameters & {
  hasUserConsent: boolean;
  shopId: string | number;
  currency: string;
  storefrontId?: string;
  acceptedLanguage?: string;
  customerId?: string;
  totalValue?: string;
  products?: [];
};

export type ShopifyPageViewPayload = ShopifyCommonPayload & {
  canonicalUrl?: string;
  pageType?: string;
  resourceId?: string;
  collectionHandle?: string;
  searchString?: string;
};

export type ShopifyPageView = {
  eventName: AnalyticsEventName.PAGE_VIEW,
  payload: ShopifyPageViewPayload
}

export type ShopifyAddToCartPayload = ShopifyCommonPayload & {
  cartToken: string;
};

export type ShopifyAddToCart = {
  eventName: AnalyticsEventName.ADD_TO_CART,
  payload: ShopifyAddToCartPayload,
}

export type ShopifyMonorailPayload = Record<string, unknown>;
export type ShopifyAnalyticsPayload = ShopifyPageViewPayload | ShopifyAddToCartPayload;
export type ShopifyAnalytics = ShopifyPageView | ShopifyAddToCart;

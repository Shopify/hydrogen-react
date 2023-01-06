import {
  ShopifyAnalyticsPayload,
  ShopifyPageViewPayload,
  ShopifyAddToCartPayload,
  ShopifyMonorailPayload,
} from "../../shopify-analytics-types";
import { AnalyticsPageType } from "../shopify-analytics-constants";
import {addDataIf, schemaWrapper, stripGId, stripId} from "../shopify-analytics-utils";
import {buildUUID} from "../shopify-cookies-utils";

const SCHEMA_ID = 'custom_storefront_customer_tracking/1.0';
const PAGE_RENDERED_EVENT_NAME = 'page_rendered';
const COLLECTION_PAGE_RENDERED_EVENT_NAME = 'collection_page_rendered';
const PRODUCT_PAGE_RENDERED_EVENT_NAME = 'product_page_rendered';
const PRODUCT_ADDED_TO_CART_EVENT_NAME = 'product_added_to_cart';
const SEARCH_SUBMITTED_EVENT_NAME = 'search_submitted';

export function pageView(payload: ShopifyAnalyticsPayload): ShopifyMonorailPayload[] {
  const pageViewPayload = payload as ShopifyPageViewPayload;
  const additionalPayload = {
    canonical_url: pageViewPayload.canonicalUrl || pageViewPayload.url,
    customerId: pageViewPayload.customerId,
  };
  const pageType = pageViewPayload.pageType;
  const pageViewEvents = [];

  pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PAGE_RENDERED_EVENT_NAME,
    ...additionalPayload,
  }, formatPayload(pageViewPayload))));

  if(pageType === AnalyticsPageType.collection) {
    pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
      event_name: COLLECTION_PAGE_RENDERED_EVENT_NAME,
      ...additionalPayload,
      collection_name: pageViewPayload.collectionHandle,
    }, formatPayload(pageViewPayload))));
  }

  if(pageType === AnalyticsPageType.product) {
    pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
      event_name: PRODUCT_PAGE_RENDERED_EVENT_NAME,
      ...additionalPayload,
      collection_name: pageViewPayload.collectionHandle,
      products: pageViewPayload.products,
      total_value: pageViewPayload.totalValue,
    }, formatPayload(pageViewPayload))));
  }

  if(pageType === AnalyticsPageType.search) {
    pageViewEvents.push(schemaWrapper(SCHEMA_ID, addDataIf({
      event_name: SEARCH_SUBMITTED_EVENT_NAME,
      ...additionalPayload,
      search_string: pageViewPayload.searchString,
    }, formatPayload(pageViewPayload))));
  }

  return pageViewEvents;
}

export function addToCart(payload: ShopifyAnalyticsPayload): ShopifyMonorailPayload[] {
  const addToCartPayload = payload as ShopifyAddToCartPayload
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    event_name: PRODUCT_ADDED_TO_CART_EVENT_NAME,
    customerId: addToCartPayload.customerId,
    cart_token: stripId(addToCartPayload.cartToken),
    total_value: addToCartPayload.totalValue,
    products: addToCartPayload.products
  }, formatPayload(addToCartPayload)))];
}

function formatPayload(payload: ShopifyAnalyticsPayload): ShopifyMonorailPayload {
  return {
    source: 'hydrogen',
    hydrogenSubchannelId: payload.storefrontId || '0',

    is_persistent_cookie: payload.hasUserConsent,
    ccpa_enforced: false,
    gdpr_enforced: false,
    unique_token: payload.uniqueToken,
    event_time: Date.now(),
    event_id: buildUUID(),

    event_source_url: payload.url,
    referrer: payload.referrer,
    user_agent: payload.userAgent,
    navigation_type: payload.navigationType,
    navigation_api: payload.navigationApi,

    shop_id: stripGId(payload.shopId),
    currency: payload.currency,
  };
}

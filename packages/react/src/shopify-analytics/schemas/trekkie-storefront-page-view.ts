import {
  ShopifyAnalyticsPayload,
  ShopifyPageViewPayload,
  ShopifyMonorailPayload,
} from "../../shopify-analytics-types";
import {addDataIf, schemaWrapper, stripGId, getResourceType} from "../shopify-analytics-utils";
import {buildUUID} from "../shopify-cookies-utils";

const SCHEMA_ID = 'trekkie_storefront_page_view/1.4';
const oxygenDomain = 'myshopify.dev';

export function pageView(payload: ShopifyAnalyticsPayload): ShopifyMonorailPayload[] {
  const pageViewPayload = payload as ShopifyPageViewPayload;
  return [schemaWrapper(SCHEMA_ID, addDataIf({
    pageType: pageViewPayload.pageType,
    customerId: pageViewPayload.customerId,
    resourceType: getResourceType(pageViewPayload.resourceId),
    resourceId: stripGId(pageViewPayload.resourceId),
  }, formatPayload(pageViewPayload)))];
}

function formatPayload(payload: ShopifyAnalyticsPayload): ShopifyMonorailPayload {
  return {
    appClientId: '6167201',
    isMerchantRequest: isMerchantRequest(payload.url),
    hydrogenSubchannelId: payload.storefrontId || '0',

    isPersistentCookie: payload.hasUserConsent,
    uniqToken: payload.uniqueToken,
    visitToken: payload.visitToken,
    microSessionId: buildUUID(),
    microSessionCount: 1,

    url: payload.url,
    path: payload.path,
    search: payload.search,
    referrer: payload.referrer,
    title: payload.title,

    shopId: stripGId(payload.shopId),
    currency: payload.currency,
    contentLanguage: payload.acceptedLanguage || 'en',
  };
}

function isMerchantRequest(url: string): Boolean {
  const hostname = new URL(url).hostname;
  if (hostname.indexOf(oxygenDomain) !== -1 || hostname === 'localhost') {
    return true;
  }
  return false;
}

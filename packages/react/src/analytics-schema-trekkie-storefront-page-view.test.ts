import {expectType} from 'ts-expect';
import {ShopifyAppSource} from './analytics-constants.js';
import * as TrekkieStorefrontPageView from './analytics-schema-trekkie-storefront-page-view.js';
import {BASE_PAYLOAD} from './analytics-schema.test.helpers.js';
import type {ShopifyMonorailPayload} from './analytics-types.js';

describe(`analytics schema - trekkie storefront page view`, () => {
  it(`base payload with default values`, () => {
    const pageViewPayload = BASE_PAYLOAD;
    const events = TrekkieStorefrontPageView.pageView(pageViewPayload);

    expectType<ShopifyMonorailPayload[]>(events);
    expect(events.length).toBe(1);
    expect(events[0]).toEqual({
      schema_id: 'trekkie_storefront_page_view/1.4',
      payload: {
        ...getForwardedPayload(pageViewPayload),
        appClientId: '12875497473',
        isMerchantRequest: true,
        hydrogenSubchannelId: '0',
        isPersistentCookie: true,
        contentLanguage: 'en'
      },
      metadata: {
        event_created_at_ms: expect.any(Number),
      }
    });
  });

  it(`base payload with non-default values`, () => {
    const pageViewPayload = {
      ...BASE_PAYLOAD,
      hasUserConsent: false,
      url: 'https://example.com',
      shopifyAppSource: ShopifyAppSource.hydrogen,
      storefrontId: '1',
      acceptedLanguage: 'fr',
      customerId: '1',
      pageType: 'product',
      resourceId: 'gid://shopify/Product/1',
    };
    const events = TrekkieStorefrontPageView.pageView(pageViewPayload);

    expectType<ShopifyMonorailPayload[]>(events);
    expect(events.length).toBe(1);
    expect(events[0]).toEqual({
      schema_id: 'trekkie_storefront_page_view/1.4',
      payload: {
        ...getForwardedPayload(pageViewPayload),
        appClientId: '6167201',
        isMerchantRequest: false,
        hydrogenSubchannelId: '1',
        isPersistentCookie: false,
        pageType: 'product',
        contentLanguage: 'fr',
        customerId: '1',
        resourceId: 1,
        resourceType: 'product',
      },
      metadata: {
        event_created_at_ms: expect.any(Number),
      }
    });
  });

  it(`base payload with oxygen domain url`, () => {
    const pageViewPayload = {
      ...BASE_PAYLOAD,
      url: 'my-shop.myshopify.dev',
    };
    const events = TrekkieStorefrontPageView.pageView(pageViewPayload);

    expectType<ShopifyMonorailPayload[]>(events);
    expect(events.length).toBe(1);
    expect(events[0]).toEqual({
      schema_id: 'trekkie_storefront_page_view/1.4',
      payload: {
        ...getForwardedPayload(pageViewPayload),
        appClientId: '12875497473',
        isMerchantRequest: false,
        hydrogenSubchannelId: '0',
        isPersistentCookie: true,
        contentLanguage: 'en'
      },
      metadata: {
        event_created_at_ms: expect.any(Number),
      }
    });
  });
});

export function getForwardedPayload(initPayload: any) {
  return {
    uniqToken: initPayload.uniqueToken,
    visitToken: initPayload.visitToken,
    microSessionId: expect.any(String),
    microSessionCount: 1,
    url: initPayload.url,
    path: initPayload.path,
    search: initPayload.search,
    referrer: initPayload.referrer,
    title: initPayload.title,
    shopId: initPayload.shopId,
    currency: initPayload.currency,
  }
}

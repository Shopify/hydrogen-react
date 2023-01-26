import type {
  ShopifyAddToCartPayload,
  ShopifyAnalytics,
  ShopifyPageViewPayload,
  ShopifyMonorailEvent,
} from './analytics-types.js';
import {AnalyticsEventName} from './analytics-constants.js';
import {pageView as trekkiePageView} from './analytics-schema-trekkie-storefront-page-view.js';
import {
  pageView as customerPageView,
  addToCart as customerAddToCart,
} from './analytics-schema-custom-storefront-customer-tracking.js';

export function sendShopifyAnalytics(
  {eventName, payload}: ShopifyAnalytics,
  shopDomain?: string
): Promise<void> {
  let events: ShopifyMonorailEvent[] = [];

  if (eventName === AnalyticsEventName.PAGE_VIEW) {
    const pageViewPayload = payload as ShopifyPageViewPayload;
    events = events.concat(
      trekkiePageView(pageViewPayload),
      customerPageView(pageViewPayload)
    );
  } else if (eventName === AnalyticsEventName.ADD_TO_CART) {
    events = events.concat(
      customerAddToCart(payload as ShopifyAddToCartPayload)
    );
  }

  if (events.length) {
    return sendToShopify(events, shopDomain);
  } else {
    return Promise.resolve();
  }
}

type MonorailResponse = {
  status: number;
  message: string;
};

const ERROR_MESSAGE = 'sendShopifyAnalytics request is unsuccessful';

function sendToShopify(
  events: ShopifyMonorailEvent[],
  shopDomain?: string
): Promise<void> {
  const eventsToBeSent = {
    events,
    metadata: {
      event_sent_at_ms: Date.now(),
    },
  };

  try {
    return fetch(
      shopDomain
        ? `https://${shopDomain}/.well-known/shopify/monorail/unstable/produce_batch`
        : 'https://monorail-edge.shopifysvc.com/unstable/produce_batch',
      {
        method: 'post',
        headers: {
          'content-type': 'text/plain',
        },
        body: JSON.stringify(eventsToBeSent),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response failed');
        }
        return response.text();
      })
      .then((data) => {
        if (data) {
          const jsonResponse = JSON.parse(data);
          jsonResponse.result.forEach((eventResponse: MonorailResponse) => {
            if (eventResponse.status !== 200) {
              console.error(ERROR_MESSAGE, '\n\n', eventResponse.message);
            }
          });
        }
      })
      .catch((err) => {
        console.error(ERROR_MESSAGE, err);
        if (__HYDROGEN_DEV__) {
          throw new Error(ERROR_MESSAGE);
        }
      });
  } catch (error) {
    // Do nothing
    return Promise.resolve();
  }
}

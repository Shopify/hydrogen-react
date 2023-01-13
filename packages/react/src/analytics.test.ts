import {vi, afterEach} from 'vitest'
import {AnalyticsEventName} from "./analytics-constants";
import {BASE_PAYLOAD} from "./analytics-schema.test.helpers";
import {sendShopifyAnalytics} from "./analytics.js";

const MONORAIL_ENDPOINT = 'https://monorail-edge.shopifysvc.com/unstable/produce_batch';
const createFetchSpy = ({
  expectEventCounts,
}: {
  expectEventCounts: number
}) => {
  const mockFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    // Mock Monorail endpoint
    if(input === MONORAIL_ENDPOINT) {
      if (init?.body) {
        const reqData = await init.body.toString();
        const data = JSON.parse(reqData || '{}');

        // If this expect fails, it will be captured by the
        // spy function on console.error
        expect(data.events.length).toEqual(expectEventCounts);

        // Mock Monorail returning a multi-status response
        if(!data.events[0].payload.shopId && !data.events[0].payload.shop_id) {
          return new Promise((resolve) => {
            resolve(new Response(
              JSON.stringify({
                result: [
                  {
                    status: 400,
                    message: 'Schema validation error'
                  }
                ]
              }),
              {
                status: 207,
              }
            ));
          });
        }
      }

      // Mock Monorail returning a 200 response
      return new Promise((resolve) => {
        resolve(new Response('', {
          status: 200,
        }));
      });
    }

    throw new Error('Analytics fetch mock - request not handled');
  }
  return vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
};
const createConsoleErrorSpy = () => {
  return vi.spyOn(console, 'error').mockImplementation(() => {});
};

describe('analytics', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('sendShopifyAnalytics', () => {
    it('with base payload', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 2});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
        }
      });

      expect(fetchSpy).toBeCalled();
      expect(consoleErrorSpy).not.toBeCalled()
    });

    it('with error payload', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 2});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
          shopId: 'NaN',
        }
      });

      expect(fetchSpy).toBeCalled();
      expect(consoleErrorSpy).toBeCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toBe('sendShopifyAnalytics request is unsuccessful');
    });

    it('with a product payload', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 3});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
          pageType: 'product'
        }
      });

      expect(fetchSpy).toBeCalled();
      expect(consoleErrorSpy).not.toBeCalled()
    });

    it('with a product payload', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 1});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.ADD_TO_CART,
        payload: {
          ...BASE_PAYLOAD,
          cartId: 'gid://shopify/Cart/abc123',
        }
      });

      expect(fetchSpy).toBeCalled();
      expect(consoleErrorSpy).not.toBeCalled()
    });
  });
});

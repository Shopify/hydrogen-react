import {vi, afterEach} from 'vitest';
import {AnalyticsEventName} from './analytics-constants.js';
import {BASE_PAYLOAD} from './analytics-schema.test.helpers.js';
import {getClientBrowserParameters, sendShopifyAnalytics} from './analytics.js';

const MONORAIL_ENDPOINT =
  'https://monorail-edge.shopifysvc.com/unstable/produce_batch';
const createFetchSpy = ({expectEventCounts}: {expectEventCounts: number}) => {
  const mockFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    // Mock Monorail endpoint
    if (input === MONORAIL_ENDPOINT) {
      if (init?.body) {
        const reqData = await init.body.toString();
        const data = JSON.parse(reqData || '{}');

        // If this expect fails, it will be captured by the
        // spy function on console.error
        expect(data.events.length).toEqual(expectEventCounts);

        // Mock Monorail returning a multi-status response
        if (!data.events[0].payload.shopId && !data.events[0].payload.shop_id) {
          return new Promise((resolve) => {
            resolve(
              new Response(
                JSON.stringify({
                  result: [
                    {
                      status: 400,
                      message: 'Schema validation error',
                    },
                  ],
                }),
                {
                  status: 207,
                }
              )
            );
          });
        }
      }

      // Mock Monorail returning a 200 response
      return new Promise((resolve) => {
        resolve(
          new Response('', {
            status: 200,
          })
        );
      });
    }

    throw new Error('Analytics fetch mock - request not handled');
  };
  return vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
};
const createConsoleErrorSpy = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return vi.spyOn(console, 'error').mockImplementation(() => {});
};
const originalDocument = document;
const originalPerformance = performance;
const originalPerformanceNavigation = global.PerformanceNavigation;

describe('analytics', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document = originalDocument;
    performance = originalPerformance;
    global.PerformanceNavigation =originalPerformanceNavigation;
  });

  describe('sendShopifyAnalytics', () => {
    it('with a page view event', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 2});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
        },
      });

      expect(fetchSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('with a page view event that has a bad payload', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 2});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
          shopId: 'NaN',
        },
      });

      expect(fetchSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toBe(
        'sendShopifyAnalytics request is unsuccessful'
      );
    });

    it('with a product page view event', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 3});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.PAGE_VIEW,
        payload: {
          ...BASE_PAYLOAD,
          pageType: 'product',
        },
      });

      expect(fetchSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('with an add to cart event', async () => {
      const consoleErrorSpy = createConsoleErrorSpy();
      const fetchSpy = createFetchSpy({expectEventCounts: 1});

      await sendShopifyAnalytics({
        eventName: AnalyticsEventName.ADD_TO_CART,
        payload: {
          ...BASE_PAYLOAD,
          cartId: 'gid://shopify/Cart/abc123',
        },
      });

      expect(fetchSpy).toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('getClientBrowserParameters', () => {
    it('errors and returns empty object when executed on server side', () => {
      // @ts-ignore
      document = undefined;
      const consoleErrorSpy = createConsoleErrorSpy();
      const browserParams = getClientBrowserParameters();

      expect(browserParams).toEqual({});
      expect(consoleErrorSpy.mock.calls[0][0]).toBe(
        'getClientBrowserParameters should only be used within the useEffect callback or event handlers'
      );
    });

    it('returns browser parameters when executed on client side', () => {
      // @ts-ignore
      document = {
        title: 'test',
        referrer: 'https://www.example.com',
        cookie: '_shopify_y=abc123; _shopify_s=def456'
      };

      const consoleErrorSpy = createConsoleErrorSpy();
      const browserParams = getClientBrowserParameters();

      expect(browserParams).toEqual({
        uniqueToken: 'abc123',
        visitToken: 'def456',
        url: expect.any(String),
        path: '',
        search: '',
        referrer: 'https://www.example.com',
        title: 'test',
        userAgent: expect.any(String),
        navigationType: 'unknown',
        navigationApi: 'unknown',
      });
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('returns PerformanceNavigationTiming reload navigation api types', () => {
      // @ts-ignore
      document = {
        cookie: '',
        title: '',
        referrer: '',
      };
      // @ts-ignore
      performance = {
        // @ts-ignore
        getEntriesByType: () => {
          return [{
            type: 'reload'
          }];
        }
      }

      const consoleErrorSpy = createConsoleErrorSpy();
      const browserParams = getClientBrowserParameters();

      expect(browserParams.navigationType).toEqual('reload');
      expect(browserParams.navigationApi).toEqual('PerformanceNavigationTiming');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('returns performance.navigation api types', () => {
      // @ts-ignore
      document = {
        cookie: '',
        title: '',
        referrer: '',
      };
      // @ts-ignore
      global.PerformanceNavigation = {
        TYPE_NAVIGATE: 1,
        TYPE_RELOAD: 2,
        TYPE_BACK_FORWARD: 3,
      }
      // @ts-ignore
      performance = {
        // @ts-ignore
        navigation: {
          type: PerformanceNavigation.TYPE_NAVIGATE,
        }
      }

      const consoleErrorSpy = createConsoleErrorSpy();
      let browserParams = getClientBrowserParameters();

      expect(browserParams.navigationType).toEqual('navigate');
      expect(browserParams.navigationApi).toEqual('performance.navigation');

      // @ts-ignore
      performance.navigation.type = PerformanceNavigation.TYPE_RELOAD;
      browserParams = getClientBrowserParameters();
      expect(browserParams.navigationType).toEqual('reload');
      expect(browserParams.navigationApi).toEqual('performance.navigation');

      // @ts-ignore
      performance.navigation.type = PerformanceNavigation.TYPE_BACK_FORWARD;
      browserParams = getClientBrowserParameters();
      expect(browserParams.navigationType).toEqual('back_forward');
      expect(browserParams.navigationApi).toEqual('performance.navigation');

      // @ts-ignore
      performance.navigation.type = 4;
      browserParams = getClientBrowserParameters();
      expect(browserParams.navigationType).toEqual('unknown: 4');
      expect(browserParams.navigationApi).toEqual('performance.navigation');

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});

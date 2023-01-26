import {SHOPIFY_S, SHOPIFY_Y} from './cart-constants.js';
import type {ClientBrowserParameters} from './analytics-types.js';
import {errorIfServer} from './analytics-utils.js';
import {getShopifyCookies} from './cookies-utils.js';

export function getClientBrowserParameters(): ClientBrowserParameters {
  if (errorIfServer('getClientBrowserParameters')) {
    return {
      uniqueToken: '',
      visitToken: '',
      url: '',
      path: '',
      search: '',
      referrer: '',
      title: '',
      userAgent: '',
      navigationType: '',
      navigationApi: '',
    };
  }

  const [navigationType, navigationApi] = getNavigationType();
  const cookies = getShopifyCookies(document.cookie);

  return {
    uniqueToken: cookies[SHOPIFY_Y],
    visitToken: cookies[SHOPIFY_S],
    url: location.href,
    path: location.pathname,
    search: location.search,
    referrer: document.referrer,
    title: document.title,
    userAgent: navigator.userAgent,
    navigationType,
    navigationApi,
  };
}

function getNavigationTypeExperimental(): string | undefined {
  try {
    const navigationEntries =
      performance?.getEntriesByType &&
      performance?.getEntriesByType('navigation');

    if (navigationEntries && navigationEntries[0]) {
      // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
      const rawType = (
        window.performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming
      )['type'];
      const navType = rawType && rawType.toString();

      return navType;
    }
  } catch (err) {
    // Do nothing
  }
  return undefined;
}

function getNavigationTypeLegacy(): string | undefined {
  try {
    if (
      PerformanceNavigation &&
      performance?.navigation?.type !== null &&
      performance?.navigation?.type !== undefined
    ) {
      //  https://developer.mozilla.org/en-US/docs/Web/API/Performance/navigation
      const rawType = performance.navigation.type;
      switch (rawType) {
        case PerformanceNavigation.TYPE_NAVIGATE:
          return 'navigate';
          break;
        case PerformanceNavigation.TYPE_RELOAD:
          return 'reload';
          break;
        case PerformanceNavigation.TYPE_BACK_FORWARD:
          return 'back_forward';
          break;
        default:
          return `unknown: ${rawType}`;
      }
    }
  } catch (err) {
    // do nothing
  }
  return undefined;
}

function getNavigationType(): [string, string] {
  try {
    let navApi = 'PerformanceNavigationTiming';
    let navType = getNavigationTypeExperimental();
    if (!navType) {
      navType = getNavigationTypeLegacy();
      navApi = 'performance.navigation';
    }
    if (navType) {
      return [navType, navApi];
    } else {
      return ['unknown', 'unknown'];
    }
  } catch (err) {
    // do nothing
  }
  return ['error', 'error'];
}

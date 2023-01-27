import {useEffect} from 'react';
import {stringify} from 'worktop/cookie';
import {SHOPIFY_Y, SHOPIFY_S} from './cart-constants.js';
import {buildUUID, getShopifyCookies} from './cookies-utils.js';

const longTermLength = 60 * 60 * 24 * 360 * 1; // ~1 year expiry
const shortTermLength = 60 * 30; // 30 mins

/**
 * Set user and session cookies and refresh the expiry time
 * @param {boolean} hasUserConsent Defaults to false.
 *   If set to `false`, Shopify cookies will be removed.
 *   If set to `true`, Shopify unique user token cookie expiry to 1 year
 * @param {string} domain The domain scope of the cookie. Defaults to empty string.
 */
export function useShopifyCookies(hasUserConsent = false, domain = ''): void {
  useEffect(() => {
    const cookies = getShopifyCookies(document.cookie);

    /**
     * Set user and session cookies and refresh the expiry time
     */
    if (hasUserConsent) {
      setCookie(
        SHOPIFY_Y,
        cookies[SHOPIFY_Y] || buildUUID(),
        longTermLength,
        domain
      );
      setCookie(
        SHOPIFY_S,
        cookies[SHOPIFY_S] || buildUUID(),
        shortTermLength,
        domain
      );
    } else {
      setCookie(SHOPIFY_Y, '', 0, domain);
      setCookie(SHOPIFY_S, '', 0, domain);
    }
  });
}

function setCookie(
  name: string,
  value: string,
  maxage: number,
  domain: string
): void {
  document.cookie = stringify(name, value, {
    maxage,
    domain,
    samesite: 'Lax',
    path: '/',
  });
}

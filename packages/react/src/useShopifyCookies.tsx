import {useEffect} from 'react';
import {stringify} from 'worktop/cookie';
import {SHOPIFY_Y, SHOPIFY_S} from './cart-constants.js';
import {buildUUID, getShopifyCookies} from './cookies-utils.js';

const longTermLength = 60 * 60 * 24 * 360 * 1; // ~1 year expiry
const shortTermLength = 60 * 30; // 30 mins

/**
 * If no consent given:
 * POLICY_NO_COOKIE: Do not set a cookie
 * POLICY_SESSIONIZED: Set a session cookie
 * POLICY_SHORT_TERM: Set a short-term cookie
 */

export type NoConsentCookiePolicy =
  | 'POLICY_NO_COOKIE'
  | 'POLICY_SESSIONIZED'
  | 'POLICY_SHORT_TERM';

export const POLICY_NO_COOKIE: NoConsentCookiePolicy = 'POLICY_NO_COOKIE';
export const POLICY_SESSIONIZED: NoConsentCookiePolicy = 'POLICY_SESSIONIZED';
export const POLICY_SHORT_TERM: NoConsentCookiePolicy = 'POLICY_SHORT_TERM';
export const ALL_POLICIES: Set<NoConsentCookiePolicy> = new Set([
  POLICY_NO_COOKIE,
  POLICY_SESSIONIZED,
  POLICY_SHORT_TERM,
]);

/**
 * Set user and session cookies and refresh the expiry time
 * @param hasUserConsent - Defaults to false. If hasUserConsent is true, we can set Shopify unique user
 * token cookie for 1 year; otherwise, do what policyForNoConsent specifies
 * @param domain - The domain scope of the cookie
 * @param policyForNoConsent - One of POLICY_NO_COOKIE, POLICY_SESSIONIZED, POLICY_SHORT_TERM:
 * what to do if no consent given
 * @example
 * ```tsx
 * import {useShopifyCookies, POLICY_NO_COOKIE} from '@shopify/hydrogen-react';
 *
 * useShopifyCookies(true, 'my-shop.com', )
 * useShopifyCookies(false, 'my-shop.com', POLICY_NO_COOKIE)
 * ```
 */

export const DEFAULT_NO_CONSENT_POLICY = POLICY_SHORT_TERM;
export function useShopifyCookies(
  hasUserConsent = false,
  domain = '',
  policyForNoConsent: NoConsentCookiePolicy = DEFAULT_NO_CONSENT_POLICY
): void {
  useEffect(() => {
    let policy: NoConsentCookiePolicy = policyForNoConsent;
    /**
     * Even though TypeScript wouldn't allow this, the library may end up
     * being called in a non-TS world, and we have to fall back to the
     * compliant choice.
     */

    if (!ALL_POLICIES.has(policyForNoConsent)) {
      policy = DEFAULT_NO_CONSENT_POLICY;
    }

    /**
     * Choose how to deal with no consent given.
     * This is done with the assumption we DON'T get consent.
     */
    if (!hasUserConsent && policy === POLICY_NO_COOKIE) {
      deleteCookie(SHOPIFY_Y, domain);
      deleteCookie(SHOPIFY_S, domain);
      return;
    }

    const cookies = getShopifyCookies(document.cookie);

    let maxage: number | undefined;
    if (policy === POLICY_SHORT_TERM) {
      maxage = shortTermLength;
    } else if (policy === POLICY_SESSIONIZED) {
      maxage = undefined;
    }

    /**
     * Set user and session cookies and refresh the expiry time
     */
    setCookie(
      SHOPIFY_Y,
      cookies[SHOPIFY_Y] || buildUUID(),
      domain,
      hasUserConsent ? longTermLength : maxage
    );
    setCookie(
      SHOPIFY_S,
      cookies[SHOPIFY_S] || buildUUID(),
      domain,
      hasUserConsent ? shortTermLength : maxage
    );
  });
}

function deleteCookie(name: string, domain: string) {
  document.cookie = stringify(name, '', {
    domain,
    path: '/',
    expires: new Date('1970-01-01T00:00:00.000Z'),
  });
}

function setCookie(
  name: string,
  value: string,
  domain: string,
  maxage?: number
): void {
  document.cookie = stringify(name, value, {
    // undefined maxage and expires create a session cookie
    maxage,
    domain,
    samesite: 'Lax',
    path: '/',
  });
}

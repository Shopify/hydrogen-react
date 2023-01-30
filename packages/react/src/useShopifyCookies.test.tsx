import {afterEach} from 'vitest';
import {renderHook} from '@testing-library/react';
import {getShopifyCookies} from './cookies-utils.js';
import {
  POLICY_NO_COOKIE,
  POLICY_SESSIONIZED,
  POLICY_SHORT_TERM,
  useShopifyCookies,
} from './useShopifyCookies.js';
import {parse} from 'worktop/cookie';

type MockCookieJar = Record<
  string,
  {
    maxage?: number;
    expires?: Date;
    samesite?: string;
    path?: string;
    domain?: string;
    value: string;
  }
>;

function mockCookie(): MockCookieJar {
  const cookieJar: MockCookieJar = {};

  vi.spyOn(document, 'cookie', 'get').mockImplementation(() => {
    let docCookie = '';
    Object.keys(cookieJar).forEach((key: string) => {
      docCookie += `${key}=${cookieJar[key].value};`;
    });
    return docCookie;
  });

  vi.spyOn(document, 'cookie', 'set').mockImplementation(
    (cookieString: string) => {
      const {domain, maxage, path, samesite, expires, ...cookieKeyValuePair} =
        parse(cookieString);
      const cookieName = Object.keys(cookieKeyValuePair)[0]; // WTF?

      if (maxage || (expires && expires.getUTCFullYear() > 2000)) {
        cookieJar[cookieName] = {
          value: cookieKeyValuePair[cookieName],
          maxage,
          path,
          expires,
          samesite,
          domain,
        };
      } else {
        if (!expires) {
          // session cookie === no maxage && no expires
          cookieJar[cookieName] = {
            value: cookieKeyValuePair[cookieName],
            path,
            samesite,
            domain,
          };
        } else {
          // delete cookie
          delete cookieJar[cookieName];
        }
      }
    }
  );
  return cookieJar;
}

describe(`useShopifyCookies`, () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sets _shopify_s and _shopify_y cookies when not found', () => {
    const cookieJar: MockCookieJar = mockCookie();
    let cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: '',
      _shopify_y: '',
    });

    renderHook(() => useShopifyCookies());

    cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: expect.any(String),
      _shopify_y: expect.any(String),
    });
    expect(cookies['_shopify_s']).not.toBe('');
    expect(cookies['_shopify_y']).not.toBe('');

    expect(cookieJar['_shopify_s'].value).not.toBe(
      cookieJar['_shopify_y'].value
    );
    expect(cookieJar['_shopify_s'].maxage).toBe(1800);
    expect(cookieJar['_shopify_y'].maxage).toBe(1800);
  });

  it('does not override cookies when it already exists', () => {
    const cookieJar: MockCookieJar = mockCookie();
    document.cookie = '_shopify_s=abc123; Max-Age=1800;';
    document.cookie = '_shopify_y=def456; Max-Age=1800;';

    renderHook(() => {
      useShopifyCookies();
    });

    const cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: 'abc123',
      _shopify_y: 'def456',
    });
    expect(Object.keys(cookieJar).length).toBe(2);
  });

  it('sets new cookie if either cookie is missing', () => {
    const cookieJar: MockCookieJar = mockCookie();
    document.cookie = '_shopify_s=abc123; Max-Age=1800;';

    renderHook(() => useShopifyCookies());

    let cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: 'abc123',
      _shopify_y: expect.any(String),
    });
    expect(cookies['_shopify_y']).not.toBe('');
    expect(Object.keys(cookieJar).length).toBe(2);

    document.cookie = '_shopify_s=1; expires=1 Jan 1970 00:00:00 GMT;';
    document.cookie = '_shopify_y=def456; Max-Age=1800;';

    renderHook(() => useShopifyCookies());

    cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: expect.any(String),
      _shopify_y: 'def456',
    });
    expect(cookies['_shopify_s']).not.toBe('');
    expect(Object.keys(cookieJar).length).toBe(2);
  });

  it('sets _shopify_y cookie expiry to 1 year when hasUserConsent is set to true and no policies provided', () => {
    const cookieJar: MockCookieJar = mockCookie();

    renderHook(() => useShopifyCookies(true));

    const cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: expect.any(String),
      _shopify_y: expect.any(String),
    });
    expect(cookies['_shopify_s']).not.toBe('');
    expect(cookies['_shopify_y']).not.toBe('');

    expect(cookieJar['_shopify_s'].value).not.toBe(
      cookieJar['_shopify_y'].value
    );
    expect(cookieJar['_shopify_s'].maxage).toBe(1800);
    expect(cookieJar['_shopify_y'].maxage).toBe(31104000);
  });

  describe('cookie policies', () => {
    it(`deletes shopify_* cookies with ${POLICY_NO_COOKIE}`, () => {
      mockCookie();
      renderHook(() => useShopifyCookies(false, '', POLICY_NO_COOKIE));

      const cookies = getShopifyCookies(document.cookie);
      expect(cookies).toEqual({
        _shopify_s: '',
        _shopify_y: '',
      });
    });
    it(`sessionizes shopify_* cookies with ${POLICY_SESSIONIZED}`, () => {
      const cookieJar: MockCookieJar = mockCookie();
      renderHook(() => useShopifyCookies(false, '', POLICY_SESSIONIZED));

      const cookies = getShopifyCookies(document.cookie);
      expect(cookies).toEqual({
        _shopify_s: expect.any(String),
        _shopify_y: expect.any(String),
      });
      expect(cookieJar['_shopify_s'].expires).toBeUndefined();
      expect(cookieJar['_shopify_y'].maxage).toBeUndefined();
    });
    it(`sets short-term shopify_* cookies with ${POLICY_SHORT_TERM}`, () => {
      const cookieJar: MockCookieJar = mockCookie();
      renderHook(() => useShopifyCookies(false, '', POLICY_SHORT_TERM));

      const cookies = getShopifyCookies(document.cookie);
      expect(cookies).toEqual({
        _shopify_s: expect.any(String),
        _shopify_y: expect.any(String),
      });
      expect(cookieJar['_shopify_s'].expires).toBeUndefined();
      expect(cookieJar['_shopify_y'].maxage).toBe(1800);
    });
    it(`sets shopify_* cookies appropriately with consent given and ${POLICY_SHORT_TERM}`, () => {
      const cookieJar: MockCookieJar = mockCookie();
      renderHook(() => useShopifyCookies(true, '', POLICY_NO_COOKIE));

      const cookies = getShopifyCookies(document.cookie);
      expect(cookies).toEqual({
        _shopify_s: expect.any(String),
        _shopify_y: expect.any(String),
      });
      expect(cookieJar['_shopify_s'].maxage).toBe(1800);
      expect(cookieJar['_shopify_y'].maxage).toBe(31104000);
    });
  });

  it('sets domain when provided', () => {
    const cookieJar: MockCookieJar = mockCookie();
    const cookieDomain = 'myshop.com';

    renderHook(() => useShopifyCookies(true, cookieDomain));

    const cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: expect.any(String),
      _shopify_y: expect.any(String),
    });
    expect(cookies['_shopify_s']).not.toBe('');
    expect(cookies['_shopify_y']).not.toBe('');

    expect(cookieJar['_shopify_s'].value).not.toBe(
      cookieJar['_shopify_y'].value
    );
    expect(cookieJar['_shopify_s']).toContain({
      domain: cookieDomain,
      maxage: 1800,
    });
    expect(cookieJar['_shopify_y']).toContain({
      domain: cookieDomain,
      maxage: 31104000,
    });
  });
});

import {afterEach} from 'vitest';
import {renderHook} from '@testing-library/react';
import {getShopifyCookies} from './cookies-utils.js';
import {useShopifyCookies} from './useShopifyCookie.js';

describe(`useShopifyCookies`, () => {
  afterEach(() => {
    /* eslint-disable no-global-assign */
    // clear the cookies
    document.cookie = '_shopify_y=1; expires=1 Jan 1970 00:00:00 GMT;';
    document.cookie = '_shopify_s=1; expires=1 Jan 1970 00:00:00 GMT;';
    /* eslint-enable no-global-assign */
  });

  it('sets _shopify_s and _shopify_y cookies when not found', () => {
    let cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      '_shopify_s': '',
      '_shopify_y': '',
    })

    renderHook(() =>
      useShopifyCookies()
    );

    cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      '_shopify_s': expect.any(String),
      '_shopify_y': expect.any(String),
    })
  });

  it('does not override cookies when it already exists', () => {
    /* eslint-disable @typescript-eslint/ban-ts-comment, no-global-assign */
    // @ts-ignore
    document.cookie = '_shopify_s=abc123';
    document.cookie = '_shopify_y=def456';
    /* eslint-enable @typescript-eslint/ban-ts-comment, no-global-assign */

    renderHook(() =>
      useShopifyCookies()
    );

    const cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      '_shopify_s': 'abc123',
      '_shopify_y': 'def456',
    })
  });

  it('sets new cookie if either cookie is missing', () => {
    /* eslint-disable @typescript-eslint/ban-ts-comment, no-global-assign */
    // @ts-ignore
    document.cookie = '_shopify_s=abc123';
    /* eslint-enable @typescript-eslint/ban-ts-comment, no-global-assign */

    renderHook(() =>
      useShopifyCookies()
    );

    let cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      '_shopify_s': 'abc123',
      '_shopify_y': expect.any(String),
    })

    /* eslint-disable @typescript-eslint/ban-ts-comment, no-global-assign */
    // @ts-ignore
    document.cookie = '_shopify_s=1; expires=1 Jan 1970 00:00:00 GMT;';
    document.cookie = '_shopify_y=def456';
    /* eslint-enable @typescript-eslint/ban-ts-comment, no-global-assign */

    renderHook(() =>
      useShopifyCookies()
    );

    cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      '_shopify_s': expect.any(String),
      '_shopify_y': 'def456',
    })
  });
});

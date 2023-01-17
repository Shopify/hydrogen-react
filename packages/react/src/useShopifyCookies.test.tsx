import {afterEach} from 'vitest';
import {renderHook} from '@testing-library/react';
import {getShopifyCookies} from './cookies-utils.js';
import {useShopifyCookies} from './useShopifyCookie.js';

const originalDocument = document;

describe(`useShopifyCookies`, () => {
  afterEach(() => {
    /* eslint-disable no-global-assign */
    document = originalDocument;
    /* eslint-enable no-global-assign */
  });

  it('sets _shopify_s and _shopify_y cookies when not found', () => {
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
  });

  it('does not override cookies when it already exists', () => {
    renderHook(() => {
      document.cookie = '_shopify_s=abc123';
      document.cookie = '_shopify_y=def456';

      useShopifyCookies();
    });

    const cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: 'abc123',
      _shopify_y: 'def456',
    });
  });

  it('sets new cookie if either cookie is missing', () => {
    document.cookie = '_shopify_s=abc123';

    renderHook(() => useShopifyCookies());

    let cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: 'abc123',
      _shopify_y: expect.any(String),
    });

    document.cookie = '_shopify_s=1; expires=1 Jan 1970 00:00:00 GMT;';
    document.cookie = '_shopify_y=def456';

    renderHook(() => useShopifyCookies());

    cookies = getShopifyCookies(document.cookie);

    expect(cookies).toEqual({
      _shopify_s: expect.any(String),
      _shopify_y: 'def456',
    });
  });
});

import {metafieldParser, type ParsedMetafields} from './metafield-parser.js';
import {getRawMetafield} from './Metafield.test.helpers.js';
import {expectType} from 'ts-expect';

/**
 * The tests in this file are written in the format `parsed.parsedValue === ''` instead of `(parsed.parsedValue).toEqual()`
 * The advantage of doing it this way for this test suite is that it helps ensure that the TS types are correct for the returned value
 * In most other situations, the second way is probably better though
 */
describe(`metafieldParser`, () => {
  it(`boolean`, () => {
    const meta = getRawMetafield({
      type: 'boolean',
      value: 'false',
    });
    const parsed = metafieldParser<ParsedMetafields['boolean']>(meta);
    expect(parsed.parsedValue === false).toBe(true);
    expectType<boolean>(parsed?.parsedValue);
  });

  it(`collection_reference`, () => {
    const parsed = metafieldParser<ParsedMetafields['collection_reference']>({
      type: 'collection_reference',
      reference: {
        __typename: 'Collection',
      },
    });
    expect(parsed?.parsedValue?.__typename === 'Collection').toBe(true);
  });

  it(`color`, () => {
    const parsed = metafieldParser({
      type: 'color',
      value: '#f0f0f0',
    });
    expect(parsed?.parsedValue === '#f0f0f0').toBe(true);
  });

  it(`date`, () => {
    const dateStamp = '2022-10-13';
    const parsed = metafieldParser({
      type: 'date',
      value: dateStamp,
    });
    expect(
      parsed?.parsedValue?.toString() === new Date(dateStamp).toString()
    ).toBe(true);
  });

  it(`date_time`, () => {
    const dateStamp = '2022-10-13';
    const parsed = metafieldParser({
      type: 'date',
      value: dateStamp,
    });
    expect(
      parsed?.parsedValue?.toString() === new Date(dateStamp).toString()
    ).toBe(true);
  });

  it(`dimension`, () => {
    const parsed = metafieldParser({
      type: 'dimension',
      value: JSON.stringify({unit: 'mm', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'mm').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
  });

  it(`volume`, () => {
    const parsed = metafieldParser({
      type: 'volume',
      value: JSON.stringify({unit: 'us_pt', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'us_pt').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
  });

  it(`weight`, () => {
    const parsed = metafieldParser({
      type: 'weight',
      value: JSON.stringify({unit: 'lbs', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'lbs').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
  });

  it(`file_reference`, () => {
    const parsed = metafieldParser({
      type: 'file_reference',
      reference: {
        __typename: 'GenericFile',
      },
    });
    expect(parsed.parsedValue?.__typename === 'GenericFile').toBe(true);
  });

  it(`json`, () => {
    const parsed = metafieldParser({
      type: 'json',
      value: JSON.stringify({test: 'testing', bool: false, deep: {numb: 7}}),
    });
    expect(parsed?.parsedValue?.test === 'testing').toBe(true);
    expect(parsed?.parsedValue?.bool === false).toBe(true);
    expect(parsed?.parsedValue?.deep?.numb === 7).toBe(true);
  });

  it(`money`, () => {
    const parsed = metafieldParser({
      type: 'money',
      value: JSON.stringify({amount: '12', currencyCode: 'USD'}),
    });
    // TODO: amount should be a number, not a string
    expect(parsed?.parsedValue?.amount === '12').toBe(true);
    expect(parsed?.parsedValue?.currencyCode === 'USD').toBe(true);
  });

  it(`multi_line_text_field`, () => {
    const parsed = metafieldParser({
      type: 'multi_line_text_field',
      value: 'blah\nblah\nblah',
    });
    expect(parsed?.parsedValue === 'blah\nblah\nblah').toBe(true);
  });

  it(`single_line_text_field`, () => {
    const parsed = metafieldParser({
      type: 'single_line_text_field',
      value: 'blah',
    });
    expect(parsed?.parsedValue === 'blah').toBe(true);
  });

  it(`url`, () => {
    const parsed = metafieldParser({
      type: 'url',
      value: 'https://www.shopify.com',
    });
    expect(parsed?.parsedValue === 'https://www.shopify.com').toBe(true);
  });

  it(`number_decimal`, () => {
    const parsed = metafieldParser({
      type: 'number_decimal',
      value: 2.2,
    });
    expect(parsed?.parsedValue === 2.2).toBe(true);
  });

  it(`number_integer`, () => {
    const parsed = metafieldParser({
      type: 'number_integer',
      value: 2,
    });
    expect(parsed?.parsedValue === 2).toBe(true);
  });

  it(`page_reference`, () => {
    const parsed = metafieldParser({
      type: 'page_reference',
      reference: {
        __typename: 'Page',
      },
    });
    expect(parsed.parsedValue?.__typename === 'Page').toBe(true);
  });

  it(`product_reference`, () => {
    const parsed = metafieldParser({
      type: 'product_reference',
      reference: {
        __typename: 'Product',
      },
    });
    expect(parsed.parsedValue?.__typename === 'Product').toBe(true);
  });

  it(`rating`, () => {
    const parsed = metafieldParser({
      type: 'rating',
      value: JSON.stringify({value: 3, scale_min: 1, scale_max: 5}),
    });
    expect(parsed?.parsedValue?.value === 3).toBe(true);
    expect(parsed?.parsedValue?.scale_min === 1).toBe(true);
    expect(parsed?.parsedValue?.scale_max === 5).toBe(true);
  });

  it(`variant_reference`, () => {
    const parsed = metafieldParser({
      type: 'variant_reference',
      reference: {
        __typename: 'ProductVariant',
      },
    });
    expect(parsed.parsedValue?.__typename === 'ProductVariant').toBe(true);
  });
});

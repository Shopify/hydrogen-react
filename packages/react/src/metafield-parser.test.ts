import {
  metafieldParser,
  type ParsedMetafields,
  type Measurement,
  type Rating,
} from './metafield-parser.js';
import {getRawMetafield} from './Metafield.test.helpers.js';
import {expectType} from 'ts-expect';
import type {
  Collection,
  GenericFile,
  MoneyV2,
  Page,
  Product,
  ProductVariant,
} from './storefront-api-types.js';

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
    expectType<Collection>(parsed?.parsedValue);
  });

  it(`color`, () => {
    const parsed = metafieldParser<ParsedMetafields['color']>({
      type: 'color',
      value: '#f0f0f0',
    });
    expect(parsed?.parsedValue === '#f0f0f0').toBe(true);
    expectType<string>(parsed?.parsedValue);
  });

  it(`date`, () => {
    const dateStamp = '2022-10-13';
    const parsed = metafieldParser<ParsedMetafields['date']>({
      type: 'date',
      value: dateStamp,
    });
    expect(
      parsed?.parsedValue?.toString() === new Date(dateStamp).toString()
    ).toBe(true);
    expectType<Date>(parsed?.parsedValue);
  });

  it(`date_time`, () => {
    const dateStamp = '2022-10-13';
    const parsed = metafieldParser<ParsedMetafields['date_time']>({
      type: 'date_time',
      value: dateStamp,
    });
    expect(
      parsed?.parsedValue?.toString() === new Date(dateStamp).toString()
    ).toBe(true);
    expectType<Date>(parsed?.parsedValue);
  });

  it(`dimension`, () => {
    const parsed = metafieldParser<ParsedMetafields['dimension']>({
      type: 'dimension',
      value: JSON.stringify({unit: 'mm', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'mm').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
    expectType<Measurement>(parsed?.parsedValue);
  });

  it(`volume`, () => {
    const parsed = metafieldParser<ParsedMetafields['volume']>({
      type: 'volume',
      value: JSON.stringify({unit: 'us_pt', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'us_pt').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
    expectType<Measurement>(parsed?.parsedValue);
  });

  it(`weight`, () => {
    const parsed = metafieldParser<ParsedMetafields['weight']>({
      type: 'weight',
      value: JSON.stringify({unit: 'lbs', value: 2}),
    });
    expect(parsed?.parsedValue?.unit === 'lbs').toBe(true);
    expect(parsed?.parsedValue?.value === 2).toBe(true);
    expectType<Measurement>(parsed?.parsedValue);
  });

  it(`file_reference`, () => {
    const parsed = metafieldParser<ParsedMetafields['file_reference']>({
      type: 'file_reference',
      reference: {
        __typename: 'GenericFile',
      },
    });
    expect(parsed.parsedValue?.__typename === 'GenericFile').toBe(true);
    expectType<GenericFile>(parsed?.parsedValue);
  });

  it(`json`, () => {
    type MyJson = {
      top: string;
      value: {
        test: string;
        bool: boolean;
        deep: {
          numb: number;
        };
      };
    };

    const myJson = {
      top: 'json',
      value: JSON.stringify({test: 'testing', bool: false, deep: {numb: 7}}),
    };

    // without an extra generic, we just mark it as "unknown"
    const parsed = metafieldParser<ParsedMetafields['json']>(myJson);
    // note that with "unknown", you have to cast it as something
    expect((parsed?.parsedValue as {test: string})?.test === 'testing').toBe(
      true
    );
    expectType<unknown>(parsed?.parsedValue);

    // with an extra generic, we use can use that as the type instead
    const parsedOtherType =
      metafieldParser<ParsedMetafields<MyJson>['json']>(myJson);
    expect(parsedOtherType.parsedValue?.top === 'json').toBe(true);
    expect(parsedOtherType.parsedValue?.value?.test === 'testing').toBe(true);
    expect(parsedOtherType.parsedValue?.value?.bool === false).toBe(true);
    expect(parsedOtherType.parsedValue?.value?.deep?.numb === 7).toBe(true);
    expectType<MyJson>(parsedOtherType.parsedValue);
  });

  it(`money`, () => {
    const parsed = metafieldParser<ParsedMetafields['money']>({
      type: 'money',
      value: JSON.stringify({amount: '12', currencyCode: 'USD'}),
    });
    // TODO: amount should be a number, not a string
    expect(parsed?.parsedValue?.amount === '12').toBe(true);
    expect(parsed?.parsedValue?.currencyCode === 'USD').toBe(true);
    expectType<MoneyV2>(parsed?.parsedValue);
  });

  it(`multi_line_text_field`, () => {
    const parsed = metafieldParser<ParsedMetafields['multi_line_text_field']>({
      type: 'multi_line_text_field',
      value: 'blah\nblah\nblah',
    });
    expect(parsed?.parsedValue === 'blah\nblah\nblah').toBe(true);
    expectType<string>(parsed?.parsedValue);
  });

  it(`single_line_text_field`, () => {
    const parsed = metafieldParser<ParsedMetafields['single_line_text_field']>({
      type: 'single_line_text_field',
      value: 'blah',
    });
    expect(parsed?.parsedValue === 'blah').toBe(true);
    expectType<string>(parsed?.parsedValue);
  });

  it(`url`, () => {
    const parsed = metafieldParser<ParsedMetafields['url']>({
      type: 'url',
      value: 'https://www.shopify.com',
    });
    expect(parsed?.parsedValue === 'https://www.shopify.com').toBe(true);
    expectType<string>(parsed?.parsedValue);
  });

  it(`number_decimal`, () => {
    const parsed = metafieldParser<ParsedMetafields['number_decimal']>({
      type: 'number_decimal',
      value: '2.2',
    });
    expect(parsed?.parsedValue === 2.2).toBe(true);
    expectType<number>(parsed?.parsedValue);
  });

  it(`number_integer`, () => {
    const parsed = metafieldParser<ParsedMetafields['number_integer']>({
      type: 'number_integer',
      value: '2',
    });
    expect(parsed?.parsedValue === 2).toBe(true);
    expectType<number>(parsed?.parsedValue);
  });

  it(`page_reference`, () => {
    const parsed = metafieldParser<ParsedMetafields['page_reference']>({
      type: 'page_reference',
      reference: {
        __typename: 'Page',
      },
    });
    expect(parsed.parsedValue?.__typename === 'Page').toBe(true);
    expectType<Page>(parsed?.parsedValue);
  });

  it(`product_reference`, () => {
    const parsed = metafieldParser<ParsedMetafields['product_reference']>({
      type: 'product_reference',
      reference: {
        __typename: 'Product',
      },
    });
    expect(parsed.parsedValue?.__typename === 'Product').toBe(true);
    expectType<Product>(parsed?.parsedValue);
  });

  it(`rating`, () => {
    const parsed = metafieldParser<ParsedMetafields['rating']>({
      type: 'rating',
      value: JSON.stringify({value: 3, scale_min: 1, scale_max: 5}),
    });
    expect(parsed?.parsedValue?.value === 3).toBe(true);
    expect(parsed?.parsedValue?.scale_min === 1).toBe(true);
    expect(parsed?.parsedValue?.scale_max === 5).toBe(true);
    expectType<Rating>(parsed?.parsedValue);
  });

  it(`variant_reference`, () => {
    const parsed = metafieldParser<ParsedMetafields['variant_reference']>({
      type: 'variant_reference',
      reference: {
        __typename: 'ProductVariant',
      },
    });
    expect(parsed.parsedValue?.__typename === 'ProductVariant').toBe(true);
    expectType<ProductVariant>(parsed?.parsedValue);
  });
});

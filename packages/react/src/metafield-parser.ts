import type {
  Collection,
  GenericFile,
  Metafield as MetafieldBaseType,
  MoneyV2,
  Page,
  Product,
  ProductVariant,
} from './storefront-api-types.js';
import type {PartialDeep, Simplify} from 'type-fest';
import {parseJSON} from './Metafield.js';
import {TypeEqual, expectType} from 'ts-expect';

/**
 * A function that uses `metafield.type` to parse the Metafield's `value` or `reference` or `references` (depending on the `type`) and put it in `metafield.parsedValue`
 *
 * TypeScript developers can use custom Metafield types from this package to get the returned object's Type correct. For example:
 *
 * `metafieldParser<ParsedMetafields['boolean']>({type: 'boolean', value: 'false'})`
 */
export function metafieldParser<ReturnGeneric>(
  metafield: PartialDeep<MetafieldBaseType, {recurseIntoArrays: true}>
): ReturnGeneric {
  if (!metafield.type) {
    throw new Error('error');
  }

  switch (metafield.type) {
    case 'boolean':
      return {
        ...metafield,
        parsedValue: metafield.value === 'true',
      } as ReturnGeneric;

    case 'collection_reference':
    case 'file_reference':
    case 'page_reference':
    case 'product_reference':
    case 'variant_reference':
      return {
        ...metafield,
        parsedValue: metafield.reference,
      } as ReturnGeneric;

    case 'color':
    case 'multi_line_text_field':
    case 'single_line_text_field':
    case 'url':
      return {
        ...metafield,
        parsedValue: metafield.value,
      } as ReturnGeneric;

    // TODO: 'money' should probably be parsed even further to like `useMoney()`, but that logic needs to be extracted first so it's not a hook
    case 'dimension':
    case 'money':
    case 'json':
    case 'rating':
    case 'volume':
    case 'weight':
      return {
        ...metafield,
        parsedValue: parseJSON(metafield.value ?? ''),
      } as ReturnGeneric;

    case 'date':
    case 'date_time':
      return {
        ...metafield,
        parsedValue: new Date(metafield.value ?? ''),
      } as ReturnGeneric;

    case 'number_decimal':
    case 'number_integer':
      return {
        ...metafield,
        parsedValue: Number(metafield.value),
      } as ReturnGeneric;

    case 'list.collection_reference':
    case 'list.color':
    case 'list.date':
    case 'list.date_time':
    case 'list.dimension':
    case 'list.file_reference':
    case 'list.number_integer':
    case 'list.number_decimal':
    case 'list.page_reference':
    case 'list.product_reference':
    case 'list.rating':
    case 'list.single_line_text_field':
    case 'list.url':
    case 'list.variant_reference':
    case 'list.volume':
    case 'list.weight':
      return {
        ...metafield,
        parsedValue: metafield.references,
      } as ReturnGeneric;

    default: {
      const typeNotFoundError = `metafieldParser(): the 'metafield.type' you passed in is not supported. Your type: "${metafield.type}". If you believe this is an error, please open an issue on GitHub. Returning 'parsedValue' of 'null'`;
      if (__HYDROGEN_DEV__) {
        throw new Error(typeNotFoundError);
      } else {
        console.error(typeNotFoundError);
        return {
          ...metafield,
          parsedValue: null,
        } as ReturnGeneric;
      }
    }
  }
}

// taken from https://shopify.dev/apps/metafields/types
export const allMetafieldTypesArray = [
  'boolean',
  'collection_reference',
  'color',
  'date',
  'date_time',
  'dimension',
  'file_reference',
  'json',
  'money',
  'multi_line_text_field',
  'number_decimal',
  'number_integer',
  'page_reference',
  'product_reference',
  'rating',
  'single_line_text_field',
  'url',
  'variant_reference',
  'volume',
  'weight',
  // list metafields
  'list.collection_reference',
  'list.color',
  'list.date',
  'list.date_time',
  'list.dimension',
  'list.file_reference',
  'list.number_integer',
  'list.number_decimal',
  'list.page_reference',
  'list.product_reference',
  'list.rating',
  'list.single_line_text_field',
  'list.url',
  'list.variant_reference',
  'list.volume',
  'list.weight',
] as const;

/** A union of all the supported `metafield.type`s */
export type MetafieldTypeTypes = typeof allMetafieldTypesArray[number];

/** A mapping of a Metafield's `type` to the TypeScript type that is returned from `metafieldParser()` */
export type ParsedMetafields = {
  boolean: Simplify<BooleanParsedMetafield>;
  collection_reference: Simplify<CollectionParsedRefMetafield>;
  color: Simplify<ColorParsedMetafield>;
  date: Simplify<DatesParsedMetafield>;
  date_time: Simplify<DatesParsedMetafield>;
  dimension: Simplify<MeasurementParsedMetafield>;
  file_reference: Simplify<FileRefParsedMetafield>;
  json: Simplify<JsonParsedMetafield>;
  money: Simplify<MoneyParsedMetafield>;
  multi_line_text_field: Simplify<TextParsedMetafield>;
  number_decimal: Simplify<NumberParsedMetafield>;
  number_integer: Simplify<NumberParsedMetafield>;
  page_reference: Simplify<PageParsedRefMetafield>;
  product_reference: Simplify<ProductParsedRefMetafield>;
  rating: Simplify<RatingParsedMetafield>;
  single_line_text_field: Simplify<TextParsedMetafield>;
  url: Simplify<TextListParsedMetafield>;
  variant_reference: Simplify<VariantParsedRefMetafield>;
  volume: Simplify<MeasurementParsedMetafield>;
  weight: Simplify<MeasurementParsedMetafield>;
  // list metafields
  'list.collection_reference': Simplify<CollectionListParsedRefMetafield>;
  'list.color': Simplify<ColorListParsedMetafield>;
  'list.date': Simplify<DatesListParsedMetafield>;
  'list.date_time': Simplify<DatesListParsedMetafield>;
  'list.dimension': Simplify<MeasurementListParsedMetafield>;
  'list.file_reference': Simplify<FileListParsedRefMetafield>;
  'list.number_integer': Simplify<NumberListParsedMetafield>;
  'list.number_decimal': Simplify<NumberListParsedMetafield>;
  'list.page_reference': Simplify<PageListParsedRefMetafield>;
  'list.product_reference': Simplify<ProductListParsedRefMetafield>;
  'list.rating': Simplify<RatingListParsedMetafield>;
  'list.single_line_text_field': Simplify<TextListParsedMetafield>;
  'list.url': Simplify<TextListParsedMetafield>;
  'list.variant_reference': Simplify<VariantListParsedRefMetafield>;
  'list.volume': Simplify<MeasurementListParsedMetafield>;
  'list.weight': Simplify<MeasurementListParsedMetafield>;
};

// This test is to ensure that ParsedMetafields has a key for every item in 'allMetafieldsTypesArray'
expectType<TypeEqual<keyof ParsedMetafields, MetafieldTypeTypes>>(true);

interface ParsedBase extends MetafieldBaseType {
  type: MetafieldTypeTypes;
  parsedValue: unknown;
}

interface BooleanParsedMetafield extends ParsedBase {
  type: 'boolean';
  parsedValue: boolean;
}
type CollectionParsedRefMetafield = MetafieldBaseType & {
  type: 'collection_reference';
  parsedValue: Collection;
};
type ColorParsedMetafield = MetafieldBaseType & {
  type: 'color';
  parsedValue: string;
};
type DatesParsedMetafield = MetafieldBaseType & {
  type: 'date' | 'date_time';
  parsedValue: Date;
};

type MeasurementParsedMetafield = MetafieldBaseType & {
  type: 'dimension' | 'weight' | 'volume';
  parsedValue: Measurement;
};

type FileRefParsedMetafield = MetafieldBaseType & {
  type: 'file_reference';
  parsedValue: GenericFile;
};

type JsonParsedMetafield = MetafieldBaseType & {
  type: 'json';
  parsedValue: unknown;
};

type MoneyParsedMetafield = MetafieldBaseType & {
  type: 'money';
  parsedValue: MoneyV2;
};

type TextParsedMetafield = MetafieldBaseType & {
  type: 'single_line_text_field' | 'multi_line_text_field' | 'url';
  parsedValue: string;
};

type NumberParsedMetafield = MetafieldBaseType & {
  type: 'number_decimal' | 'number_integer';
  parsedValue: number;
};

type PageParsedRefMetafield = MetafieldBaseType & {
  type: 'page_reference';
  parsedValue: Page;
};

type ProductParsedRefMetafield = MetafieldBaseType & {
  type: 'product_reference';
  parsedValue: Product;
};

type RatingParsedMetafield = MetafieldBaseType & {
  type: 'rating';
  parsedValue: Rating;
};

type VariantParsedRefMetafield = MetafieldBaseType & {
  type: 'variant_reference';
  parsedValue: ProductVariant;
};

type CollectionListParsedRefMetafield = MetafieldBaseType & {
  type: 'list.collection_reference';
  parsedValue: Array<Collection>;
};

type ColorListParsedMetafield = MetafieldBaseType & {
  type: 'list.color';
  parsedValue: Array<string>;
};

type DatesListParsedMetafield = MetafieldBaseType & {
  type: 'list.date' | 'list.date_time';
  parsedValue: Array<Date>;
};

type MeasurementListParsedMetafield = MetafieldBaseType & {
  type: 'list.dimension' | 'list.weight' | 'list.volume';
  parsedValue: Array<Measurement>;
};

type FileListParsedRefMetafield = MetafieldBaseType & {
  type: 'list.file_reference';
  parsedValue: Array<GenericFile>;
};

type TextListParsedMetafield = MetafieldBaseType & {
  type: 'list.single_line_text_field' | 'list.url';
  parsedValue: Array<string>;
};

type NumberListParsedMetafield = MetafieldBaseType & {
  type: 'list.number_decimal' | 'list.number_integer';
  parsedValue: Array<number>;
};

type PageListParsedRefMetafield = MetafieldBaseType & {
  type: 'list.page_reference';
  parsedValue: Array<Page>;
};

type ProductListParsedRefMetafield = MetafieldBaseType & {
  type: 'list.product_reference';
  parsedValue: Array<Product>;
};

type RatingListParsedMetafield = MetafieldBaseType & {
  type: 'list.rating';
  parsedValue: Array<Rating>;
};

type VariantListParsedRefMetafield = MetafieldBaseType & {
  type: 'list.variant_reference';
  parsedValue: Array<ProductVariant>;
};

type Measurement = {
  unit: string;
  value: number;
};

interface Rating {
  value: number;
  scale_min: number;
  scale_max: number;
}

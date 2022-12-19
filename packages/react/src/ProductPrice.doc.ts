import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'product price',
  category: 'components',
  related: [
    {
      name: 'ProductOptionsProvider',
      type: 'component',
      url: 'api/hydrogen/components/product-variant/productoptionsprovider',
    },
    {
      name: 'Money',
      type: 'component',
      url: 'api/hydrogen/components/primitive/money',
    },
  ],
  description:
    "The `ProductPrice` component renders a `Money` component with the product [`priceRange`](https://shopify.dev/api/storefront/reference/products/productpricerange)'s `maxVariantPrice` or `minVariantPrice`, for either the regular price or compare at price range.",
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          code: './ProductPrice.example.tsx',
          language: 'jsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'props',
      type: 'ProductPriceProps',
      description: 'interface description',
    },
  ],
};

export default data;

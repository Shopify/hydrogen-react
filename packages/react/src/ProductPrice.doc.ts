import { ReferenceEntityTemplateSchema } from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'product price',
  category: 'components',
  related: [],
  description: "The `ProductPrice` component renders a `Money` component with the product [`priceRange`](https://shopify.dev/api/storefront/reference/products/productpricerange)'s `maxVariantPrice` or `minVariantPrice`, for either the regular price or compare at price range.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
          code: './ProductPriceExample.tsx',
          language: 'jsx'
      }
      ],
      title: "codeblock title",
    }
  },
  definitions: [{
    title: "props",
    type: "ExternalVideoProps",
    description: "interface description"
  }],

};

export default data;

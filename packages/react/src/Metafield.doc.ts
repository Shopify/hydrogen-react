import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'metafield',
  category: 'components',
  related: [
    {
      name: 'parseMetafield',
      type: 'utility',
      url: 'api/hydrogen/utilities/parsemetafield',
    },
    {
      name: 'parseMetafieldValue',
      type: 'utility',
      url: 'api/hydrogen/utilities/parsemetafieldvalue',
    },
  ],
  description:
    "The `Metafield` component renders the value of a Storefront API's\n[Metafield object](https://shopify.dev/api/storefront/reference/common-objects/metafield). Relies on the `locale` property of the `useShop()` hook, so it must be a descendent of `<ShopifyProvider/>`.\nRenders a smart default of the Metafield's `value`. For more information, refer to the [Default output](#default-output) section.",
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          code: './MetafieldExample.tsx',
          language: 'jsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'MetafieldProps',
      description: 'interface description',
    },
  ],
};

export default data;

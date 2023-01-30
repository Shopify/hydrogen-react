import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'getShopifyCookies',
  category: 'utilities',
  isVisualComponent: false,
  related: [
    {
      subtitle: 'Utility',
      name: 'useShopifyCookies',
      url: '/api/react-storefront-kit/utilities/useShopifyCookies',
      type: 'gear',
    },
  ],
  description: 'Parses cookie string and returns Shopify cookies.',
  type: 'utility',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './get-shopify-cookies.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './get-shopify-cookies.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'getShopifyCookies',
      type: 'GetShopifyCookiesGeneratedType',
      description:
        "If the Shopify cookies doesn't exist, this method will return empty string for each missing cookie.",
    },
  ],
};

export default data;

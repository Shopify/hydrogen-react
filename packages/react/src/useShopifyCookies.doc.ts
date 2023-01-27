import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'useShopifyCookies',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description:
    'Sets Shopify user and session cookies and refreshes the expiry time.',
  type: 'utility',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './useShopifyCookies.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './useShopifyCookies.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'useShopifyCookies',
      type: 'UseShopifyCookiesGeneratedType',
      description: '',
    },
  ],
};

export default data;

import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'sendShopifyAnalytics',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description: 'Sends analytics to Shopify',
  type: 'utility',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './analytics.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './analytics.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'sendShopifyAnalytics',
      type: 'SendShopifyAnalyticsGeneratedType',
      description: '',
    },
  ],
};

export default data;

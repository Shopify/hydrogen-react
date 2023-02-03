import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'sendShopifyAnalytics',
  category: 'utilities',
  isVisualComponent: false,
  related: [
    {
      subtitle: 'How to set up',
      name: 'Shopify analytics',
      url: '/custom-storefronts/hydrogen/analytics/shopify-analytics',
      type: 'tutorial',
    },
    {
      subtitle: 'Utility',
      name: 'useShopifyCookies',
      url: '/api/hydrogen-react/utilities/useShopifyCookies',
      type: 'gear',
    },
    {
      subtitle: 'Utility',
      name: 'getClientBrowserParameters',
      url: '/api/hydrogen-react/utilities/getclientbrowserparameters',
      type: 'gear',
    },
  ],
  description: 'Sends analytics to Shopify.',
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
      description:
        'If `event.payload.hasUserConsent` is false, no analytics event will happen.',
    },
    {
      title: 'AnalyticsEventName',
      type: 'AnalyticsEventName',
      description: 'Analytics event names accepted by Shopify analytics.',
    },
    {
      title: 'AnalyticsPageType',
      type: 'AnalyticsPageType',
      description: 'Analytics page type values accepted by Shopify analytics.',
    },
    {
      title: 'ShopifySalesChannel',
      type: 'ShopifySalesChannel',
      description:
        'Analytics sales channel values accepted by Shopify analytics.',
    },
  ],
};

export default data;

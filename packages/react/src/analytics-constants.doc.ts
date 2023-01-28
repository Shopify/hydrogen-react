import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Analytics constants',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description: 'A list of analytics constants used by Shopify analytics.',
  type: 'utility',
  definitions: [
    {
      title: 'AnalyticsEventName',
      type: 'AnalyticsEventNameInterface',
      description: 'Analytics event names accepted by Shopify analytics.',
    },
    {
      title: 'AnalyticsPageType',
      type: 'AnalyticsPageTypeInterface',
      description: 'Analytics page type values accepted by Shopify analytics.',
    },
    {
      title: 'ShopifyAppSource',
      type: 'ShopifyAppSourceInterface',
      description:
        'Analytics sales channel values accepted by Shopify analytics.',
    },
  ],
};

export default data;

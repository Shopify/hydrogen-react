import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'useMoney',
  category: 'hooks',
  isVisualComponent: false,
  related: [
    {
      name: 'Money',
      type: 'component',
      url: '/api/react-storefront-kit/components/money',
    },
  ],
  description:
    "The `useMoney` component renders an useMoney for the Storefront API's\n[useMoney object](https://shopify.dev/api/storefront/reference/common-objects/useMoney) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.\n\nAn useMoney's width and height are determined using the following priority list:\n1. The width and height values for the `loaderOptions` prop\n2. The width and height values for bare props\n3. The width and height values for the `data` prop\n\nIf only one of `width` or `height` are defined, then the other will attempt to be calculated based on the useMoney's aspect ratio,\nprovided that both `data.width` and `data.height` are available. If `data.width` and `data.height` aren't available, then the aspect ratio cannot be determined and the missing value will remain as `null`",
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './useMoney.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './useMoney.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'UseMoneyGeneratedType',
      description: '',
    },
  ],
};

export default data;

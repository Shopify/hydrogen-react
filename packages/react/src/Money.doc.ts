import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Money',
  category: 'components',
  isVisualComponent: false,
  related: [
    {
      name: 'useMoney',
      type: 'hook',
      url: '/api/react-storefront-kit/hooks/useMoney',
    },
  ],
  description: `
    The \`useMoney\` hook takes a [MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) and returns a
    default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
    [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
    Uses \`locale\` from \`ShopifyProvider\`
  `,
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './Money.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './Money.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'MoneyProps',
      description: '',
    },
  ],
};

export default data;

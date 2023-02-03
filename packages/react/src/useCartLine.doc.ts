import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'useCartLine',
  category: 'hooks',
  isVisualComponent: false,
  related: [
    {
      name: 'CartLineProvider',
      type: 'component',
      url: '/api/hydrogen-react/components/CartLineProvider',
    },
  ],
  description: `
    The \`useCartLine\` hook provides access to the [CartLine object](https://shopify.dev/api/storefront/unstable/objects/cartline) from the Storefront API. It must be a descendent of a \`CartProvider\` component.
  `,
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './CartLineProvider.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './CartLineProvider.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'UseCartLineGeneratedType',
      description:
        '`useCartLine` must be a descendent of a `CartProvider` component.',
    },
  ],
};

export default data;

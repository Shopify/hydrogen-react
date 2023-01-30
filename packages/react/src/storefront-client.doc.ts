import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'Create Storefront Client',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description: `
  
  `,
  type: 'gear',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './storefront-client.example.js',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './storefront-client.example.ts',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'CreateStorefrontClientGeneratedType',
      description: '',
    },
  ],
};

export default data;

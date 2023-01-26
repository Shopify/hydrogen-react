import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'getClientBrowserParameters',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description: 'Gathers client browser values commonly used for analytics',
  type: 'utility',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './get-client-browser-parameters.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './get-client-browser-parameters.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Returns ClientBrowserParameters',
      type: 'ClientBrowserParameters',
      description:
        'If executed on server, this method will return empty string for each field.',
    },
  ],
};

export default data;

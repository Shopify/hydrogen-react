import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'generate-seo-tags',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  type: 'function',
  defaultExample: {
    description: 'Basic example',
    codeblock: {
      tabs: [
        {
          title: 'Basic example',
          code: './seo.basic.example.js',
          language: 'js',
        },
        {
          title: 'All options',
          code: './seo.all.example.js',
          language: 'js',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Config',
      type: 'Seo',
      description:
        'The config object passed to the `generateSeoTags` function.',
    },
  ],
};

export default data;

import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'generate-seo-tags',
  category: 'utilities',
  isVisualComponent: false,
  related: [],
  description:
    'The `generateSeoTags` function generates the SEO title, meta, link and script (JSON Linking Data) tags for a page. It pairs well with the SEO component in `@shopify/hydrogen` when building a Hydrogen Remix app, but can be used on its own if you want to generate the tags yourself.',
  type: 'function',
  defaultExample: {
    description: 'Basic example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './seo.example.js',
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

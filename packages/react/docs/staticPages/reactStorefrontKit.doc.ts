import {LandingTemplateSchema} from '@shopify/generate-docs';

const data: LandingTemplateSchema = {
  title: 'React Storefront Kit',
  description: `React Storefront Kit contains a set of Shopify-specific commerce components, hooks, and utilities that help accelerate your development process. This guide provides a complete reference of the components, hooks, and utilities that React Storefront Kit offers, and their relationships to each other.`,
  image: '',
  darkImage: '',
  id: 'react-storefront-kit',
  sections: [
    {
      type: 'Generic',
      anchorLink: 'objects-and-functions',
      title: 'Objects and functions',
      sectionContent: '',
      sectionSubContent: [
        {
          title: 'Primitive Components',
          sectionContent:
            'React Storefront Kit provides Primitive components are the building blocks for different component types, including products, variants, and cart.',
        },
        {
          title: 'Hooks',
          sectionContent:
            'React Storefront Kit hooks are functions that allow you to use state and other methods inside React Storefront Kit components.',
        },
        {
          title: 'Utilities',
          sectionContent:
            'React Storefront Kit utilities are functions that perform different tasks to help you develop quickly.',
        },
      ],
      codeblock: {
        tabs: [
          {
            title: 'Primitive Component',
            code: 'example code goes here',
            language: 'javascript',
          },
          {
            title: 'Hook Example',
            code: 'example hook code goes here',
            language: 'javascript',
          },
          {
            title: 'Utility Function Example',
            code: 'example hook utility goes here',
            language: 'javascript',
          },
        ],
      },
    },
    {
      type: 'Resource',
      anchorLink: 'resources',
      title: 'Resources',
      resources: [
        {
          name: 'Framework',
          subtitle:
            'React Storefront Kit includes a framework that offers a set of best practices and scaffolding for building a website.',
          url: '/api/hydrogen',
          type: 'flag',
        },
      ],
    },
  ],
};

export default data;

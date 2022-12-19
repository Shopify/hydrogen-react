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
      sectionContent:
        'Shopify App Bridge introduces the concept of actions. An action provides a way for applications and hosts to trigger events with a payload. \n\nActions can be written in vanilla JavaScript or as React components when supported.',
      sectionSubContent: [
        {
          title: 'Components',
          sectionContent:
            "React Storefront Kit components are objects that contain all of business logic for the commerce concept that they represent. They're used to parse and process data.",
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
            title: 'Example component',
            code: 'example code goes here',
            language: 'javascript',
          },
          {
            title: 'Example hook',
            code: 'example hook code goes here',
            language: 'javascript',
          },
          {
            title: 'Example utility',
            code: 'example hook utility goes here',
            language: 'javascript',
          },
        ],
      },
    },
    {
      type: 'Generic',
      anchorLink: 'data-sources',
      title: 'Data sources',
      sectionContent:
        'React Storefront Kit supports data coming from Shopify and third-parties.',
      sectionSubContent: [
        {
          title: 'Shopify data source',
          sectionContent:
            "React Storefront Kit is built and optimized to use data coming from Shopify's Storefront API. The shape of the data passed to components, hooks, and utilities corresponds and conforms to the structure based on the GraphQL types from the Storefront API. \n\nYou can pass data from the Storefront API directly into components, hooks, and utilities. \n\nIn the example, the ProductOptionsProvider component expects product data to have the following structure, which corresponds to the Product object type returned from the Storefront API.",
        },
        {
          title: 'Third-party data source',
          sectionContent:
            'React Storefront Kit can also support data from third-party sources. If you want to use React Storefront Kit components with a third-party data source, then data from the third-party source must first be transformed into the types expected by the React Storefront Kit components, hooks, and utilities, and then passed on to the components, hooks, and utilities. \n\nFor the ProductOptionsProvider component to use the product data coming from the third-party data source, the data needs to be translated into the format that the ProductOptionsProvider component expects. \n\nThe example function converts a third-party data source into the type returned by the Storefront API.',
        },
      ],
      codeblock: {
        tabs: [
          {
            title: 'Shopify data source',
            code: 'example code goes here',
            language: 'javascript',
          },
          {
            title: 'Third-party data source',
            code: 'example third-party data code goes here',
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
          url: '/',
          type: 'flag',
        },
        {
          name: 'Best practices',
          subtitle:
            'To optimize your development experience, Shopify has established a set of best practices that you can refer to when designing and working with React Storefront Kit custom storefronts.',
          url: '/',
          type: 'star',
        },
        {
          name: 'Deployment',
          subtitle:
            'You can deploy a React Storefront Kit storefront to most Worker and Node.js runtimes.',
          url: '/',
          type: 'blocks',
        },
      ],
    },
  ],
};

export default data;

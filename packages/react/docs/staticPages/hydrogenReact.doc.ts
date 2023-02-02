import {LandingTemplateSchema} from '@shopify/generate-docs';

const data: LandingTemplateSchema = {
  title: 'Hydrogen React',
  description:
    'Hydrogen React is an unopiniated and performant library of Shopify-specific React components, reusable functions, and utilities for interacting with the Storefront API. This guide provides a complete reference of the components, hooks, and utilities that Hydrogen React offers, and their relationships to each other.',
  id: 'hydrogen-react',
  sections: [
    {
      type: 'Generic',
      anchorLink: 'setup',
      title: 'Setup',
      sectionContent: `
1. Run one of the example commands to install the package
1. Import the component, hook, or utility that you want to use in your app. Refer to the list of [what's available](components) in Hydrogen React.
      `,
      sectionCard: [
        {
          subtitle: 'Navigate to',
          name: 'Getting Started Guide',
          url: '/custom-storefronts/hydrogen-react#get-started-with-hydrogen-react',
          type: 'tutorial',
        },
        {
          subtitle: 'Navigate to',
          name: 'Objects and resources',
          url: 'hydrogen-react/objects-and-functions',
          type: 'resource',
        },
      ],
      sectionSubContent: [
        {
          title: 'Authentication',
          sectionContent: `
          To use Hydrogen React, you need to authenticate with and make requests to the [Storefront API](/api/storefront-api). Refer to [Get started with Hydrogen React](/custom-storefronts/hydrogen-react#get-started-with-hydrogen-react) for instructions on how to get an access token and set up the Storefront API client.
           `,
          sectionCard: [
            {
              subtitle: 'Navigate to',
              name: 'Enable Storefront API Access',
              url: '/custom-storefronts/hydrogen-react#step-2-enable-storefront-api-access',
              type: 'key',
            },
          ],
        },
        {
          title: 'Versioning',
          sectionContent:
            "Hydrogen React is tied to specific versions of the [Storefront API](/api/storefront). For example, if you're using Storefront API version `2023-01`, then Hydrogen React versions `2023.1.x` are fully compatible.",
          sectionNotice: [
            {
              title: 'Caution',
              type: 'warning',
              sectionContent:
                'If the Storefront API version update includes breaking changes, then Hydrogen React includes breaking changes. Because the API version is updated every three months, breaking changes to Hydrogen React could occur every three months.',
            },
            {
              title: 'Learn more',
              type: 'note',
              sectionContent:
                'Learn more about [API versioning](/api/usage/versioning).',
            },
          ],
        },
      ],
      codeblock: {
        title: 'Install the Hydrogen React package',
        tabs: [
          {
            title: 'npm',
            code: 'install.npm.example.sh',
          },
          {
            title: 'yarn',
            code: 'install.yarn.example.sh',
          },
        ],
      },
    },
    {
      type: 'Generic',
      anchorLink: 'objects-and-resources',
      title: 'Objects and Resources',
      sectionContent: '',
      sectionSubContent: [
        {
          title: 'Components',
          sectionContent:
            'A component encapsulates all of the business logic and data parsing/processing for the concept it represents and outputs limited, sensible markup. Components provide defaults, but allow customizations and provide no visual styles, other than those provided natively by the browser.',
          sectionCard: [
            {
              subtitle: 'Navigate to',
              name: 'All Hydrogen React Components',
              url: 'hydrogen-react/components',
              type: 'library',
            },
          ],
        },
        {
          title: 'Hooks',
          sectionContent:
            'Hooks are functions that provide reusable, business and/or stateful logic. These functions allow you to leverage the business logic and state management functions used in the components with more flexibility.',
          sectionCard: [
            {
              subtitle: 'Navigate to',
              name: 'All Hydrogen React hooks',
              url: 'hydrogen-react/hooks',
              type: 'library',
            },
          ],
        },
        {
          title: 'Utilities',
          sectionContent:
            'Utilities are reusable functions for common data manipulations performed on Storefront API data.',
          sectionCard: [
            {
              subtitle: 'Navigate to',
              name: 'All Hydrogen React utility functions',
              url: 'hydrogen-react/utilities',
              type: 'library',
            },
          ],
        },
      ],
      codeblock: {
        title: 'Example',
        tabs: [
          {
            title: 'Component',
            code: './component.example.jsx',
            language: 'javascript',
          },
          {
            title: 'Hook',
            code: './hook.example.jsx',
            language: 'javascript',
          },
          {
            title: 'Utility',
            code: './utility.example.jsx',
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
          name: 'Custom Storefronts',
          subtitle:
            'Learn more about how to design, build, and manage, your custom storefront.',
          url: '/custom-storefronts',
          type: 'custom-storefronts',
        },
        {
          name: 'Getting started guide',
          subtitle: 'Follow this tutorial to get started with Hydrogen React.',
          url: '/custom-storefronts/hydrogen-react#get-started-with-hydrogen-react',
          type: 'quickstart',
        },
        {
          name: 'Hydrogen React README',
          subtitle:
            'Get more details on how to improve your end-to-end development experience.',
          url: 'https://github.com/Shopify/hydrogen-react/blob/main/packages/react/README.md',
          type: 'github',
        },
      ],
    },
  ],
};

export default data;

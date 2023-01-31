import {LandingTemplateSchema} from '@shopify/generate-docs';

const data: LandingTemplateSchema = {
  title: 'Hydrogen React',
  description:
    'Hydrogen React is a performant library of Shopify-specific React components, reusable functions, and utilities for interacting with the Storefront API. This guide provides a complete reference of the components, hooks, and utilities that Hydrogen React offers, and their relationships to each other.',
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
          url: '/custom-storefronts/react-storefront-kit#get-started-with-react-storefront-kit',
          type: 'tutorial',
        },
        {
          subtitle: 'Navigate to',
          name: 'Objects and resources',
          url: 'react-storefront-kit/objects-and-functions',
          type: 'resource',
        },
      ],
      sectionSubContent: [
        {
          title: 'Requirements',
          sectionContent: `
- You're familiar with [API authentication](/api/usage/authentication).
- You can [make an authenticated request](/apps/auth/oauth/getting-started#make-authenticated-requests) to the Admin API for an access token.
- You've [retrieved a parent access token](/apps/auth/oauth/getting-started#step-5-get-an-access-token) for the Admin API, which you can use to request a delegate access token for server requests.
- You've set the parent access token to [offline](/apps/auth/oauth/access-modes#offline-access).
            `,
          sectionCard: [
            {
              subtitle: 'Navigate to',
              name: 'Storefront API Client Authentication',
              url: '/custom-storefronts/react-storefront-kit#step-2-authenticate-the-storefront-api-client',
              type: 'key',
            },
          ],
        },
        {
          title: 'Authentication',
          sectionContent: `
Prevent rate-limiting on server requests to the Storefront API using a [delegate access token](/apps/auth/oauth/delegate-access-tokens).
You'll need to [create an app](/apps/getting-started/create) from which you can make an authenticated request to the Admin API for a delegate access token.
           `,
          sectionNotice: [
            {
              title: 'Caution',
              type: 'warning',
              sectionContent:
                'Unlike public access tokens, authenticated access tokens should be treated as secret and not used client-side. We recommend only requesting the scopes that your app needs, to reduce the security risk if the token leaks.',
            },
          ],
        },
        {
          title: 'Versioning',
          sectionContent:
            "Hydrogen React is tied to specific versions of the [Storefront API](/api/storefront). For example, if you're using Storefront API version `2022-10`, then Hydrogen React versions `2022.10.x` are fully compatible.",
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
              url: 'react-storefront-kit/components',
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
              url: 'react-storefront-kit/hooks',
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
              url: 'react-storefront-kit/utilities',
              type: 'library',
            },
          ],
        },
      ],
      codeblock: {
        title: 'Homepage',
        tabs: [
          {
            title: 'Storefront Client',
            code: './homepage.example.tsx',
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
          name: 'Hydrogen framework',
          subtitle:
            'Hydrogen React includes a framework that offers a set of best practices and scaffolding for building a website.',
          url: '/api/hydrogen',
          type: 'custom-storefronts',
        },
        {
          name: 'Getting started guide',
          subtitle:
            'Follow this tutorial to start making requests to the Storefront API in no time.',
          url: '/custom-storefronts/react-storefront-kit#get-started-with-react-storefront-kit',
          type: 'quickstart',
        },
        {
          name: 'Hydrogen React README',
          subtitle:
            'Get more details on how to speed up the end-to-end development experience.',
          url: 'https://github.com/Shopify/hydrogen-react/blob/main/packages/react/README.md',
          type: 'github',
        },
      ],
    },
  ],
};

export default data;
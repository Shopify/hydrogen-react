import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'shopify provider',
  category: 'components',
  related: [],
  /* Ren note: In this topic, the related items are pages to /custom-storefronts/hydrogen, so they don't have a type. */

  description:
    "The `ShopifyProvider` component wraps your entire app and provides functionality for many components, hooks, and utilities. The `ShopifyProvider` component also provides localization data for the app. You should place it in your app's entry point component.",
  /* Ren note: The page includes a section that's gated by a feature flag. The flag can probably be removed and this item can be updated with the content */

  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          code: './ShopifyProvider.example.tsx',
          language: 'jsx',
        },
      ],
      title: 'Example code',
    },
  },
  // Ren/John note: Need to refactor type in hydrogen ui so we can set this for ShopifyProvider. Otherwise, build fails.
  // definitions: [{
  //   title: "Props",
  //   type: "",
  //   description: "interface description"
  // }]
};

export default data;

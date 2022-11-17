import { ReferenceEntityTemplateSchema } from "@shopify/generate-docs";

const data: ReferenceEntityTemplateSchema = {
  name: 'shop pay button',
  category: 'components',
  related: [{
    name: "CartShopPayButton",
    type: "component",
    url: "api/hydrogen/components/primitive/shoppaybutton"
  }],
  description: "The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. You can[customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './ShopPayButtonExample.tsx',
        language: 'jsx',
      }
      ],
      title: "codeblock title",
    }
  },
  definitions: [{
    title: "props",
    type: "ShopPayButtonProps",
    description: "interface description"
  }]
};

export default data;

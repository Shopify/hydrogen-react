import { ReferenceEntityTemplateSchema } from "@shopify/generate-docs";

const data: ReferenceEntityTemplateSchema = {
  name: 'shop pay button',
  category: 'components',
  isVisualComponent: true,
  related: [{
    name: "CartShopPayButton",
    type: "component",
    url: "api/hydrogen/components/cart/cartshoppaybutton"
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
      title: "Example code",
    }
  },
  definitions: [{
    title: "Props",
    type: "ShopPayButtonProps",
    description: "interface description"
  }]
};

export default data;

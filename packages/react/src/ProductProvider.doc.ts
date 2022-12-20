import { ReferenceEntityTemplateSchema } from "@shopify/generate-docs";

const data: ReferenceEntityTemplateSchema = {
  name: 'product provider',
  category: 'components',
  isVisualComponent: false,
  related: [{
    name: "ProductPrice",
    type: "component",
    url: "api/hydrogen/components/product-variant/productprice"
  },
  {
    name: "ProductOptionsProvider",
    type: "component",
    url: "api/hydrogen/components/product-variant/productoptionsprovider",
  },
  {
    name: "useProductOptions",
    type: "hook",
    url: "api/hydrogen/hooks/product-variant/useproductoptions"
  },],
  description: "> Note:\n> `ProductProvider` is only available as part of the [Hydrogen UI](/custom-storefronts/hydrogen/alternate-frameworks) package, which is in beta. If you're building with Hydrogen, then use [`ProductOptionsProvider`](https://shopify.dev/api/hydrogen/components/product-variant/productoptionsprovider)\nThe `ProductProvider` component sets up a context with state that tracks the selected variant and options. Descendants of this component can use the [`useProductOptions`](https://shopify.dev/api/hydrogen/hooks/product-variant useproductoptions) hook.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './ProductProviderExample.tsx',
        language: 'jsx',
      }
      ],
      title: "Example code",
    }
  },
  definitions: [{
    title: "Props",
    type: "ProductProviderProps",
    description: "interface description"
  }]
};

export default data;

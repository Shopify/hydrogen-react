import { ReferenceEntityTemplateSchema } from "@shopify/generate-docs";

const data: ReferenceEntityTemplateSchema = {
  name: 'money',
  category: 'components',
  related: [{
    name: "useMoney",
    type: "hook",
    url: "api/hydrogen/hooks/primitive/usemoney"
  }],
  description: "The `Money` component renders a string of the Storefront API's[MoneyV2 object](https://shopify.dev/api/storefront/reference/common-objects/moneyv2) according to the `locale` in the [`ShopifyProvider` component](/api/hydrogen/components/global/shopifyprovider).\nThe component outputs a `<div>`. You can [customize this component](https://api/hydrogen/components#customizing-hydrogen-components) using passthrough props.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './MoneyExample.tsx',
        language: 'jsx'
      }
      ],
      title: "Example code",
    }
  },
  definitions: [{
    title: "Props",
    type: "MoneyProps",
    description: "interface description",
  }]
};

export default data;

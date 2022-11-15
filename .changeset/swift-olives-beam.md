---
'@shopify/hydrogen-react': patch
---

Provide a mapping of Storefront API's custom scalars to their actual types, for use with GraphQL CodeGen.

For example:

```ts
import {storefrontApiCustomScalars} from '@shopify/hydrogen-react';

const config: CodegenConfig = {
  // use the schema that's bundled with @shopify/hydrogen-react
  schema: './node_modules/@shopify/hydrogen-react/storefront.schema.json',
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
      config: {
        // use the custom scalar definitions that @shopify/hydrogen-react provides to improve the custom scalar types
        scalars: storefrontApiCustomScalars,
      },
    },
  },
};
```

import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // a normal app would only need `./node_modules/...` but we're in a monorepo
  schema: '../../node_modules/@shopify/hydrogen-react/storefront.schema.json',
  documents: 'pages/**/*.tsx',
  generates: {
    './gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;

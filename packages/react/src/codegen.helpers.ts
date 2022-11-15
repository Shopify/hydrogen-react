/** Meant to be used with GraphQL CodeGen to type the Storefront API's custom scalars correctly */
export const storefrontApiCustomScalars = {
  // keep in sync with the definitions in the app/nextjs/codegen.ts please!
  DateTime: 'string',
  Decimal: 'string',
  HTML: 'string',
  URL: 'string',
  Color: 'string',
  UnsignedInt64: 'string',
};

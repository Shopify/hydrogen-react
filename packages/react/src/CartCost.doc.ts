import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'CartCost',
  category: 'components',
  isVisualComponent: false,
  related: [],
  description: `
    The \`CartCost\` component renders a \`Money\` component with the cost associated with the \`amountType\` prop.\n\nIf no \`amountType\` prop is specified, then it defaults to \`totalAmount\`.\n\nDepends on \`useCart()\` and must be a child of \`<CartProvider/>\`
  `,
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          title: 'JavaScript',
          code: './CartCost.example.jsx',
          language: 'jsx',
        },
        {
          title: 'TypeScript',
          code: './CartCost.example.tsx',
          language: 'tsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'CartCostPropsForDocs',
      description: '',
    },
  ],
};

export default data;

import {ReferenceEntityTemplateSchema} from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'image',
  category: 'components',
  related: [
    {
      name: 'CartLines',
      type: 'component',
      url: 'api/hydrogen/components/CartLines',
    },
    {
      name: 'Url.com',
      type: 'external',
      url: 'http://www.url.com',
    },
  ],
  description:
    "The `Image` component renders an image for the Storefront API's\n[Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.\n\nAn image's width and height are determined using the following priority list:\n1. The width and height values for the `loaderOptions` prop\n2. The width and height values for bare props\n3. The width and height values for the `data` prop\n\nIf only one of `width` or `height` are defined, then the other will attempt to be calculated based on the image's aspect ratio,\nprovided that both `data.width` and `data.height` are available. If `data.width` and `data.height` aren't available, then the aspect ratio cannot be determined and the missing\nvalue will remain as `null`",
  type: 'component',
  defaultExample: {
    description: 'I am the default example',
    codeblock: {
      tabs: [
        {
          code: './Image.example.tsx',
          language: 'jsx',
        },
      ],
      title: 'Example code',
    },
  },
  definitions: [
    {
      title: 'Props',
      type: 'ShopifyImageProps',
      description: 'interface description',
    },
  ],
};

export default data;

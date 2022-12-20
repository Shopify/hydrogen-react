import { ReferenceEntityTemplateSchema } from "@shopify/generate-docs";

const data: ReferenceEntityTemplateSchema = {
  name: 'video',
  category: 'components',
  isVisualComponent: true,
  related: [{
    name: "MediaFile",
    type: "component",
    url: "api/hydrogen/components/primitive/mediafile",
  },
  {
    name: "Image",
    type: "component",
    url: "api/hydrogen/components/primitive/image"
  },],
  description: "The `Video` component renders a video for the Storefront API's [Video object](https://shopify.dev/api/storefront/reference/products/video).\nThe component outputs a `video` element. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './VideoExample.tsx',
        language: 'jsx',
      }
      ],
      title: "Example code",
    }
  },
  definitions: [{
    title: "Props",
    type: "VideoProps",
    description: "interface description"
  }]
};

export default data;

import { ReferenceEntityTemplateSchema } from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'media file',
  category: 'components',
  related: [{
      name: "Image",
      type: "component",
      url: "api/hydrogen/components/primitive/image"
    },
    {
      name: "Video",
      type: "component",
      url: "api/hydrogen/components/primitive/video"

    },
    {
      name: "ExternalVideo",
      type: "component",
      url: "api/hydrogen/components/primitive/externalvideo"

    },
    {
      name: "ModelViewer",
      type: "component",
      url: "api/hydrogen/components/primitive/modelviewer"

  },],
  description: "The `MediaFile` component renders the media for the Storefront API's\n[Media object](https://shopify.dev/api/storefront/reference/products/media). It renders an `Image `Video`, an `ExternalVideo`, or a `ModelViewer` depending on the `__typename` of the `data` prop.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './MediaFileExample.tsx',
        language: 'jsx',
      }
      ],
      title: "Example code",
    }
  },
  definitions: [{
    title: "props",
    type: "MediaFileProps",
    description: "interface description"
  }],

};

export default data;

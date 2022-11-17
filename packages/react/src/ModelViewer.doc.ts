import { ReferenceEntityTemplateSchema } from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
  name: 'model viewer',
  category: 'components',
  related: [{
    name: "MediaFile",
    type: "component",
    url: "api/hydrogen/components/primitive/mediafile",
  }],
  description: "The `ModelViewer` component renders a 3D model for the Storefront API's\n[Model3d object](https://shopify.dev/api/storefront/reference/products/model3d).\nThe component outputs a `<model-viewer>` tag. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.",
  type: "component",
  defaultExample: {
    description: "I am the default example",
    codeblock: {
      tabs: [{
        code: './ModelViewerExample.tsx',
        language: 'jsx'
      }
      ],
      title: "Example code",
    }
  },
  definitions: [{
    title: "props",
    type: "ModelViewerProps",
    description: "interface description"
  }],
};

export default data;

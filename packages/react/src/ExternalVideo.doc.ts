import { ReferenceEntityTemplateSchema } from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
    name: 'external video component',
    category: 'components',
    isVisualComponent: false,
    related: [],
    description: "The `ExternalVideo` component renders an embedded video for the Storefront API's [ExternalVideo object](https://shopify.dev/api/storefront/reference/products/externalvideo).",
    type: "component",
    defaultExample: {
        description: "I am the default example",
        codeblock: {
            tabs: [{
                code: './ExternalVideoExample.tsx',
                language: 'jsx'
            }
            ],
            title: "Example code",
        }
    },
    definitions: [{
        title: "Props",
        type: "ExternalVideoProps",
        description: "interface description"
    }],
};

export default data;

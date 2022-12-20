import { ReferenceEntityTemplateSchema } from '@shopify/generate-docs';

const data: ReferenceEntityTemplateSchema = {
    name: 'image',
    category: 'components',
    isVisualComponent: true,
    related: [{
        name: "CartLines",
        type: "component",
        url: "api/hydrogen/components/CartLines"
    },
    {
        "name": "Url.com",
        "type": "external",
        "url": "http://www.url.com"
    },],
    description: "The `Image` component renders an image for the Storefront API's\n[Image object](https://shopify.dev/api/storefront/reference/common-objects/image) by using the `data` prop. You can [customize this component](https://shopify.dev/api/hydrogen/components#customizing-hydrogen-components) using passthrough props.\n\nAn image's width and height are determined using the following priority list:\n1. The width and height values for the `loaderOptions` prop\n2. The width and height values for bare props\n3. The width and height values for the `data` prop\n\nIf only one of `width` or `height` are defined, then the other will attempt to be calculated based on the image's aspect ratio,\nprovided that both `data.width` and `data.height` are available. If `data.width` and `data.height` aren't available, then the aspect ratio cannot be determined and the missing\nvalue will remain as `null`",
    type: "component",
    defaultExample: {
        description: "I am the default example",
        codeblock: {
            tabs: [{
                code: './ImageExample.tsx',
                language: 'jsx'
            }
            ],
            title: "Example code",
        }
    },
    definitions: [{
        title: "Props",
        type: "ShopifyImageProps",
        description: "interface description"
    }],
    examples: {
        // Description of the example section. Can use markdown.
        description: 'Exmaples for the Image component',
        // Optional. May be used to group examples without a particular theme.
        examples: [
            {
                // Optional: Description of the example. Can use markdown.
                description: 'Use of the Image component with external images.',
                // The data for the codeblock.
                codeblock: {
                    // Tabs that appear at the top of the codeblock.
                    tabs: [
                        {
                            // The relative file path to the code file. Content will be automatically extracted from that file.
                            code: './image.example.tsx',
                            // Optional. The name of the language of the code.
                            language: 'tsx',
                        },
                    ],
                    // Optional. The title of the codeblock.
                    title: 'External images',
                },
            },
            {
                // Optional: Description of the example. Can use markdown.
                description: 'Use of the Image component with an external loader.',
                // The data for the codeblock.
                codeblock: {
                    // Tabs that appear at the top of the codeblock.
                    tabs: [
                        {
                            // The relative file path to the code file. Content will be automatically extracted from that file.
                            code: './image2.example.tsx',
                            // Optional. The name of the language of the code.
                            language: 'jsx',
                        },
                    ],
                    // Optional. The title of the codeblock.
                    title: 'Image with an external loader',
                },
            },
        ],
    },
};

export default data;

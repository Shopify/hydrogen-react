import {generateSeoTags} from '@shopify/storefront-kit-react';

generateSeoTags({
  title: 'My awesome page',
  titleTemplate: 'My awesome site - %s',
  description: 'This is my awesome page',
  url: 'https://hydrogen.shop',
  handle: '@shopify',
  media: [
    {
      url: 'https://hydrogen.shop/image.jpg',
      type: 'image',
      height: 400,
      width: 400,
      altText: 'A custom snowboard with an alpine color pallet.',
    },
    {
      url: 'https://hydrogen.shop/image-1.swf',
      type: 'video',
    },
    {
      url: 'https://hydrogen.shop/image-1.mp3',
      type: 'audio',
    },
  ],
  alternates: [
    {
      language: 'en-US',
      url: 'https://hydrogen.shop/en-us',
      default: true,
    },
    {
      language: 'fr-CA',
      url: 'https://hydrogen.shop/fr-ca',
    },
    {
      media: 'only screen and (max-width: 640px)',
      url: 'https://m.hydrogen.shop/en-ca',
    },
  ],
  ldJson: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'My Product',
    image: 'https://hydrogen.shop/image.jpg',
    description: 'A product that is great',
    sku: '12345',
    mpn: '12345',
    brand: {
      '@type': 'Thing',
      name: 'My Brand',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '100',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: '100',
      priceValidUntil: '2020-11-05',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'My Brand',
      },
    },
  },
});

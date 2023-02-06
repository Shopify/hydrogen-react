import * as React from 'react';
import type {Story} from '@ladle/react';
import {Image, ShopifyLoaderOptions} from './Image.js';
import type {Image as ImageType} from './storefront-api-types.js';

type Crop = 'center' | 'top' | 'bottom' | 'left' | 'right';

type ImageConfig = {
  intervals: number;
  startingWidth: number;
  incrementSize: number;
  placeholderWidth: number;
};

type HtmlImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Template: Story<{
  as?: 'img' | 'source';
  src: string;
  width?: string | number;
  height?: string | number;
  crop?: Crop;
  sizes?: string;
  aspectRatio?: string;
  config?: ImageConfig;
  alt?: string;
  loading?: 'lazy' | 'eager';
  loaderOptions?: ShopifyLoaderOptions;
  widths?: (HtmlImageProps['width'] | ImageType['width'])[];
}> = (props) => {
  return (
    <>
      <Image
        {...props}
        width="100%"
        loading="eager"
        aspectRatio="1/1"
        sizes="100vw"
      />
      <Image {...props} aspectRatio="4/3" width="50vw" sizes="50vw" />
      <Image {...props} width="30vw" sizes="30vw" />
      <Image {...props} width={100} height={200} />
      <Image {...props} width="5rem" />
      <h2>Tests to use the old component</h2>
      <Image {...props} widths={[100, 200, 300]} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  src: 'https://cdn.shopify.com/s/files/1/0551/4566/0472/products/Main.jpg',
};

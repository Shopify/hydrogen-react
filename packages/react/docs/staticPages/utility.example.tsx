import { flattenConnection, MediaFile } from '@shopify/hydrogen';

export function Product({product}) {
 const media = flattenConnection(product.media);
    return (
      <>
        {media.map((mediaFile) => {
          return <MediaFile data={mediaFile} key={mediaFile.id} />;
        })}
      </>
    );
  }
  
import {Metafield} from '@shopify/hydrogen-react';

export function Product({product}) {
  const metafield = product.metafield;

  return <Metafield data={metafield} />;
}

import {Money} from '@shopify/hydrogen-react';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

export default function ProductMoney({product}: {product: Product}) {
  return <Money data={product.variants.nodes[0].priceV2} />;
}

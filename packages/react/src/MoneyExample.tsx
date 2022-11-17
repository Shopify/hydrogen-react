import { Money } from "./Money";

export default function Product() {
  const data: any = {};

  return <Money data={data.product.variants.edges[0].node.priceV2} />;
}

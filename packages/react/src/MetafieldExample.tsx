import { Metafield } from "./Metafield";

export function Product({product}) {
  const metafield = product.metafield;

  return <Metafield data={metafield} />;
}

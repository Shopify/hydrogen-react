import { ProductPrice } from "./ProductPrice";

export function Product() {
  const data: any = {};

  return (
    <ProductPrice data={Product} priceType="compareAt" valueType="max" />
  );
}

import { ShopPayButton } from "./ShopPayButton";

export function MyProduct({variantId}) {
  return <ShopPayButton variantIds={[variantId]} />;
}

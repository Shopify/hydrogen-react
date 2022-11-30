import { Image } from "./Image"

export default function Product() {
  const data: any = {};

  const image = data.productByHandle.featuredImage;

  return <Image data={image} />;
}

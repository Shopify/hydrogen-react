import { MediaFile } from "./MediaFile";

export function MyComponent() {
  const data: any = {};

  return (
    <ul>
      {data?.products?.map((product) => {
        return <MediaFile data={product.node.media.edges[0].node} />;
      })}
    </ul>
  );
}

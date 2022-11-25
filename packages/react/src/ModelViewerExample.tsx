import { ModelViewer } from "./ModelViewer";

export default function MyProductModel() {
  const data: any = {};

  const firstMediaElement = data.products.edges[0].node.media.edges[0].node;
  if (firstMediaElement.mediaContentType === 'MODEL_3D') {
    return <ModelViewer data={firstMediaElement} />;
  }
}

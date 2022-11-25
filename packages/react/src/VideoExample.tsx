import { Video } from "./Video";

export default function MyProductVideo() {
  const data: any = {};

  const firstMediaElement = data.products.edges[0].node.media.edges[0].node;
  if (firstMediaElement.mediaContentType === 'VIDEO') {
    return <Video data={firstMediaElement} />;
  }
}

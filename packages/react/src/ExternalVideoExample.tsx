import { ExternalVideo } from "./ExternalVideo";

export default function MyProductVideo() {
    const data: any = {};

    const firstMediaElement = data.products.edges[0].node.media.edges[0].node;
    if (firstMediaElement.mediaContentType === 'EXTERNAL_VIDEO') {
        return <ExternalVideo data={firstMediaElement} />;
    }
}

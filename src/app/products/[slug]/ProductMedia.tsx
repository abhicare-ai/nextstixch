import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVidio = selectedMedia?.video?.files?.[0];
  return (
    <div className="h-fit basis-2/5 space-y-5 md:sticky md:top-10">
      <div className="bg-secondary aspect-square">
        {selectedImage?.url ? (
          <Zoom key={selectedImage.url}>
            <WixImage
              mediaIdentifier={selectedImage.url}
              alt={selectedImage.altText}
              width={1000}
              height={1000}
            />
          </Zoom>
        ) : selectedVidio?.url ? (
          <div className="flex size-full items-center bg-black">
            <video controls className="size-full">
              <source
                src={selectedVidio.url}
                type={`video/${selectedVidio.format}`}
              />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null}
      </div>

      {media.length > 1 && (
        <div className="flex flex-wrap gap-5">
          {media.map((mediaItem) => (
            <MediaPreview
              key={mediaItem._id}
              mediaItem={mediaItem}
              isSelected={mediaItem._id === selectedMedia?._id}
              onSelect={() => setSelectedMedia(mediaItem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imgageUrl = mediaItem.image?.url;

  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;
  const thumbailUrl = mediaItem.thumbnail?.url;
  const resolveThumbnailUrl =
    stillFrameMediaId && thumbailUrl
      ? thumbailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imgageUrl && !resolveThumbnailUrl) return null;

  return (
    <div
      className={cn(
        "bg-secondary relative cursor-pointer",
        isSelected && "outline-primary outline-1",
      )}
    >
      <WixImage
        mediaIdentifier={imgageUrl || resolveThumbnailUrl}
        alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
        width={100}
        height={100}
        onMouseEnter={onSelect}
      />
      {resolveThumbnailUrl && (
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40">
          <PlayIcon className="size-5 text-white/50" />
        </span>
      )}
    </div>
  );
}

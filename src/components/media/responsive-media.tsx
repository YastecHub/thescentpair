import Image from "next/image";
import { AspectRatioFrame } from "@/components/media/aspect-ratio-frame";
import { MediaPlaceholder } from "@/components/media/media-placeholder";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary/url";

export type MediaReference = Readonly<{
  publicId?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  transformation?: string;
}>;

export function ResponsiveMedia({
  media,
  ratio = "4 / 5",
  placeholderLabel,
  className,
}: Readonly<{
  media: MediaReference;
  ratio?: string;
  placeholderLabel?: string;
  className?: string;
}>) {
  const src = media.publicId
    ? buildCloudinaryImageUrl(media.publicId, media.transformation)
    : undefined;

  return (
    <AspectRatioFrame ratio={ratio} className={className}>
      {src && media.alt ? (
        <Image
          src={src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          priority={media.priority}
          unoptimized
        />
      ) : (
        <MediaPlaceholder label={placeholderLabel} />
      )}
    </AspectRatioFrame>
  );
}

export function BrandImage(
  props: Readonly<{
    media: MediaReference;
    ratio?: string;
    className?: string;
  }>,
) {
  return <ResponsiveMedia {...props} placeholderLabel="Brand asset pending" />;
}

export function ProductImage(
  props: Readonly<{
    media: MediaReference;
    ratio?: string;
    className?: string;
  }>,
) {
  // Use a product-optimised transformation: fill the frame with smart-focus
  // cropping, high quality, and auto format. Callers can override via
  // media.transformation if they need a different crop for a specific context.
  const productMedia: MediaReference = {
    ...props.media,
    transformation:
      props.media.transformation ??
      "f_auto,q_auto:best,c_fill,g_auto,ar_4:5,w_800",
  };

  return (
    <ResponsiveMedia
      {...props}
      media={productMedia}
      placeholderLabel="Product media pending"
    />
  );
}

export function VideoPoster({
  media,
  ratio = "16 / 9",
}: Readonly<{ media: MediaReference; ratio?: string }>) {
  return (
    <ResponsiveMedia
      media={media}
      ratio={ratio}
      placeholderLabel="Video poster pending"
    />
  );
}

export function DecorativeMedia({
  className,
}: Readonly<{ className?: string }>) {
  return <div className={className} aria-hidden="true" />;
}

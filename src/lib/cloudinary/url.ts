import { env } from "@/lib/environment/env";

export function buildCloudinaryImageUrl(
  publicId: string,
  transformation = "f_auto,q_auto:good,c_limit,w_1200",
) {
  if (!env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return undefined;
  }

  return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

/**
 * Cloudinary URL builders.
 *
 * Uses `process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` directly instead of the
 * Zod-validated env singleton so that Next.js can statically replace the value
 * in both server and client bundles, avoiding hydration mismatches.
 */

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function buildCloudinaryImageUrl(
  publicId: string,
  transformation = "f_auto,q_auto:good,c_limit,w_1200",
) {
  if (!cloudName) {
    return undefined;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformation}/${publicId}`;
}


export function buildCloudinaryVideoUrl(
  publicId: string,
  transformation = "f_auto,q_auto,vc_auto",
) {
  if (!cloudName) {
    return undefined;
  }

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformation}/${publicId}`;
}

export function buildCloudinaryVideoPosterUrl(publicId: string) {
  return buildCloudinaryImageUrl(
    `${publicId}.jpg`,
    "f_auto,q_auto:good,c_limit,w_1440,so_0",
  );
}

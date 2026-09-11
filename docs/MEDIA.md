# Media Asset Guide HIS & HER'S SCENTS

All media is delivered through Cloudinary. The site never stores images or videos locally in the repository. This document covers everything needed to upload, name, and manage assets correctly.

---

## Cloudinary Configuration

- **Cloud name:** `u7scxp7o`
- **Environment variable:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=u7scxp7o`
- **Image URL pattern:** `https://res.cloudinary.com/u7scxp7o/image/upload/{transformation}/{publicId}`
- **Video URL pattern:** `https://res.cloudinary.com/u7scxp7o/video/upload/{transformation}/{publicId}`

The site builds all URLs automatically from the public ID stored in the content files. You never write full URLs in code only the public ID path.

---

## Folder Structure

All assets live under the `hhs/` root folder in your Cloudinary media library. Create this folder structure before uploading.

```
hhs/
├── fragrance/
│   ├── midnight-oath/
│   │   ├── hero-dark
│   │   ├── hero-light
│   │   ├── detail-cap
│   │   └── detail-label
│   ├── velvet-vow/
│   │   └── (same structure)
│   └── amber-room/
│       └── (same structure)
├── turntable/
│   ├── midnight-oath/
│   │   ├── frame001
│   │   ├── frame002
│   │   └── … frame036
│   └── velvet-vow/
│       └── (same structure)
├── pairs/
│   └── the-first-night/
│       ├── hero
│       ├── his
│       └── hers
├── notes/
│   ├── bergamot
│   ├── pink-pepper
│   ├── oud
│   ├── rose
│   ├── amber
│   └── musk
├── stories/
│   ├── how-we-chose-our-scents/
│   │   └── cover
│   ├── invisible-language/
│   │   └── cover
│   └── on-gifting/
│       └── cover
├── og/
│   ├── midnight-oath
│   ├── velvet-vow
│   ├── amber-room
│   ├── the-first-night
│   ├── how-we-chose-our-scents
│   ├── invisible-language
│   └── on-gifting
└── video/
    └── ritual-film
```

---

## Naming Conventions

- Folder names and public ID segments use **lowercase hyphenated slugs** matching the content file slugs exactly.
- Frame sequences use zero-padded three-digit numbers: `frame001`, `frame002`, … `frame036`.
- No spaces, no uppercase, no special characters other than hyphens and forward slashes.
- When you add a new fragrance with slug `cedar-promise`, its folder is `hhs/fragrance/cedar-promise/`.

---

## Required Dimensions

### Fragrance Hero Images

| Asset        | Public ID suffix | Dimensions             | Aspect ratio | Notes                                            |
| ------------ | ---------------- | ---------------------- | ------------ | ------------------------------------------------ |
| Hero dark    | `hero-dark`      | 1200 × 1500 px minimum | 4:5          | Bottle on pure black with dramatic side lighting |
| Hero light   | `hero-light`     | 1200 × 1500 px minimum | 4:5          | Bottle on white or light parchment, clean shadow |
| Detail cap   | `detail-cap`     | 800 × 800 px minimum   | 1:1          | Close-up of cap engraving                        |
| Detail label | `detail-label`   | 800 × 800 px minimum   | 1:1          | Close-up of label tactile texture                |

### Pair Images

| Asset       | Public ID suffix | Dimensions             | Aspect ratio | Notes                                               |
| ----------- | ---------------- | ---------------------- | ------------ | --------------------------------------------------- |
| Pair hero   | `hero`           | 1200 × 1200 px minimum | 1:1          | Both bottles together on black with gold reflection |
| His world   | `his`            | 800 × 1000 px minimum  | 4:5          | His bottle in his colour world                      |
| Her's world | `hers`           | 800 × 1000 px minimum  | 4:5          | Her's bottle in her colour world                    |

### Story Cover Images

| Asset | Dimensions            | Aspect ratio | Notes                            |
| ----- | --------------------- | ------------ | -------------------------------- |
| Cover | 1600 × 700 px minimum | ~16:7        | Full-bleed editorial cover image |

### Note Images

| Asset           | Dimensions           | Notes                                                  |
| --------------- | -------------------- | ------------------------------------------------------ |
| Note ingredient | 400 × 400 px minimum | Botanical or abstract representation of the ingredient |

### Open Graph / Social Images

| Asset    | Dimensions            | Notes                                                        |
| -------- | --------------------- | ------------------------------------------------------------ |
| OG image | 1200 × 630 px exactly | Used for social sharing previews. Must be exactly this size. |

---

## Turntable Requirements

The turntable (Moment 03) requires a sequence of 36 photographs of the bottle rotating 360°.

**Photography requirements:**

- 36 frames at exactly 10° intervals (0°, 10°, 20°, … 350°).
- Locked tripod. Identical camera exposure, focal distance, and white balance on all 36 frames.
- Bottle on pure black background with consistent single-source side lighting.
- Frame 1 should be the front-facing position (label visible).

**File requirements:**

- Format: WebP (preferred) or JPEG.
- Maximum 70 KB per frame after optimisation. Total sequence must be under 2.5 MB.
- Dimensions: 800 × 800 px minimum, 1:1 square crop.
- Naming: `frame001`, `frame002`, … `frame036` (no file extension in the public ID Cloudinary handles format negotiation).

**Upload path:** `hhs/turntable/[fragrance-slug]/frame001` through `frame036`.

**Content file entry:**

```ts
turntable: {
  publicIdBase: "hhs/turntable/midnight-oath/frame",
  frameCount: 36,
  startIndex: 1,
  pad: 3,
}
```

The component builds frame URLs as `{publicIdBase}{zeroPadded(index, pad)}` e.g. `hhs/turntable/midnight-oath/frame001`.

On Tier B, the component loads every other frame (18 frames) for performance. Ensure the sequence is evenly spaced so every-other-frame still produces a smooth rotation.

---

## Video Requirements (Moment 06 The Ritual)

**Content:**

- Slow-motion fragrance ceremony: wrist application, atomiser press, golden mist, neck gesture.
- Backlit spray so mist catches light in warm gold against darkness.
- Duration: 15–25 seconds of edited, loopable footage.

**Technical requirements:**

- Format: MP4 (H.264 or H.265) and WebM (VP9 or AV1).
- **No audio track.** Remove with `ffmpeg -an` flag. An audio track will cause mobile browsers to block autoplay.
- Aspect ratio: 16:9 widescreen.
- Resolution: 1920 × 1080 minimum.
- Bitrate: target under 8 Mbps for H.264.

**Upload path:** `hhs/video/ritual-film`

The site uses Cloudinary's `vc_auto` transformation to serve the best format for each browser automatically.

**Poster frame:** The site automatically generates a poster from the first frame of the video using the public ID `hhs/video/ritual-film.jpg` with transformation `so_0` (seek to 0 seconds). No separate poster upload is needed.

---

## Default Transformations

The site applies these transformations automatically. You do not need to apply them manually when uploading.

| Use            | Transformation string                    |
| -------------- | ---------------------------------------- |
| Standard image | `f_auto,q_auto:good,c_limit,w_1200`      |
| Video          | `f_auto,q_auto,vc_auto`                  |
| Video poster   | `f_auto,q_auto:good,c_limit,w_1440,so_0` |

- `f_auto`: serves WebP or AVIF where the browser supports it, falling back to JPEG/PNG.
- `q_auto:good`: Cloudinary's automatic quality optimisation at the "good" level.
- `c_limit,w_1200`: caps width at 1200px without upscaling.
- `vc_auto`: serves the best video codec for the browser (AV1, VP9, H.265, H.264).

---

## Optimisation Rules

1. **Upload originals at full resolution.** Cloudinary handles resizing and format conversion. Do not pre-resize before uploading.
2. **Use WebP for turntable frames.** WebP at quality 80 typically achieves under 50 KB per frame for a 800 × 800 bottle on black.
3. **Strip metadata.** Remove EXIF data from images before uploading to reduce file size.
4. **Test on mobile.** After uploading, verify the turntable sequence loads within 3 seconds on a simulated 4G connection using browser DevTools.
5. **OG images must be exactly 1200 × 630 px.** Social platforms crop or reject images that are the wrong size.

---

## Backup Requirements

Cloudinary is the primary media store. Maintain a local backup of all original master files:

- Keep all original RAW or high-resolution TIFF/JPEG files from the photographer.
- Keep all original video files before encoding.
- Store backups in a separate location from the Cloudinary account (e.g. a shared drive or object storage bucket).
- After any upload session, verify the public IDs in Cloudinary match the paths in the content files by running `pnpm build` and checking for broken image warnings.

If the Cloudinary account is ever lost or the cloud name changes, update `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local` and re-upload all assets to the new account using the same public ID paths. No code changes are needed beyond the environment variable.

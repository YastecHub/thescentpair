# Media Asset Inventory & Handover Specification

Based on `03_HHS_Master_Document.pdf` Section 06: *What We’ll Need From You*.

---

## 1. Brand Identity Assets

| Asset | Specifications | Destination | Status |
|---|---|---|---|
| **Official Crest** | High-res PNG/JPG, 1024x1024, dark background | `public/brand/logo-crest.png` | Integrated & Optimized |
| **Brand Lockup** | Bottle + Monogram + "His & Her's Scents" + Tagline | `public/brand/logo-lockup.png` | Integrated & Optimized |
| **Original Master** | Master graphic archive | `public/brand/logo.png` | Stored |

---

## 2. Product Photography (Per Fragrance)

1. **Bottle on Pure Black**:
   - Dramatic single-source side lighting, highlights tracing bottle shoulder and cap.
   - 4:5 aspect ratio (e.g. 1600x2000px).
   - Used in: Hero dark backgrounds, Turntable resting frames, Story showcases.
2. **Bottle on Pure White / Light Parchment**:
   - Clean, shadowless or soft contact shadow.
   - 1:1 square ratio (e.g. 1200x1200px).
   - Used in: Google Merchant feed, Collection filter cards.
3. **Detail Shots**:
   - Cap engraving, atomiser nozzle, and label tactile texture.
4. **Hero Pair Together**:
   - Both bottles resting together on black with golden reflection.
   - The central visual for `/` and `/pairs`.

---

## 3. Moment 03: The Turntable Sequence

- **Frame Count**: 36 photographs at exactly 10-degree intervals for 360-degree rotation.
- **Exposure**: Identical camera exposure and focal distance on all 36 frames (locked tripod, manual white balance).
- **Naming Convention**: `[fragrance-slug]-turntable-01.webp` through `36.webp`.
- **Optimization**: WebP/AVIF format, max 70KB per frame (total sequence < 2.5MB).

---

## 4. Moment 06: The Ritual Film

- **Footage Requirements**:
  - Slow-motion capture (60fps or 120fps).
  - Backlit spray so mist catches light in warm gold against darkness.
  - Intimate hands/neck/wrist application.
  - Duration: 15–25 seconds of edited loopable footage.
- **Encoding Parameters**:
  - MP4 (H.264 / H.265) & WebM (VP9 / AV1).
  - Strictly no audio track (`an` flag in ffmpeg) to prevent mobile browser autoplay blocks.
  - Reserved aspect ratio: 16:9 widescreen.

---

## 5. Cloudinary Media Delivery

All media paths use the Cloudinary URL format:
`https://res.cloudinary.com/[cloud_name]/image/upload/f_auto,q_auto,w_[width]/[public_id]`
Components automatically serve modern AVIF and WebP formats with responsive widths matching the viewport.

# Cloudinary Media Upload Guide HIS & HER'S SCENTS

## Configuration Status ✓

- **Cloud name:** `u7scxp7o`
- **Environment:** Connected via `.env.local`
- **Image URL pattern:** `https://res.cloudinary.com/u7scxp7o/image/upload/{transformation}/{publicId}`

---

## Folder Structure

Upload all assets to your Cloudinary account using exactly these Public IDs.
Create folder `hhs/` at the root of your media library.

---

## Fragrance: Midnight Oath (His)

| Asset            | Public ID                                           | Dimensions      |
| ---------------- | --------------------------------------------------- | --------------- |
| Hero light       | `hhs/fragrance/midnight-oath/hero-light`            | min 1200×1500px |
| Hero dark        | `hhs/fragrance/midnight-oath/hero-dark`             | min 1200×1500px |
| Detail cap       | `hhs/fragrance/midnight-oath/detail-cap`            | min 800×800px   |
| Detail label     | `hhs/fragrance/midnight-oath/detail-label`          | min 800×800px   |
| Turntable frames | `hhs/turntable/midnight-oath/frame001` → `frame036` | min 800×800px   |

---

## Fragrance: Velvet Vow (Her's)

| Asset            | Public ID                                        | Dimensions      |
| ---------------- | ------------------------------------------------ | --------------- |
| Hero light       | `hhs/fragrance/velvet-vow/hero-light`            | min 1200×1500px |
| Hero dark        | `hhs/fragrance/velvet-vow/hero-dark`             | min 1200×1500px |
| Detail cap       | `hhs/fragrance/velvet-vow/detail-cap`            | min 800×800px   |
| Detail label     | `hhs/fragrance/velvet-vow/detail-label`          | min 800×800px   |
| Turntable frames | `hhs/turntable/velvet-vow/frame001` → `frame036` | min 800×800px   |

---

## Fragrance: Amber Room (Unisex)

| Asset      | Public ID                             | Dimensions      |
| ---------- | ------------------------------------- | --------------- |
| Hero light | `hhs/fragrance/amber-room/hero-light` | min 1200×1500px |
| Hero dark  | `hhs/fragrance/amber-room/hero-dark`  | min 1200×1500px |
| Detail cap | `hhs/fragrance/amber-room/detail-cap` | min 800×800px   |

---

## Pair: The First Night

| Asset       | Public ID                             | Dimensions      |
| ----------- | ------------------------------------- | --------------- |
| Pair hero   | `hhs/pair/the-first-night/hero-pair`  | min 1200×1200px |
| His world   | `hhs/pair/the-first-night/his-world`  | min 800×1000px  |
| Her's world | `hhs/pair/the-first-night/hers-world` | min 800×1000px  |

---

## Stories (Cover Images)

| Asset                           | Public ID                                   | Dimensions     |
| ------------------------------- | ------------------------------------------- | -------------- |
| How We Chose Our Scents         | `hhs/stories/how-we-chose-our-scents/cover` | min 1600×700px |
| The Invisible Language          | `hhs/stories/invisible-language/cover`      | min 1600×700px |
| On Gifting Something That Stays | `hhs/stories/on-gifting/cover`              | min 1600×700px |

---

## OG / Social Images

| Asset                     | Public ID                        | Dimensions |
| ------------------------- | -------------------------------- | ---------- |
| Midnight Oath             | `hhs/og/midnight-oath`           | 1200×630px |
| Velvet Vow                | `hhs/og/velvet-vow`              | 1200×630px |
| Amber Room                | `hhs/og/amber-room`              | 1200×630px |
| Story: How We Chose       | `hhs/og/how-we-chose-our-scents` | 1200×630px |
| Story: Invisible Language | `hhs/og/invisible-language`      | 1200×630px |
| Story: On Gifting         | `hhs/og/on-gifting`              | 1200×630px |

---

## How the URL is Built

Public ID `hhs/fragrance/midnight-oath/hero-light` becomes:

`https://res.cloudinary.com/u7scxp7o/image/upload/f_auto,q_auto:good,c_limit,w_1200/hhs/fragrance/midnight-oath/hero-light`

Transformation: `f_auto` (WebP where supported) + `q_auto:good` (auto quality) + `c_limit,w_1200` (cap at 1200px, never upscale).

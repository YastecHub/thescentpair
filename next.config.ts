import type { NextConfig } from "next";

const CLOUDINARY_HOST = "res.cloudinary.com";
const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "";

// Build a minimal but practical CSP.
// Adjust 'script-src' and 'connect-src' when analytics provider is confirmed.
const cspDirectives = [
  "default-src 'self'",
  // Next.js inline scripts + GSAP/Framer need unsafe-inline for now;
  // replace with nonce-based approach when moving to production hardening.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `img-src 'self' data: blob: https://${CLOUDINARY_HOST}`,
  `media-src 'self' https://${CLOUDINARY_HOST}`,
  `font-src 'self' https://fonts.gstatic.com`,
  `connect-src 'self'${ANALYTICS_DOMAIN ? ` https://${ANALYTICS_DOMAIN}` : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: cspDirectives },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: CLOUDINARY_HOST,
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Permanent redirect from .com.ng to .com preserving path
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "thescentpair.com.ng" }],
        destination: "https://thescentpair.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

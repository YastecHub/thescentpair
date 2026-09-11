import { z } from "zod";

const optionalString = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().optional(),
);
const optionalUrl = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.string().url().optional(),
);

export const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl.default("https://thescentpair.com"),
  NEXT_PUBLIC_WHATSAPP_PHONE: optionalString.refine(
    (value) => value === undefined || /^\d{10,15}$/.test(value),
    {
      message: "Use digits only, including country code, with no plus sign.",
    },
  ),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: optionalString,
  NEXT_PUBLIC_ANALYTICS_DOMAIN: optionalString,
  CLOUDINARY_API_KEY: optionalString,
  CLOUDINARY_API_SECRET: optionalString,
  FORM_ENDPOINT: optionalUrl,
  CONTACT_RECIPIENT_EMAIL: optionalString.refine(
    (value) =>
      value === undefined || z.string().email().safeParse(value).success,
    {
      message: "Use a valid email address.",
    },
  ),
  NEWSLETTER_API_KEY: optionalString,
  RESEND_API_KEY: optionalString,
});

export type AppEnv = z.infer<typeof envSchema>;

export function validateEnv(
  values: Record<string, string | undefined>,
): AppEnv {
  const result = envSchema.safeParse(values);

  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.error.message}`);
  }

  return result.data;
}

export const env = validateEnv(process.env);

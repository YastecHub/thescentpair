import { describe, expect, it } from "vitest";
import { validateEnv } from "@/lib/environment/env";

describe("environment validation", () => {
  it("allows optional integrations to be unset for local development", () => {
    const env = validateEnv({});

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://thescentpair.com");
  });

  it("rejects malformed public site URLs", () => {
    expect(() => validateEnv({ NEXT_PUBLIC_SITE_URL: "not-a-url" })).toThrow(
      "Environment validation failed",
    );
  });

  it("rejects WhatsApp numbers with a plus sign", () => {
    expect(() =>
      validateEnv({ NEXT_PUBLIC_WHATSAPP_PHONE: "+2348012345678" }),
    ).toThrow("Environment validation failed");
  });
});

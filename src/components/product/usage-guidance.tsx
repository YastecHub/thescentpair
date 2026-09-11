export function UsageGuidance() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          heading: "Pulse points",
          body: "Apply to the inner wrists, sides of the neck, behind the ears and inside the elbows. These areas generate warmth that helps the scent project and evolve.",
        },
        {
          heading: "Application distance",
          body: "Hold the bottle 10–15 cm from the skin. A light, even mist is more effective than a heavy application at close range.",
        },
        {
          heading: "Wrist technique",
          body: "Avoid rubbing your wrists together after applying. This disrupts the top notes and changes how the scent opens.",
        },
        {
          heading: "Storage",
          body: "Keep the bottle away from direct sunlight, heat and humidity. A cool, dark environment preserves the fragrance composition.",
        },
        {
          heading: "Layering",
          body: "Fragrance lasts longer on moisturised skin. An unscented body lotion applied before the fragrance helps the scent adhere and project through the day.",
        },
        {
          heading: "Skin sensitivity",
          body: "Fragrances contain a mixture of natural and synthetic materials. If you have sensitive skin or known allergies, apply to clothing rather than directly to skin and discontinue use if irritation occurs. This is not medical advice.",
        },
      ].map(({ heading, body }) => (
        <div key={heading} className="border-l border-gold-300/35 pl-5">
          <h3 className="font-semibold text-parchment text-sm">{heading}</h3>
          <p className="mt-2 text-sm text-parchment/62 leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  );
}

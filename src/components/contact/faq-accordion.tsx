"use client";

import { useState } from "react";

export const faqs = [
  {
    question: "Where is delivery available?",
    answer:
      "We currently deliver across Lagos and to major cities nationwide. Contact us on WhatsApp to confirm availability in your area.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Same-day and next-day delivery is available within Lagos for orders confirmed before 12 pm. Nationwide delivery typically takes 2–5 business days. Timings and fees are confirmed at order.",
  },
  {
    question: "Are the fragrances authentic?",
    answer:
      "Yes. Every fragrance sold through His & Her's Scents is 100% authentic. We source directly and stand behind every bottle.",
  },
  {
    question: "How long do the scents last?",
    answer:
      "Each fragrance includes longevity, sillage and projection ratings. Exact wear time varies with skin, weather and application.",
  },
  {
    question: "Where should perfume be applied?",
    answer:
      "Apply lightly to pulse points such as the wrists, neck or inner elbow. Avoid rubbing wrists together after application.",
  },
  {
    question: "What is the returns policy?",
    answer:
      "Due to the nature of fragrance, we do not accept returns on opened bottles. If there is an issue with your order, contact us within 48 hours of receipt and we will make it right.",
  },
  {
    question: "What about allergies or skin sensitivity?",
    answer:
      "Patch test if you are sensitive to fragrance. Stop use if irritation occurs and seek professional advice for personal medical concerns.",
  },
  {
    question: "How do I order?",
    answer:
      "Orders are placed via WhatsApp. Browse the collection, choose your fragrance or pair set, then message us to confirm availability, size and delivery details. We will guide you through the rest.",
  },
] as const;

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div
      className="divide-y divide-onyx-700 border border-onyx-700"
      data-testid="faq-accordion"
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <section key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-4 bg-onyx-800 px-5 py-4 text-left font-semibold text-parchment hover:text-gold-300"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {faq.question}
                <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="bg-onyx-900 px-5 pb-5 text-sm text-parchment/68"
            >
              {faq.answer}
            </div>
          </section>
        );
      })}
    </div>
  );
}

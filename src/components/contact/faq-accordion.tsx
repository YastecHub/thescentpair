"use client";

import { useState } from "react";

export const faqs = [
  {
    question: "Where is delivery available?",
    answer: "Final delivery locations need client confirmation. The site is prepared to explain local and nationwide delivery before launch.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery timing is a policy gap for client confirmation. The final copy should name areas, timing and costs clearly.",
  },
  {
    question: "Are the fragrances authentic?",
    answer: "The final authenticity statement should be supplied by the brand. This section is reserved for a clear, confidence-building answer.",
  },
  {
    question: "How long do the scents last?",
    answer: "Each fragrance includes longevity, sillage and projection ratings. Exact wear time varies with skin, weather and application.",
  },
  {
    question: "Where should perfume be applied?",
    answer: "Apply lightly to pulse points such as the wrists, neck or inner elbow. Avoid rubbing wrists together after application.",
  },
  {
    question: "What is the returns policy?",
    answer: "Final returns and exchange wording requires client or legal review before launch.",
  },
  {
    question: "What about allergies or skin sensitivity?",
    answer: "Patch test if you are sensitive to fragrance. Stop use if irritation occurs and seek professional advice for personal medical concerns.",
  },
  {
    question: "How do I order?",
    answer: "Phase 1 ordering is prepared for WhatsApp conversation. The live number and message link will be connected after approval.",
  },
] as const;

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-onyx-700 border border-onyx-700" data-testid="faq-accordion">
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
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="bg-onyx-900 px-5 pb-5 text-sm text-parchment/68">
              {faq.answer}
            </div>
          </section>
        );
      })}
    </div>
  );
}

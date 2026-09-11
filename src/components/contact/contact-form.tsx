"use client";

import { useState } from "react";

const topics = ["General enquiry", "Product question", "Gifting", "Wholesale", "Bespoke request", "Delivery question"];

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    if (!String(data.get("name") ?? "").trim()) {
      nextErrors.name = "Enter your name.";
    }

    const contact = String(data.get("contact") ?? "").trim();
    if (!contact || (!contact.includes("@") && contact.length < 7)) {
      nextErrors.contact = "Enter an email address or phone number.";
    }

    if (!String(data.get("message") ?? "").trim()) {
      nextErrors.message = "Enter a message.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus("Demo state: the form is valid, but no production form endpoint is configured yet.");
    } else {
      setStatus("Please correct the highlighted fields.");
    }
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit} noValidate aria-label="Contact enquiry form">
      <label className="grid gap-2 text-sm font-semibold text-parchment" htmlFor="contact-name">
        Name
        <input id="contact-name" name="name" className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment" aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {errors.name ? <span id="contact-name-error" className="text-gold-300">{errors.name}</span> : null}
      </label>
      <label className="grid gap-2 text-sm font-semibold text-parchment" htmlFor="contact-contact">
        Email or phone
        <input id="contact-contact" name="contact" className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment" aria-describedby={errors.contact ? "contact-contact-error" : undefined} />
        {errors.contact ? <span id="contact-contact-error" className="text-gold-300">{errors.contact}</span> : null}
      </label>
      <label className="grid gap-2 text-sm font-semibold text-parchment" htmlFor="contact-topic">
        Enquiry topic
        <select id="contact-topic" name="topic" className="min-h-11 border border-onyx-700 bg-onyx-900 px-4 text-parchment">
          {topics.map((topic) => <option key={topic}>{topic}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-parchment" htmlFor="contact-message">
        Message
        <textarea id="contact-message" name="message" rows={5} className="border border-onyx-700 bg-onyx-900 px-4 py-3 text-parchment" aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message ? <span id="contact-message-error" className="text-gold-300">{errors.message}</span> : null}
      </label>
      <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold-300 bg-gold-300 px-6 py-3 type-button text-ink-900">
        Prepare enquiry
      </button>
      <p aria-live="polite" className="min-h-6 text-sm text-gold-300">{status}</p>
    </form>
  );
}

"use client";

/**
 * Cinematic-styled enquiry form. Posts to the Flask backend at /api/enquiry.
 * Works for general contact, a specific plant, hire and visit enquiries via the
 * `kind` prop. Gracefully falls back to a mailto prompt if the API is
 * unreachable (e.g. local dev with no Python runtime).
 */

import { useState } from "react";
import { Send, Check, Leaf } from "lucide-react";
import { BRAND } from "@/lib/content";

type Kind = "general" | "plant" | "hire" | "visit";
type Status = "idle" | "sending" | "sent" | "error";

// Simple, forgiving email shape check. Not a full RFC validator on purpose:
// we only want to catch obvious typos before the round-trip to the backend.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnquiryForm({
  kind = "general",
  subject = "",
  initialMessage = "",
  compact = false,
}: {
  kind?: Kind;
  subject?: string;
  initialMessage?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      kind,
      subject,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
    };

    // Validate locally first so users see errors instantly, without waiting on
    // a possibly cold backend. The server 422 path below stays as a backstop.
    const localErrors: Record<string, string> = {};
    if (payload.name.trim().length < 2) {
      localErrors.name = "Please tell us your name.";
    }
    if (!EMAIL_RE.test(payload.email.trim())) {
      localErrors.email = "Please enter a valid email address.";
    }
    if (payload.message.trim().length < 5) {
      localErrors.message = "Please add a little more so we can help.";
    }
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.status === 422) {
        const data = await res.json();
        setErrors(data.errors || {});
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-start gap-4 rounded-2xl cine-glass p-8"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]">
          <Check className="h-5 w-5 text-[var(--c-glow)]" aria-hidden="true" />
        </span>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl text-[var(--c-bone)]">
          Thanks, that has landed with us.
        </h3>
        <p className="text-[var(--c-sage)]">
          We read every message and will reply soon. If it is urgent, email us
          directly at{" "}
          <a
            className="text-[var(--c-glow)] underline-offset-4 hover:underline"
            href={`mailto:${BRAND.contactEmail}`}
          >
            {BRAND.contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.4)] px-4 py-3 text-[var(--c-bone)] outline-none transition-colors placeholder:text-[var(--c-sage)]/60 focus:border-[var(--c-glow-line)] focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl cine-glass p-6 sm:p-8">
      {/* honeypot, visually hidden from people */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="block">
          <span className="cine-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
            Name
          </span>
          <input
            name="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enq-name-error" : undefined}
            className={`mt-2 ${field}`}
            placeholder="Your name"
          />
          {errors.name && (
            <span
              id="enq-name-error"
              className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]"
            >
              {errors.name}
            </span>
          )}
        </label>
        <label className="block">
          <span className="cine-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enq-email-error" : undefined}
            className={`mt-2 ${field}`}
            placeholder="you@email.com"
          />
          {errors.email && (
            <span
              id="enq-email-error"
              className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]"
            >
              {errors.email}
            </span>
          )}
        </label>
      </div>

      <label className="mt-4 block">
        <span className="cine-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
          Phone <span className="opacity-60">(optional)</span>
        </span>
        <input name="phone" className={`mt-2 ${field}`} placeholder="So we can call if it is easier" />
      </label>

      <label className="mt-4 block">
        <span className="cine-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--c-sage)]">
          Message
        </span>
        <textarea
          name="message"
          required
          defaultValue={initialMessage}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "enq-message-error" : undefined}
          rows={compact ? 3 : 5}
          className={`mt-2 resize-none ${field}`}
          placeholder={
            kind === "hire"
              ? "Tell us about the space, the occasion and rough timings."
              : kind === "plant"
                ? "Ask us anything about this plant, or reserve one."
                : "What are you after?"
          }
        />
        {errors.message && (
          <span
            id="enq-message-error"
            className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]"
          >
            {errors.message}
          </span>
        )}
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="cine-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-glow)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Leaf className="h-4 w-4 animate-pulse" aria-hidden="true" /> Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send enquiry
            </>
          )}
        </button>
        {status === "error" && (
          <span className="text-[0.8rem] text-[var(--c-sage)]" role="alert">
            Something went wrong. Email us at{" "}
            <a
              className="text-[var(--c-glow)] underline-offset-4 hover:underline"
              href={`mailto:${BRAND.contactEmail}`}
            >
              {BRAND.contactEmail}
            </a>
            .
          </span>
        )}
      </div>
    </form>
  );
}

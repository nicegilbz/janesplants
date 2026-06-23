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

export default function EnquiryForm({
  kind = "general",
  subject = "",
  compact = false,
}: {
  kind?: Kind;
  subject?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setStatus("sending");
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
      <div className="flex flex-col items-start gap-4 rounded-2xl cine-glass p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--c-glow-line)] bg-[var(--c-glow-soft)]">
          <Check className="h-5 w-5 text-[var(--c-glow)]" />
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
    "w-full rounded-xl border border-[var(--c-brass-line)] bg-[rgba(12,20,16,0.4)] px-4 py-3 text-[var(--c-bone)] outline-none transition-colors placeholder:text-[var(--c-sage)]/50 focus:border-[var(--c-glow-line)]";

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
          <input name="name" required className={`mt-2 ${field}`} placeholder="Your name" />
          {errors.name && (
            <span className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]">
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
            className={`mt-2 ${field}`}
            placeholder="you@email.com"
          />
          {errors.email && (
            <span className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]">
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
          <span className="mt-1 block text-[0.75rem] text-[var(--c-terracotta)]">
            {errors.message}
          </span>
        )}
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="cine-cta disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Leaf className="h-4 w-4 animate-pulse" /> Sending
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send enquiry
            </>
          )}
        </button>
        {status === "error" && (
          <span className="text-[0.8rem] text-[var(--c-sage)]">
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

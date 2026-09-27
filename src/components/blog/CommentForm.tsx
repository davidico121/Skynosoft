"use client";

import { FormEvent, useState } from "react";

const inputClasses =
  "w-full rounded-xl border border-border-hairline-strong bg-background px-4 py-3 font-body text-base text-foreground placeholder:text-foreground-muted transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function CommentForm({ postSlug }: { postSlug: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postSlug,
          name: formData.get("name"),
          email: formData.get("email"),
          body: formData.get("body"),
          website: formData.get("website"),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-xl border border-border-hairline bg-card p-6 font-body text-base text-foreground-muted">
        Thanks. Your comment has been submitted and will appear once it&rsquo;s reviewed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot field: hidden from real visitors via CSS, bots often fill it anyway. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          maxLength={100}
          className={inputClasses}
        />
        <input
          type="email"
          name="email"
          placeholder="Email (not published)"
          className={inputClasses}
        />
      </div>
      <textarea
        name="body"
        placeholder="Add a comment"
        required
        maxLength={2000}
        rows={4}
        className={inputClasses}
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting" : "Post Comment"}
        </button>
        {status === "error" && (
          <p className="font-body text-base text-red-700">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}

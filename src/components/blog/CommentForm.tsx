"use client";

import { FormEvent, useState } from "react";

const inputClasses =
  "w-full rounded-lg border border-border-hairline bg-background px-4 py-3 font-body text-body-md text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none";

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
      <p className="rounded-lg border border-border-hairline bg-card p-6 font-body text-body-md text-foreground-muted">
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
          className="inline-flex items-center justify-center gap-2 rounded bg-primary px-6 py-3 font-body text-body-md font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting..." : "Post Comment"}
        </button>
        {status === "error" && (
          <p className="font-body text-body-md text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <h1 className="font-heading text-2xl font-semibold">Sign in</h1>
      <label className="flex flex-col gap-2">
        <span className="font-body text-sm text-foreground-muted">Password</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-base outline-none focus-visible:border-primary"
        />
      </label>
      {state?.error && (
        <p className="font-body text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-primary px-4 py-2 font-body text-base font-semibold text-white transition-opacity hover:bg-primary/90 disabled:opacity-50"
      >
        {pending ? "Checking..." : "Sign in"}
      </button>
    </form>
  );
}

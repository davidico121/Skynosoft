"use client";

import Image from "next/image";
import { useActionState } from "react";
import logo from "../../../../public/brand/skynosoft-logo-horizontal.png";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm({ next }: { next?: string } = {}) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Image src={logo} alt="Skynosoft" height={32} className="mb-4 w-auto self-start" priority />
      <h1 className="font-heading text-2xl font-semibold">Sign in</h1>
      {next && <input type="hidden" name="next" value={next} />}
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

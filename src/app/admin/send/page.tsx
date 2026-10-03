import type { Metadata } from "next";
import { isAuthed } from "./actions";
import { LoginForm } from "./LoginForm";
import { ComposeForm } from "./ComposeForm";

export const metadata: Metadata = {
  title: "Send | Skynosoft",
  robots: { index: false, follow: false },
};

export default async function SendPage() {
  const authed = await isAuthed();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
      {authed ? <ComposeForm /> : <LoginForm />}
    </main>
  );
}

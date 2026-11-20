import type { Metadata } from "next";
import { isAuthed } from "./actions";
import { LoginForm } from "./LoginForm";
import { ComposeForm } from "./ComposeForm";
import { AdminNav } from "../AdminNav";

export const metadata: Metadata = {
  title: "Send | Skynosoft",
  robots: { index: false, follow: false },
};

export default async function SendPage() {
  const authed = await isAuthed();

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
        <LoginForm />
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminNav current="/admin/send" />
      <main className="mx-auto flex w-full max-w-xl flex-col px-6 py-16">
        <ComposeForm />
      </main>
    </div>
  );
}

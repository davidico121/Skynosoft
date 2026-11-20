import type { Metadata } from "next";
import { isAuthed } from "../invoices/actions";
import { LoginForm } from "../invoices/LoginForm";
import { EmailCleanerTool } from "./EmailCleanerTool";
import { AdminNav } from "../AdminNav";

export const metadata: Metadata = {
  title: "Lead Email Cleaner | Skynosoft",
  robots: { index: false, follow: false },
};

export default async function EmailCleanerPage() {
  const authed = await isAuthed();

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
        <LoginForm next="/admin/email-cleaner" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <AdminNav current="/admin/email-cleaner" />
      <EmailCleanerTool />
    </main>
  );
}

import type { Metadata } from "next";
import { isAuthed } from "./actions";
import { LoginForm } from "./LoginForm";
import { InvoiceBuilder } from "./InvoiceBuilder";

export const metadata: Metadata = {
  title: "Invoices | Skynosoft",
  robots: { index: false, follow: false },
};

export default async function InvoicesPage() {
  const authed = await isAuthed();

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-16">
        <LoginForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <InvoiceBuilder />
    </main>
  );
}

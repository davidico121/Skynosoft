"use client";

import { useRef, useState } from "react";
import { InvoicePreview } from "./InvoicePreview";
import { createDefaultInvoiceData, computeTotals, formatUSD, type InvoiceData, type LineItem } from "./types";
import { logout } from "./actions";

function fieldClass() {
  return "w-full rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-sm outline-none focus-visible:border-primary";
}

function labelClass() {
  return "flex flex-col gap-1.5";
}

function labelTextClass() {
  return "font-body text-xs font-medium text-foreground-muted";
}

export function InvoiceBuilder() {
  const [data, setData] = useState<InvoiceData>(() => createDefaultInvoiceData());
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  function update<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function updateItem(id: string, patch: Partial<LineItem>) {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), description: "", quantity: 1, price: 0 }],
    }));
  }

  function removeItem(id: string) {
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }));
  }

  async function downloadPdf() {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const clientSlug = data.clientCompany.trim().replace(/\s+/g, "-").toLowerCase() || "client";
      const numberSlug = data.invoiceNumber.trim() || "draft";
      // `pagebreak` is a real, documented html2pdf.js option
      // (src/plugin/pagebreaks.js) that the library's own bundled
      // type.d.ts just doesn't declare. Cast narrowly here rather than
      // widen the whole options object's type.
      const options = {
        margin: 0,
        filename: `Skynosoft-Invoice-${numberSlug}-${clientSlug}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
        // unit "in" + format "letter" (not "px"): html2pdf.js scales the
        // captured canvas to fit the page in whatever unit is given, and
        // "letter" is defined in points/inches, not pixels. Pairing "px"
        // with a named format breaks that fit math and clips the page.
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css"], avoid: ["tr", ".no-break"] },
        // Known html2pdf.js quirk: content whose height lands close to
        // a page-height multiple can still produce one extra, entirely
        // blank trailing page (a canvas/page-height rounding artifact,
        // not actual overflowing content, confirmed by trimming content
        // height with no change in page count). Harmless, just an empty
        // page at the end. If this needs eliminating later, post-process
        // the generated PDF (e.g. pdf-lib) to drop trailing blank pages
        // rather than fighting this option further.
      };
      await html2pdf()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see comment above
        .set(options as any)
        .from(previewRef.current)
        .save();
    } finally {
      setDownloading(false);
    }
  }

  const { total } = computeTotals(data);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-10 lg:flex-row lg:px-10">
      <div className="flex w-full flex-col gap-6 lg:max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-semibold">Invoice generator</h1>
          <form action={logout}>
            <button type="submit" className="font-body text-xs text-foreground-muted underline">
              Sign out
            </button>
          </form>
        </div>

        <Section title="Invoice details">
          <label className={labelClass()}>
            <span className={labelTextClass()}>Title</span>
            <input
              className={fieldClass()}
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </label>
          <div className="grid grid-cols-3 gap-3">
            <label className={labelClass()}>
              <span className={labelTextClass()}>Invoice #</span>
              <input
                className={fieldClass()}
                value={data.invoiceNumber}
                onChange={(e) => update("invoiceNumber", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Date</span>
              <input
                type="date"
                className={fieldClass()}
                value={data.invoiceDate}
                onChange={(e) => update("invoiceDate", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Due date</span>
              <input
                type="date"
                className={fieldClass()}
                value={data.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </label>
          </div>
        </Section>

        <Section title="Bill to (client)">
          <label className={labelClass()}>
            <span className={labelTextClass()}>Company name</span>
            <input
              className={fieldClass()}
              value={data.clientCompany}
              onChange={(e) => update("clientCompany", e.target.value)}
            />
          </label>
          <label className={labelClass()}>
            <span className={labelTextClass()}>Tax / VAT number (optional)</span>
            <input
              className={fieldClass()}
              value={data.clientTaxNumber}
              onChange={(e) => update("clientTaxNumber", e.target.value)}
            />
          </label>
          <label className={labelClass()}>
            <span className={labelTextClass()}>Address</span>
            <textarea
              className={fieldClass()}
              rows={2}
              value={data.clientAddress}
              onChange={(e) => update("clientAddress", e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={labelClass()}>
              <span className={labelTextClass()}>Contact name</span>
              <input
                className={fieldClass()}
                value={data.clientContactName}
                onChange={(e) => update("clientContactName", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Email</span>
              <input
                className={fieldClass()}
                value={data.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
              />
            </label>
          </div>
          <label className={labelClass()}>
            <span className={labelTextClass()}>Phone (optional)</span>
            <input
              className={fieldClass()}
              value={data.clientPhone}
              onChange={(e) => update("clientPhone", e.target.value)}
            />
          </label>
        </Section>

        <Section title="Line items">
          <div className="flex flex-col gap-3">
            {data.items.map((item) => (
              <div key={item.id} className="flex items-start gap-2 rounded-lg border border-border-hairline p-3">
                <div className="flex flex-1 flex-col gap-2">
                  <input
                    className={fieldClass()}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <label className={labelClass()}>
                      <span className={labelTextClass()}>Qty</span>
                      <input
                        type="number"
                        min={0}
                        className={fieldClass()}
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 0 })}
                      />
                    </label>
                    <label className={labelClass()}>
                      <span className={labelTextClass()}>Price (USD)</span>
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        className={fieldClass()}
                        value={item.price}
                        onChange={(e) => updateItem(item.id, { price: Number(e.target.value) || 0 })}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={data.items.length <= 1}
                  className="mt-1 font-body text-xs text-foreground-muted underline disabled:opacity-30"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addItem}
            className="self-start rounded-full border border-border-hairline px-3 py-1.5 font-body text-xs font-medium hover:bg-card"
          >
            + Add line item
          </button>
        </Section>

        <Section title="Discount & tax">
          <div className="grid grid-cols-2 gap-3">
            <label className={labelClass()}>
              <span className={labelTextClass()}>Discount %</span>
              <input
                type="number"
                min={0}
                max={100}
                className={fieldClass()}
                value={data.discountPercent}
                onChange={(e) => update("discountPercent", Number(e.target.value) || 0)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Tax %</span>
              <input
                type="number"
                min={0}
                max={100}
                className={fieldClass()}
                value={data.taxPercent}
                onChange={(e) => update("taxPercent", Number(e.target.value) || 0)}
              />
            </label>
          </div>
          <label className={labelClass()}>
            <span className={labelTextClass()}>Tax label</span>
            <input
              className={fieldClass()}
              value={data.taxLabel}
              onChange={(e) => update("taxLabel", e.target.value)}
            />
          </label>
        </Section>

        <Section title="Payment instructions">
          <label className={labelClass()}>
            <span className={labelTextClass()}>Notes (e.g. VAT reverse charge note)</span>
            <textarea
              className={fieldClass()}
              rows={2}
              value={data.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={labelClass()}>
              <span className={labelTextClass()}>Account name</span>
              <input
                className={fieldClass()}
                value={data.bankAccountName}
                onChange={(e) => update("bankAccountName", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Account number</span>
              <input
                className={fieldClass()}
                value={data.bankAccountNumber}
                onChange={(e) => update("bankAccountNumber", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Wire routing</span>
              <input
                className={fieldClass()}
                value={data.bankWireRouting}
                onChange={(e) => update("bankWireRouting", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>ACH routing</span>
              <input
                className={fieldClass()}
                value={data.bankAchRouting}
                onChange={(e) => update("bankAchRouting", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Account type</span>
              <input
                className={fieldClass()}
                value={data.bankAccountType}
                onChange={(e) => update("bankAccountType", e.target.value)}
              />
            </label>
            <label className={labelClass()}>
              <span className={labelTextClass()}>Bank name</span>
              <input
                className={fieldClass()}
                value={data.bankName}
                onChange={(e) => update("bankName", e.target.value)}
              />
            </label>
          </div>
          <label className={labelClass()}>
            <span className={labelTextClass()}>Bank address</span>
            <input
              className={fieldClass()}
              value={data.bankAddress}
              onChange={(e) => update("bankAddress", e.target.value)}
            />
          </label>
        </Section>

        <div className="sticky bottom-4 flex items-center justify-between rounded-xl border border-border-hairline bg-white p-4 shadow-sm">
          <div>
            <p className="font-body text-xs text-foreground-muted">Total due</p>
            <p className="font-heading text-lg font-semibold">{formatUSD(total)}</p>
          </div>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-opacity hover:bg-primary/90 disabled:opacity-50"
          >
            {downloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* No CSS transform (scale, etc.) anywhere between this scroll
          container and InvoicePreview's root node: html2canvas accounts
          for ancestor transforms, so scaling a wrapper for small
          screens would also shrink the captured PDF output. Horizontal
          scroll on narrow viewports instead. */}
      <div className="flex-1 overflow-x-auto rounded-xl bg-card p-6 lg:p-10">
        <div className="mx-auto w-fit shadow-lg">
          <InvoicePreview ref={previewRef} data={data} />
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border-hairline p-4">
      <h2 className="font-heading text-sm font-semibold">{title}</h2>
      {children}
    </div>
  );
}

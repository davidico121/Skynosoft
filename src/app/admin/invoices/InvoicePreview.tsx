import { forwardRef } from "react";
import type { InvoiceData } from "./types";
import { computeTotals, formatUSD, formatDisplayDate } from "./types";
import styles from "./InvoicePreview.module.css";

type Props = {
  data: InvoiceData;
};

export const InvoicePreview = forwardRef<HTMLDivElement, Props>(function InvoicePreview(
  { data },
  ref,
) {
  const { subtotal, discountAmount, taxAmount, total } = computeTotals(data);
  const hasDiscount = data.discountPercent > 0;
  const hasTax = data.taxPercent > 0;

  return (
    <div ref={ref} className={styles.page}>
      <div className={styles.headerRow}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/skynosoft-icon.png" alt="Skynosoft" className={styles.logo} />
        <div className={styles.metaBox}>
          <div className={styles.metaLine}>
            <span>Invoice number</span>
            <span>{data.invoiceNumber || "—"}</span>
          </div>
        </div>
      </div>

      <h1 className={styles.title}>{data.title || "Invoice"}</h1>

      <div className={styles.partiesGrid}>
        <div className={styles.partyBlock}>
          <h2>From</h2>
          <p className={styles.companyName}>{data.senderName}</p>
          <p className={styles.partyLine}>{data.senderRcNumber}</p>
          <p className={styles.partyLine}>{data.senderContactName}</p>
          <p className={styles.partyLine}>{data.senderEmail}</p>
          <p className={styles.partyLine}>{data.senderPhone}</p>
          <p className={styles.partyLine}>{data.senderAddress}</p>
        </div>
        <div className={styles.partyBlock}>
          <h2>Bill to</h2>
          <p className={styles.companyName}>{data.clientCompany || "—"}</p>
          {data.clientTaxNumber && <p className={styles.partyLine}>{data.clientTaxNumber}</p>}
          <p className={styles.partyLine}>{data.clientAddress}</p>
          <p className={styles.partyLine}>{data.clientContactName}</p>
          <p className={styles.partyLine}>{data.clientEmail}</p>
          {data.clientPhone && <p className={styles.partyLine}>{data.clientPhone}</p>}
        </div>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metaBox}>
          <div className={styles.metaLine}>
            <span>Invoice date</span>
            <span>{formatDisplayDate(data.invoiceDate) || "—"}</span>
          </div>
          <div className={styles.metaLine}>
            <span>Due date</span>
            <span>{formatDisplayDate(data.dueDate) || "—"}</span>
          </div>
          <div className={styles.amountDueBox}>
            <span>Amount due (USD)</span>
            <span>{formatUSD(total)}</span>
          </div>
        </div>
      </div>

      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th className={styles.numCol}>Qty</th>
            <th className={styles.numCol}>Price</th>
            <th className={styles.numCol}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id}>
              <td>{item.description || "—"}</td>
              <td className={styles.numCol}>{item.quantity}</td>
              <td className={styles.numCol}>{formatUSD(item.price)}</td>
              <td className={styles.numCol}>{formatUSD(item.quantity * item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.totalsBlock}>
        <div className={styles.totalsInner}>
          <div className={styles.totalsLine}>
            <span>Subtotal</span>
            <span>{formatUSD(subtotal)}</span>
          </div>
          {hasDiscount && (
            <div className={styles.totalsLine}>
              <span>Discount ({data.discountPercent}%)</span>
              <span>-{formatUSD(discountAmount)}</span>
            </div>
          )}
          {hasTax && (
            <div className={styles.totalsLine}>
              <span>
                {data.taxLabel} ({data.taxPercent}%)
              </span>
              <span>{formatUSD(taxAmount)}</span>
            </div>
          )}
          <div className={`${styles.totalsLine} ${styles.grandTotal}`}>
            <span>Total</span>
            <span>{formatUSD(total)}</span>
          </div>
        </div>
      </div>

      <div className={styles.footerGrid}>
        <div>
          <h3>Payment instructions</h3>
          {data.notes && <p className={styles.notesText}>{data.notes}</p>}
          <p className={styles.bankLine}>
            <strong>Account name:</strong> {data.bankAccountName}
            <br />
            <strong>Account number:</strong> {data.bankAccountNumber}
            <br />
            <strong>Wire routing:</strong> {data.bankWireRouting}
            <br />
            <strong>ACH routing:</strong> {data.bankAchRouting}
            <br />
            <strong>Account type:</strong> {data.bankAccountType}
            <br />
            <strong>Bank:</strong> {data.bankName}
            <br />
            <strong>Bank address:</strong> {data.bankAddress}
          </p>
        </div>
        <div>
          <h3>Total due</h3>
          <div className={styles.amountDueBox}>
            <span>Amount due (USD)</span>
            <span>{formatUSD(total)}</span>
          </div>
        </div>
      </div>

      <div className={styles.brandFooter}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/skynosoft-logo-horizontal.png"
          alt="Skynosoft — Where Brands Fly"
          className={styles.brandFooterLogo}
        />
        <div className={styles.brandFooterText}>
          <strong>skynosoft.net</strong>
          <br />
          {data.senderPhone} &nbsp;|&nbsp; {data.senderEmail}
        </div>
      </div>
    </div>
  );
});

export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type InvoiceData = {
  title: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  senderName: string;
  senderRcNumber: string;
  senderContactName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;

  clientCompany: string;
  clientTaxNumber: string;
  clientAddress: string;
  clientContactName: string;
  clientEmail: string;
  clientPhone: string;

  items: LineItem[];

  discountPercent: number;
  taxLabel: string;
  taxPercent: number;

  notes: string;

  bankAccountName: string;
  bankAccountNumber: string;
  bankWireRouting: string;
  bankAchRouting: string;
  bankAccountType: string;
  bankName: string;
  bankAddress: string;
};

export function createDefaultInvoiceData(): InvoiceData {
  return {
    title: "Invoice for Services Rendered",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",

    senderName: "Skynosoft Ltd.",
    senderRcNumber: "RC 7872372",
    senderContactName: "David Owoeye",
    senderEmail: "david@skynosoft.net",
    senderPhone: "+234 911 075 0517",
    senderAddress: "96, Irepodun Street,\nOsogbo, Osun State,\n230001",

    clientCompany: "",
    clientTaxNumber: "",
    clientAddress: "",
    clientContactName: "",
    clientEmail: "",
    clientPhone: "",

    items: [{ id: crypto.randomUUID(), description: "", quantity: 1, price: 0 }],

    discountPercent: 0,
    taxLabel: "VAT",
    taxPercent: 0,

    notes: "",

    bankAccountName: "Skynosoft Ltd.",
    bankAccountNumber: "219425290948",
    bankWireRouting: "101019644",
    bankAchRouting: "101019644",
    bankAccountType: "Checking",
    bankName: "Lead Bank",
    bankAddress: "1801 Main St., Kansas City, MO 64108",
  };
}

export function computeTotals(data: InvoiceData) {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const discountAmount = subtotal * (data.discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (data.taxPercent / 100);
  const total = taxableAmount + taxAmount;
  return { subtotal, discountAmount, taxableAmount, taxAmount, total };
}

export function formatUSD(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// invoiceDate/dueDate are stored as the raw "YYYY-MM-DD" value an
// <input type="date"> produces, so the date-picker UI round-trips
// cleanly. This formats that for display on the invoice itself.
export function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

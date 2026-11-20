"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import Papa from "papaparse";
import EmailCleaner, { type CleanResult } from "@/lib/email-cleaner";
import { TLDS } from "@/lib/email-cleaner-tlds";
import "./email-cleaner.css";

EmailCleaner.init(TLDS, []);

type Row = { raw: string[]; r: CleanResult; edited: boolean };
type Filter = "all" | "ok" | "fixed" | "check" | "invalid" | "duplicate";

const LABELS: Record<Filter, string> = {
  all: "All rows",
  ok: "Already clean",
  fixed: "Fixed",
  check: "Check",
  invalid: "Invalid",
  duplicate: "Duplicates",
};
const STATUS_TEXT: Record<CleanResult["status"], string> = {
  ok: "Clean",
  fixed: "Fixed",
  check: "Check",
  invalid: "Invalid",
  empty: "Empty",
  duplicate: "Duplicate",
};
const PAGE = 300;

const SAMPLE: string[][] = [
  ["first_name", "company", "email"],
  ["Jane", "Brightside Skincare", "mailto:jane@brightside.co"],
  ["Tom", "Kettle & Co", "tom@kettleandco,com"],
  ["Ade", "Lagos Leather", "u003eade@lagosleather.ng"],
  ["Mia", "Northfold", '"mia@northfold.com"'],
  ["Raj", "Oakline Home", "raj@oaklinehome.comPhone"],
  ["Sara", "Glow Theory", "sara@gmial.com"],
  ["Ben", "Tidepool", "Ben Ortiz <ben@tidepool.io>"],
  ["Lena", "Muse Atelier", "%20lena@museatelier.com"],
  ["Owen", "Fieldnote", "owen@fieldnote.con"],
  ["Ivy", "Saltmarsh", "ivy@saltmarsh.com; orders@saltmarsh.com"],
  ["Kofi", "Kente House", "20kofi@kentehouse.com"],
  ["Ana", "Petal Lab", "ana [at] petallab [dot] com"],
  ["Leo", "Driftwood", "leo@driftwood.com?subject=Hello"],
  ["Nia", "Coco Rae", "Email: nia@cocorae.com"],
  ["", "Brightside Skincare", "JANE@brightside.co"],
  ["Max", "Ridge Supply", "noreply@ridgesupply.com"],
  ["Zoe", "Pebble", "logo@2x.png"],
  ["Eli", "Harbor Goods", "eli@harborgoods"],
  ["Ruth", "Fernway", "ruth@fernway.com"],
  ["Sam", "Copperleaf", "info@copperleaf.co.uk"],
];

declare global {
  interface Window {
    XLSX?: {
      read: (data: Uint8Array, opts: { type: "array" }) => { SheetNames: string[]; Sheets: Record<string, unknown> };
      utils: { sheet_to_json: (ws: unknown, opts: object) => unknown[][] };
    };
  }
}

let xlsxPromise: Promise<void> | null = null;
function loadXlsx(): Promise<void> {
  if (window.XLSX) return Promise.resolve();
  if (!xlsxPromise) {
    xlsxPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      s.onload = () => resolve();
      s.onerror = () => {
        xlsxPromise = null;
        reject(new Error("load failed"));
      };
      document.head.appendChild(s);
    });
  }
  return xlsxPromise;
}

function detectColumn(hdr: string[], data: string[][]): number {
  const byName = hdr.findIndex((h) => /e-?mail/i.test(h || ""));
  if (byName !== -1) return byName;
  const width = Math.max(hdr.length, ...data.slice(0, 50).map((r) => r.length), 1);
  let best = 0;
  let bestN = -1;
  for (let c = 0; c < width; c++) {
    const n = data
      .slice(0, 300)
      .filter((r) => (r[c] || "").includes("@") || /\[at\]|\(at\)/i.test(r[c] || "")).length;
    if (n > bestN) {
      bestN = n;
      best = c;
    }
  }
  return best;
}

function prepare(table: unknown[][]) {
  const clean = table
    .map((r) => r.map((c) => (c == null ? "" : String(c))))
    .filter((r) => r.some((c) => c.trim() !== ""));
  if (!clean.length) return null;
  const first = clean[0];
  const hasHeader = !first.some((c) => c.includes("@"));
  const headers = hasHeader ? first : first.map((_, i) => "Column " + (i + 1));
  const data = hasHeader ? clean.slice(1) : clean;
  const col = detectColumn(hasHeader ? headers : [], data);
  return { headers, data, col, rows: cleanRows(data, col) };
}

function cleanRows(data: string[][], col: number): Row[] {
  const out: Row[] = [];
  for (const raw of data) {
    for (const r of EmailCleaner.cleanCell(raw[col])) out.push({ raw, r, edited: false });
  }
  return markDupes(out);
}

const INITIAL = prepare(SAMPLE)!;

function markDupes(rows: Row[]): Row[] {
  const seen = new Map<string, number>();
  return rows.map((row, i) => {
    const r = { ...row.r };
    if (r.status === "duplicate") r.status = r._prev || "ok";
    const e = r.email;
    if (e && r.status !== "invalid" && r.status !== "empty") {
      if (seen.has(e)) {
        r._prev = r.status;
        r.status = "duplicate";
        r.dupOf = seen.get(e)! + 1;
      } else seen.set(e, i);
    }
    return { ...row, r };
  });
}

function download(filename: string, csv: string) {
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function EmailCleanerTool() {
  const [headers, setHeaders] = useState<string[]>(INITIAL.headers);
  const [rawRows, setRawRows] = useState<string[][]>(INITIAL.data);
  const [emailCol, setEmailCol] = useState(INITIAL.col);
  const [srcLabel, setSrcLabel] = useState("Example list");
  const [isSample, setIsSample] = useState(true);
  const [rows, setRows] = useState<Row[]>(INITIAL.rows);
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE);
  const [paste, setPaste] = useState("");
  const [over, setOver] = useState(false);
  const [keepCheck, setKeepCheck] = useState(true);
  const [noRole, setNoRole] = useState(false);
  const [noDupes, setNoDupes] = useState(true);
  const [toast, setToastMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const pasteRef = useRef<HTMLTextAreaElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tableTopRef = useRef<HTMLDivElement>(null);
  const emailColRef = useRef(emailCol);
  useEffect(() => {
    emailColRef.current = emailCol;
  }, [emailCol]);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 5000);
  }, []);

  const runClean = useCallback((data: string[][], col: number) => {
    setRows(cleanRows(data, col));
    setFilter("all");
    setShown(PAGE);
  }, []);

  const setTable = useCallback(
    (table: unknown[][], label: string, sample: boolean) => {
      const t = prepare(table);
      if (!t) {
        showToast("That file has no rows.");
        return;
      }
      setHeaders(t.headers);
      setRawRows(t.data);
      setEmailCol(t.col);
      setSrcLabel(label);
      setIsSample(sample);
      setRows(t.rows);
      setFilter("all");
      setShown(PAGE);
    },
    [showToast],
  );

  // Load the disposable-domain list, then re-check the rows unless the user has started editing.
  useEffect(() => {
    fetch("/data/disposable-domains.txt")
      .then((r) => (r.ok ? r.text() : ""))
      .then((txt) => {
        if (!txt) return;
        EmailCleaner.setDisposable(txt.split("\n").filter(Boolean));
        setRows((prev) => {
          if (prev.some((x) => x.edited)) return prev;
          const raws: string[][] = [];
          for (const { raw } of prev) if (raws[raws.length - 1] !== raw) raws.push(raw);
          const col = prev.length ? emailColRef.current : 0;
          return cleanRows(raws, col);
        });
      })
      .catch(() => {});
  }, []);

  function handleFile(file?: File | null) {
    if (!file) return;
    const name = file.name || "file";
    if (/\.xlsx?$/i.test(name)) {
      loadXlsx()
        .then(() => {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const XLSX = window.XLSX!;
              const wb = XLSX.read(new Uint8Array(reader.result as ArrayBuffer), { type: "array" });
              const ws = wb.Sheets[wb.SheetNames[0]];
              setTable(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: "" }), name, false);
            } catch {
              showToast("Couldn't read that Excel file. Try saving it as CSV.");
            }
          };
          reader.readAsArrayBuffer(file);
        })
        .catch(() => showToast("Couldn't load the Excel reader. Save the file as CSV and try again."));
      return;
    }
    Papa.parse<string[]>(file, {
      skipEmptyLines: "greedy",
      complete: (res) => setTable(res.data, name, false),
      error: () => showToast("Couldn't read that file."),
    });
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function applyEdit(i: number, value: string) {
    setRows((prev) => {
      const next = prev.slice();
      const res = EmailCleaner.cleanCell(value)[0];
      res.original = prev[i].r.original;
      next[i] = { ...prev[i], r: res, edited: true };
      return markDupes(next);
    });
  }

  function keepAsIs(i: number) {
    setRows((prev) => {
      const next = prev.slice();
      const r = { ...prev[i].r, suggestion: null, reason: "" };
      r.status = r.flags.length ? "check" : r.fixes.length ? "fixed" : "ok";
      next[i] = { ...prev[i], r, edited: true };
      return markDupes(next);
    });
  }

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: rows.length, ok: 0, fixed: 0, check: 0, invalid: 0, duplicate: 0 };
    for (const { r } of rows) c[r.status === "empty" ? "invalid" : (r.status as Filter)]++;
    return c;
  }, [rows]);

  const visible = useMemo(
    () =>
      rows
        .map((row, i) => ({ row, i }))
        .filter(
          ({ row }) =>
            filter === "all" || row.r.status === filter || (filter === "invalid" && row.r.status === "empty"),
        ),
    [rows, filter],
  );

  const kept = useMemo(
    () =>
      rows.filter(({ r }) => {
        if (!r.email) return false;
        if (r.status === "invalid" || r.status === "empty") return false;
        if (r.status === "check" && !keepCheck) return false;
        if (r.status === "duplicate" && noDupes) return false;
        if (noRole && r.role) return false;
        return true;
      }),
    [rows, keepCheck, noRole, noDupes],
  );

  const baseName = (srcLabel || "list").replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9 _-]+/gi, "").trim() || "list";

  function downloadClean() {
    if (!kept.length) {
      showToast("No rows to download with these options.");
      return;
    }
    const data = kept.map(({ raw, r }) => {
      const copy = headers.map((_, c) => raw[c] ?? "");
      copy[emailCol] = r.email;
      return copy;
    });
    download(`${baseName}-clean.csv`, Papa.unparse({ fields: headers, data }));
    showToast(`Downloaded ${kept.length.toLocaleString()} rows`);
  }

  function downloadReport() {
    if (!rows.length) return;
    const fields = [...headers, "original_email", "clean_email", "status", "what_changed", "note"];
    const data = rows.map(({ raw, r, edited }) => [
      ...headers.map((_, c) => raw[c] ?? ""),
      r.original,
      r.email || "",
      STATUS_TEXT[r.status],
      [edited ? "Edited by you" : "", ...r.fixes].filter(Boolean).join("; "),
      [r.status === "duplicate" ? `Same as row ${r.dupOf}` : "", r.reason || "", ...(r.flags || [])]
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i)
        .join("; "),
    ]);
    download(`${baseName}-report.csv`, Papa.unparse({ fields, data }));
  }

  function copyClean() {
    const text = kept.map(({ r }) => r.email).join("\n");
    if (!text) {
      showToast("No clean emails to copy with these options.");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => showToast(`Copied ${kept.length.toLocaleString()} emails`),
      () => {
        setPaste(text);
        setTimeout(() => pasteRef.current?.select(), 0);
        showToast("Copy was blocked. The emails are selected in the paste box: press Ctrl+C or Cmd+C.");
      },
    );
  }

  function cleanPasted() {
    const lines = paste.split(/\r?\n/).filter((l) => l.trim());
    if (!lines.length) {
      showToast("Paste at least one address first.");
      return;
    }
    setTable([["email"], ...lines.map((l) => [l])], "Pasted list", false);
  }

  return (
    <div className="ec">
      <div className="ec-wrap">
        <header>
          <p className="ec-eyebrow">Free tool</p>
          <h1>Email List Cleaner</h1>
          <p className="ec-lead">
            Fixes broken addresses from verifier and scraper exports before you send: <code>mailto:</code> in front,
            commas instead of dots, stray characters, glued text, typos like gmial.com. Every change is shown, and
            anything it can&apos;t be sure about is left for you to check.
          </p>
          <p className="ec-private">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            Runs in your browser. Your list is never uploaded.
          </p>
        </header>

        <section className="ec-card" aria-labelledby="ec-in">
          <h2 id="ec-in" className="ec-eyebrow" style={{ marginBottom: 14 }}>
            Your list
          </h2>
          <div className="ec-input-grid">
            <div
              className={`ec-drop${over ? " over" : ""}`}
              tabIndex={0}
              role="button"
              aria-label="Choose a CSV, Excel or text file"
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileRef.current?.click();
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={onDrop}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 16V4M7 9l5-5 5 5" />
                <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              <strong>Drop your file here</strong>
              <span>or click to choose. CSV, Excel (.xlsx) or .txt. Other columns are kept.</span>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.tsv,.txt,.xlsx,.xls"
                hidden
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </div>
            <div className="ec-paste">
              <label className="ec-lbl" htmlFor="ec-paste">
                Or paste addresses, one per line
              </label>
              <textarea
                id="ec-paste"
                ref={pasteRef}
                spellCheck={false}
                value={paste}
                onChange={(e) => setPaste(e.target.value)}
                placeholder={"mailto:jane@brand.com\njohn@gmail,com\nu003einfo@shop.co.uk"}
              />
              <div className="ec-row">
                <button className="primary" onClick={cleanPasted}>
                  Clean pasted list
                </button>
                <button onClick={() => setTable(SAMPLE, "Example list", true)}>Load messy example</button>
              </div>
            </div>
          </div>
          <div className="ec-source">
            <span>
              Showing: <span className="name">{srcLabel} · {rawRows.length.toLocaleString()} rows</span>
            </span>
            {isSample && <span className="tag">Example data</span>}
            {headers.length > 1 && (
              <span>
                <label htmlFor="ec-col">Email column</label>{" "}
                <select
                  id="ec-col"
                  value={emailCol}
                  onChange={(e) => {
                    const c = +e.target.value;
                    setEmailCol(c);
                    runClean(rawRows, c);
                  }}
                >
                  {headers.map((h, i) => (
                    <option key={i} value={i}>
                      {h || `Column ${i + 1}`}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </div>
        </section>

        <section aria-label="Results summary" className="ec-tally">
          {(Object.keys(LABELS) as Filter[]).map((k) => (
            <button
              key={k}
              className="ec-tile"
              aria-pressed={filter === k}
              onClick={() => {
                setFilter(k);
                setShown(PAGE);
              }}
            >
              <span className="n">{counts[k].toLocaleString()}</span>
              <span className="t">
                <span className={`dot d-${k}`} />
                {LABELS[k]}
              </span>
            </button>
          ))}
        </section>

        <section className="ec-card ec-export" aria-label="Download">
          <div className="ec-opts">
            <label>
              <input type="checkbox" checked={keepCheck} onChange={(e) => setKeepCheck(e.target.checked)} /> Keep rows
              marked &quot;Check&quot;
            </label>
            <label>
              <input type="checkbox" checked={noRole} onChange={(e) => setNoRole(e.target.checked)} /> Remove role
              addresses (info@, sales@…)
            </label>
            <label>
              <input type="checkbox" checked={noDupes} onChange={(e) => setNoDupes(e.target.checked)} /> Remove
              duplicates
            </label>
          </div>
          <div className="ec-row">
            <button className="primary" onClick={downloadClean}>
              Download clean list ({kept.length.toLocaleString()})
            </button>
            <button onClick={downloadReport}>Download full report</button>
            <button onClick={copyClean}>Copy clean emails</button>
          </div>
          <p className="ec-note">
            The clean list keeps all your columns, swaps in the fixed email, and leaves out invalid rows. The report has
            every row with what changed.
          </p>
          <p className="ec-toast" role="status" aria-live="polite">
            {toast}
          </p>
        </section>

        <div ref={tableTopRef} className="ec-filterbar" role="toolbar" aria-label="Show rows by status">
          {(Object.keys(LABELS) as Filter[]).map((k) => (
            <button
              key={k}
              className={`ec-chip c-${k}`}
              aria-pressed={filter === k}
              onClick={() => {
                setFilter(k);
                setShown(PAGE);
                const el = tableTopRef.current;
                if (el && el.getBoundingClientRect().top < 120) {
                  window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 110 });
                }
              }}
            >
              <span className={`dot d-${k}`} />
              {k === "ok" ? "Clean" : LABELS[k]}
              <span className="ct">{counts[k].toLocaleString()}</span>
            </button>
          ))}
        </div>

        <section aria-label="Review" className="ec-tablebox">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Original</th>
                <th>Cleaned</th>
                <th>Status</th>
                <th>What changed</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ec-empty">
                    {filter === "all" ? "No rows yet. Drop a file or paste a list above." : `Nothing in “${LABELS[filter]}”.`}
                  </td>
                </tr>
              ) : (
                visible.slice(0, shown).map(({ row, i }) => <ResultRow key={i} row={row} i={i} onEdit={applyEdit} onKeep={keepAsIs} />)
              )}
            </tbody>
          </table>
          {visible.length > shown && (
            <div className="ec-more">
              <button onClick={() => setShown((s) => s + 500)}>
                Show more rows ({(visible.length - shown).toLocaleString()} left)
              </button>
            </div>
          )}
        </section>

        <details className="ec-rules">
          <summary>What it fixes and what it flags</summary>
          <ul>
            <li><b>Fixes automatically:</b> mailto:, &quot;Email:&quot; labels, quotes, brackets, bullets and other stray characters in front or behind</li>
            <li>Commas typed instead of dots, doubled @, spaces inside the address</li>
            <li>Leftover website code: u003e, %20, %40, &amp;lt;, &amp;#64;</li>
            <li>Text glued after the ending (company.comPhone, company.com123, ?subject=…)</li>
            <li>&quot;Name &lt;address&gt;&quot;, &quot;name [at] domain [dot] com&quot;, www. after the @</li>
            <li>Ending typos (.con, .cmo, .comm) and provider typos (gmial, hotmial, yahooo, outlok)</li>
            <li>Cells with several addresses are split into separate rows</li>
            <li><b>Flags for you to check:</b> a &quot;20&quot; or phone number stuck to the front (offers a one-click fix), no-reply, placeholder and throwaway addresses</li>
            <li><b>Marks invalid:</b> no @, fake endings, image file names (logo@2x.png), tracking addresses from website code</li>
            <li>It fixes formatting only. It does not check that the inbox exists.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}

function ResultRow({
  row,
  i,
  onEdit,
  onKeep,
}: {
  row: Row;
  i: number;
  onEdit: (i: number, v: string) => void;
  onKeep: (i: number) => void;
}) {
  const { r, edited } = row;
  const editable = r.status === "check" || r.status === "invalid" || edited;
  const notes: { text: string; cls?: string }[] = [];
  if (edited) notes.push({ text: "Edited by you" });
  r.fixes.forEach((f) => notes.push({ text: f }));
  if (r.status === "invalid" || r.status === "empty") notes.push({ text: r.reason, cls: "bad" });
  (r.flags || []).forEach((f) => notes.push({ text: f, cls: "flag" }));
  if (r.suggestion) notes.push({ text: r.suggestion.why, cls: "flag" });
  if (r.status === "duplicate") notes.push({ text: `Same as row ${r.dupOf}` });
  if (r.status === "ok" && !notes.length) notes.push({ text: "Nothing to fix" });

  return (
    <tr>
      <td className="num">{i + 1}</td>
      <td className="orig">{r.original}</td>
      <td className="clean">
        {editable ? (
          <input
            key={r.email + "|" + (r.attempted || "")}
            type="text"
            defaultValue={r.email || r.attempted || ""}
            aria-label={`Edit cleaned email for row ${i + 1}`}
            spellCheck={false}
            onBlur={(e) => {
              if (e.target.value !== (r.email || r.attempted || "")) onEdit(i, e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            }}
          />
        ) : r.email ? (
          <>
            {r.email}
            {r.role && <span className="role">role</span>}
          </>
        ) : (
          <span className="none">none</span>
        )}
      </td>
      <td>
        <span className={`pill s-${r.status}`}>{STATUS_TEXT[r.status]}</span>
      </td>
      <td className="why">
        <ul>
          {notes.map((n, k) => (
            <li key={k} className={n.cls}>
              {n.text}
            </li>
          ))}
        </ul>
        {r.suggestion && (
          <div className="sug">
            <button className="small" onClick={() => onEdit(i, r.suggestion!.email)}>
              Use {r.suggestion.email}
            </button>
            <button className="small" onClick={() => onKeep(i)}>
              Keep as is
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

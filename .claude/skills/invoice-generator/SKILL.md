---
name: invoice-generator
description: Build a Skynosoft-branded client invoice as a PDF, same visual design as the in-house /admin/invoices page on the live site. No live web page needed, no API key, no Claude API tokens. Use when a team member wants to send a client invoice and asks "generate an invoice for X" / "make an invoice" / "bill this client".
---

# Invoice Generator

Skynosoft has two ways to produce the exact same invoice: the in-house
`/admin/invoices` page on the live site (password-gated, for quick use
right in a browser), and this skill (for use inside Claude Code or
claude.ai chat, when the live site isn't open, or to hand the invoice
process to someone outside the team without giving them site access).
Both render from the same visual design: `references/invoice-template.html`
here mirrors `src/app/admin/invoices/InvoicePreview.module.css` in the
Skynosoft repo exactly, same hex colors, same fonts, same layout. If one
changes, update the other to match, they must never visually drift apart.

This skill is fully self-contained: the Skynosoft logo and the brand
fonts are bundled in `assets/`, nothing depends on the Skynosoft repo
being on disk. Works the same from a Claude Code session with the repo
attached or from plain claude.ai chat.

## Hard rules

1. **Every number is computed, never guessed.** Amount per line = qty ×
   price, computed by hand (the rendered PDF has no JavaScript).
   Subtotal = sum of line amounts. Discount amount = subtotal ×
   discount%. Taxable amount = subtotal − discount. Tax amount =
   taxable × tax%. Total = taxable + tax. Re-add the column by hand
   before calling the invoice done, a wrong total on a real invoice is
   a real problem, not a cosmetic one.
2. **Nothing invented.** Client details, line item descriptions, and
   amounts all come from what the team member actually tells you. If
   something's missing (a client address, a tax number), ask, don't
   fill in a placeholder that looks real.
3. **Sender and bank details default to Skynosoft's own** (below),
   editable if the team member says this invoice needs different ones
   (a different account, a different sender). Never invent new ones.

Default sender details:
```
Skynosoft Ltd.
RC 7872372
David Owoeye
davidowoeye4@gmail.com
+234 911 075 0517
96, Irepodun Street,
Osogbo, Osun State,
230001
```

Default bank details:
```
Account name: Skynosoft Ltd.
Account number: 219425290948
Wire routing: 101019644
ACH routing: 101019644
Account type: Checking
Bank: Lead Bank
Bank address: 1801 Main St., Kansas City, MO 64108
```

## The interview

Run this as a short funnel, not a wall of questions at once.

1. **Client.** "Who's this invoice for? Company name, address, tax/VAT
   number if they have one, and a contact name/email/phone if you have
   them." A client address is the one thing worth pushing for if
   missing, everything else can be left blank.
2. **What's being billed.** "What are the line items? For each: a
   description, quantity, and price." Repeat back the computed amount
   per line as you go so a typo gets caught immediately, not after the
   PDF is built.
3. **Discount or tax, if any.** "Any discount or tax/VAT on this one?
   What rate?" Skip entirely (delete those lines from the template,
   don't leave them at 0%) if neither applies, a 0% tax line reads as
   an afterthought, not a deliberate choice.
4. **Dates and invoice number.** "What invoice number should this be,
   and what's the invoice date and due date?" The web page doesn't
   persist a running count either (by design, see its own build notes
   in the Skynosoft repo), so this is always asked, not auto-generated.
5. **Payment notes.** "Anything else on payment instructions? A VAT
   reverse-charge note, a different payment method, anything like
   that?" Optional, delete the notes line from the template if there's
   nothing to add.
6. **Confirm and build.** Recap the client, line items, and total in
   one or two lines so the team member can catch anything wrong before
   the PDF is built, then go.

## Building the PDF

1. Copy `references/invoice-template.html` to the scratchpad, fill in
   every `{{PLACEHOLDER}}`. For more than one line item, copy the `<tr>`
   block in the items table once per item (same pattern as this repo's
   other PDF-building skills), numbering the placeholder names
   (`{{ITEM_2_DESCRIPTION}}` etc.) to match. Delete the discount/tax/
   notes/tax-number lines entirely (not just blank them) wherever Hard
   rule 3 or the interview said they don't apply.
2. Embed the brand fonts and the Skynosoft logo (both bundled in this
   skill's own `assets/`, resolved via `skill:` paths, no repo
   dependency):
   ```
   python3 .claude/skills/invoice-generator/scripts/embed-assets.py <filled.html> <output.html>
   ```
3. Convert to PDF:
   ```
   bash .claude/skills/invoice-generator/scripts/render-pdf.sh <output.html> <final.pdf>
   ```
   Finds a local headless Chromium and prints straight to PDF, no
   network call, no API key. If none is found, hand the user the HTML
   file directly and tell them to print it to PDF from their own
   browser (Cmd/Ctrl+P, Save as PDF).
4. Read the PDF back and check the totals arithmetic one more time
   against what was computed in step 1 of the interview, and that
   nothing overflows or clips (the page is a fixed 816px wide, same as
   the web page's preview).
5. Send the PDF to the user. Mention the HTML too, in case they want to
   tweak and reprint it.

## Learnings log

Add newest first: a rule that would have saved time, a template fix, a
rendering quirk worth documenting.

- 2026-10-04: First real render of `invoice-template.html` (a 3-item
  test invoice) spilled 2 lines plus the whole brand footer onto an
  otherwise-empty second page. Measured the actual rendered `.page`
  height in a headless browser (1177.78px) against a Letter page's
  nominal height at 96dpi (1056px) rather than guessing at which CSS
  rule to blame, confirmed real overflow, not a margin artifact alone.
  Fixed two ways together: added `--no-margins` to this skill's own
  `render-pdf.sh` (Chrome's default print margins were eating further
  into the usable page height on top of the content overflow) and
  trimmed redundant vertical spacing across the template (header,
  title, party blocks, table row padding, totals block, footer) by
  roughly 140px total. A 3-item invoice with one note line now fits
  one page with room to spare. A longer invoice (more line items, a
  longer notes block) will still legitimately need a second page, that
  is correct, not a bug, don't re-chase this if it happens, the real
  invoice this skill was validated against (the Novaya/Moneyputty one)
  spans 2 pages for the same reason.

- 2026-10-04: Built alongside the in-house `/admin/invoices` page in
  the Skynosoft repo (`src/app/admin/invoices/`), which uses
  `html2pdf.js` client-side for the exact same zero-API-cost,
  zero-server goal this skill has. Two real things learned building
  that page, worth knowing if this skill's rendering ever needs
  revisiting: (1) `html2pdf.js`'s jsPDF option needs matched units,
  `unit: "px"` paired with a named format like `"letter"` (which is
  actually defined in points/inches) clips the page and mis-paginates,
  the working pairing is `unit: "in"` + `format: "letter"`. Not
  directly relevant to this skill's Chromium `--print-to-pdf` pipeline,
  which doesn't go through jsPDF at all, but worth knowing if the two
  rendering paths are ever unified. (2) The web page's invoice preview
  deliberately uses plain hex-based CSS, not a framework's utility
  classes or modern CSS color functions (`oklch()`, `color-mix()`),
  because the client-side rasterizer (`html2canvas`) can choke on
  those. This skill's template was already built that way (matching
  this repo's other PDF-building skills), so no change needed, just
  confirms it's the right call to keep doing.

/* Email cleaning engine for /admin/email-cleaner. Pure functions, no DOM. */
const EmailCleaner = (function () {
  let TLDS = new Set();
  let DISPOSABLE = new Set();
  const COMMON_TLDS = ["com", "net", "org", "co", "io", "info", "biz", "me", "us", "uk", "ca", "au", "de", "fr", "nl", "ng", "in", "es", "it", "be", "ch", "se", "no", "dk", "ie", "nz", "za", "br", "mx", "jp", "shop", "store", "online", "app", "dev", "ai", "agency", "studio", "edu", "gov"];

  const TLD_TYPOS = {
    con: "com", cmo: "com", comm: "com", coom: "com", vom: "com", xom: "com", cpm: "com", ocm: "com", cim: "com", cok: "com", comn: "com", cm0: "com", c0m: "com", "co0m": "com",
    nte: "net", nett: "net", ogr: "org", orgg: "org", rog: "org",
  };
  const PROVIDER_TYPOS = {
    gmial: "gmail", gmai: "gmail", gamil: "gmail", gmaill: "gmail", gnail: "gmail", gmal: "gmail", gmil: "gmail", gmali: "gmail", gmaul: "gmail", gmsil: "gmail", gimail: "gmail", gmailc: "gmail", gmmail: "gmail", gmaik: "gmail",
    yaho: "yahoo", yahooo: "yahoo", yhoo: "yahoo", yaoo: "yahoo", yahho: "yahoo", yaho0: "yahoo",
    hotmial: "hotmail", hotmal: "hotmail", hotmil: "hotmail", hotamil: "hotmail", hotnail: "hotmail", hotmai: "hotmail", hotmaill: "hotmail", hotmali: "hotmail", hormail: "hotmail",
    outlok: "outlook", outllok: "outlook", outlookk: "outlook", otlook: "outlook", outook: "outlook", oulook: "outlook",
    iclod: "icloud", icoud: "icloud", icluod: "icloud", iclould: "icloud", icould: "icloud",
  };
  const BARE_PROVIDERS = { gmail: "gmail.com", yahoo: "yahoo.com", hotmail: "hotmail.com", outlook: "outlook.com", icloud: "icloud.com", aol: "aol.com" };
  const ROLE = new Set(["info", "admin", "administrator", "support", "sales", "contact", "contactus", "hello", "hi", "office", "team", "help", "billing", "accounts", "accounting", "marketing", "webmaster", "postmaster", "hostmaster", "abuse", "careers", "jobs", "hr", "enquiries", "enquiry", "inquiries", "inquiry", "service", "services", "customerservice", "customercare", "care", "press", "media", "orders", "order", "shop", "store", "mail", "email", "general", "reception", "booking", "bookings", "partners", "partnerships", "wholesale", "returns", "feedback"]);
  const NO_REPLY = /^(no-?reply|do-?not-?reply|donotreply|noreply|mailer-daemon|bounce[s]?)([+._-].*)?$/;
  const FILE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|ico|tiff?|css|js|json|php|html?|pdf|mp4|webm|woff2?|ttf)$/;
  const JUNK_DOMAINS = /(^|\.)(sentry\.io|sentry\.wixpress\.com|sentry-next\.wixpress\.com|wixpress\.com|ingest\.sentry\.io)$/;
  const PLACEHOLDER_DOMAINS = new Set(["example.com", "example.org", "example.net", "domain.com", "email.com", "yourdomain.com", "yourcompany.com", "test.com", "website.com", "mysite.com", "yoursite.com", "sample.com"]);
  const PLACEHOLDER_LOCALS = new Set(["test", "example", "yourname", "your.name", "name", "user", "username", "youremail", "your.email", "email", "someone", "john.doe", "johndoe", "jane.doe", "firstname.lastname", "first.last"]);

  const LOCAL_OK = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
  const LABEL_OK = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

  function init(tldList, disposableList) {
    TLDS = new Set(tldList.map((t) => t.toLowerCase()));
    DISPOSABLE = new Set(disposableList.map((d) => d.toLowerCase()));
  }
  function setDisposable(list) { DISPOSABLE = new Set(list.map((d) => d.toLowerCase())); }

  function isTld(t) { return TLDS.has(t) || /^xn--[a-z0-9-]+$/.test(t); }

  const ENTITY = { "&lt;": "<", "&gt;": ">", "&amp;": "&", "&quot;": '"', "&#39;": "'", "&apos;": "'", "&#64;": "@", "&commat;": "@", "&nbsp;": " ", "&#46;": "." };
  const UESC = { "3c": "<", "3e": ">", "22": '"', "27": "'", "26": "&", "2f": "/", "40": "@", "20": " ", "2c": "," };

  /* Pre-clean the whole cell. Returns { text, fixes } */
  function preclean(raw) {
    const fixes = [];
    let s = String(raw == null ? "" : raw);
    const add = (f) => { if (!fixes.includes(f)) fixes.push(f); };

    let t = s.normalize("NFKC").replace(/[\u200b-\u200f\u2028-\u202f\u2060\ufeff\u00ad]/g, "").replace(/[\u00a0\t\r\n]/g, " ");
    t = t.replace(/[\ufe6b\uff20]/g, "@").replace(/[\u3002\uff0e\uff61]/g, ".");
    if (t !== s) add("Removed hidden or odd characters");
    s = t;

    t = s.replace(/&(lt|gt|amp|quot|apos|commat|nbsp|#39|#64|#46);/gi, (m) => ENTITY[m.toLowerCase()] || m);
    if (t !== s) add("Decoded web code (like &lt; or &#64;)");
    s = t;

    t = s.replace(/\\?[uU]00(3c|3e|22|27|26|2f|40|20|2c)/gi, (m, h) => UESC[h.toLowerCase()]).replace(/\\x(3c|3e|22|27|40)/gi, (m, h) => UESC[h.toLowerCase()]);
    if (t !== s) add("Decoded leftover code (like u003e)");
    s = t;

    if (/%[0-9a-f]{2}/i.test(s)) {
      try {
        t = decodeURIComponent(s.replace(/%(?![0-9a-f]{2})/gi, "%25"));
        if (t !== s) { add("Decoded web code (like %40 or %20)"); s = t; }
      } catch { /* leave */ }
    }

    t = s.replace(/mailto\s*[:;]?\s*\/{0,2}/gi, " ");
    if (t !== s) add("Removed \u201cmailto:\u201d");
    s = t;

    t = s.replace(/^\s*(e-?mail(\s*address)?|mail|email\s*id)\s*[:=\-\u2013\u2014>]+\s*/i, "");
    if (t !== s) add("Removed a label in front (like \u201cEmail:\u201d)");
    s = t;

    // Obfuscation: name [at] domain [dot] com
    t = s.replace(/\s*[\(\[\{<]\s*at\s*[\)\]\}>]\s*/gi, "@").replace(/\s*[\(\[\{<]\s*dot\s*[\)\]\}>]\s*/gi, ".");
    if (!t.includes("@") && /\S\s+at\s+\S+(\.|\s+dot\s+)/i.test(t)) t = t.replace(/\s+at\s+/i, "@");
    if (t.includes("@")) t = t.replace(/(@[^@]*?)\s+dot\s+/gi, "$1.");
    if (t !== s) add("Turned \u201cat\u201d / \u201cdot\u201d back into @ and .");
    s = t;

    // Name <email>
    const angle = s.match(/<\s*([^<>]*@[^<>]*)\s*>/);
    if (angle && s.replace(angle[0], "").trim()) { s = angle[1]; add("Took the address out of \u201cName <address>\u201d"); }

    // Spaces around @ and dots inside an address
    t = s.replace(/\s*@\s*/g, "@").replace(/(@[^\s@]*?)\s*\.\s*(?=[a-z])/gi, "$1.");
    if (t !== s) add("Removed spaces inside the address");
    s = t;

    t = s.replace(/@{2,}/g, "@");
    if (t !== s) add("Removed a doubled @");
    s = t;

    return { text: s.trim(), fixes };
  }

  /* Find candidate address tokens in a pre-cleaned cell. */
  function tokens(s) {
    const atCount = (s.match(/@/g) || []).length;
    if (atCount === 0) return { list: s ? [s] : [], extraText: false };
    // Split on whitespace, semicolons, pipes and slashes-with-spaces.
    let parts = s.split(/[\s;|]+|\s\/\s|\/(?=[^@\s]+@)/).map((p) => p.replace(/^,+|,+$/g, "")).filter(Boolean);
    let withAt = parts.filter((p) => p.includes("@"));
    // A comma separates two addresses only when both sides have an @.
    const out = [];
    for (const p of withAt) {
      if ((p.match(/@/g) || []).length > 1 && p.includes(",")) {
        const sub = p.split(",").filter(Boolean);
        if (sub.filter((x) => x.includes("@")).length > 1) { sub.filter((x) => x.includes("@")).forEach((x) => out.push(x)); continue; }
      }
      out.push(p);
    }
    const extraText = parts.length > withAt.length;
    return { list: out, extraText };
  }

  /* Clean one candidate address. */
  function cleanAddress(raw, inheritedFixes) {
    const fixes = inheritedFixes.slice();
    const flags = [];
    let suggestion = null;
    const add = (f) => { if (!fixes.includes(f)) fixes.push(f); };
    let s = raw;

    s = s.toLowerCase();

    let at = s.indexOf("@");
    if (at === -1) return { email: "", original: raw, status: "invalid", fixes, flags, reason: "No @ sign, so this isn\u2019t an email address", suggestion: null };

    // More than one @: user@domain@domain or trailing @
    let rest = s.slice(at + 1);
    if (rest.includes("@")) {
      const segs = s.split("@");
      const dom = segs[1] && /\./.test(segs[1]) ? segs[1] : segs.slice(1).find((x) => /\./.test(x));
      s = segs[0] + "@" + (dom || segs[1]);
      add("Removed extra text after a second @");
      flags.push("Had two @ signs; check it");
      at = s.indexOf("@");
    }

    let local = s.slice(0, at);
    let domain = s.slice(at + 1);

    /* ---- Local part ---- */
    let l0 = local;
    // Commas in the local part are almost always a mistyped dot
    local = local.replace(/,/g, ".");
    if (local !== l0) add("Changed a comma to a dot");
    // Keep the longest valid tail: everything up to the last character that can't be in an address is junk
    l0 = local;
    const m = local.match(/[^a-z0-9.!#$%&'*+/=?^_`{|}~-]/g);
    if (m) {
      const idx = Math.max(...m.map((ch) => local.lastIndexOf(ch)));
      local = local.slice(idx + 1);
    }
    local = local.replace(/^[.'`\-*~^|{}=?#!$%&+/]+/, "").replace(/\.+$/, "").replace(/\.{2,}/g, ".");
    if (local !== l0) add("Removed stray characters around the name part");

    // Leftovers that we can't fix with certainty: suggest instead
    let sugLocal = null, sugWhy = null;
    const twenty = local.match(/^(20|3e|3c|22)([a-z].*)$/);
    if (twenty) { sugLocal = twenty[2]; sugWhy = `Starts with \u201c${twenty[1]}\u201d, often a leftover code from a website`; }
    const digits = local.match(/^(\+?\d{7,})([a-z][a-z._-]*)$/);
    if (!sugLocal && digits) { sugLocal = digits[2]; sugWhy = "A phone number seems stuck to the front"; }
    const listNum = local.match(/^(\d{1,3})[.)_-]([a-z][a-z._-]+)$/);
    if (!sugLocal && listNum && raw.match(/^\s*\d{1,3}[.)]/)) { sugLocal = listNum[2]; sugWhy = "Looks like a list number in front"; }

    /* ---- Domain ---- */
    let d0 = domain;
    domain = domain.replace(/,/g, ".");
    if (domain !== d0) add("Changed a comma to a dot");
    d0 = domain;
    domain = domain.replace(/^[^a-z0-9]+/, "");
    if (domain !== d0) add("Removed stray characters after the @");
    d0 = domain;
    domain = domain.replace(/^(https?:\/\/|https?:|www\.)+/, "");
    if (domain !== d0) add("Removed \u201cwww.\u201d or a web prefix from the domain");
    d0 = domain;
    const cut = domain.search(/[^a-z0-9.-]/);
    if (cut !== -1) domain = domain.slice(0, cut);
    domain = domain.replace(/\.{2,}/g, ".").replace(/[.-]+$/, "").replace(/^[.-]+/, "");
    if (domain !== d0) add("Removed extra text after the address");

    if (FILE_EXT.test(domain)) return result("invalid", "This is an image or file name from a website, not an email address");

    let labels = domain.split(".").filter(Boolean);
    if (labels.length === 1 && BARE_PROVIDERS[labels[0]]) { domain = BARE_PROVIDERS[labels[0]]; labels = domain.split("."); add("Added the missing .com"); }
    if (labels.length === 1 && PROVIDER_TYPOS[labels[0]]) { domain = BARE_PROVIDERS[PROVIDER_TYPOS[labels[0]]]; labels = domain.split("."); add("Fixed a misspelled provider"); }

    // Glued ending like gmail.com.ng is fine; gmail.comjohn is not.
    if (labels.length >= 2) {
      let tld = labels[labels.length - 1];
      if (!isTld(tld)) {
        if (TLD_TYPOS[tld]) { labels[labels.length - 1] = TLD_TYPOS[tld]; add(`Fixed .${tld} to .${TLD_TYPOS[tld]}`); }
        else {
          const pref = (list) => list.filter((t) => t.length >= 2 && tld.startsWith(t)).sort((a, b) => b.length - a.length)[0];
          const p = pref(COMMON_TLDS) || pref([...TLDS]);
          if (p) { labels[labels.length - 1] = p; add(`Removed extra characters after .${p}`); }
        }
      }
      // Trailing digits on a valid-looking second level, e.g. gmail.com2 is handled above.
      // Provider misspellings in the second level
      const sld = labels[labels.length - 2];
      if (PROVIDER_TYPOS[sld]) { labels[labels.length - 2] = PROVIDER_TYPOS[sld]; add(`Fixed \u201c${sld}\u201d to \u201c${PROVIDER_TYPOS[sld]}\u201d`); }
      if (labels.length === 2 && labels[0] === "gmail" && labels[1] !== "com") { add(`Fixed gmail.${labels[1]} to gmail.com`); labels[1] = "com"; }
      domain = labels.join(".");
    }

    const email = local + "@" + domain;
    if (sugLocal) suggestion = { email: sugLocal + "@" + domain, why: sugWhy };

    /* ---- Validate ---- */
    if (!local) return result("invalid", "Nothing before the @");
    if (!domain) return result("invalid", "Nothing after the @");
    if (labels.length < 2) return result("invalid", "The domain has no ending like .com");
    if (!isTld(labels[labels.length - 1])) return result("invalid", `\u201c.${labels[labels.length - 1]}\u201d isn\u2019t a real domain ending`);
    if (!labels.every((x) => LABEL_OK.test(x))) return result("invalid", "The domain has characters a real domain can\u2019t have");
    if (local.length > 64 || email.length > 254) return result("invalid", "Too long to be a real address");
    if (!LOCAL_OK.test(local)) return result("invalid", "The part before the @ has characters an address can\u2019t have");
    if (JUNK_DOMAINS.test(domain)) return result("invalid", "A tracking address from a website\u2019s code, not a person");

    /* ---- Flags (kept, but worth a look) ---- */
    if (NO_REPLY.test(local)) flags.push("No-reply address: nobody reads it");
    if (PLACEHOLDER_DOMAINS.has(domain) || (PLACEHOLDER_LOCALS.has(local) && /^(gmail|yahoo|example|domain|email)\./.test(domain))) flags.push("Looks like a placeholder, not a real person");
    if (DISPOSABLE.has(domain)) flags.push("Throwaway (disposable) inbox");
    const role = ROLE.has(local.split(/[+]/)[0]);

    let status;
    if (suggestion || flags.length) status = "check";
    else if (fixes.length) status = "fixed";
    else status = "ok";
    return { email, original: raw, status, fixes, flags, role, suggestion, reason: suggestion ? suggestion.why : flags[0] || "" };

    function result(status, reason) {
      return { email: status === "invalid" ? "" : email, attempted: (local || "") + "@" + (domain || ""), original: raw, status, fixes, flags, role: false, suggestion: null, reason };
    }
  }

  /* Clean one cell. May return several addresses. */
  function cleanCell(raw) {
    const original = String(raw == null ? "" : raw);
    if (!original.trim()) return [{ email: "", original, status: "empty", fixes: [], flags: [], reason: "Empty", suggestion: null }];
    const pre = preclean(original);
    const tk = tokens(pre.text);
    const baseFixes = pre.fixes.slice();
    if (tk.extraText) baseFixes.push("Removed extra text around the address");
    if (!tk.list.length) return [{ email: "", original, status: "invalid", fixes: baseFixes, flags: [], reason: "No address found", suggestion: null }];
    const res = tk.list.map((t) => cleanAddress(t, baseFixes));
    res.forEach((r) => { r.original = original; });
    if (res.length > 1) res.forEach((r, i) => { r.split = { index: i + 1, of: res.length }; if (r.status === "ok") r.status = "fixed"; r.fixes = r.fixes.concat([`Split a cell holding ${res.length} addresses`]); });
    return res;
  }

  return { init, setDisposable, cleanCell, preclean };
})();
export default EmailCleaner;

/**
 * Plain assertion script, not a test framework, to keep the dependency
 * footprint at zero. Run with `npm run test:subscribe`.
 */
import assert from "node:assert/strict";
import { validateSubscribePayload } from "../src/lib/subscribe-validation";

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`  ok - ${name}`);
}

// --- validateSubscribePayload -------------------------------------------

test("accepts a well-formed payload", () => {
  const result = validateSubscribePayload({
    email: "alice@example.com",
    consent: true,
    website: "",
  });
  assert.deepEqual(result, { ok: true, email: "alice@example.com" });
});

test("trims the email before validating and returning it", () => {
  const result = validateSubscribePayload({ email: "  alice@example.com  ", consent: true });
  assert.deepEqual(result, { ok: true, email: "alice@example.com" });
});

test("rejects a missing email", () => {
  const result = validateSubscribePayload({ consent: true });
  assert.deepEqual(result, { ok: false, reason: "invalid_email" });
});

test("rejects an email with no @", () => {
  const result = validateSubscribePayload({ email: "not-an-email", consent: true });
  assert.deepEqual(result, { ok: false, reason: "invalid_email" });
});

test("rejects an email with no domain dot", () => {
  const result = validateSubscribePayload({ email: "alice@example", consent: true });
  assert.deepEqual(result, { ok: false, reason: "invalid_email" });
});

test("rejects an email over 254 characters", () => {
  const longEmail = `${"a".repeat(250)}@a.co`;
  assert.ok(longEmail.length > 254);
  const result = validateSubscribePayload({ email: longEmail, consent: true });
  assert.deepEqual(result, { ok: false, reason: "invalid_email" });
});

test("rejects when consent is not strictly true", () => {
  const result = validateSubscribePayload({ email: "alice@example.com", consent: "true" });
  assert.deepEqual(result, { ok: false, reason: "missing_consent" });
});

test("rejects when consent is missing entirely", () => {
  const result = validateSubscribePayload({ email: "alice@example.com" });
  assert.deepEqual(result, { ok: false, reason: "missing_consent" });
});

test("flags a filled-in honeypot before anything else", () => {
  const result = validateSubscribePayload({
    email: "not-even-valid",
    consent: false,
    website: "http://spam.example",
  });
  assert.deepEqual(result, { ok: false, reason: "honeypot" });
});

test("ignores an empty honeypot", () => {
  const result = validateSubscribePayload({
    email: "alice@example.com",
    consent: true,
    website: "   ",
  });
  assert.deepEqual(result, { ok: true, email: "alice@example.com" });
});

// --- subscribeToKit, with fetch mocked so no real network call is made ---

async function testSubscribeToKit() {
  process.env.KIT_API_KEY = "test-key";
  process.env.KIT_FORM_ID = "12345";

  const { subscribeToKit } = await import("../src/lib/kit");
  const calls: { url: string; init: RequestInit }[] = [];

  const originalFetch = global.fetch;
  global.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return new Response(JSON.stringify({ subscriber: { id: 1 } }), { status: 201 });
  }) as typeof fetch;

  try {
    const result = await subscribeToKit({ email: "alice@example.com" });
    assert.deepEqual(result, { ok: true });
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, "https://api.kit.com/v4/subscribers");
    assert.equal(calls[1].url, "https://api.kit.com/v4/forms/12345/subscribers");
    for (const call of calls) {
      const headers = call.init.headers as Record<string, string>;
      assert.equal(headers["X-Kit-Api-Key"], "test-key");
    }
    console.log("  ok - subscribeToKit calls create-subscriber then add-to-form, with the API key header on both");
    passed += 1;
  } finally {
    global.fetch = originalFetch;
  }

  global.fetch = (async () =>
    new Response(JSON.stringify({ errors: ["nope"] }), { status: 422 })) as typeof fetch;
  try {
    const result = await subscribeToKit({ email: "alice@example.com" });
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 422);
    console.log("  ok - subscribeToKit surfaces a Kit error without throwing");
    passed += 1;
  } finally {
    global.fetch = originalFetch;
  }
}

async function main() {
  await testSubscribeToKit();
  console.log(`\n${passed} passed`);
}

main();

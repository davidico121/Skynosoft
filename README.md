This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Newsletter signup (Kit)

`POST /api/subscribe` adds an email to a Kit (formerly ConvertKit) form. The
browser never talks to Kit directly, it posts to this route, which does.

**Environment variables** (see `.env.example`), set in `.env.local` for
development and in the Vercel project settings for production:

- `KIT_API_KEY` — from the Kit dashboard under Account Settings > Developer.
- `KIT_FORM_ID` — the numeric ID of the form to subscribe people to. Open the
  form in Kit and check its URL (`.../forms/<id>/edit`), or look it up under
  the API docs' Forms list for the account.

**How it works:** Kit's `POST /forms/{id}/subscribers` endpoint only works
for a subscriber who already exists, it will not create one. So
`src/lib/kit.ts` does two calls: `POST /v4/subscribers` (creates the
subscriber if new, or updates them if they already exist) and then
`POST /v4/forms/{id}/subscribers` (attaches them to the form).

Validation, the honeypot check, and the per-IP rate limit (5 requests per 10
minutes, in-memory) live in `src/lib/subscribe-validation.ts` and
`src/lib/rate-limit.ts`. The in-memory rate limit resets on redeploy and
isn't shared across concurrent serverless instances; swap `rate-limit.ts`
for a Redis/Upstash-backed store if that stops being good enough.

`src/components/ui/NewsletterSignupForm.tsx` is the client form (email +
consent checkbox + hidden honeypot field). It isn't wired into a page yet,
drop it in wherever the signup should live and pass a `thankYouUrl` if you
want a redirect instead of the inline success message.

**Tests:** `npm run test:subscribe` runs `scripts/test-subscribe.ts`, plain
assertions (no test framework) covering validation and the Kit client with
`fetch` mocked, no real Kit API calls are made.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

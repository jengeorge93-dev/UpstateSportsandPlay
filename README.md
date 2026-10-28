> **Inquiry activation:** See [FORM-SETUP.md](FORM-SETUP.md) for the current step-by-step setup and acceptance tests. The form is not live until environment variables and the Supabase table are configured.

# Upstate Sports & Play Co.

Next.js 15 website for premium mobile sports experiences in Upstate South Carolina.

See `CONTENT-REVIEW.md` for the final content/UX improvements and how the new optional child-count field affects an existing database.

## Included
- Responsive homepage, Mini Grand Prix, Events, Request a Quote
- $400 early-bird starting price vs. the $495 regular starting price (a $95 advertised discount; ensure the regular price and promotion are truthful and supportable)
- February 2027 inquiry-only messaging (no payment or instant booking)
- Server-side Zod validation, honeypot, Supabase inquiry storage, optional Resend notifications
- Concept artwork placeholder instead of misleading photos of unpurchased equipment

## Run locally
1. Install Node.js 20+.
2. `npm install`
3. Run `npm run dev` and open http://localhost:3000 to preview the design without publishing.
4. To test inquiry submissions, copy `.env.example` to `.env.local`, fill in your credentials, and run `schema.sql` in your Supabase project's SQL editor. Until configured, the form accurately reports that inquiries are unavailable.

## Configure inquiries

The form now requires only name, email, event type, event date and city/ZIP. Phone, headcount, and age range can be skipped. If you previously ran an older `schema.sql`, the `child_count` column must be made nullable as described in `CONTENT-REVIEW.md`.

Create a Supabase project and run `schema.sql`. Add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to local environment and Vercel project environment settings. **Keep the service role key secret and server-side.** All submissions are stored in the private `inquiries` table; see them in Supabase Table Editor. Without these variables, the API returns 503 and **does not pretend to have received inquiries**.

Optional: Set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, and a verified sender `INQUIRY_FROM_EMAIL` to receive email alerts. Email failures are logged; the database remains the source of truth.

## Deploy
Push the project to GitHub, import into Vercel as a Next.js project, set environment variables, and deploy. Test a real submission and verify the Supabase row before promoting the website.

## Before publishing
- Replace placeholders with **supplier-approved** track imagery and properly licensed lifestyle photography. Obtain written permission from Inflatable Island before using their images; do not copy competitor photos.
- Confirm final package scope, capacity, staffing, safety approvals, insurance, travel fees, and actual product availability before taking deposits or guaranteeing dates.
- Add business contact details, privacy policy, and terms, and implement rate limiting/CAPTCHA (e.g. Turnstile) before high-volume public marketing.
- Review the early-bird promotion eligibility and terms; avoid implying inventory or confirmed reservations.
- Review accessibility and test on mobile.

## Local verification of this revision
- All site TS/TSX files were checked for TypeScript/JSX syntax using the installed TypeScript compiler.
- A production `npm run build` was **not** completed in this environment because dependency installation could not finish; run `npm install && npm run build` locally before deploying.


## Approved homepage imagery (V4)

The homepage uses optimized local WebP files under `public/images/`:
- `mini-grand-prix-outdoor.webp`: prominent homepage hero
- `mini-grand-prix-indoor.webp`: second homepage image in the Mini Grand Prix introduction

Both are concept visuals rather than documentary photographs of delivered inventory. The website labels them accordingly. When actual equipment photos are available, replace these files while preserving the same names (or update image paths in `app/page.tsx`).


## Contact information (V7)
The website shows **info@upstatesportsandplay.com** and **(937) 751-7558** as clickable contact links in the top announcement bar, footer, homepage contact callout, and quote page. The email uses `mailto:` and the phone uses `tel:`.

This does **not** configure delivery of website inquiry submissions. To enable form storage and automatic notifications, set up Supabase and Resend following the instructions above. The sample `.env.example` sets `INQUIRY_TO_EMAIL` to the business address; `RESEND_API_KEY` and a verified `INQUIRY_FROM_EMAIL` are still required for email notifications. Verify that the business mailbox is active before publishing.

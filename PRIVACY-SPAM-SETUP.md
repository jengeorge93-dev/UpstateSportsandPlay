# V9 privacy + spam-protection setup

## What's changed
- Public `/privacy` page; footer and inquiry-form links.
- Existing honeypot preserved; stronger actual request-size limit.
- Cloudflare Turnstile is **optional until both keys are added**. Once configured, server verifies every response with Cloudflare before writing to Supabase. The server also checks expected production hostname and `event_inquiry` action.
- Misconfigured partial Turnstile setup fails closed with a contact-email alternative, instead of giving false protection.
- Rejected form submissions reset the challenge so visitors can retry.

## Set up Turnstile (before marketing)
1. Sign in to Cloudflare and open **Turnstile** → **Add widget**. You do **not** need to change your domain's DNS provider or Vercel hosting.
2. Create a widget for `upstatesportsandplay.com` and `www.upstatesportsandplay.com` (if the Cloudflare interface accepts both). Choose **Managed** mode.
3. Copy **Site Key** to Vercel project **Settings → Environment Variables** as `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (config, public; **Production**).
4. Copy **Secret Key** to `TURNSTILE_SECRET_KEY` (sensitive/secret, server only; **Production**). Never commit the secret to GitHub or put it in `NEXT_PUBLIC_`.
5. Add **both** variables before redeploying. A single variable causes the form to show a configuration error.
6. Deploy the updated code and test from `https://upstatesportsandplay.com/request-quote`. Confirm both a success message and a new Supabase row, and check the notification in Gmail.
7. Test that an empty/expired challenge cannot submit. After a failure, challenge should reset and allow a retry.

Cloudflare Turnstile verification tokens expire after five minutes and can be used only once. Browser widgets without server-side validation do not prevent automated requests.

## Optional further hardening
- Review Vercel Firewall / WAF options for rate limiting repeated POST requests to `/api/inquiries`; do not rely on an in-memory counter in Vercel serverless functions.
- Check Supabase regularly for unusual submission volume. Keep the `inquiries` table RLS enabled and avoid adding public insert/read policies.
- Remove test leads containing real personal data when no longer needed.

## Privacy policy review
The new `/privacy` policy accurately reflects the current form and known providers. Before public promotion, review it against your actual data-handling practices and any applicable legal obligations. It does not promise a precise deletion period or imply legal review.

## Updating your GitHub repository
Copy updated `app`, `components` folders and `PRIVACY-SPAM-SETUP.md` from this ZIP into your GitHub Desktop clone, preserving folder structure. Commit and **Push origin**. Vercel should automatically deploy. Never upload `.env.local` or private keys.

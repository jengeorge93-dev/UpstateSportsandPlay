# Make the inquiry form live (Supabase + Resend + Vercel)

The form is implemented but **not connected to your accounts** until you enter the environment variables below. Do not enter any credentials in client-side code or publish them in Git.

## 1. Supabase — store every inquiry

1. Open your Supabase project (or create one).
2. Select **SQL Editor**, paste the full contents of `schema.sql`, and run it. If upgrading a table from an earlier version, confirm `child_count` permits NULL.
3. Under project **Settings > API** (label may vary), locate the project URL and its **server-side secret/service_role key**. The older `service_role` key and newer Supabase secret-key formats are different; use a key supported by your server client with the necessary insert/select privileges. Do not use the public `anon` key.
4. In `.env.local` (local) and Vercel Project Settings > Environment Variables (hosted), set:

   `SUPABASE_URL=https://YOUR_PROJECT.supabase.co`

   `SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_SECRET`

5. Restart `npm run dev` after changing `.env.local`.
6. Submit a genuine test inquiry at `/request-quote` and confirm a new row appears in **Supabase > Table Editor > inquiries**. Only successful database writes display the success message.

The table has row-level security enabled and **no public read/insert policies**. Keep the server key secret: NEVER use a `NEXT_PUBLIC_` prefix for it.

## 2. Resend — notify your email inbox

1. Confirm `info@upstatesportsandplay.com` can receive email.
2. Sign up/log in to Resend and verify a sending domain, e.g. `upstatesportsandplay.com`, using the DNS records Resend provides.
3. Create an API key, then set:

   `RESEND_API_KEY=re_...`

   `INQUIRY_FROM_EMAIL=Upstate Sports & Play Co. <inquiries@upstatesportsandplay.com>`

   `INQUIRY_TO_EMAIL=info@upstatesportsandplay.com`

4. Restart/redeploy and submit another test. Check the inbox and spam folder; confirm the stored Supabase row too. Notification emails use the customer's email as Reply-To.

**Important:** The form can successfully store a lead even if an email alert fails. Check Supabase if you suspect a notification was missed; don't rely on email as the only record.

## 3. Optional: Cloudflare Turnstile anti-spam

Create a Turnstile widget, add your domain(s) and localhost for testing, and set BOTH keys:

`NEXT_PUBLIC_TURNSTILE_SITE_KEY=...`

`TURNSTILE_SECRET_KEY=...`

The public widget appears on the form when the site key is present and the server verifies the token when the secret is present. Set both together. If not set, the hidden honeypot still runs but is not robust protection from dedicated bots. Add stronger rate limiting before high-volume marketing.

## 4. Deploy + acceptance checklist

- Install Node 20+, run `npm install`, then `npm run build`.
- In Vercel, configure the environment variables above for Production, then deploy the GitHub repo.
- Open the hosted `/request-quote` page on desktop and mobile; test one February 2027+ submission.
- Confirm that the success message appears, a row is saved in Supabase, and an email arrives if configured.
- Test a missing required field, an invalid email, and a date before February 2027; ensure submission is blocked.
- Verify the site does not charge customers or automatically reserve dates.
- Verify the $95 discount is applied manually to eligible bookings confirmed at least 60 days before the event.
- Add a privacy policy before collecting real customer information. Delete test records from Supabase after verifying.

**Live setup status:** Cannot be verified without your Supabase/Resend/Vercel project credentials and a real submission. The ZIP does not contain any secrets.

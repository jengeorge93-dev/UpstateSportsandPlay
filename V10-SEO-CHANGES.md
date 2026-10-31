# V10 — Local SEO improvements

Based on the V9 project, with the established inquiry API, Supabase/Resend integration and chosen images preserved.

- Distinct, location-specific page metadata for Home, Mini Grand Prix, Events, Request Quote and Privacy.
- Canonical URLs, metadataBase, Open Graph metadata and sharing image.
- Added Organization JSON-LD with only verified business contact and broad service areas; no ratings, reviews, storefront or fictitious business claims.
- Stronger natural language about kids racing party rentals in Spartanburg / Greenville, and more useful internal links.
- Includes `app/sitemap.ts` and `app/robots.ts` matching files the user recently created in GitHub; check Git diffs before committing.
- No changes to inquiry API, booking policies, early bird terms, price, or images.

## Deployment
Copy changed files into the existing GitHub Desktop repo preserving paths; merge rather than nest folders. Commit/push, then check Vercel Ready, each page, sitemap.xml, robots.txt and the form. Do not copy .env files containing keys.

## SEO follow-up
Submit sitemap once, inspect indexing coverage after Google crawls, and compare Search Console queries after impressions accumulate. Google Business Profile will remain subject to its own verification.

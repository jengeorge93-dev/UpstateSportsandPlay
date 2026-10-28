# Content and customer-experience final pass

## Changes made
- Homepage: stronger event/date CTAs, explicit February 2027 inquiry-only status, buyer benefits, audience fit, three-step process, concise FAQs, and clear Upstate service-area messaging.
- Mini Grand Prix: clearer explanation of the proposed attraction, tentative age fit, event requirements, full FAQ, and a personal-quote CTA.
- Events: tailored content for birthdays, schools/youth clubs, corporate family events, and community organizers, including what event information helps create a quote.
- Inquiry: simplified to **five required fields** (name, email, type, date, city/ZIP). Phone, headcount, and age range now optional to reduce abandoned forms. Added a clearer success state and privacy-purpose note.
- Price: $400 early-bird starting offer, $95 less than the advertised standard starting rate of $495. The site does not claim $495 was previously charged. Confirm that the regular price and advertised savings are supportable.
- Trust & accuracy: avoids fabricated reviews, guarantees of availability, exact quantities, supervision, power and site requirements, or package inclusions before supplier/insurance approval.
- Added keyboard skip link, accessible FAQ accordions, focus indicators, responsive spacing, clear form fields, and page-specific SEO descriptions.

## Important deployment notes
- **Do not announce confirmed bookings yet.** Supplier lead time, equipment choice, safety/insurance approvals, booking terms and actual package inclusions still require verification before commitments.
- Pricing language should be reviewed with the final package scope before promotion. The $400 quote may exclude travel, staffing, and other requirements; clearly disclose all in the customer quote.
- The revised form allows phone, child count, and age range to be blank. If you created the Supabase table from an older schema, run:

  ```sql
  alter table public.inquiries alter column child_count drop not null;
  ```

  `phone` and `age_range` are still saved as empty strings when omitted.
- Test a form submission against your actual Supabase setup before publishing. No live database/email integration was connected by this revision.
- Photo slots still use placeholders; obtain written supplier permission and licensed lifestyle photos rather than copying another rental company’s images.
- Before publicly collecting leads, finalize a privacy policy/contact address, anti-spam protection, and the booking/changes policy. No placeholder contact details have been fabricated.

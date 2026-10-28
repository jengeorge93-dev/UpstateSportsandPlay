import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { inquirySchema } from '../../../lib/validation';

export const runtime = 'nodejs';

const responseHeaders = { 'Cache-Control': 'no-store' };

function escapeText(value: string) {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

export async function POST(request: Request) {
  try {
    const maxBytes = 16_384;
    const declaredSize = Number(request.headers.get('content-length') || 0);
    if (declaredSize > maxBytes) return NextResponse.json({ error: 'Request is too large.' }, { status: 413, headers: responseHeaders });

    // Bound actual bytes, even when Content-Length is absent or inaccurate.
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > maxBytes) return NextResponse.json({ error: 'Request is too large.' }, { status: 413, headers: responseHeaders });
    const body = JSON.parse(raw);
    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Please check the required fields and try again.' }, { status: 400, headers: responseHeaders });
    }
    const data = result.data;

    // Honeypot: quietly ignore common automated submissions.
    if (data.website) return NextResponse.json({ ok: true }, { status: 200, headers: responseHeaders });

    // Require a matching Turnstile configuration to avoid silently unprotected deployments.
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (Boolean(turnstileSiteKey) !== Boolean(turnstileSecret)) {
      console.error('Turnstile configuration incomplete');
      return NextResponse.json({ error: 'The form is temporarily unavailable. Please email info@upstatesportsandplay.com.' }, { status: 503, headers: responseHeaders });
    }
    if (turnstileSecret) {
      if (!data.turnstileToken) {
        return NextResponse.json({ error: 'Please complete the security check.' }, { status: 400, headers: responseHeaders });
      }
      const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({ secret: turnstileSecret, response: data.turnstileToken }),
        cache: 'no-store',
      });
      const outcome: { success?: boolean; hostname?: string; action?: string } = check.ok ? await check.json() : {};
      const expectedHostnames = ['upstatesportsandplay.com', 'www.upstatesportsandplay.com'];
      if (!outcome.success || outcome.action !== 'event_inquiry' || !outcome.hostname || !expectedHostnames.includes(outcome.hostname)) {
        return NextResponse.json({ error: 'Security verification failed. Please retry.' }, { status: 400, headers: responseHeaders });
      }
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: 'The inquiry form is not available yet. Please email info@upstatesportsandplay.com.' }, { status: 503, headers: responseHeaders });
    }

    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: saved, error } = await supabase.from('inquiries').insert({
      name: data.name, email: data.email, phone: data.phone,
      event_type: data.eventType, event_date: data.eventDate,
      location: data.location, child_count: data.childCount,
      age_range: data.ageRange, package_interest: data.package,
      duration: data.duration, notes: data.notes, status: 'new',
    }).select('id').single();

    if (error || !saved) {
      console.error('Inquiry storage failed:', error?.code || 'no record returned');
      return NextResponse.json({ error: 'Unable to submit right now. Please email info@upstatesportsandplay.com.' }, { status: 500, headers: responseHeaders });
    }

    // The database is the source of truth. A notification failure must not cause the customer to re-submit.
    if (process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL && process.env.INQUIRY_TO_EMAIL) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error: mailError } = await resend.emails.send({
          from: process.env.INQUIRY_FROM_EMAIL,
          to: [process.env.INQUIRY_TO_EMAIL],
          replyTo: data.email,
          subject: `New Mini Grand Prix inquiry: ${escapeText(data.eventDate)} — ${escapeText(data.name)}`,
          text: [
            `Inquiry ID: ${saved.id}`, `Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || 'Not provided'}`,
            `Event type: ${data.eventType}`, `Requested date: ${data.eventDate}`, `Location: ${data.location}`,
            `Estimated children: ${data.childCount ?? 'Not provided'}`, `Ages: ${data.ageRange || 'Not provided'}`,
            `Experience: ${data.package}`, `Duration: ${data.duration}`, `Notes: ${data.notes || 'None'}`,
            '', 'This is an inquiry only. No date has been reserved.',
          ].join('\n'),
        });
        if (mailError) console.error('Inquiry email notification failed:', mailError.message);
      } catch (mailError) {
        console.error('Inquiry email notification exception:', mailError instanceof Error ? mailError.message : 'unknown');
      }
    }

    return NextResponse.json({ ok: true }, { status: 201, headers: responseHeaders });
  } catch (error) {
    console.error('Inquiry request error:', error instanceof Error ? error.message : 'invalid request');
    return NextResponse.json({ error: 'Unable to process this request. Please try again.' }, { status: 400, headers: responseHeaders });
  }
}

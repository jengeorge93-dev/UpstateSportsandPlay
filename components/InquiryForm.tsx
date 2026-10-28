'use client';
import {useState,type FormEvent} from 'react';
import Link from 'next/link';
import Script from 'next/script';
export default function InquiryForm(){
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const [error,setError]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setStatus('sending');setError('');
    const form=e.currentTarget;
    const data=Object.fromEntries(new FormData(form).entries());
    data.turnstileToken=data["cf-turnstile-response"]||"";
    try{
      const r=await fetch('/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const out=await r.json();
      if(!r.ok)throw new Error(out.error||'Unable to send inquiry');
      setStatus('success');form.reset();
    }catch(err){
      setError(err instanceof Error?err.message:'Please try again');setStatus('error');
      // Turnstile tokens are single-use. Reset after a rejected submission so visitors can retry.
      if (typeof window !== 'undefined') {
        const challenge = (window as Window & { turnstile?: { reset: () => void } }).turnstile;
        challenge?.reset();
      }
    }
  }
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return <form className="form form-panel" onSubmit={submit} aria-label="Request an event quote">
    <div className="wide form-intro"><div className="eyebrow">Mini Grand Prix inquiry</div><h3>Your race day, your details.</h3><p className="muted">Only five quick fields are required to get started. The rest helps us tailor your quote. Book 60+ days ahead for a $95 Early Bird discount.</p></div>
    <label className="field">Your name <span aria-hidden="true">*</span><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="First and last name"/></label>
    <label className="field">Email address <span aria-hidden="true">*</span><input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com"/></label>
    <label className="field">Phone number <span className="optional">Optional</span><input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="For a call or text follow-up"/></label>
    <label className="field">Event type <span aria-hidden="true">*</span><select name="eventType" required defaultValue=""><option value="" disabled>Choose event type</option><option>Birthday party</option><option>School or youth club</option><option>Corporate family event</option><option>Festival or community event</option><option>Other</option></select></label>
    <label className="field">Preferred event date <span aria-hidden="true">*</span><input name="eventDate" type="date" min="2027-02-01" required/></label>
    <label className="field">Event city / ZIP <span aria-hidden="true">*</span><input name="location" required minLength={2} maxLength={120} placeholder="e.g., Greenville, SC"/></label>
    <label className="field">Estimated children <span className="optional">Optional</span><input name="childCount" type="number" min="1" max="5000" placeholder="Best guess is fine"/></label>
    <label className="field">Children's ages <span className="optional">Optional</span><input name="ageRange" maxLength={80} placeholder="e.g., 4–7"/></label>
    <label className="field">Experience<select name="package" defaultValue="Mini Grand Prix"><option>Mini Grand Prix</option><option>Custom organization / large event quote</option></select></label>
    <label className="field">Approximate event duration<select name="duration" defaultValue="Not sure yet"><option>Not sure yet</option><option>1 hour</option><option>2 hours</option><option>3+ hours</option></select></label>
    <label className="field wide">Anything else we should know?<textarea name="notes" rows={4} maxLength={2000} placeholder="Possible setup space, preferred time, flexible dates, guest details, or questions"/></label>
    {turnstileSiteKey && <div className="wide"><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-action="event_inquiry"/></div>}
    <div className="wide honey" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <div className="wide form-bottom"><p className="fine">We use your details to respond to this request. See our <Link href="/privacy" className="inline-link">Privacy Policy</Link>. No payment is collected and this does not reserve your date.</p><button className="btn form-submit" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending your inquiry…':'Request my event quote ↗'}</button>{status==='success'&&<div className="success" role="status"><strong>Your inquiry has been received.</strong><p>We'll review your event details and contact you directly. Please note that your date is not reserved yet.</p></div>}{status==='error'&&<p className="error" role="alert">{error}</p>}</div>
  </form>;
}

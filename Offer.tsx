import Link from 'next/link';

export function EarlyBirdPrice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'offer offer-compact' : 'offer'}>
      <div className="eyebrow">Mini Grand Prix · Starting price</div>
      <div className="offer-numbers"><strong className="price">$495</strong></div>
      <p className="early-bird-message"><strong>Get an Early Bird discount of $95 when you book 60+ days out.</strong></p><p className="muted">Eligible bookings made at least 60 days before the event start at <strong>$400</strong> after the discount. Booking inquiries are open for February 2027 and beyond.</p>
      <p className="fine">Your quote will outline the experience, event duration, staffing options, delivery, and any additional charges. It’s free to inquire.</p>
      <Link href="/request-quote" className="btn">Check your event date ↗</Link>
    </div>
  );
}

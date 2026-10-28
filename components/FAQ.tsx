const questions = [
  {
    q: 'When will Mini Grand Prix events be available?',
    a: 'We’re accepting booking inquiries for February 2027 and beyond. Submit your preferred date and we’ll review availability with you. Dates are reserved only after written confirmation.'
  },
  {
    q: 'How does the Early Bird discount work?',
    a: 'Mini Grand Prix starts at $495. Get a $95 Early Bird discount when you book at least 60 days before your event, bringing the eligible starting price to $400. The discount applies to confirmed bookings, not simply requesting a quote. Your quote will outline setup, duration, staffing, delivery, and any additional charges.'
  },
  {
    q: 'What ages can participate?',
    a: 'The Mini Grand Prix is intended for younger drivers, approximately ages 3–8. Participation depends on vehicle limits and event-specific safety requirements. Tell us your guests’ ages so we can check suitability.'
  },
  {
    q: 'How much space do we need?',
    a: 'A reasonably level, accessible setup area is important. Space and power needs vary by layout and event. Tell us about your venue, and we’ll review the requirements and whether an indoor setup could work.'
  },
  {
    q: 'Will someone operate the experience?',
    a: 'Staffing options can be discussed as part of your quote. Supervision requirements depend on the venue, equipment guidelines, and event conditions; we’ll explain what applies to your event.'
  },
  {
    q: 'Do I have to pay or commit to request a date?',
    a: 'No. An inquiry is free and does not reserve a date or obligate you to book. We will discuss your event, provide an itemized quote, and explain the next steps before accepting a reservation.'
  },
  {
    q: 'Where do you travel?',
    a: 'We accept inquiries for Greenville, Spartanburg, and surrounding Upstate South Carolina communities. Travel distance and any associated charges are reviewed for each event.'
  },
  {
    q: 'What if the weather changes?',
    a: 'Outdoor events depend on safe weather and site conditions. We’ll provide the applicable weather and rescheduling terms before a booking is confirmed.'
  }
];

export default function FAQ({short = false}: {short?:boolean}) {
  const shown = short ? questions.slice(0,4) : questions;
  return <div className="faq-list">{shown.map(({q,a}) => <details className="faq-item" key={q}><summary>{q}<span aria-hidden="true" className="faq-plus">+</span></summary><p className="muted">{a}</p></details>)}</div>;
}

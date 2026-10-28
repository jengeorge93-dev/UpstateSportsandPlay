create table if not exists public.inquiries (
 id uuid primary key default gen_random_uuid(),
 created_at timestamptz not null default now(),
 name text not null,
 email text not null,
 phone text not null,
 event_type text not null,
 event_date date not null,
 location text not null,
 child_count integer,
 age_range text not null,
 package_interest text not null,
 duration text not null,
 notes text not null default '',
 status text not null default 'new'
);
alter table public.inquiries enable row level security;
-- No public policies: only server-side service role inserts and dashboard admin access.

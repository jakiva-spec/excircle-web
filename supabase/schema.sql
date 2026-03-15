-- Create leads table
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  org text,
  email text not null,
  type text not null check (type in ('inquiry', 'lecture', 'other')),
  message text not null,
  source text default 'home',
  consent boolean default false
);

-- Create downloads table
create table public.downloads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  name text,
  source text default 'home',
  asset text default 'insight_book_v1',
  status text default 'requested' check (status in ('requested', 'sent', 'failed')),
  error text
);

-- Enable RLS
alter table public.leads enable row level security;
alter table public.downloads enable row level security;

-- Create policies
-- Allow public insert (for forms)
create policy "Allow public insert to leads"
  on public.leads
  for insert
  to public
  with check (true);

create policy "Allow public insert to downloads"
  on public.downloads
  for insert
  to public
  with check (true);

-- Allow authenticated (admin) select
-- Assuming admin uses Supabase Auth or Service Role, but simplicity dictates Service Role for backend.
-- If browsing via Dashboard, these policies aren't needed for Service Role.
-- But for strictness:
create policy "Allow service role full access to leads"
  on public.leads
  using (auth.role() = 'service_role');

create policy "Allow service role full access to downloads"
  on public.downloads
  using (auth.role() = 'service_role');

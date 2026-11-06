-- ==============================================================================
-- Avinex Technologies - Supabase Contact Submissions Table Schema & Security (RLS)
-- Run this script in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. Create table contact_submissions
create table if not exists public.contact_submissions (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    phone text,
    company text,
    subject text not null,
    message text not null,
    status text not null default 'new',
    created_at timestamptz not null default timezone('utc'::text, now())
);

-- 2. Add comment for documentation
comment on table public.contact_submissions is 'Inquiries submitted through the Avinex Contact Us page';

-- 3. Enable Row Level Security (RLS)
alter table public.contact_submissions enable row level security;

-- 4. Drop any pre-existing policy if it exists
drop policy if exists "Allow anonymous insert only" on public.contact_submissions;

-- 5. Create RLS Policy: Allow anonymous INSERT only
create policy "Allow anonymous insert only"
    on public.contact_submissions
    for insert
    to anon, authenticated
    with check (true);

-- 6. Enforce least privilege: Grant INSERT only to anon & authenticated, revoking SELECT, UPDATE, DELETE
grant insert on table public.contact_submissions to anon, authenticated;
revoke select, update, delete on table public.contact_submissions from anon;

-- Verification check:
-- With RLS enabled and only INSERT granted/permitted,
-- anonymous clients can submit the contact form, but cannot read or modify any stored leads.


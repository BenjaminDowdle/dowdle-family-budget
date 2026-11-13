-- Family Budget: run this once in Supabase (SQL Editor > New query > paste > Run).

create table if not exists public.rows (
  coll       text not null,
  id         text not null,
  data       jsonb,
  deleted    boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (coll, id)
);

create index if not exists rows_updated_idx on public.rows (updated_at);

create or replace function public.touch_rows() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;

drop trigger if exists rows_touch on public.rows;
create trigger rows_touch before insert or update on public.rows
  for each row execute function public.touch_rows();

-- Only signed-in users (you and your wife) can read or change anything.
alter table public.rows enable row level security;
drop policy if exists "family only" on public.rows;
create policy "family only" on public.rows
  for all to authenticated using (true) with check (true);

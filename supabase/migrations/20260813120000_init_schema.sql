-- ON Engenharia - Orçamentos
-- Schema inicial: migra o modelo de dados do Firebase Realtime Database
-- (um único blob em on_engenharia/data) para tabelas relacionais no Postgres.

create extension if not exists pgcrypto;

-- ── EQUIPE ──────────────────────────────────────────────
create table if not exists team_members (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null check (role in ('admin','vendedor','exec')),
  color      text,
  initials   text,
  pin        text not null,
  created_at timestamptz not null default now()
);

-- ── CATÁLOGO DE SERVIÇOS ────────────────────────────────
create table if not exists services (
  id         bigint generated always as identity primary key,
  name       text not null,
  unit       text not null default 'un',
  price      numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

-- ── ORÇAMENTOS ──────────────────────────────────────────
-- id textual (ex: 'ORC-001') para manter compatibilidade com os
-- identificadores já usados no app e em PDFs/links existentes.
create table if not exists orcamentos (
  id         text primary key,
  client     text not null,
  tel        text,
  address    text,
  maps_link  text,
  obs        text,
  desconto   jsonb not null default '{"tipo":"none","val":0,"final":0}',
  pagamento  jsonb not null default '{"tipo":"","descricao":""}',
  validade   text default '30 dias',
  status     text not null default 'rascunho',
  kanban     text not null default 'aguardando',
  created_by text,
  folder_id  text,
  sig        text,
  sig_exec   text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence if not exists orcamento_seq;

create or replace function next_orcamento_id()
returns text
language sql
as $$
  select 'ORC-' || lpad(nextval('orcamento_seq')::text, 3, '0');
$$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_orcamentos_updated_at on orcamentos;
create trigger trg_orcamentos_updated_at
  before update on orcamentos
  for each row execute function set_updated_at();

-- ── ITENS DO ORÇAMENTO ──────────────────────────────────
create table if not exists orcamento_items (
  id            bigint generated always as identity primary key,
  orcamento_id  text not null references orcamentos(id) on delete cascade,
  name          text not null,
  unit          text,
  qty           numeric(12,2) not null default 1,
  price         numeric(12,2) not null default 0,
  position      int not null default 0
);
create index if not exists idx_orcamento_items_orcamento on orcamento_items(orcamento_id);

-- ── FOTOS ───────────────────────────────────────────────
-- "data" guarda a imagem (base64 ou URL do Supabase Storage, se migrado depois).
create table if not exists orcamento_photos (
  id           bigint generated always as identity primary key,
  orcamento_id text not null references orcamentos(id) on delete cascade,
  data         text not null,
  name         text,
  ts           timestamptz not null default now()
);
create index if not exists idx_orcamento_photos_orcamento on orcamento_photos(orcamento_id);

-- ── ÁUDIOS ──────────────────────────────────────────────
create table if not exists orcamento_audios (
  id           bigint generated always as identity primary key,
  orcamento_id text not null references orcamentos(id) on delete cascade,
  data         text not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_orcamento_audios_orcamento on orcamento_audios(orcamento_id);

-- ── MATERIAIS (usados na execução) ─────────────────────
create table if not exists orcamento_materiais (
  id           bigint generated always as identity primary key,
  orcamento_id text not null references orcamentos(id) on delete cascade,
  nome         text not null,
  qty          numeric(12,2) not null default 1,
  val          numeric(12,2) not null default 0
);
create index if not exists idx_orcamento_materiais_orcamento on orcamento_materiais(orcamento_id);

-- ── CONFIGURAÇÕES GERAIS (ex: PIN admin global) ────────
create table if not exists app_settings (
  key   text primary key,
  value jsonb not null
);

-- ── RLS ─────────────────────────────────────────────────
-- O app hoje usa o Firebase Realtime Database sem autenticação real
-- (login por PIN local, banco aberto). Para manter o mesmo comportamento
-- no Supabase habilitamos RLS mas com policies permissivas para anon.
-- Quando o app adotar Supabase Auth de verdade, troque estas policies
-- por regras restritas por usuário/role.
alter table team_members       enable row level security;
alter table services           enable row level security;
alter table orcamentos         enable row level security;
alter table orcamento_items    enable row level security;
alter table orcamento_photos   enable row level security;
alter table orcamento_audios   enable row level security;
alter table orcamento_materiais enable row level security;
alter table app_settings       enable row level security;

create policy "allow all - team_members"        on team_members        for all using (true) with check (true);
create policy "allow all - services"            on services            for all using (true) with check (true);
create policy "allow all - orcamentos"          on orcamentos          for all using (true) with check (true);
create policy "allow all - orcamento_items"     on orcamento_items     for all using (true) with check (true);
create policy "allow all - orcamento_photos"    on orcamento_photos    for all using (true) with check (true);
create policy "allow all - orcamento_audios"    on orcamento_audios    for all using (true) with check (true);
create policy "allow all - orcamento_materiais" on orcamento_materiais for all using (true) with check (true);
create policy "allow all - app_settings"        on app_settings        for all using (true) with check (true);

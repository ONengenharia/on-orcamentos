-- Separa serviços de venda (cobrados) dos de garantia (não cobrados), e cria
-- um catálogo próprio de materiais pré-dimensionados (preços de referência
-- que o executor pode ajustar na hora de lançar materiais usados numa OS).

alter table services
  add column if not exists categoria text not null default 'venda';

create table if not exists materiais_catalogo (
  id         bigint generated always as identity primary key,
  categoria  text not null default '',
  name       text not null,
  unit       text not null default 'un',
  price      numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

alter table materiais_catalogo enable row level security;
create policy "allow all - materiais_catalogo" on materiais_catalogo for all using (true) with check (true);

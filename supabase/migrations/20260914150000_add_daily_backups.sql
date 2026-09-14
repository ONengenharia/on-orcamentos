-- Backup diário simples, direto no banco (plano free não tem PITR/backup
-- automático). O app grava aqui um snapshot completo (orçamentos + equipe +
-- serviços, já com itens/fotos/áudio/materiais embutidos em cada orçamento)
-- uma vez por dia, na primeira sincronização do dia. Serve como ponto de
-- restauração manual em caso de qualquer problema futuro.

create table if not exists backups (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  data       jsonb not null
);

alter table backups enable row level security;
create policy "allow all - backups" on backups for all using (true) with check (true);

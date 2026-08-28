-- Campos de execução (chegada/fim/GPS/finalização/compartilhamento) que o
-- app já registrava em memória, mas nunca eram enviados nem lidos do banco
-- (saveToSupabase/loadFromSupabase não os incluíam). Isso fazia esses dados
-- desaparecerem a cada sincronização/recarregamento, e é por isso que o
-- painel de Mapa (que depende de gps_exec) nunca mostrava as OS realizadas.

alter table orcamentos
  add column if not exists chegada        text,
  add column if not exists fim_exec       text,
  add column if not exists finished_at    timestamptz,
  add column if not exists gps_exec       jsonb,
  add column if not exists obs_exec       text,
  add column if not exists sent_to_office timestamptz,
  add column if not exists office_link    text,
  add column if not exists share_link     text;

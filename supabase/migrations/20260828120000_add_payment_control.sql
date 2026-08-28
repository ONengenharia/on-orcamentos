-- Controle simples de pagamento, independente do status de execução da OS
-- (o cliente pode pagar antes mesmo da obra ser finalizada).

alter table orcamentos
  add column if not exists pago boolean not null default false,
  add column if not exists pago_em timestamptz;

-- Dados iniciais equivalentes aos defaults hardcoded hoje no index.html
-- (svcs, orcs, team). Seguro rodar uma vez em banco novo; usa ON CONFLICT
-- para não duplicar se a migration for reaplicada.

insert into services (name, unit, price) values
  ('Limpeza módulos (0 a 10)', 'UN', 150),
  ('Limpeza módulos (10 a 30)', 'UN', 15),
  ('Limpeza módulos (30 a 60)', 'UN', 12),
  ('Limpeza módulos (60+)', 'UN', 10),
  ('Deslocamento equipe', 'KM', 2),
  ('Hora técnica', 'HR', 150)
on conflict do nothing;

insert into team_members (name, role, color, initials, pin) values
  ('Luan Stefanello', 'admin', '#1D3140', 'LS', '1234'),
  ('Lucas Oliveira', 'admin', '#2d4a60', 'LO', '1234'),
  ('Odair Neuls', 'vendedor', '#64ABDE', 'ON', '1234'),
  ('Carlos Tauchert', 'vendedor', '#64ABDE', 'CT', '1234'),
  ('José A. Klein Oliveira', 'vendedor', '#64ABDE', 'JK', '1234'),
  ('Tiago Almeida', 'exec', '#28a745', 'TA', '1234'),
  ('Ricardo Schusler', 'vendedor', '#64ABDE', 'RS', '1234'),
  ('Scheila Kurz', 'vendedor', '#64ABDE', 'SK', '1234'),
  ('Roger', 'exec', '#28a745', 'RO', '1234'),
  ('Carlos dos Santos', 'exec', '#28a745', 'CS', '1234')
on conflict do nothing;

insert into orcamentos
  (id, client, tel, address, maps_link, obs, desconto, pagamento, validade, status, kanban, created_by, folder_id, created_at)
values
  ('ORC-001', 'Luan', '', '', '', 'Ambiente teste',
   '{"tipo":"none","val":0,"final":150}',
   '{"tipo":"À vista","descricao":"Após execução"}',
   '30 dias', 'aprovado', 'aguardando', 'Luan', '', now())
on conflict (id) do nothing;

insert into orcamento_items (orcamento_id, name, unit, qty, price, position) values
  ('ORC-001', 'Hora técnica', 'HR', 1, 150, 0)
on conflict do nothing;

-- alinha a sequence com o próximo id livre (nid=2 no app original)
select setval('orcamento_seq', 1, true);

insert into app_settings (key, value) values
  ('admin_pin', '"1234"')
on conflict (key) do nothing;

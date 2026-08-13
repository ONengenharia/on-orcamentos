-- Habilita replicação Realtime (postgres_changes) nas tabelas usadas
-- pelo app para sincronizar entre dispositivos, substituindo o
-- listener `.on('value', ...)` que existia no Firebase Realtime Database.
alter publication supabase_realtime add table
  orcamentos,
  orcamento_items,
  orcamento_photos,
  orcamento_audios,
  orcamento_materiais,
  services,
  team_members,
  app_settings;

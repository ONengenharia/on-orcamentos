-- Corrige uma falha real em produção (11/09, itens de 11 orçamentos apagados
-- e nunca reinseridos): saveToSupabase apagava e reinseria itens/fotos/áudio/
-- materiais em chamadas HTTP separadas e não-atômicas. Os logs mostraram o
-- DELETE de orcamento_items indo com sucesso e a sequência parando aí — bem
-- provável que o celular tenha ido pra segundo plano ou perdido conexão no
-- meio do autoSave, sem nunca chegar no INSERT seguinte.
--
-- Essa função roda apagar+reinserir dos quatro filhos numa única transação
-- via RPC (uma única requisição HTTP): ou tudo é aplicado, ou nada é —
-- nunca mais um "meio-termo" com dado real apagado e não reposto.
create or replace function sync_orcamento_children(
  p_item_ids       text[],
  p_items          jsonb,
  p_photo_ids      text[],
  p_photos         jsonb,
  p_audio_ids      text[],
  p_audios         jsonb,
  p_material_ids   text[],
  p_materiais      jsonb
) returns void
language plpgsql
as $$
begin
  if p_item_ids is not null and array_length(p_item_ids,1) > 0 then
    delete from orcamento_items where orcamento_id = any(p_item_ids);
    insert into orcamento_items (orcamento_id, name, unit, qty, price, position)
    select x->>'orcamento_id', x->>'name', x->>'unit',
           coalesce((x->>'qty')::numeric,1), coalesce((x->>'price')::numeric,0),
           coalesce((x->>'position')::int,0)
    from jsonb_array_elements(p_items) x;
  end if;

  if p_photo_ids is not null and array_length(p_photo_ids,1) > 0 then
    delete from orcamento_photos where orcamento_id = any(p_photo_ids);
    insert into orcamento_photos (orcamento_id, data, name, ts, source)
    select x->>'orcamento_id', x->>'data', x->>'name',
           coalesce((x->>'ts')::timestamptz, now()), coalesce(x->>'source','orcamento')
    from jsonb_array_elements(p_photos) x;
  end if;

  if p_audio_ids is not null and array_length(p_audio_ids,1) > 0 then
    delete from orcamento_audios where orcamento_id = any(p_audio_ids);
    insert into orcamento_audios (orcamento_id, data, source)
    select x->>'orcamento_id', x->>'data', coalesce(x->>'source','orcamento')
    from jsonb_array_elements(p_audios) x;
  end if;

  if p_material_ids is not null and array_length(p_material_ids,1) > 0 then
    delete from orcamento_materiais where orcamento_id = any(p_material_ids);
    insert into orcamento_materiais (orcamento_id, nome, qty, val)
    select x->>'orcamento_id', x->>'nome', coalesce((x->>'qty')::numeric,1), coalesce((x->>'val')::numeric,0)
    from jsonb_array_elements(p_materiais) x;
  end if;
end;
$$;

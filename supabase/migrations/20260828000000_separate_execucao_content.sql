-- Separa o conteúdo (fotos/áudio) que vem do orçamento (vendedor) do que o
-- executor acrescenta durante a execução da OS. Antes tudo ia pra mesma
-- tabela sem distinção; agora uma coluna "source" marca a origem, e
-- observação de texto do executor ganha campo próprio (obs de texto do
-- orçamento já existia em orcamentos.obs).

alter table orcamento_photos
  add column if not exists source text not null default 'orcamento';

alter table orcamento_audios
  add column if not exists source text not null default 'orcamento';

alter table orcamentos
  add column if not exists exec_obs text;

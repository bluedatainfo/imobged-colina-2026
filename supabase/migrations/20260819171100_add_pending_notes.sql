-- Adiciona a coluna pending_notes na tabela de pre_registrations
-- para suportar o fluxo de Pendências (status "Pendência" / "Pendência Resolvida").
-- A coluna `status` já é TEXT (sem enum), portanto aceita os novos valores sem ALTER.

ALTER TABLE public.pre_registrations
  ADD COLUMN IF NOT EXISTS pending_notes TEXT;

-- Garante que a coluna seja selecionável/atualizável pelos mesmos usuários
-- autenticados que já têm acesso (RLS já cobre a tabela com authenticated_*).

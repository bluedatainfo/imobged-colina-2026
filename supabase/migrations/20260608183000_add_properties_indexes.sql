-- Adiciona índices para otimizar as buscas por título e endereço nos imóveis

CREATE INDEX IF NOT EXISTS idx_properties_title ON public.properties USING btree (title);
CREATE INDEX IF NOT EXISTS idx_properties_address ON public.properties USING btree (address);

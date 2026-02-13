-- Adiciona as colunas necessárias para o salvamento dos dados do representante e atividades secundárias
-- Execute este script no SQL Editor do seu Supabase

ALTER TABLE IF EXISTS public.companies 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS secondary_activities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS representative_name TEXT,
ADD COLUMN IF NOT EXISTS representative_cpf TEXT,
ADD COLUMN IF NOT EXISTS representative_email TEXT;

-- Garante que o índice no CNPJ exista para o upsert funcionar corretamente
CREATE INDEX IF NOT EXISTS idx_companies_cnpj ON public.companies(cnpj);

-- FIX RÁPIDO: Adicionar constraint faltante em auto_generated_data

-- Primeiro, limpar possíveis duplicatas
DELETE FROM public.auto_generated_data a
WHERE a.id NOT IN (
    SELECT id FROM (
        SELECT DISTINCT ON (company_id) id
        FROM public.auto_generated_data
        ORDER BY company_id, generated_at DESC
    ) as subq
);

-- Adicionar a constraint UNIQUE
ALTER TABLE public.auto_generated_data 
DROP CONSTRAINT IF EXISTS auto_generated_data_company_id_key;

ALTER TABLE public.auto_generated_data 
ADD CONSTRAINT auto_generated_data_company_id_key UNIQUE (company_id);

-- Verificar resultado
SELECT 
    'auto_generated_data.company_id' as table_column,
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.auto_generated_data'::regclass 
    AND conname = 'auto_generated_data_company_id_key';

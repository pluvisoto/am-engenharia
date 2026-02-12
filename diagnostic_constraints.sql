-- Diagnóstico: Verificar todas as constraints criadas

-- 1. Verificar constraint em companies.cnpj
SELECT 
    'companies.cnpj' as table_column,
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.companies'::regclass 
    AND conname = 'companies_cnpj_key';

-- 2. Verificar constraint em auto_generated_data.company_id
SELECT 
    'auto_generated_data.company_id' as table_column,
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.auto_generated_data'::regclass 
    AND contype = 'u';

-- 3. Listar TODAS as constraints das tabelas principais
SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public'
    AND tc.table_name IN ('companies', 'auto_generated_data', 'client_intakes')
ORDER BY tc.table_name, tc.constraint_type;

-- 4. Verificar se as tabelas existem
SELECT 
    table_name,
    table_type
FROM information_schema.tables
WHERE table_schema = 'public'
    AND table_name IN ('companies', 'auto_generated_data', 'client_intakes', 'manual_adjustments', 'activity_log');

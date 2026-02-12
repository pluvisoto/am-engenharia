-- Investigar problema com activity_log foreign key

-- 1. Ver a estrutura da tabela activity_log
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'activity_log'
ORDER BY ordinal_position;

-- 2. Ver triggers na tabela companies
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'companies';

-- 3. Ver constraints da tabela activity_log
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'activity_log';

-- 4. SOLUÇÃO TEMPORÁRIA: Desabilitar trigger de activity_log (se existir)
-- Primeiro, vamos ver se existe o trigger
DO $$
DECLARE
    trigger_rec RECORD;
BEGIN
    FOR trigger_rec IN 
        SELECT trigger_name 
        FROM information_schema.triggers 
        WHERE event_object_table = 'companies'
          AND trigger_name ILIKE '%activity%'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON companies', trigger_rec.trigger_name);
        RAISE NOTICE 'Dropped trigger: %', trigger_rec.trigger_name;
    END LOOP;
END $$;

-- 5. OU: Tornar a constraint DEFERRABLE
ALTER TABLE activity_log 
DROP CONSTRAINT IF EXISTS activity_log_user_id_fkey;

ALTER TABLE activity_log 
ADD CONSTRAINT activity_log_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE 
DEFERRABLE INITIALLY DEFERRED;

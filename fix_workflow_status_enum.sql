-- Verificar valores atuais aceitos pelo ENUM workflow_status
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname = 'workflow_status'
ORDER BY e.enumsortorder;

-- Adicionar valores necessários ao ENUM (se não existirem)
-- Execute cada ALTER TYPE separadamente se der erro

-- Opção 1: Adicionar 'registered'
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'workflow_status' AND e.enumlabel = 'registered'
    ) THEN
        ALTER TYPE workflow_status ADD VALUE 'registered';
    END IF;
END $$;

-- Opção 2: Adicionar 'pending_intake'
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'workflow_status' AND e.enumlabel = 'pending_intake'
    ) THEN
        ALTER TYPE workflow_status ADD VALUE 'pending_intake';
    END IF;
END $$;

-- Verificar novamente os valores
SELECT 
    t.typname AS enum_name,
    e.enumlabel AS enum_value
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname = 'workflow_status'
ORDER BY e.enumsortorder;

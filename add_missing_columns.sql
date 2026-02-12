-- Add missing columns to companies table for the new signup flow

-- Add whatsapp column
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- Add cnae column (if not exists)
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS cnae TEXT;

-- Add cnae_desc column (if not exists)
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS cnae_desc TEXT;

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'companies' 
AND column_name IN ('whatsapp', 'cnae', 'cnae_desc', 'user_id')
ORDER BY column_name;

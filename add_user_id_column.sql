-- Add user_id column to companies table to link with Supabase Auth

-- Step 1: Add the column (nullable initially)
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS user_id UUID;

-- Step 2: Add foreign key constraint to auth.users
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'companies_user_id_fkey'
    ) THEN
        ALTER TABLE companies
        ADD CONSTRAINT companies_user_id_fkey 
        FOREIGN KEY (user_id) 
        REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Step 3: Create index for performance
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);

-- Verify the changes
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'companies' AND column_name = 'user_id';

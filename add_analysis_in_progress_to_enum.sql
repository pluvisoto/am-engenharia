-- Add 'analysis_in_progress' to workflow_status ENUM
-- This needs to be done before we can use this status

-- First check current enum values
SELECT enumlabel 
FROM pg_enum e
JOIN pg_type t ON e.enumtypid = t.oid
WHERE t.typname = 'workflow_status'
ORDER BY e.enumsortorder;

-- Add the new value if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'workflow_status' 
        AND e.enumlabel = 'analysis_in_progress'
    ) THEN
        ALTER TYPE workflow_status ADD VALUE 'analysis_in_progress';
        RAISE NOTICE 'Added analysis_in_progress to workflow_status enum';
    ELSE
        RAISE NOTICE 'analysis_in_progress already exists in workflow_status enum';
    END IF;
END $$;

-- Verify it was added
SELECT enumlabel 
FROM pg_enum e
JOIN pg_type t ON e.enumtypid = t.oid
WHERE t.typname = 'workflow_status'
ORDER BY e.enumsortorder;

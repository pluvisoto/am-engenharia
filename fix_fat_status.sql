-- Fix the current company status from 'pending_review' to 'analysis_in_progress'
-- This is for companies that completed intake but haven't been reviewed yet

UPDATE companies
SET workflow_status = 'analysis_in_progress'
WHERE cnpj LIKE '%27.644.520%'
  AND workflow_status = 'pending_review';

-- Verify the update
SELECT 
  id,
  name,
  cnpj,
  workflow_status,
  updated_at
FROM companies 
WHERE cnpj LIKE '%27.644.520%';

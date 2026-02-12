-- Check current workflow_status for FAT company
SELECT 
  id,
  name,
  cnpj,
  workflow_status,
  created_at,
  updated_at
FROM companies 
WHERE cnpj LIKE '%27.644.520%'
   OR name LIKE '%FAT%'
ORDER BY created_at DESC;

-- Also check if there's intake data
SELECT 
  ci.*,
  c.name,
  c.workflow_status
FROM client_intakes ci
JOIN companies c ON ci.company_id = c.id
WHERE c.cnpj LIKE '%27.644.520%'
   OR c.name LIKE '%FAT%'
ORDER BY ci.created_at DESC;

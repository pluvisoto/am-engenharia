-- Resilient Clean up for AM Engenharia

-- 1. First, delete duplicates that will collide once standardized
-- This removes the "dirty" (with dots/dashes) version IF a "clean" (numbers only) version already exists
DELETE FROM public.companies a
WHERE EXISTS (
    SELECT 1 FROM public.companies b 
    WHERE b.id != a.id 
    AND b.cnpj = regexp_replace(a.cnpj, '\D', '', 'g')
);

-- 2. Now it's safe to standardize all remaining CNPJs to numbers only
UPDATE public.companies 
SET cnpj = regexp_replace(cnpj, '\D', '', 'g');

-- 3. Just in case there were duplicates that were BOTH dirty or BOTH clean, 
-- keep only the one with the newest created_at
DELETE FROM public.companies a
USING public.companies b
WHERE a.cnpj = b.cnpj 
  AND a.created_at < b.created_at;

-- 4. Standardize format for future queries (just in case)
SELECT id, cnpj, name FROM public.companies ORDER BY name;

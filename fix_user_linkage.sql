-- Fix User-Company linkage for Paulo
-- This script ensures the company record is linked to the correct user ID

DO $$ 
DECLARE
    v_user_id UUID;
BEGIN
    -- 1. Try to find Paulo's user ID from auth.users or user_profiles
    -- We'll look for the email paulo@recupera.ia.br (or .ia)
    SELECT id INTO v_user_id FROM auth.users WHERE email ILIKE 'paulo@recupera.ia%' LIMIT 1;
    
    IF v_user_id IS NOT NULL THEN
        -- 2. Link the company "SINAPSE" to this user
        -- We match by CNPJ (numbers only)
        UPDATE public.companies 
        SET user_id = v_user_id 
        WHERE cnpj = '59551107000170';
        
        RAISE NOTICE 'Linked company SINAPSE to user ID %', v_user_id;
    ELSE
        RAISE NOTICE 'Could not find user with email paulo@recupera.ia.br';
    END IF;
END $$;

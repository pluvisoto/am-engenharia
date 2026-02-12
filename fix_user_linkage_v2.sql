-- FORCE FIX for Sinapse Company Linkage
-- This script ensures the company record is linked to Paulo via BOTH ID and Email

DO $$ 
DECLARE
    v_user_id UUID;
    v_user_email TEXT := 'paulo@recupera.ia.br';
BEGIN
    -- 1. Find Paulo's user ID
    SELECT id INTO v_user_id FROM auth.users WHERE email ILIKE 'paulo@recupera.ia%' LIMIT 1;
    
    IF v_user_id IS NOT NULL THEN
        -- 2. Force link the company "SINAPSE" (59.551.107/0001-70) to this user
        -- We update BOTH user_id AND email to ensure our code finds it 100%
        UPDATE public.companies 
        SET 
            user_id = v_user_id,
            email = v_user_email -- Ensure email matches for fallback check
        WHERE cnpj = '59551107000170';
        
        RAISE NOTICE 'SUCCESS: Linked Sinapse to User ID % and Email %', v_user_id, v_user_email;
    ELSE
        RAISE NOTICE 'ERROR: Could not find user with email paulo@recupera.ia.br';
    END IF;
END $$;

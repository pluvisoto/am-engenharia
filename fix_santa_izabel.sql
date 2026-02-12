-- Fix permissions for Santa Izabel (49.416.407/0001-93)
DO $$ 
DECLARE
    v_user_id UUID;
    v_target_cnpj TEXT := '49416407000193';
    v_user_email TEXT := 'paulo@recupera.ia.br';
BEGIN
    -- 1. Get ID of currently logged in user
    SELECT id INTO v_user_id FROM auth.users WHERE email ILIKE v_user_email LIMIT 1;
    
    IF v_user_id IS NOT NULL THEN
        -- 2. Force update the company record
        UPDATE public.companies 
        SET 
            user_id = v_user_id,
            email = v_user_email
        WHERE cnpj = v_target_cnpj;
        
        RAISE NOTICE 'SUCCESS: Linked Santa Izabel (%) to User ID %', v_target_cnpj, v_user_id;
    ELSE
        RAISE NOTICE 'ERROR: Could not find user with email %', v_user_email;
    END IF;
END $$;

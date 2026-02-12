-- Trigger to automatically link Companies to Users based on Email
-- This resolves the need to manually run fix_user_linkage.sql

-- 1. Function to link Company -> User when Company is inserted/updated
CREATE OR REPLACE FUNCTION public.link_company_to_user_by_email()
RETURNS TRIGGER AS $$
DECLARE
    matching_user_id UUID;
BEGIN
    -- Only attempt link if email is present and user_id is null
    IF NEW.email IS NOT NULL AND NEW.user_id IS NULL THEN
        -- Find user with matching email
        SELECT id INTO matching_user_id
        FROM auth.users
        WHERE email = NEW.email
        LIMIT 1;

        IF matching_user_id IS NOT NULL THEN
            NEW.user_id := matching_user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger on Companies
DROP TRIGGER IF EXISTS trigger_link_company_user ON public.companies;
CREATE TRIGGER trigger_link_company_user
    BEFORE INSERT OR UPDATE OF email
    ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION public.link_company_to_user_by_email();

-- 3. Function to link User -> Company when User is created (Sign Up)
-- Note: triggers on auth.users are tricky. Ensure permissions.
CREATE OR REPLACE FUNCTION public.link_user_to_company_on_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Update any company with this email to have this user_id
    UPDATE public.companies
    SET user_id = NEW.id
    WHERE email = NEW.email AND user_id IS NULL;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Trigger on Auth.Users
-- NOTE: Requires superuser/admin privileges usually.
DROP TRIGGER IF EXISTS trigger_link_user_company ON auth.users;
CREATE TRIGGER trigger_link_user_company
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.link_user_to_company_on_signup();

-- 5. Run a one-time fix for existing data
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT c.id, u.id as uid 
             FROM public.companies c
             JOIN auth.users u ON c.email = u.email
             WHERE c.user_id IS NULL
    LOOP
        UPDATE public.companies SET user_id = r.uid WHERE id = r.id;
    END LOOP;
END $$;

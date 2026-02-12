-- Fix AM Engenharia Supabase Schema
-- Issue: ON CONFLICT error because cnpj column lacks UNIQUE constraint

-- ==================== FIX COMPANIES TABLE ====================

-- First, ensure we have the companies table structure
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cnpj TEXT NOT NULL,
    name TEXT NOT NULL,
    cnae TEXT,
    cnae_desc TEXT,
    porte TEXT,
    grau_risco INTEGER,
    mei BOOLEAN DEFAULT false,
    natureza_juridica TEXT,
    email TEXT,
    phone TEXT,
    workflow_status TEXT DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Add UNIQUE constraint on CNPJ if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'companies_cnpj_key'
    ) THEN
        ALTER TABLE public.companies 
        ADD CONSTRAINT companies_cnpj_key UNIQUE (cnpj);
    END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_companies_cnpj ON public.companies(cnpj);
CREATE INDEX IF NOT EXISTS idx_companies_workflow_status ON public.companies(workflow_status);
CREATE INDEX IF NOT EXISTS idx_companies_deleted_at ON public.companies(deleted_at);

-- ==================== CLIENT INTAKES TABLE ====================

CREATE TABLE IF NOT EXISTS public.client_intakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    employee_count INTEGER,
    sectors_selected JSONB,
    roles_text TEXT,
    activities_selected JSONB,
    photos JSONB DEFAULT '[]'::jsonb,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_intakes_company_id ON public.client_intakes(company_id);

-- ==================== AUTO GENERATED DATA TABLE ====================

CREATE TABLE IF NOT EXISTS public.auto_generated_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    sectors JSONB,
    roles JSONB,
    risk_inventory JSONB,
    epis JSONB,
    medical_exams JSONB,
    action_plan JSONB,
    engine_version TEXT DEFAULT '1.0',
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(company_id)
);

CREATE INDEX IF NOT EXISTS idx_auto_generated_company_id ON public.auto_generated_data(company_id);

-- ==================== MANUAL ADJUSTMENTS TABLE ====================

CREATE TABLE IF NOT EXISTS public.manual_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
    adjustment_type TEXT,
    adjustment_data JSONB,
    adjusted_at TIMESTAMPTZ DEFAULT NOW(),
    adjusted_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_manual_adjustments_company_id ON public.manual_adjustments(company_id);

-- ==================== ACTIVITY LOG TABLE ====================

CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_company_id ON public.activity_log(company_id);

-- ==================== ENABLE ROW LEVEL SECURITY ====================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_generated_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manual_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ==================== RLS POLICIES (Allow all for now) ====================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow all on companies" ON public.companies;
DROP POLICY IF EXISTS "Allow all on client_intakes" ON public.client_intakes;
DROP POLICY IF EXISTS "Allow all on auto_generated_data" ON public.auto_generated_data;
DROP POLICY IF EXISTS "Allow all on manual_adjustments" ON public.manual_adjustments;
DROP POLICY IF EXISTS "Allow all on activity_log" ON public.activity_log;

-- Create permissive policies for development
CREATE POLICY "Allow all on companies" 
ON public.companies FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all on client_intakes" 
ON public.client_intakes FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all on auto_generated_data" 
ON public.auto_generated_data FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all on manual_adjustments" 
ON public.manual_adjustments FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow all on activity_log" 
ON public.activity_log FOR ALL 
USING (true) 
WITH CHECK (true);

-- ==================== TRIGGERS FOR UPDATED_AT ====================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON public.companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==================== VERIFICATION ====================

-- Check if constraint was created successfully
SELECT 
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'public.companies'::regclass 
    AND conname = 'companies_cnpj_key';

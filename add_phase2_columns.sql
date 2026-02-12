
-- Phase 2: Enhanced Intake Columns
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS legal_rep_name TEXT;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS legal_rep_cpf TEXT;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS legal_rep_role TEXT;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS work_hours_start TIME;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS work_hours_end TIME;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS shift_regime TEXT;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS male_employees INT DEFAULT 0;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS female_employees INT DEFAULT 0;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS medical_coordinator_id UUID REFERENCES medical_coordinators(id);
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS reference_hospital JSONB;
ALTER TABLE client_intakes ADD COLUMN IF NOT EXISTS facilities JSONB;

-- Ensure roles can have CBO in auto_generated or separate table if needed
-- For now we'll keep it in the JSONB of auto_generated as planned

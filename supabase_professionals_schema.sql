-- Schema para Cadastro de Profissionais Responsáveis
-- Fase 1: Professional Registry System

-- ==============================================
-- Médicos Coordenadores (PCMSO)
-- ==============================================

CREATE TABLE IF NOT EXISTS medical_coordinators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    crm TEXT NOT NULL,
    crm_state TEXT NOT NULL, -- UF (SP, RJ, MG, etc.)
    cpf TEXT,
    specialty TEXT, -- "Medicina do Trabalho", "Clínico Geral", etc.
    clinic_name TEXT,
    clinic_address TEXT,
    clinic_phone TEXT,
    clinic_email TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(crm, crm_state)
);

COMMENT ON TABLE medical_coordinators IS 'Médicos coordenadores de PCMSO cadastrados pela administração';

-- ==============================================
-- Responsáveis Técnicos (PGR)
-- ==============================================

CREATE TABLE IF NOT EXISTS technical_responsibles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    profession TEXT NOT NULL, -- 'Engenheiro de Segurança' | 'Técnico de Segurança'
    registration_type TEXT NOT NULL, -- 'CREA' | 'CRT' | 'Outro'
    registration_number TEXT NOT NULL,
    registration_state TEXT NOT NULL, -- UF
    cpf TEXT,
    specialization TEXT, -- "Segurança do Trabalho", "Civil", etc.
    address TEXT,
    phone TEXT,
    email TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(registration_type, registration_number, registration_state)
);

COMMENT ON TABLE technical_responsibles IS 'Engenheiros e técnicos de segurança responsáveis por PGR';

-- ==============================================
-- Hospitais de Referência
-- ==============================================

CREATE TABLE IF NOT EXISTS reference_hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT,
    phone TEXT NOT NULL,
    emergency_phone TEXT, -- Telefone específico de emergência
    specialties TEXT[], -- Array de especialidades: ['Pronto Socorro', 'Ortopedia', etc.]
    has_occupational_medicine BOOLEAN DEFAULT false,
    notes TEXT, -- Observações gerais
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

COMMENT ON TABLE reference_hospitals IS 'Hospitais de referência para atendimento de emergências ocupacionais';

-- ==============================================
-- Vinculação: Profissionais → Empresas
-- ==============================================

CREATE TABLE IF NOT EXISTS company_professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Profissionais atribuídos (nullable - pode ser atribuído gradualmente)
    medical_coordinator_id UUID REFERENCES medical_coordinators(id) ON DELETE SET NULL,
    technical_responsible_id UUID REFERENCES technical_responsibles(id) ON DELETE SET NULL,
    reference_hospital_id UUID REFERENCES reference_hospitals(id) ON DELETE SET NULL,
    
    -- Metadata
    assigned_by UUID, -- ID do admin que fez a atribuição (futuro)
    assigned_at TIMESTAMP DEFAULT NOW(),
    notes TEXT, -- Observações sobre a atribuição
    
    -- Constraint: uma empresa tem no máximo um registro de profissionais
    UNIQUE(company_id)
);

COMMENT ON TABLE company_professionals IS 'Vinculação de profissionais responsáveis a cada empresa (atribuído pelo admin)';

-- ==============================================
-- Índices para Performance
-- ==============================================

CREATE INDEX IF NOT EXISTS idx_medical_coordinators_active ON medical_coordinators(active);
CREATE INDEX IF NOT EXISTS idx_technical_responsibles_active ON technical_responsibles(active);
CREATE INDEX IF NOT EXISTS idx_reference_hospitals_active ON reference_hospitals(active);
CREATE INDEX IF NOT EXISTS idx_company_professionals_company ON company_professionals(company_id);

-- ==============================================
-- Dados Iniciais (Exemplo)
-- ==============================================

-- Inserir médico coordenador padrão
INSERT INTO medical_coordinators (name, crm, crm_state, specialty, clinic_name, clinic_phone)
VALUES 
    ('Dr. Roberto Santos', '123456', 'SP', 'Medicina do Trabalho', 'AM Engenharia Saúde Ocupacional', '(11) 98765-4321')
ON CONFLICT (crm, crm_state) DO NOTHING;

-- Inserir responsável técnico padrão
INSERT INTO technical_responsibles (name, profession, registration_type, registration_number, registration_state, specialization, phone)
VALUES 
    ('Eng. Paulo Vieira', 'Engenheiro de Segurança do Trabalho', 'CREA', '5062345678', 'SP', 'Segurança do Trabalho', '(11) 91234-5678')
ON CONFLICT (registration_type, registration_number, registration_state) DO NOTHING;

-- Inserir hospital de referência padrão
INSERT INTO reference_hospitals (name, address, city, state, phone, emergency_phone, has_occupational_medicine)
VALUES 
    ('Hospital Santa Casa', 'Rua Dr. Cesário Mota Jr, 112', 'São Paulo', 'SP', '(11) 2176-7000', '(11) 2176-7777', true)
ON CONFLICT DO NOTHING;

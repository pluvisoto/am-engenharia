import { supabase, handleSupabaseError } from './supabase';

// ==================== COMPANIES ====================

export const saveClient = async (client) => {
    try {
        const cleanCNPJ = String(client.cnpj).replace(/\D/g, '');
        console.log('[Storage] Saving client with CNPJ:', cleanCNPJ);
        const { data, error } = await supabase
            .from('companies')
            .upsert({
                cnpj: cleanCNPJ,
                name: client.name,
                address: client.address,
                cnae: client.cnae,
                cnae_desc: client.cnae_desc,
                secondary_activities: client.cnaes_secundarios || [],
                porte: client.porte,
                grau_risco: client.grau_risco,
                mei: client.mei,
                natureza_juridica: client.natureza_juridica,
                email: client.email,
                phone: client.phone,
                representative_name: client.representative_name,
                representative_cpf: client.representative_cpf,
                representative_email: client.representative_email,
                workflow_status: client.workflow_status || 'draft'
            }, {
                onConflict: 'cnpj'
            })
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const getClients = async () => {
    try {
        console.log('[Storage] Fetching all clients...');
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[Storage] Supabase error in getClients:', error);
            return { success: false, error: error.message };
        }

        console.log('[Storage] Found clients:', data?.length);
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('[Storage] Error in getClients catch block:', error);
        return { success: false, error: error.message };
    }
};

export const deleteClient = async (id) => {
    try {
        console.log('[Storage] Deleting client ID:', id);
        const { error } = await supabase
            .from('companies')
            .delete()
            .eq('id', id);

        if (error) return handleSupabaseError(error);
        return { success: true };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const getClientByCNPJ = async (cnpj) => {
    try {
        const cleanCNPJ = String(cnpj).replace(/\D/g, '');
        console.log('[Storage] Getting client by clean CNPJ:', cleanCNPJ);
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('cnpj', cleanCNPJ)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('[Storage] Error in getClientByCNPJ:', error);
            return null;
        }

        console.log('[Storage] Found company:', data);
        return data;
    } catch (error) {
        console.error('[Storage] Error getting client by CNPJ:', error);
        return null;
    }
};

export const getClientByUserId = async (userId, userEmail = null) => {
    try {
        console.log('[Storage] Getting client for user:', userId, userEmail);

        // 1. Try by user_id
        const { data: byId, error: idError } = await supabase
            .from('companies')
            .select('id, cnpj, name, user_id, email, workflow_status, grau_risco, cnae, cnae_desc, porte')
            .eq('user_id', userId)
            .is('deleted_at', null)
            .maybeSingle();

        if (byId) {
            console.log('[Storage] Found company by user_id:', byId.cnpj);
            return byId;
        }

        // 2. Try by email as fallback (Paulo's case often)
        if (userEmail) {
            const { data: byEmail, error: emailError } = await supabase
                .from('companies')
                .select('id, cnpj, name, user_id, email, workflow_status, grau_risco, cnae, cnae_desc, porte')
                .eq('email', userEmail)
                .is('deleted_at', null)
                .maybeSingle();

            if (byEmail) {
                console.log('[Storage] Found company by email fallback:', byEmail.cnpj);
                // Proactively link them for next time? 
                // We'll skip auto-update for now to be safe, but we found it!
                return byEmail;
            }
        }

        return null;
    } catch (error) {
        console.error('[Storage] Error in getClientByUserId:', error);
        return null;
    }
};

// ==================== CLIENT INTAKE ====================

/**
 * @param {string|object} companyRef CNPJ string or company object with id
 * @param {object} intakeData 
 */
export const saveClientIntake = async (companyRef, intakeData) => {
    try {
        let companyId;

        if (typeof companyRef === 'object' && companyRef.id) {
            companyId = companyRef.id;
            console.log('[Storage] saveClientIntake using provided ID:', companyId);
        } else {
            const cnpj = typeof companyRef === 'string' ? companyRef : companyRef.cnpj;
            console.log('[Storage] saveClientIntake looking up CNPJ:', cnpj);
            const company = await getClientByCNPJ(cnpj);
            if (!company) {
                console.error('[Storage] Company not found for intake save. CNPJ:', cnpj);
                return { success: false, error: 'Company not found' };
            }
            companyId = company.id;
        }

        console.log('[Storage] Final companyId for intake:', companyId);

        // Save intake data
        const { data: intakeRecord, error: intakeError } = await supabase
            .from('client_intakes')
            .upsert({
                company_id: companyId,
                employee_count: intakeData.employee_count,
                sectors_selected: intakeData.sectors_selected,
                roles_text: intakeData.roles_text,
                activities_selected: intakeData.activities_selected,
                photos: intakeData.photos || []
            }, {
                onConflict: 'company_id'
            })
            .select();

        if (intakeError) return handleSupabaseError(intakeError);

        // Update company workflow status
        const { error: updateError } = await supabase
            .from('companies')
            .update({ workflow_status: 'intake_completed' })
            .eq('id', companyId);

        if (updateError) return handleSupabaseError(updateError);

        return { success: true, data: intakeRecord?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

// ==================== AUTO-GENERATED DATA ====================

export const updateAutoGenerated = async (companyRef, autoGeneratedData, customStatus = 'analysis_in_progress') => {
    try {
        let companyId;

        if (typeof companyRef === 'object' && companyRef.id) {
            companyId = companyRef.id;
        } else {
            const company = await getClientByCNPJ(companyRef);
            if (!company) return { success: false, error: 'Company not found' };
            companyId = company.id;
        }


        const { data, error } = await supabase
            .from('auto_generated_data')
            .upsert({
                company_id: companyId,
                risk_inventory: autoGeneratedData.risk_inventory,
                sectors: autoGeneratedData.sectors,
                roles: autoGeneratedData.roles,
                epis: autoGeneratedData.epis,
                medical_exams: autoGeneratedData.medical_exams,
                action_plan: autoGeneratedData.action_plan,
                engine_version: '2.0-PREMIUM'
            }, {
                onConflict: 'company_id'
            })
            .select();

        if (error) return handleSupabaseError(error);

        // --- Immutable Audit Log ---
        try {
            const { logTechnicalChange } = await import('./audit');
            await logTechnicalChange(companyId, 'UPDATE_SST_ENGINE_DATA', autoGeneratedData, 'SYSTEM_AUTOMATIC');
        } catch (auditErr) {
            console.warn('[Storage] Audit logging failed, but data saved.', auditErr);
        }

        // Update company workflow status
        if (customStatus) {
            const { error: updateError } = await supabase
                .from('companies')
                .update({ workflow_status: customStatus })
                .eq('id', companyId);

            if (updateError) return handleSupabaseError(updateError);
        }

        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const getFullClientData = async (companyId) => {
    try {
        console.log('[Storage] Getting full client data for ID:', companyId);

        // 1. Get company metadata
        const { data: company, error: companyError } = await supabase
            .from('companies')
            .select('*')
            .eq('id', companyId)
            .single();

        if (companyError) {
            console.error('[Storage] Error fetching company:', companyError);
            return { success: false, error: companyError.message };
        }

        // 2. Get intake data
        const { data: intakeList, error: intakeError } = await supabase
            .from('client_intakes')
            .select('*')
            .eq('company_id', companyId)
            .limit(1);

        const intake = intakeList?.[0] || null;

        if (intakeError) {
            console.error('[Storage] Error fetching intake:', intakeError);
        }

        // 3. Get auto-generated data
        const { data: autoGeneratedList, error: autoError } = await supabase
            .from('auto_generated_data')
            .select('*')
            .eq('company_id', companyId)
            .limit(1);

        const autoGeneratedData = autoGeneratedList?.[0] || null;

        if (autoError) {
            console.error('[Storage] Error fetching auto_generated_data:', autoError);
        }

        // Merge data
        const fullData = {
            ...company,
            intake_data: intake || null,
            auto_generated_data: autoGeneratedData || null
        };

        return { success: true, data: fullData };
    } catch (error) {
        console.error('[Storage] Error in getFullClientData:', error);
        return { success: false, error: error.message };
    }
};

// ==================== TEAM MEMBERS (LocalStorage - Legacy) ====================

const TEAM_KEY = 'am_team_members';

export const saveTeamMember = (member) => {
    try {
        const team = getTeamMembers();
        const newMember = {
            ...member,
            id: Date.now().toString()
        };
        team.push(newMember);
        localStorage.setItem(TEAM_KEY, JSON.stringify(team));
        return true;
    } catch (error) {
        console.error('[Storage] Error in saveTeamMember:', error);
        return false;
    }
};

export const getTeamMembers = () => {
    try {
        const data = localStorage.getItem(TEAM_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('[Storage] Error in getTeamMembers:', error);
        return [];
    }
};

export const deleteTeamMember = (id) => {
    let team = getTeamMembers();
    team = team.filter(t => t.id !== id);
    localStorage.setItem(TEAM_KEY, JSON.stringify(team));
    return team;
};

// ==================== PROFESSIONAL REGISTRY ====================

// -------- Medical Coordinators --------

export const getMedicalCoordinators = async () => {
    try {
        const { data, error } = await supabase
            .from('medical_coordinators')
            .select('*')
            .eq('active', true)
            .order('name');

        if (error) return handleSupabaseError(error);
        return { success: true, data: data || [] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const createMedicalCoordinator = async (coordinator) => {
    try {
        const { data, error } = await supabase
            .from('medical_coordinators')
            .insert({
                name: coordinator.name,
                crm: coordinator.crm,
                crm_state: coordinator.crm_state,
                cpf: coordinator.cpf,
                specialty: coordinator.specialty,
                clinic_name: coordinator.clinic_name,
                clinic_address: coordinator.clinic_address,
                clinic_phone: coordinator.clinic_phone,
                clinic_email: coordinator.clinic_email
            })
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const updateMedicalCoordinator = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('medical_coordinators')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const deleteMedicalCoordinator = async (id) => {
    try {
        // Soft delete
        const { error } = await supabase
            .from('medical_coordinators')
            .update({ active: false })
            .eq('id', id);

        if (error) return handleSupabaseError(error);
        return { success: true };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

// -------- Technical Responsibles --------

export const getTechnicalResponsibles = async () => {
    try {
        const { data, error } = await supabase
            .from('technical_responsibles')
            .select('*')
            .eq('active', true)
            .order('name');

        if (error) return handleSupabaseError(error);
        return { success: true, data: data || [] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const createTechnicalResponsible = async (responsible) => {
    try {
        const { data, error } = await supabase
            .from('technical_responsibles')
            .insert({
                name: responsible.name,
                profession: responsible.profession,
                registration_type: responsible.registration_type,
                registration_number: responsible.registration_number,
                registration_state: responsible.registration_state,
                cpf: responsible.cpf,
                specialization: responsible.specialization,
                address: responsible.address,
                phone: responsible.phone,
                email: responsible.email
            })
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const updateTechnicalResponsible = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('technical_responsibles')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const deleteTechnicalResponsible = async (id) => {
    try {
        // Soft delete
        const { error } = await supabase
            .from('technical_responsibles')
            .update({ active: false })
            .eq('id', id);

        if (error) return handleSupabaseError(error);
        return { success: true };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

// -------- Reference Hospitals --------

export const getReferenceHospitals = async () => {
    try {
        const { data, error } = await supabase
            .from('reference_hospitals')
            .select('*')
            .eq('active', true)
            .order('name');

        if (error) return handleSupabaseError(error);
        return { success: true, data: data || [] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const createReferenceHospital = async (hospital) => {
    try {
        const { data, error } = await supabase
            .from('reference_hospitals')
            .insert({
                name: hospital.name,
                address: hospital.address,
                city: hospital.city,
                state: hospital.state,
                zip_code: hospital.zip_code,
                phone: hospital.phone,
                emergency_phone: hospital.emergency_phone,
                specialties: hospital.specialties,
                has_occupational_medicine: hospital.has_occupational_medicine,
                notes: hospital.notes
            })
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const updateReferenceHospital = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('reference_hospitals')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const deleteReferenceHospital = async (id) => {
    try {
        // Soft delete
        const { error } = await supabase
            .from('reference_hospitals')
            .update({ active: false })
            .eq('id', id);

        if (error) return handleSupabaseError(error);
        return { success: true };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

// -------- Company Professional Assignment --------

export const assignProfessionalsToCompany = async (companyId, professionals) => {
    try {
        const { data, error } = await supabase
            .from('company_professionals')
            .upsert({
                company_id: companyId,
                medical_coordinator_id: professionals.medical_coordinator_id || null,
                technical_responsible_id: professionals.technical_responsible_id || null,
                reference_hospital_id: professionals.reference_hospital_id || null,
                notes: professionals.notes || null
            }, {
                onConflict: 'company_id'
            })
            .select();

        if (error) return handleSupabaseError(error);
        return { success: true, data: data?.[0] };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

export const getCompanyProfessionals = async (companyId) => {
    try {
        const { data, error } = await supabase
            .from('company_professionals')
            .select(`
                *,
                medical_coordinator:medical_coordinators(*),
                technical_responsible:technical_responsibles(*),
                reference_hospital:reference_hospitals(*)
            `)
            .eq('company_id', companyId)
            .eq('company_id', companyId)
            .maybeSingle();

        if (error) {
            return handleSupabaseError(error);
        }

        return { success: true, data: data || null };
    } catch (error) {
        return handleSupabaseError(error);
    }
};

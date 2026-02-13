

/**
 * SST ENGINE - NR-01 & NR-07 Compliance Module
 * Reconfigured for AIHA/Fundacentro 5x5 Matrix
 * Version: 2.0.0 (May 2025 Standard)
 */

export const fetchCompanyData = async (cnpj) => {
    const cleanCnpj = String(cnpj).replace(/\D/g, '');
    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
        if (!response.ok) return null;
        const data = await response.json();

        // Map to our internal format
        const companyObject = {
            cnpj: data.cnpj,
            name: data.razao_social,
            cnae: data.cnae_fiscal,
            cnae_desc: data.cnae_fiscal_descricao,
            cnaes_secundarios: data.cnaes_secundarios || [],
            porte: data.porte,
            natureza_juridica: data.natureza_juridica,
            address: `${data.logradouro}, ${data.numero}${data.complemento ? ' ' + data.complemento : ''} - ${data.bairro}, ${data.municipio} - ${data.uf}`,
            cep: data.cep,
            email: data.email,
            phone: data.ddd_telefone_1,
            mei: data.opcao_pelo_mei === true
        };

        // Add risk degree calculation
        companyObject.grau_risco = getRiskDegree(companyObject.cnae);

        return companyObject;
    } catch (e) {
        console.error('Error fetching company data:', e);
        return null;
    }
};





// ==================== MATRIZ DE RISCO 5x5 (AIHA/FUNDACENTRO) ====================
export const calculateRiskLevel = (probability, severity) => {
    const p = Math.min(Math.max(parseInt(probability) || 1, 1), 5);
    const s = Math.min(Math.max(parseInt(severity) || 1, 1), 5);
    const score = p * s;

    let label = 'Trivial';
    let color = '#4ade80'; // Green

    // Updated ranges per user spec:
    // Intolerável: 15 a 25
    // Substancial: 10 a 14 (User said 10 to 15, assuming overlap or range)
    if (score >= 15) {
        label = 'Intolerável';
        color = '#7f1d1d';
    } else if (score >= 10) {
        label = 'Substancial';
        color = '#ef4444';
    } else if (score >= 5) {
        label = 'Moderado';
        color = '#facc15';
    } else if (score >= 2) {
        label = 'Tolerável';
        color = '#60a5fa';
    }

    return {
        probability: p,
        severity: s,
        score,
        label,
        color
    };
};

// ==================== HIERARQUIA DE CONTROLE (NR-01.4.1) ====================
export const validateControlHierarchy = (measures) => {
    // measures: Array of objects { type: 'EPI'|'EPC'|'ADM'|'ELIM', justification: string }
    const hasEPI = measures.some(m => m.type === 'EPI');
    const hasEPC = measures.some(m => ['EPC', 'ELIM', 'SUBST'].includes(m.type));

    if (hasEPI && !hasEPC) {
        const epiMeasures = measures.filter(m => m.type === 'EPI');
        const invalidEPI = epiMeasures.find(m => !m.justification || m.justification.length < 20);

        if (invalidEPI) {
            return {
                valid: false,
                error: "Alerta de Hierarquia: O uso de EPI como medida única exige justificativa técnica de inviabilidade de Proteção Coletiva ou Eliminação."
            };
        }
    }

    return { valid: true };
};

// ==================== MÓDULO AEP (ERGONOMIA / PSICOSSOCIAL) ====================
export const analyzePsychosocialRisk = (factors) => {
    // factors: { emotional: 1-5, autonomy: 1-5, social: 1-5 }
    const avg = (factors.emotional + factors.autonomy + factors.social) / 3;
    const severity = Math.max(factors.emotional, factors.autonomy, factors.social);
    const probability = Math.round(avg);

    const risk = calculateRiskLevel(probability, severity);

    if (risk.label === 'Substancial' || risk.label === 'Intolerável') {
        risk.automaticTrigger = 'AVALIAÇÃO PSICOLÓGICA ORGANIZACIONAL (FIO-SST)';
    }

    return {
        ...risk,
        fields: {
            emotional: factors.emotional,
            autonomy: factors.autonomy,
            social: factors.social
        }
    };
};

// ==================== INDICADOR IQCT ====================
/**
 * IQCT = [(4nTolerável + 3nModerado + nSubstancial) / (nTolerável + nModerado + nSubstancial) / 4] * 100
 * Note: Adjusting user's * 4 to / 4 for standard percentage normalization (100% max)
 */
export const calculateIQCT = (inventory) => {
    const nTolerable = inventory.filter(r => r.level_label === 'Tolerável' || r.level_label === 'Trivial').length;
    const nModerate = inventory.filter(r => r.level_label === 'Moderado').length;
    const nSubstantial = inventory.filter(r => r.level_label === 'Substancial' || r.level_label === 'Intolerável').length;

    const total = nTolerable + nModerate + nSubstantial;
    if (total === 0) return 100;

    const iqct = ((4 * nTolerable + 3 * nModerate + nSubstantial) / total / 4) * 100;
    return Math.round(iqct);
};

// ==================== INTERDEPENDÊNCIA PGR x PCMSO (NR-07) ====================
export const mapRisksToPCMSO = (pgrInventory) => {
    return pgrInventory.map(item => {
        // Automatically suggest exams based on risk score or triggers
        const triggersExams = item.score >= 10; // Substantial or Intolerable
        const exams = [];

        if (triggersExams) {
            if (item.category === 'Físico' && item.name.includes('Ruído')) exams.push('Audiometria Tonal e Ocupacional');
            if (item.category === 'Químico') exams.push('Monitoramento Biológico e Hemograma');
            if (item.category === 'Biológico') exams.push('Sorologia e Controle Vacinal');
        } else {
            exams.push('Avaliação Clínica e Anamnese Ocupacional');
        }

        return {
            ...item,
            mandatoryExams: exams,
            legalBase: triggersExams ? 'NR-07 (Nível de Ação excedido)' : 'NR-07 (Monitoramento preventivo)'
        };
    });
};

// ==================== RASTREABILIDADE (LOG 20 ANOS) ====================
export const logRiskVersion = (riskId, data, userId) => {
    return {
        id: `v_${Date.now()}`,
        riskId,
        timestamp: new Date().toISOString(),
        author: userId,
        changes: data,
        retentionLimit: new Date(new Date().getFullYear() + 20, 0, 1).toISOString(),
        immutable: true
    };
};

// ==================== REGULATION ENGINE (NR-1 / NR-4) ====================

export const getRiskDegree = (cnae) => {
    if (!cnae) return 2;
    const clean = String(cnae).replace(/\D/g, '');
    const prefix = clean.substring(0, 2);
    const div = parseInt(prefix);

    if (div >= 1 && div <= 3) return 3;
    if (div >= 5 && div <= 9) return 4;
    if (div === 12) return 3;
    if (div >= 10 && div <= 12) return 3;
    if (div >= 13 && div <= 15) return 2;
    if (div >= 16 && div <= 18) return 3;
    if (div === 19) return 4;
    if (div >= 20 && div <= 23) return 3;
    if (div === 24) return 4;
    if (div >= 25 && div <= 33) return 3;
    if (div >= 35 && div <= 39) return 3;
    if (div >= 41 && div <= 43) return 4;
    if (div >= 45 && div <= 47) return 2;
    if (div >= 49 && div <= 53) return 3;
    if (div >= 55 && div <= 56) return 2;
    if (div >= 58 && div <= 63) return 2;
    if (div >= 64 && div <= 66) return 1;
    if (div === 68) return 2;
    if (div === 75) return 3;
    if (div >= 69 && div <= 74) return 2;
    if (div === 80) return 3;
    if (div === 81) return 3;
    if (div >= 77 && div <= 82) return 2;
    if (div === 84) return 1;
    if (div === 85) return 2;
    if (div === 86) return 3;
    if (div >= 87 && div <= 88) return 2;
    if (div >= 90 && div <= 93) return 2;
    if (div === 94) return 2;
    if (div === 95) return 2;
    if (div === 96) return 2;
    if (div >= 97) return 2;
    return 2;
};

export const analyzeRegulatoryStatus = (companyData) => {
    const grauRisco = companyData.grau_risco || getRiskDegree(companyData.cnae);
    const porteRaw = companyData.porte ? companyData.porte.toUpperCase() : '';
    const isMEI = companyData.mei || porteRaw.includes('MEI');
    const isSmallCompany = ['ME', 'EPP', 'MICRO EMPRESA', 'EMPRESA DE PEQUENO PORTE'].some(p => porteRaw.includes(p));
    const isLowRisk = grauRisco === 1 || grauRisco === 2;

    if (isMEI && isLowRisk) {
        return {
            recommendation: 'DIR',
            title: 'DIR - Declaração de Inexistência de Risco',
            description: 'MEI Grau 1/2: Dispensado de PGR conforme NR-01.18.4.',
            allowed_types: ['DIR', 'PGR_FULL'],
            grau_risco: grauRisco
        };
    }

    if (isSmallCompany && isLowRisk) {
        return {
            recommendation: 'PGR_SIMPLIFIED',
            title: 'PGR Simplificado (NR-1)',
            description: 'ME/EPP Grau 1/2: Elegível ao PGR Simplificado se não houver riscos químicos/físicos/biológicos.',
            allowed_types: ['PGR_SIMPLIFIED', 'PGR_FULL'],
            grau_risco: grauRisco
        };
    }

    return {
        recommendation: 'PGR_FULL',
        title: 'PGR Completo (Obrigatório)',
        description: `Grau de Risco ${grauRisco}. Elaboração total de PGR e PCMSO exigida pela NR-01.`,
        allowed_types: ['PGR_FULL'],
        grau_risco: grauRisco
    };
};

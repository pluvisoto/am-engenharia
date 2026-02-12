
// RiskRules.js - Motor de Regras para PGR/PCMSO (Baseado em eSocial e NRs)

// Tabela 24 eSocial - Agentes Nocivos (Simplificada)
export const RISK_CATALOG = {
    NOISE: {
        code: '01.01.002',
        name: 'Ruído Contínuo ou Intermitente',
        unit: 'dB(A)',
        limit_tolerance: 85,
        action_level: 80,
        technique: 'Dosimetria de Ruído (NHO-01)',
        exams: ['Audiometria Tonal', 'Audiometria Vocal'],
        exam_rules: {
            'LOW': { periodicity: 'Admissional/Demissional' }, // < 80dB
            'MEDIUM': { periodicity: 'Anual (Conservação Auditiva)' }, // 80-85dB
            'HIGH': { periodicity: 'Semestral/Anual' } // > 85dB
        }
    },
    HEAT: {
        code: '01.01.006',
        name: 'Calor',
        unit: 'IBUTG (°C)',
        limit_tolerance: 25, // Depende da atividade (simplificado)
        action_level: 22,
        technique: 'Medidor de Stress Térmico (NHO-06)',
        exams: ['Avaliação Clínica', 'Eletrocardiograma'],
        exam_rules: {
            'HIGH': { periodicity: 'Anual' }
        }
    },
    CHEMICAL_SOLVENT: {
        code: '02.01.015',
        name: 'Solventes Orgânicos (Tolueno/Xileno)',
        unit: 'ppm',
        limit_tolerance: 48, // Tolueno NR-15
        action_level: 24,
        technique: 'Cromatografia Gasosa (Nirosh)',
        exams: ['Hemograma Completo', 'Plaquetas', 'Ácido Hipúrico (Urina)'],
        exam_rules: {
            'HIGH': { periodicity: 'Semestral (Monitoramento Biológico)' }
        }
    },
    SILICA: {
        code: '02.01.002',
        name: 'Poeira Sílica Livre',
        unit: 'mg/m³',
        limit_tolerance: 0.1, // Exemplo
        action_level: 0.05,
        technique: 'Gravimetria / Difração Raio-X',
        exams: ['Raio-X de Tórax (OIT)', 'Espirometria'],
        exam_rules: {
            'HIGH': { periodicity: 'Bienal (Raio-X) / Anual (Espiro)' }
        }
    },
    ERGONOMIC: {
        code: '04.03.001',
        name: 'Levantamento Manual de Peso',
        unit: 'kg',
        limit_tolerance: 23, // NIOSH Equation (referencia)
        technique: 'Equação NIOSH / ISO 11228',
        exams: ['Avaliação Osteomuscular'],
        exam_rules: {
            'HIGH': { periodicity: 'Anual' }
        }
    }
};

/**
 * Determine Regulatory Status based on Measurement
 * @param {string} riskCode - Code from RISK_CATALOG
 * @param {number} value - Measured value
 */
export const evaluateQuantification = (riskCode, value) => {
    const risk = Object.values(RISK_CATALOG).find(r => r.code === riskCode || r.name === riskCode);
    if (!risk || !risk.limit_tolerance) return { status: 'Qualitativo', action: 'Monitorar' };

    if (value >= risk.limit_tolerance) {
        return {
            status: 'INSALUBRE (Acima do LT)',
            action: 'Ação Imediata / Proteção Obrigatória',
            needs_exams: true,
            exam_frequency: risk.exam_rules['HIGH'].periodicity
        };
    } else if (value >= risk.action_level) {
        return {
            status: 'ALERTA (Nível de Ação)',
            action: 'Medidas Preventivas / PCA',
            needs_exams: true,
            exam_frequency: risk.exam_rules['MEDIUM']?.periodicity || 'Anual'
        };
    } else {
        return {
            status: 'CONTROLADO (Abaixo do N.A.)',
            action: 'Manter monitoramento',
            needs_exams: false,
            exam_frequency: null
        };
    }
};

/**
 * Suggest periodic exams based on Risk Inventory
 */
export const suggestExamsForRisk = (riskName, measurementValue = null) => {
    // 1. Try to find precise match in catalog
    const catalogItem = Object.values(RISK_CATALOG).find(r => riskName.includes(r.name) || r.name.includes(riskName));

    if (catalogItem) {
        // If we have a value, check rules
        if (measurementValue !== null) {
            const evalResult = evaluateQuantification(catalogItem.code, measurementValue);
            if (!evalResult.needs_exams) return []; // No exams needed if below action level (theoretically)

            return catalogItem.exams.map(ex => ({
                exam: ex,
                periodicity: evalResult.exam_frequency,
                reason: `${catalogItem.name} (${evalResult.status})`
            }));
        }

        // Default (Qualitative assumption: Risk exists -> Exam needed)
        return catalogItem.exams.map(ex => ({
            exam: ex,
            periodicity: 'Anual',
            reason: `Exposição qualitativa a ${catalogItem.name}`
        }));
    }

    // Fallback for general risks not in quantitative catalog
    if (riskName.includes('Ruído')) return [{ exam: 'Audiometria', periodicity: 'Anual', reason: 'Ruído' }];
    if (riskName.includes('Altura')) return [{ exam: 'Avaliação Psicossocial', periodicity: 'Anual', reason: 'NR-35' }, { exam: 'Glicemia', periodicity: 'Anual', reason: 'NR-35' }];

    return [];
};

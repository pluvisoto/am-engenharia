
// Existing exports...
export const calculateRiskLevel = (exposure, control, gravity, peopleExposed) => {
    const p = Math.floor((exposure + (control * 2)) / 3) + 1;
    const s = Math.floor(((gravity * 2) + peopleExposed) / 3) + 1;

    const total = p * s;

    let label = 'Baixo';
    let color = 'success';

    if (total > 15) {
        label = 'Crítico';
        color = 'danger';
    } else if (total > 9) {
        label = 'Alto';
        color = 'warning'; // Changed to warning for better visibility
    } else if (total > 5) {
        label = 'Moderado';
        color = 'warning';
    }

    return {
        probability: p,
        severity: s,
        total,
        label,
        color
    };
};

// ==================== REGULATION ENGINE (NR-1 / NR-4) ====================

export const getRiskDegree = (cnae) => {
    // Em um cenário real, isso viria de um DB completo da NR-4
    // Simulação baseada em prefixos comuns
    const prefix = cnae.substring(0, 2);

    // Construção (41, 42, 43) -> Risco 3 ou 4
    if (['41', '42', '43'].includes(prefix)) return 3;

    // Indústria Geral (10-33) -> Risco 3
    if (parseInt(prefix) >= 10 && parseInt(prefix) <= 33) return 3;

    // Comércio (45-47) -> Risco 1 ou 2
    if (parseInt(prefix) >= 45 && parseInt(prefix) <= 47) return 2;

    // Serviços (Eletricidade/Gás/Água) -> Risco 3
    if (parseInt(prefix) >= 35 && parseInt(prefix) <= 39) return 3;

    // Serviços Administrativos/Escritório -> Risco 1
    if (parseInt(prefix) >= 64 && parseInt(prefix) <= 82) return 1;

    // Saúde -> Risco 3
    if (parseInt(prefix) === 86) return 3;

    return 2; // Default fallback
};

export const analyzeRegulatoryStatus = (companyData) => {
    const grauRisco = companyData.grau_risco || getRiskDegree(companyData.cnae);
    const porte = companyData.porte; // 'MEI', 'ME', 'EPP', 'DEMAIS'

    // Lógica NR-1.8.4
    const isSmallCompany = ['MEI', 'ME', 'EPP'].includes(porte);
    const isLowRisk = grauRisco === 1 || grauRisco === 2;

    if (isSmallCompany && isLowRisk) {
        return {
            recommendation: 'PGR_SIMPLIFIED', // Elegível para Declaração de Inexistência de Risco (DIR)
            title: 'Elegível para PGR Simplificado (NR-1)',
            description: 'Sua empresa é ME/EPP e possui Grau de Risco 1 ou 2. Se não houver riscos físicos, químicos ou biológicos, você pode optar pela Declaração de Inexistência de Risco (DIR).',
            allowed_types: ['DIR', 'PGR_SIMPLIFIED', 'PGR_FULL'],
            grau_risco: grauRisco
        };
    } else {
        return {
            recommendation: 'PGR_FULL',
            title: 'Enquadramento: PGR Completo',
            description: `Sua empresa possui Grau de Risco ${grauRisco} ou não é ME/EPP. A legislação (NR-1) exige a elaboração do PGR Completo.`,
            allowed_types: ['PGR_FULL'],
            grau_risco: grauRisco
        };
    }
};

export const fetchCompanyData = async (cnpj) => {
    // Clean CNPJ
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

    // Mock Data for demonstration if API fails or for specific test cases
    if (cleanCNPJ === '00000000000191') {
        return {
            name: 'BANCO DO BRASIL SA',
            cnpj: '00.000.000/0001-91',
            porte: 'GRANDE EMPRESA',
            cnae: '6422100', // Bancos múltiplos
            cnae_desc: 'Bancos múltiplos, com carteira comercial',
            cnaes_secundarios: [],
            natureza_juridica: '203-8',
            grau_risco: 1,
            mei: false
        };
    }

    try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`, {
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error('CNPJ API Error - Status:', response.status);
            throw new Error('CNPJ not found in BrasilAPI');
        }

        const data = await response.json();
        console.log('CNPJ Data received:', data);

        // Process Secondary CNAEs
        const secondaryCnaes = data.cnaes_secundarios?.map(item => ({
            codigo: item.codigo,
            descricao: item.descricao
        })) || [];

        // Simulate Risk Degree based on CNAE (Mock Database) - TO BE IMPROVED LATER
        let grau_risco = 2; // Default
        if (data.cnae_fiscal === '4120400') grau_risco = 4; // Construction
        if (data.cnae_fiscal === '4711302') grau_risco = 2; // Retail

        return {
            name: data.razao_social,
            cnpj: data.cnpj,
            porte: data.porte, // 'MEI', 'ME', 'EPP', 'DEMAIS'
            cnae: data.cnae_fiscal,
            cnae_desc: data.cnae_fiscal_descricao,
            cnaes_secundarios: secondaryCnaes,
            natureza_juridica: data.natureza_juridica,
            logradouro: `${data.logradouro}, ${data.numero}`,
            bairro: data.bairro,
            municipio: data.municipio,
            uf: data.uf,
            cep: data.cep,
            grau_risco: grau_risco,
            // MEI Detection Strategy:
            mei: data.opcao_pelo_mei === true ||
                data.codigo_natureza_juridica === 2135 ||
                data.porte === 'MEI'
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error("API Timeout - Request took too long");
            alert('⏱️ Timeout: A busca demorou muito. Verifique sua conexão ou tente novamente.');
        } else {
            console.error("API Error:", error);
        }
        return null; // Return null to indicate failure
    }
};

export const checkMEIExemption = (cnaeCode) => {
    const lowRiskCNAEs = ['4711301', '9602501'];
    return lowRiskCNAEs.includes(cnaeCode);
};

export const getRequiredExams = (risks) => {
    const examMap = {
        'Ruído': ['Audiometria'],
        'Ruído Contínuo': ['Audiometria'],
        'Químico': ['Hemograma', 'Espirometria'],
        'Poeiras': ['Espirometria', 'Raio-X de Tórax'],
        'Biológico': ['Sorologia', 'Vacinação'],
        'Ergonômico': ['Avaliação Osteomuscular']
    };

    const exams = new Set();
    risks.forEach(risk => {
        // Check partial matches
        Object.keys(examMap).forEach(key => {
            if (risk.includes(key)) {
                examMap[key].forEach(e => exams.add(e));
            }
        });
    });

    return Array.from(exams);
};

export const determineDocumentType = (company, hasRisks) => {
    if (company.mei) {
        return { type: 'MEI', label: 'Ficha de Orientação MEI', explanation: 'Microempreendedor Individual: Dispensado de PGR (NR-01.18.4)' };
    }

    const isMeEpp = ['MICRO EMPRESA', 'PEQUENA EMPRESA'].includes(company.porte) || company.porte === 'ME' || company.porte === 'EPP';
    if (isMeEpp && [1, 2].includes(company.grau_risco) && !hasRisks) {
        return { type: 'DIR', label: 'Declaração de Inexistência de Riscos', explanation: 'ME/EPP Grau 1/2 sem riscos físicos, químicos ou biológicos (NR-01.18.4)' };
    }

    return { type: 'PGR', label: 'PGR Completo', explanation: 'Obrigatoriedade Padrão NR-01' };
};

// NEW: Suggest Risks based on CNAE
export const getSuggestedRisks = (cnae, cnaeDesc) => {
    const suggestions = [];

    const desc = cnaeDesc.toLowerCase();

    // Logic based on keywords in CNAE description
    if (desc.includes('construção') || desc.includes('obra') || desc.includes('instalação')) {
        suggestions.push({
            hazard: 'Ruído Contínuo',
            source: 'Ferramentas Elétricas',
            impact: 'Perda Auditiva Privada',
            p_suggestion: 3,
            s_suggestion: 3
        });
        suggestions.push({
            hazard: 'Queda de Nível',
            source: 'Trabalho em Altura',
            impact: 'Fraturas e Traumatismos',
            p_suggestion: 3,
            s_suggestion: 4
        });
        suggestions.push({
            hazard: 'Poeiras Minerais',
            source: 'Corte de Materiais',
            impact: 'Doenças Respiratórias',
            p_suggestion: 4,
            s_suggestion: 3
        });
    } else if (desc.includes('comércio') || desc.includes('varejista')) {
        suggestions.push({
            hazard: 'Ergonômico - Postura',
            source: 'Posto de Trabalho',
            impact: 'Dores Musculares',
            p_suggestion: 2,
            s_suggestion: 1
        });
    } else if (desc.includes('limpeza') || desc.includes('serviços')) {
        suggestions.push({
            hazard: 'Umidade',
            source: 'Atividades de Limpeza',
            impact: 'Dermatites',
            p_suggestion: 3,
            s_suggestion: 2
        });
        suggestions.push({
            hazard: 'Químico - Domissanitários',
            source: 'Produtos de Limpeza',
            impact: 'Irritação de Pele e Olhos',
            p_suggestion: 2,
            s_suggestion: 2
        });
    } else {
        // Generic Office
        suggestions.push({
            hazard: 'Ergonômico - Mobiliário',
            source: 'Uso de Computador',
            impact: 'Fadiga Física',
            p_suggestion: 2,
            s_suggestion: 1
        });
    }

    return suggestions;
};

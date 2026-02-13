// AutomaticEngine.js - Gera dados de PGR/PCMSO automaticamente
import { RISK_CATALOG, suggestExamsForRisk, evaluateQuantification } from './RiskRules.js';

// ==================== MAPEAMENTO DE CARGOS → CBOs ====================
const ROLE_TO_CBO_MAP = {
    // Administração
    'gerente': '1423-05',
    'gerente geral': '1423-05',
    'gerente administrativo': '1423-05',
    'assistente administrativo': '4110-10',
    'auxiliar administrativo': '4110-05',
    'secretaria': '4110-10',
    'recepcionista': '4221-05',

    // Vendas/Comercial
    'vendedor': '5211-10',
    'vendedor interno': '5211-20',
    'vendedor externo': '5211-15',
    'representante comercial': '3541-25',
    'atendente': '5211-25',

    // Financeiro/Contabilidade
    'contador': '2522-10',
    'analista financeiro': '2522-25',
    'auxiliar de contabilidade': '4131-05',

    // RH
    'analista de rh': '2524-05',
    'auxiliar de rh': '3513-05',

    // Produção/Operação
    'operador de maquinas': '7711-05',
    'montador': '7144-10',
    'torneiro mecanico': '7211-10',
    'soldador': '7243-10',
    'eletricista': '9511-05',
    'mecanico': '9144-05',
    'auxiliar de producao': '7842-05',

    // Engenharia
    'engenheiro': '2140-05',
    'engenheiro mecanico': '2144-05',
    'engenheiro eletrico': '2143-05',
    'engenheiro civil': '2142-05',
    'tecnico em seguranca do trabalho': '3516-05',

    // Logística/Transporte
    'motorista': '7823-10',
    'entregador': '7823-20',
    'almoxarife': '4141-05',
    'auxiliar de logistica': '4141-10',

    // Limpeza/Serviços Gerais
    'auxiliar de limpeza': '5143-10',
    'zelador': '5142-10',
    'porteiro': '5174-10',

    // TI
    'analista de ti': '2124-05',
    'desenvolvedor': '2124-10',
    'suporte tecnico': '3172-10'
};

// Função para mapear cargo digitado → CBO
export const mapRoleToCBO = (roleTitle) => {
    const normalized = roleTitle.toLowerCase().trim();

    // Busca exata
    if (ROLE_TO_CBO_MAP[normalized]) {
        return ROLE_TO_CBO_MAP[normalized];
    }

    // Busca parcial (por palavras-chave)
    for (const [key, cbo] of Object.entries(ROLE_TO_CBO_MAP)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return cbo;
        }
    }

    // Padrão genérico
    return '4110-10'; // Auxiliar Administrativo (padrão)
};


// ==================== GERAÇÃO DE RISCOS BASEADO EM CNAE + ATIVIDADES ====================

export const generateRisksFromActivities = (cnaeInfo, activitiesSelected) => {
    const risks = [];
    const { cnae_desc } = cnaeInfo;
    const desc = (cnae_desc || '').toLowerCase();

    const baseRisk = (id, hazard, type, source, impact) => ({
        id: `risk_${Date.now()}_${id}`,
        hazard,
        type,
        source,
        circumstances: 'Durante a jornada de trabalho habitual',
        methodology: 'Avaliação Qualitativa conforme NR 01',
        description: `Exposição ao fator ${hazard} na fonte ${source}`,
        impact,
        exposure_type: 'Habitual',
        p: 3, s: 2, level: 6,
        level_label: 'Moderado',
        uncertainty_degree: 0, // 0: Certa, 1: Incerta, 2: Altamente Incerta
        risk_color: '#facc15',
        controls_existing: 'Uso de EPI e orientações de segurança',
        auto: true
    });

    // RISCO BASE (Sempre presente conforme NR-17)
    risks.push({
        ...baseRisk('base_erg', 'Ergonômico: Postura de Trabalho', 'Ergonômico', 'Posto de trabalho e mobiliário', 'Cansaço físico e desconforto muscular'),
        p: 2, s: 2, level: 4, level_label: 'Tolerável'
    });

    // ATIVIDADE: Computadores/Escritório
    if (activitiesSelected.includes('Computadores')) {
        risks.push({
            ...baseRisk(1, 'Ergonômico: Postura Estática', 'Ergonômico', 'Uso de computador', 'Dores lombares e fadiga visual'),
            psychosocial: {
                emotional: 2,
                autonomy: 4,
                social: 4
            }
        });
    }

    // ATIVIDADE: Máquinas/Equipamentos
    if (activitiesSelected.includes('Máquinas')) {
        risks.push(
            baseRisk(2, 'Físico: Ruído Contínuo', 'Físico', 'Maquinário operacional', 'Perda auditiva induzida por ruído'),
            baseRisk(3, 'Acidente: Mecânico', 'Acidente', 'Partes móveis sem proteção', 'Corte e esmagamento')
        );
    }

    // ATIVIDADE: Produtos Químicos
    if (activitiesSelected.includes('Químicos')) {
        risks.push(baseRisk(4, 'Químico: Agentes Diversos', 'Químico', 'Manipulação de produtos', 'Dermatite e irritação'));
    }

    // ATIVIDADE: Trabalho em Altura
    if (activitiesSelected.includes('Altura')) {
        risks.push(baseRisk(5, 'Acidente: Queda de Altura', 'Acidente', 'Trabalho em níveis elevados', 'Queda com fratura ou óbito'));
    }

    return risks;
};


// ==================== GERAÇÃO DE EPIs BASEADO EM RISCOS ====================

export const generateEPIsFromRisks = (risks) => {
    const episMap = {};

    risks.forEach(risk => {
        if (risk.type === 'Físico' && risk.hazard.includes('Ruído') && !episMap['protetor']) {
            episMap['protetor'] = {
                id: `epi_plug_${Date.now()}`,
                name: 'Protetor Auricular Plug',
                ca: '11512',
                quantity: 1,
                observations: 'Substituição semestral ou conforme desgaste',
                justification: 'Inviabilidade técnica momentânea de enclausuramento da fonte ruído'
            };
        }
        if (risk.type === 'Acidente' && (risk.hazard.includes('Altura') || risk.hazard.includes('Mecânico')) && !episMap['botina']) {
            episMap['botina'] = {
                id: `epi_bot_${Date.now()}`,
                name: 'Botina de Segurança',
                ca: '43377',
                quantity: 1,
                observations: 'Uso obrigatório em área operacional',
                justification: 'Proteção individual remanescente após medidas administrativas'
            };
        }
    });

    return Object.values(episMap);
};

// ==================== GERAÇÃO DE EXAMES BASEADO EM RISCOS ====================

export const generateExamsFromRisks = (risks) => {
    const examsList = [
        {
            id: `exam_${Date.now()}_clinico`,
            exam_type: 'Avaliação Clínica e Anamnese',
            periodicidade: 'Anual',
            timing: 'Admissional e Periódico',
            reason: 'Monitoramento global de saúde (NR 07)',
            auto: true
        }
    ];

    risks.forEach(risk => {
        if (risk.type === 'Físico' && risk.hazard.includes('Ruído')) {
            examsList.push({
                id: `exam_${Date.now()}_audio`,
                exam_type: 'Audiometria Tonal e Ocupacional',
                periodicidade: 'Anual',
                timing: 'Admissional e Periódico',
                reason: 'Monitoramento de acuidade auditiva',
                auto: true
            });
        }
    });

    return examsList;
};

// ==================== GERAÇÃO DE CRONOGRAMA DE AÇÕES (5W2H) ====================

export const generateActionPlan = (risks) => {
    const now = new Date();
    const actions = [];

    risks.forEach(risk => {
        const priority = risk.level >= 15 ? 'Imediata' : 'Planejada';

        actions.push({
            id: `act_${risk.id}`,
            risk_id: risk.id,
            description: `Implementar melhoria no controle do risco: ${risk.hazard}`,
            responsible: 'Gestor da Unidade',
            deadline: new Date(now.getTime() + (priority === 'Imediata' ? 30 : 180) * 86400000).toISOString(),
            status: 'Pendente',
            evidence: 'Relatório fotográfico e lista de presença',
            category: 'Controle Técnico',
            auto: true
        });
    });

    return actions;
};

// ==================== FUNÇÃO PRINCIPAL ====================


export const generateCompleteData = (cnpj, intakeData) => {
    const { employee_count, sectors_selected, roles_text, activities_selected, cnae, cnae_desc } = intakeData;

    // 1. Processar setores
    const sectors = (sectors_selected || []).map((sectorName, index) => ({
        id: `s${index + 1}`,
        code: `${index + 1}`,
        name: sectorName.toUpperCase(),
        description: `Ambiente em alvenaria, com piso de concreto revestido com cerâmica, ventilação natural e iluminação artificial por lâmpadas LED, conforme parâmetros da NHO 11.`,
        auto: true
    }));

    // 2. Processar cargos
    const rolesArray = (roles_text || '').split(',').map(r => r.trim()).filter(r => r);
    if (rolesArray.length === 0) rolesArray.push('COLABORADOR GERAL');

    const roles = rolesArray.map((roleTitle, index) => {
        const sector = sectors[index % (sectors.length || 1)] || sectors[0] || { name: 'GERAL' };
        return {
            id: `r${index + 1}`,
            sector_id: sector.id || 's1',
            sector_name: sector.name,
            name: roleTitle.toUpperCase(),
            cbo: mapRoleToCBO(roleTitle),
            employee_count: Math.ceil((employee_count || 1) / rolesArray.length) || 1,
            description: `Execução de tarefas administrativas e operacionais inerentes ao cargo de ${roleTitle}, cumprindo as Normas Regulamentadoras vigentes.`,
            workload: '44 horas semanais',
            auto: true
        };
    });

    // 3. Gerar riscos
    const cnaeInfo = { cnae, cnae_desc };
    let risk_inventory = generateRisksFromActivities(cnaeInfo, activities_selected);

    // 4. Vincular riscos aos cargos e adicionar contexto
    risk_inventory = risk_inventory.map((risk, index) => {
        const role = roles[index % roles.length] || roles[0];
        const score = risk.p * risk.s;
        return {
            ...risk,
            role_id: role.id,
            role_name: role.name,
            sector_id: role.sector_id,
            sector_name: role.sector_name,
            score: score,
            level_label: score >= 15 ? 'INTOLERÁVEL' : score >= 10 ? 'SUBSTANCIAL' : score >= 5 ? 'MODERADO' : 'TOLERÁVEL',
            suggested_epi: risk.type === 'Físico' ? 'Protetor Auricular' : risk.type === 'Acidente' ? 'Botina / Capacete' : 'EPC / Orientação'
        };
    });

    // 5. Gerar outros dados
    const epis = generateEPIsFromRisks(risk_inventory);
    epis.forEach(epi => { epi.applicable_roles = roles.map(r => r.id); });

    const medical_exams = generateExamsFromRisks(risk_inventory);

    // Plano de Ação Personalizado
    const action_plan = [
        { description: 'Realização de treinamento de integração NR-01', deadline: '30 dias', status: 'Pendente', responsible: 'Segurança do Trabalho' },
        { description: 'Avaliação quantitativa de ruído nos postos críticos', deadline: '60 dias', status: 'Pendente', responsible: 'Engenharia' },
        { description: 'Inspeção periódica de EPIs e check-lists', deadline: 'Mensal', status: 'Em andamento', responsible: 'Encarregado' },
        { description: 'Revisão da análise ergonômica preliminar', deadline: 'Anual', status: 'Não iniciado', responsible: 'Médico/Engenheiro' }
    ];

    // Cálculo Simples de IQCT (nB=baixo, nM=moderado, nA=alto)
    const nA = risk_inventory.filter(r => r.score >= 15).length;
    const nM = risk_inventory.filter(r => r.score >= 5 && r.score < 15).length;
    const nB = risk_inventory.length - nA - nM;
    const iqct = Math.round(((4 * nB + 3 * nM + nA) / (nB + nM + nA || 1) / 4) * 100);

    return {
        sectors,
        roles,
        risk_inventory,
        epis,
        medical_exams,
        action_plan,
        iqct: iqct || 100,
        meta: {
            pgr_type: intakeData.pgr_type || 'FULL',
            validity: '24 meses'
        }
    };
};

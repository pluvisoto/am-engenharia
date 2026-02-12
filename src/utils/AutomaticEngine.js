// AutomaticEngine.js - Gera dados de PGR/PCMSO automaticamente
import { RISK_CATALOG, suggestExamsForRisk, evaluateQuantification } from './RiskRules';

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

export const generateRisksFromActivities = (cnae, cnaeDesc, activitiesSelected) => {
    const risks = [];
    const desc = (cnaeDesc || '').toLowerCase();

    // ATIVIDADE: Computadores/Escritório
    if (activitiesSelected.includes('Computadores')) {
        risks.push({
            id: `risk_${Date.now()}_1`,
            hazard: 'Ergonômico - Postura',
            type: 'Ergonômico',
            source: 'Uso prolongado de computador',
            circumstances: 'Durante jornada de trabalho',
            methodology: 'Critério Qualitativo - Análise Ergonômica',
            description: 'Risco ergonômico relacionado à postura inadequada',
            impact: 'LER/DORT, fadiga visual',
            exposure_type: 'Habitual',
            p: 3, s: 2, level: 6,
            level_label: 'Tolerável',
            risk_color: '#92D050',
            control_action: 'Manter controle existente',
            // Quantitative Data
            is_quantitative: false,
            measurement_unit: '',
            measurement_value: '',
            limit_tolerance: '',
            action_level: '',
            auto: true
        });
    }

    // ATIVIDADE: Máquinas/Equipamentos (RUIDA COM ESTRUTURA QUANTITATIVA)
    if (activitiesSelected.includes('Máquinas')) {
        risks.push(
            {
                id: `risk_${Date.now()}_2`,
                hazard: 'Ruído Contínuo ou Intermitente',
                type: 'Físico',
                source: 'Funcionamento de máquinas',
                circumstances: 'Durante operações de produção',
                methodology: 'Dosimetria de Ruído (NHO-01)',
                description: 'Ruído proveniente de máquinas e ferramentas',
                impact: 'Perda Auditiva Induzida por Ruído (PAIR)',
                exposure_type: 'Habitual',
                p: 4, s: 3, level: 12,
                level_label: 'Moderado',
                risk_color: '#FFFF00',
                controls_existing: 'Protetor auricular tipo plug',
                control_action: 'Implementar PCA',
                // Quantitative Data - Prepared for user input
                is_quantitative: true,
                measurement_unit: 'dB(A)',
                measurement_value: '', // User must fill
                limit_tolerance: '85',
                action_level: '80',
                technique: 'Dosímetro',
                auto: true
            },
            {
                id: `risk_${Date.now()}_3`,
                hazard: 'Acidente Mecânico',
                type: 'Acidente',
                source: 'Partes móveis de máquinas',
                circumstances: 'Durante operação e manutenção',
                methodology: 'APR',
                description: 'Risco de prensagem ou corte',
                impact: 'Fraturas, amputações',
                exposure_type: 'Habitual',
                p: 3, s: 4, level: 12,
                level_label: 'Moderado',
                risk_color: '#FFFF00',
                control_action: 'Adicionar proteções físicas',
                is_quantitative: false,
                auto: true
            }
        );
    }

    // ATIVIDADE: Produtos Químicos
    if (activitiesSelected.includes('Químicos')) {
        risks.push({
            id: `risk_${Date.now()}_4`,
            hazard: 'Agentes Químicos (Geral)',
            type: 'Químico',
            source: 'Manuseio de produtos químicos',
            circumstances: 'Durante processos produtivos',
            methodology: 'Qualitativa / Quantitativa se necessário',
            description: 'Exposição a substâncias químicas',
            impact: 'Dermatites, intoxicação',
            exposure_type: 'Habitual',
            p: 3, s: 3, level: 9,
            risk_color: '#92D050',
            // Quantitative Data
            is_quantitative: true,
            measurement_unit: 'ppm / mg/m³',
            measurement_value: '',
            limit_tolerance: '',
            action_level: '',
            auto: true
        });
    }

    // ATIVIDADE: Trabalho em Altura
    if (activitiesSelected.includes('Altura')) {
        risks.push({
            id: `risk_${Date.now()}_5`,
            hazard: 'Queda de Altura',
            type: 'Acidente',
            source: 'Trabalho em andaimes/escadas',
            circumstances: 'Manutenção e instalações',
            methodology: 'APR',
            description: 'Queda de nível diferente',
            impact: 'Traumatismos, óbito',
            exposure_type: 'Eventual',
            p: 2, s: 5, level: 10,
            risk_color: '#FFC000',
            is_quantitative: false,
            auto: true
        });
    }

    // ATIVIDADE: Veículos
    if (activitiesSelected.includes('Veículos')) {
        risks.push({
            id: `risk_${Date.now()}_6`,
            hazard: 'Acidente de Trânsito',
            type: 'Acidente',
            source: 'Condução de veículos',
            circumstances: 'Deslocamentos a serviço',
            methodology: 'Análise de Acidentes',
            description: 'Colisão, atropelamento',
            impact: 'Politraumatismo',
            exposure_type: 'Habitual',
            p: 2, s: 4, level: 8,
            risk_color: '#92D050',
            is_quantitative: false,
            auto: true
        });
    }

    // ATIVIDADE: Espaço Confinado
    if (activitiesSelected.includes('Confined')) {
        risks.push({
            id: `risk_${Date.now()}_confined`,
            hazard: 'Deficiência de Oxigênio / Atmosfera IPVS',
            type: 'Físico/Químico',
            source: 'Tanques e silos',
            circumstances: 'Entrada em espaço confinado',
            methodology: 'Medição Direta - NR-33',
            description: 'Ambiente com atmosfera perigosa',
            impact: 'Asfixia, morte',
            exposure_type: 'Eventual',
            p: 2, s: 5, level: 10,
            risk_color: '#FFC000',
            is_quantitative: true,
            measurement_unit: '% O2',
            measurement_value: '',
            limit_tolerance: '19.5% - 23%',
            action_level: '',
            auto: true
        });
    }

    // ATIVIDADE: Eletricidade
    if (activitiesSelected.includes('Eletricidade')) {
        risks.push({
            id: `risk_${Date.now()}_electric`,
            hazard: 'Choque Elétrico / Arco Elétrico',
            type: 'Acidente',
            source: 'Instalações elétricas',
            circumstances: 'Manutenção em rede',
            methodology: 'APR / NR-10',
            description: 'Contato com partes energizadas',
            impact: 'Queimaduras, parada cardíaca',
            exposure_type: 'Habitual',
            p: 2, s: 5, level: 10,
            risk_color: '#FFC000',
            is_quantitative: false,
            auto: true
        });
    }

    // CNAE: Construção (Exemplo Extra)
    if (desc.includes('construção') || desc.includes('obra')) {
        risks.push({
            id: `risk_${Date.now()}_const_dust`,
            hazard: 'Poeiras Minerais (Sílica)',
            type: 'Químico',
            source: 'Corte de materiais',
            circumstances: 'Obras civis',
            methodology: 'Gravimetria',
            description: 'Poeira respirável contendo sílica',
            impact: 'Silicose',
            exposure_type: 'Habitual',
            p: 3, s: 3, level: 9,
            risk_color: '#92D050',
            is_quantitative: true,
            measurement_unit: 'mg/m³',
            measurement_value: '',
            limit_tolerance: '0.1', // mg/m³
            action_level: '0.05',
            auto: true
        });
    }

    return risks;
};

// ==================== GERAÇÃO DE EPIs BASEADO EM RISCOS ====================

export const generateEPIsFromRisks = (risks) => {
    const episMap = {};

    risks.forEach(risk => {
        if (risk.hazard.includes('Ergonômico') && !episMap['cadeira']) {
            episMap['cadeira'] = {
                id: `epi_cad_${Date.now()}`, name: 'Cadeira Ergonômica', ca: 'N/A', quantity_per_employee: 1, validity_months: 60, observations: 'Conf. NR-17', auto: true
            };
        }
        if (risk.hazard.includes('Ruído') && !episMap['protetor']) {
            episMap['protetor'] = {
                id: `epi_plug_${Date.now()}`, name: 'Protetor Auricular Plug Inserção', ca: '11512', quantity_per_employee: 1, validity_months: 6, observations: 'Silicone', auto: true
            };
        }
        if (risk.type === 'Químico' && !episMap['luva_nitr']) {
            episMap['luva_nitr'] = {
                id: `epi_luv_${Date.now()}`, name: 'Luva Nitrílica', ca: '32034', quantity_per_employee: 2, validity_months: 1, observations: 'Proteção química', auto: true
            };
        }
        if (risk.type === 'Químico' && !episMap['mascara']) {
            episMap['mascara'] = {
                id: `epi_masc_${Date.now()}`, name: 'Respirador PFF2 (N95)', ca: '38505', quantity_per_employee: 5, validity_months: 0, observations: 'Descartável', auto: true
            };
        }
        if (risk.hazard.includes('Altura') && !episMap['cinto']) {
            episMap['cinto'] = {
                id: `epi_cinto_${Date.now()}`, name: 'Cinto PQD', ca: '37977', quantity_per_employee: 1, validity_months: 60, observations: 'Com talabarte duplo', auto: true
            };
        }
        if ((risk.type === 'Acidente' || risk.hazard.includes('Mecânico')) && !episMap['oculos']) {
            episMap['oculos'] = {
                id: `epi_ocu_${Date.now()}`, name: 'Óculos de Segurança Incolor', ca: '10346', quantity_per_employee: 1, validity_months: 12, observations: 'Anti-risco', auto: true
            };
        }
        if ((risk.type === 'Acidente' || risk.hazard.includes('Mecânico')) && !episMap['botina']) {
            episMap['botina'] = {
                id: `epi_bot_${Date.now()}`, name: 'Botina de Segurança', ca: '43377', quantity_per_employee: 1, validity_months: 12, observations: 'Com biqueira', auto: true
            };
        }
    });

    return Object.values(episMap);
};

// ==================== GERAÇÃO DE EXAMES BASEADO EM RISCOS ====================

export const generateExamsFromRisks = (risks) => {
    // Start with basic exams (always required)
    const examsList = [
        {
            id: `exam_${Date.now()}_clinico`,
            exam_type: 'Exame Clínico (ASO)',
            exam_description: 'Anamnese e exame físico',
            periodicidade: 'Anual',
            timing: ['Admissional', 'Periódico', 'Demissional', 'Mudança de Risco'],
            reason: 'NR-07 (Obrigatório)',
            auto: true
        }
    ];

    risks.forEach(risk => {
        // Use the RiskRules logic to suggest exams
        // Check if we have quantitative data
        const measurement = risk.measurement_value ? parseFloat(risk.measurement_value) : null;
        const suggestions = suggestExamsForRisk(risk.hazard, measurement);

        suggestions.forEach(sug => {
            // Check if already added to avoid duplicates
            if (!examsList.find(e => e.exam_type === sug.exam)) {
                examsList.push({
                    id: `exam_${Date.now()}_${sug.exam.substring(0, 4)}`,
                    exam_type: sug.exam,
                    exam_description: 'Exame complementar específico',
                    periodicidade: sug.periodicity || 'A definir pelo Médico PCMSO',
                    timing: ['Admissional', 'Periódico', 'Demissional'],
                    reason: sug.reason,
                    related_risk_ids: [risk.id],
                    auto: true
                });
            }
        });
    });

    return examsList;
};

// ==================== GERAÇÃO DE CRONOGRAMA DE AÇÕES ====================

export const generateActionPlan = (risks) => {
    const actions = [];
    const now = new Date();

    // Ação padrão: Apresentação do PGR
    actions.push({
        id: `action_${Date.now()}_1`,
        description: 'Assinatura e Divulgação do PGR',
        responsible: 'Engenheiro de Segurança',
        deadline: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'Pendente',
        auto: true
    });

    // Actions based on quantified risks
    risks.forEach(risk => {
        if (risk.is_quantitative && (!risk.measurement_value || risk.measurement_value === '')) {
            actions.push({
                id: `action_meas_${risk.id}`,
                description: `Realizar medição quantitativa de ${risk.hazard}`,
                responsible: 'Higiene Ocupacional',
                deadline: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
                status: 'Pendente',
                related_risk_ids: [risk.id],
                auto: true
            });
        }
    });

    risks.forEach(risk => {
        if (risk.hazard.includes('Ruído')) {
            actions.push({ id: `act_pca`, description: 'Implementar PCA (Prog. Conservação Auditiva)', responsible: 'Fonoaudióloga', deadline: new Date(now.getTime() + 90 * 86400000).toISOString(), status: 'Pendente', auto: true });
        }
        if (risk.hazard.includes('Respirador') || risk.hazard.includes('Poeira') || risk.hazard.includes('Químico')) {
            actions.push({ id: `act_ppr`, description: 'Implementar PPR (Prog. Proteção Respiratória)', responsible: 'Técnico Seg.', deadline: new Date(now.getTime() + 90 * 86400000).toISOString(), status: 'Pendente', auto: true });
        }
    });

    return actions.filter((v, i, a) => a.findIndex(t => (t.description === v.description)) === i);
};

// ==================== FUNÇÃO PRINCIPAL ====================

export const generateCompleteData = (cnpj, intakeData) => {
    const { employee_count, sectors_selected, roles_text, activities_selected, cnae, cnae_desc } = intakeData;

    // 1. Processar setores
    const sectors = sectors_selected.map((sectorName, index) => ({
        id: `s${index + 1}`,
        code: String.fromCharCode(65 + index), // A, B, C...
        name: sectorName.toUpperCase(),
        description: `Setor operacional`,
        auto: true
    }));

    // 2. Processar cargos
    const rolesArray = roles_text.split(',').map(r => r.trim()).filter(r => r);
    const roles = rolesArray.map((roleTitle, index) => ({
        id: `r${index + 1}`,
        sector_id: sectors[index % sectors.length]?.id || 's1', // Distribui entre setores
        cbo: mapRoleToCBO(roleTitle),
        name: roleTitle,
        employee_count: Math.ceil(employee_count / rolesArray.length), // Distribui funcionários
        activities: [`Atividades inerentes ao cargo de ${roleTitle.toLowerCase()}`],
        workload: '44h',
        shift: 'Comercial',
        auto: true
    }));

    // 3. Gerar riscos
    // Agora passamos o objeto completo de informações do CNAE
    const cnaeInfo = {
        cnae,
        cnae_desc,
        cnaes_secundarios: intakeData.cnaes_secundarios || []
    };
    let risk_inventory = generateRisksFromActivities(cnaeInfo, activities_selected);

    // FILTRO DE CORREÇÃO (NR-1 - PGR SIMPLIFICADO)
    if (intakeData.pgr_type === 'SIMPLIFIED') {
        console.log('[AutomaticEngine] Applying SIMPLIFIED PGR filter (Removing Phys/Chem/Bio)');
        risk_inventory = risk_inventory.filter(risk => {
            const type = risk.type.toLowerCase();
            // Mantém apenas Ergonômico e Acidente
            const isAllowed = type.includes('ergonômico') || type.includes('acidente') || type.includes('mecânico');
            return isAllowed;
        });
    }

    // 4. Vincular riscos aos cargos (round-robin simplificado para MVP)
    risk_inventory.forEach((risk, index) => {
        risk.role_id = roles[index % roles.length]?.id || 'r1';
        risk.sector_id = roles[index % roles.length]?.sector_id || 's1';
    });

    // 5. Gerar EPIs
    const epis = generateEPIsFromRisks(risk_inventory);
    epis.forEach(epi => { epi.applicable_roles = roles.map(r => r.id); });

    // 6. Gerar exames (Agora usa lógica de periodicidade do RiskRules)
    const medical_exams = generateExamsFromRisks(risk_inventory);

    // 7. Gerar cronograma (Agora pede medições se faltarem)
    const action_plan = generateActionPlan(risk_inventory);

    return {
        sectors,
        roles,
        risk_inventory,
        epis,
        medical_exams,
        action_plan,
        meta: {
            pgr_type: intakeData.pgr_type || 'FULL',
            regulation_standard: intakeData.pgr_type === 'SIMPLIFIED' ? 'NR-1.8.4' : 'NR-1.5'
        }
    };
};

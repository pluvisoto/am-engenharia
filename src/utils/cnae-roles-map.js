// Mapeia CNAE para cargos típicos do segmento
// Baseado na Classificação Nacional de Atividades Econômicas

export const getRolesByCNAE = (cnae) => {
    // Remove formatação do CNAE
    const cleanCNAE = String(cnae || '').replace(/[.\-\/]/g, '').substring(0, 4);

    // Mapeamento simplificado por divisão CNAE (primeiros 2 dígitos)
    const division = cleanCNAE.substring(0, 2);

    const rolesByDivision = {
        // Agricultura, pecuária e serviços relacionados (01-03)
        '01': ['Operador Agrícola', 'Tratorista', 'Trabalhador Rural', 'Supervisor de Campo', 'Técnico Agrícola'],
        '02': ['Engenheiro Florestal', 'Operador de Motosserra', 'Trabalhador Florestal'],
        '03': ['Pescador', 'Técnico em Aquicultura', 'Operador de Embarcação'],

        // Indústrias Extrativas (05-09)
        '05': ['Geólogo', 'Operador de Mineração', 'Técnico em Mineração', 'Engenheiro de Minas'],
        '06': ['Operador de Extração', 'Técnico em Petróleo', 'Engenheiro de Petróleo'],

        // Indústrias de Transformação (10-33)
        '10': ['Operador de Produção', 'Auxiliar de Produção', 'Supervisor de Qualidade', 'Conferente'],
        '11': ['Operador de Bebidas', 'Engarrafador', 'Técnico em Alimentos'],
        '13': ['Costureira', 'Modelista', 'Cortador de Tecidos', 'Supervisor Têxtil'],
        '14': ['Costureira', 'Passadeira', 'Bordadeira'],
        '15': ['Sapateiro', 'Cortador de Couro'],
        '16': ['Marceneiro', 'Operador de Serra', 'Torneiro'],
        '17': ['Operador de Máquina de Papel'],
        '18': ['Operador de Impressão', 'Gráfico', 'Encadernador'],
        '19': ['Operador Químico', 'Técnico Químico'],
        '20': ['Operador Químico', 'Químico Industrial', 'Técnico em Química'],
        '21': ['Farmacêutico', 'Operador Farmacêutico', 'Técnico em Farmácia'],
        '22': ['Operador de Injeção', 'Operador de Sopro', 'Vulcanizador'],
        '23': ['Pedreiro', 'Ceramista', 'Operador de Forno'],
        '24': ['Metalúrgico', 'Operador de Alto Forno', 'Fundidor'],
        '25': ['Serralheiro', 'Soldador', 'Torneiro Mecânico', 'Ferramenteiro'],
        '26': ['Técnico em Eletrônica', 'Montador Eletrônico'],
        '27': ['Eletricista Industrial', 'Técnico em Eletricidade'],
        '28': ['Mecânico Industrial', 'Montador de Máquinas', 'Ajustador Mecânico'],
        '29': ['Mecânico Automotivo', 'Montador de Veículos', 'Funileiro'],
        '30': ['Montador Naval', 'Soldador Naval'],
        '31': ['Marceneiro', 'Montador de Móveis'],
        '32': ['Joalheiro', 'Artesão'],

        // Eletricidade e gás (35)
        '35': ['Eletricista', 'Técnico em Eletricidade', 'Operador de Subestação', 'Engenheiro Eletricista'],

        // Água, esgoto (36-39)
        '36': ['Operador de ETA', 'Técnico em Saneamento'],
        '37': ['Operador de ETE', 'Técnico Ambiental'],

        // Construção (41-43)
        '41': ['Pedreiro', 'Servente', 'Mestre de Obras', 'Encarregado', 'Engenheiro Civil'],
        '42': ['Eletricista Predial', 'Encanador', 'Instalador'],
        '43': ['Pintor', 'Gesseiro', 'Azulejista', 'Acabador'],

        // Comércio e reparação (45-47)
        '45': ['Mecânico Automotivo', 'Vendedor de Veículos', 'Lavador de Veículos', 'Gerente de Concessionária'],
        '46': ['Vendedor Atacadista', 'Conferente', 'Auxiliar de Logística'],
        '47': ['Vendedor', 'Caixa', 'Repositor', 'Gerente de Loja', 'Atendente'],

        // Transporte e armazenagem (49-53)
        '49': ['Motorista', 'Cobrador', 'Despachante', 'Coordenador de Tráfego'],
        '50': ['Comandante', 'Marinheiro', 'Operador Portuário'],
        '51': ['Piloto', 'Comissário de Bordo'],
        '52': ['Operador de Empilhadeira', 'Conferente', 'Estoquista', 'Gerente de Armazém'],
        '53': ['Carteiro', 'Operador de Logística', 'Entregador'],

        // Alojamento e alimentação (55-56)
        '55': ['Recepcionista', 'Camareira', 'Gerente de Hotel', 'Porteiro'],
        '56': ['Cozinheiro', 'Garçom', 'Auxiliar de Cozinha', 'Gerente de Restaurante', 'Barista'],

        // Informação e comunicação (58-63)
        '58': ['Editor', 'Revisor', 'Designer Gráfico'],
        '59': ['Produtor Audiovisual', 'Cinegrafista', 'Editor de Vídeo'],
        '60': ['Locutor', 'Técnico de Som'],
        '61': ['Analista de Telecomunicações', 'Técnico em Telecomunicações'],
        '62': ['Desenvolvedor', 'Analista de Sistemas', 'Programador', 'Suporte Técnico', 'DevOps'],
        '63': ['Analista de TI', 'Administrador de Redes', 'Técnico de TI'],

        // Atividades financeiras (64-66)
        '64': ['Caixa Bancário', 'Gerente de Banco', 'Analista de Crédito'],
        '65': ['Corretor de Seguros', 'Atuário'],
        '66': ['Analista Financeiro', 'Gestor de Investimentos'],

        // Atividades imobiliárias (68)
        '68': ['Corretor de Imóveis', 'Síndico', 'Zelador'],

        // Atividades profissionais (69-75)
        '69': ['Advogado', 'Consultor Jurídico', 'Assistente Jurídico'],
        '70': ['Administrador', 'Consultor Empresarial', 'Gerente Administrativo'],
        '71': ['Arquiteto', 'Engenheiro', 'Projetista', 'Desenhista'],
        '72': ['Pesquisador', 'Técnico de Laboratório'],
        '73': ['Publicitário', 'Designer', 'Redator'],
        '74': ['Fotógrafo', 'Designer'],
        '75': ['Veterinário', 'Técnico Veterinário'],

        // Atividades administrativas (77-82)
        '77': ['Locador', 'Atendente'],
        '78': ['Recrutador', 'Analista de RH', 'Assistente de RH'],
        '79': ['Agente de Viagens', 'Guia Turístico'],
        '80': ['Vigilante', 'Porteiro', 'Segurança'],
        '81': ['Auxiliar de Limpeza', 'Zelador', 'Jardineiro'],
        '82': ['Recepcionista', 'Secretária', 'Auxiliar Administrativo', 'Telefonista'],

        // Educação (85)
        '85': ['Professor', 'Coordenador Pedagógico', 'Auxiliar de Classe'],

        // Saúde (86-88)
        '86': ['Médico', 'Enfermeiro', 'Técnico de Enfermagem', 'Auxiliar de Enfermagem'],
        '87': ['Cuidador de Idosos', 'Assistente Social'],
        '88': ['Psicólogo', 'Fisioterapeuta', 'Terapeuta'],

        // Artes e cultura (90-93)
        '90': ['Artista', 'Músico', 'Ator'],
        '91': ['Bibliotecário', 'Arquivista'],
        '92': ['Operador de Jogos'],
        '93': ['Personal Trainer', 'Professor de Educação Física', 'Árbitro'],

        // Outras atividades de serviços (94-96)
        '94': ['Assessor', 'Coordenador'],
        '95': ['Técnico em Informática'],
        '96': ['Manicure', 'Cabeleireiro', 'Esteticista', 'Barbeiro']
    };

    // Cargos comuns a todos (sempre aparecem)
    const commonRoles = [
        'Gerente',
        'Supervisor',
        'Assistente Administrativo',
        'Auxiliar Administrativo',
        'Analista Administrativo'
    ];

    const specificRoles = rolesByDivision[division] || [];

    return [...commonRoles, ...specificRoles];
};

// Lista de cargos genéricos caso o CNAE não seja identificado
export const getDefaultRoles = () => [
    'Gerente',
    'Supervisor',
    'Coordenador',
    'Vendedor',
    'Atendente',
    'Assistente Administrativo',
    'Auxiliar Administrativo',
    'Operador',
    'Técnico',
    'Analista'
];

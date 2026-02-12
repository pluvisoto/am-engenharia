export const getSuggestedRoles = (cnaeDesc) => {
    if (!cnaeDesc) return getGenericRoles();

    const desc = cnaeDesc.toLowerCase();
    let roles = new Set();

    // Adiciona cargos genéricos básicos
    getGenericRoles().forEach(r => roles.add(r));

    // Lógica baseada em palavras-chave do CNAE

    // Construção Civil
    if (desc.includes('construção') || desc.includes('obras') || desc.includes('engenharia') || desc.includes('instalação')) {
        ['Pedreiro', 'Servente', 'Mestre de Obras', 'Eletricista', 'Encanador', 'Pintor', 'Engenheiro Civil'].forEach(r => roles.add(r));
    }

    // Comércio / Varejo
    if (desc.includes('comércio') || desc.includes('varejista') || desc.includes('atacadista') || desc.includes('loja') || desc.includes('roupas')) {
        ['Vendedor', 'Gerente de Loja', 'Caixa', 'Estoquista', 'Atendente', 'Auxiliar de Limpeza'].forEach(r => roles.add(r));
    }

    // Transporte / Logística
    if (desc.includes('transporte') || desc.includes('logística') || desc.includes('cargas') || desc.includes('entregas')) {
        ['Motorista de Caminhão', 'Ajudante de Carga', 'Motorista Entregador', 'Mecânico', 'Assistente de Logística'].forEach(r => roles.add(r));
    }

    // Indústria / Fábrica
    if (desc.includes('fabricação') || desc.includes('indústria') || desc.includes('produção') || desc.includes('confecção')) {
        ['Operador de Máquinas', 'Auxiliar de Produção', 'Líder de Produção', 'Mecânico de Manutenção', 'Soldador', 'Torneiro Mecânico'].forEach(r => roles.add(r));
    }

    // Tecnologia
    if (desc.includes('desenvolvimento') || desc.includes('software') || desc.includes('tecnologia') || desc.includes('informática')) {
        ['Desenvolvedor', 'Analista de Sistemas', 'Suporte Técnico', 'Gerente de Projetos'].forEach(r => roles.add(r));
    }

    // Saúde
    if (desc.includes('médica') || desc.includes('saúde') || desc.includes('clínica') || desc.includes('hospital')) {
        ['Médico', 'Enfermeiro', 'Técnico de Enfermagem', 'Recepcionista', 'Auxiliar de Limpeza Hospitalar'].forEach(r => roles.add(r));
    }

    // Alimentação
    if (desc.includes('restaurante') || desc.includes('lanchonete') || desc.includes('alimentação') || desc.includes('bar')) {
        ['Cozinheiro', 'Auxiliar de Cozinha', 'Garçom', 'Atendente', 'Gerente', 'Caixa'].forEach(r => roles.add(r));
    }

    // Administrativo / Serviços
    if (desc.includes('serviços') || desc.includes('consultoria') || desc.includes('escritório') || desc.includes('contabilidade')) {
        ['Analista Administrativo', 'Secretária', 'Recepcionista', 'Auxiliar Financeiro', 'Contador'].forEach(r => roles.add(r));
    }

    return Array.from(roles);
};

const getGenericRoles = () => {
    return [
        'Assistente Administrativo',
        'Gerente',
        'Auxiliar de Limpeza',
        'Recepcionista'
    ];
};

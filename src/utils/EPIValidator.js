// EPIValidator.js
// Responsável por validar a vigência de CAs (Certificado de Aprovação)
// Como não há API oficial estável, usamos uma base local de CAs populares e preparamos o terreno para um Crawler externo.

// ==================== BASE DE DADOS LOCAL (CACHE) ====================
// Top 50 EPIs mais comuns no mercado brasileiro (Dados simulados de vigência)
const CA_DATABASE = {
    // Protetores Auditivos (Plugs e Conchas)
    '11512': { name: 'Protetor Auditivo Plug Silicone', manufacturer: '3M do Brasil', valid_until: '2028-12-31', status: 'VÁLIDO' },
    '5745': { name: 'Protetor Auditivo Tipo Concha', manufacturer: '3M do Brasil', valid_until: '2027-05-15', status: 'VÁLIDO' },
    '14235': { name: 'Protetor Auditivo Espuma Moldável', manufacturer: 'Honeywell', valid_until: '2026-10-20', status: 'VÁLIDO' },

    // Respiradores (PFF1, PFF2, Semi-facial)
    '38505': { name: 'Respirador PFF2 (N95) Aura', manufacturer: '3M do Brasil', valid_until: '2025-08-01', status: 'VÁLIDO' }, // Atenção: Validade próxima
    '445': { name: 'Respirador Semi-Facial Série 6200', manufacturer: '3M do Brasil', valid_until: '2029-01-01', status: 'VÁLIDO' },
    '38504': { name: 'Respirador PFF2 Valvulado', manufacturer: '3M do Brasil', valid_until: '2024-12-31', status: 'VENCIDO' }, // Exemplo de vencido

    // Luvas
    '32034': { name: 'Luva Nitrílica Verde', manufacturer: 'Volk do Brasil', valid_until: '2027-03-10', status: 'VÁLIDO' },
    '15313': { name: 'Luva de Vaqueta Mista', manufacturer: 'Zanelt', valid_until: '2026-06-30', status: 'VÁLIDO' },
    '12872': { name: 'Luva de Látex Natural', manufacturer: 'Mucambo', valid_until: '2028-02-28', status: 'VÁLIDO' },

    // Calçados
    '43377': { name: 'Botina de Segurança Nobuck', manufacturer: 'Safetline', valid_until: '2027-11-20', status: 'VÁLIDO' },
    '42130': { name: 'Bota de PVC Impermeável', manufacturer: 'Bracol', valid_until: '2029-05-05', status: 'VÁLIDO' },
    '17056': { name: 'Sapato de Segurança Bidensidade', manufacturer: 'Estival', valid_until: '2026-09-15', status: 'VÁLIDO' },

    // Trabalho em Altura
    '37977': { name: 'Cinturão Paraquedista 5 Pontos', manufacturer: 'Hercules', valid_until: '2028-04-10', status: 'VÁLIDO' },
    '36585': { name: 'Talabarte Duplo em Y', manufacturer: 'Hercules', valid_until: '2027-12-12', status: 'VÁLIDO' },

    // Óculos
    '10346': { name: 'Óculos de Segurança Leopardo', manufacturer: 'Kalipso', valid_until: '2026-03-20', status: 'VÁLIDO' },
    '11268': { name: 'Óculos Ampla Visão', manufacturer: 'Danny', valid_until: '2025-11-30', status: 'VÁLIDO' }
};

// ==================== FUNÇÃO DE VALIDAÇÃO ====================

/**
 * Verifica o status de um CA.
 * @param {string} caNumber - Número do CA (apenas dígitos).
 * @returns {object} Status, validade e mensagem.
 */
export const validateCA = async (caNumber) => {
    const cleanCA = caNumber.replace(/\D/g, '');

    // 1. Check Local Cache first (Instant)
    if (CA_DATABASE[cleanCA]) {
        return {
            source: 'local_cache',
            ...CA_DATABASE[cleanCA]
        };
    }

    // 2. Simulacao de Crawler (Futuro)
    // Aqui conectaríamos com seu backend Supabase Edge Function que faria o scraping real
    // const response = await fetch(`https://seuservidor.com/api/check-ca/${cleanCA}`);

    // Por enquanto, retornamos "Não Encontrado" mas sugerimos verificação manual
    return {
        source: 'unknown',
        name: 'CA Não encontrado na base local',
        manufacturer: 'Desconhecido',
        valid_until: null,
        status: 'VERIFICAR_MANUALMENTE',
        message: 'CA não consta na base offline. Verifique no site do MTE.'
    };
};

/**
 * Retorna lista de CAs alternativos válidos para um tipo de equipamento.
 * @param {string} type - Tipo (ex: 'Auditivo', 'Respirador')
 */
export const suggestAlternativeCA = (type) => {
    const suggestions = [];
    for (const [ca, data] of Object.entries(CA_DATABASE)) {
        if (data.status === 'VÁLIDO' && data.name.toLowerCase().includes(type.toLowerCase())) {
            suggestions.push({ ca, ...data });
        }
    }
    return suggestions;
};

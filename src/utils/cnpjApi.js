/**
 * Utility functions for fetching company data from CNPJ via BrasilAPI
 */

/**
 * Removes formatting from CNPJ string
 * @param {string} cnpj - CNPJ with or without formatting
 * @returns {string} Clean CNPJ with only numbers
 */
export function cleanCNPJ(cnpj) {
    return cnpj.replace(/[^\d]/g, '');
}

/**
 * Formats CNPJ string to XX.XXX.XXX/XXXX-XX
 * @param {string} cnpj - Clean CNPJ string
 * @returns {string} Formatted CNPJ
 */
export function formatCNPJ(cnpj) {
    const clean = cleanCNPJ(cnpj);
    if (clean.length !== 14) return cnpj;

    return clean.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
    );
}

/**
 * Validates CNPJ using verification digits
 * @param {string} cnpj - CNPJ to validate
 * @returns {boolean} True if valid
 */
export function validateCNPJ(cnpj) {
    const clean = cleanCNPJ(cnpj);

    if (clean.length !== 14) return false;
    if (/^(\d)\1+$/.test(clean)) return false; // All same digits

    // Calculate first verification digit
    let sum = 0;
    let pos = 5;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(clean[i]) * pos;
        pos = pos === 2 ? 9 : pos - 1;
    }
    let digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    if (parseInt(clean[12]) !== digit1) return false;

    // Calculate second verification digit
    sum = 0;
    pos = 6;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(clean[i]) * pos;
        pos = pos === 2 ? 9 : pos - 1;
    }
    let digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

    return parseInt(clean[13]) === digit2;
}

/**
 * Fetches company data from Receita Federal via BrasilAPI
 * @param {string} cnpj - CNPJ to lookup
 * @returns {Promise<object>} Company data
 * @throws {Error} If CNPJ not found or API error
 */
export async function fetchCNPJData(cnpj) {
    const clean = cleanCNPJ(cnpj);

    if (!validateCNPJ(clean)) {
        throw new Error('CNPJ inválido');
    }

    console.log('[CNPJ API] Fetching data for:', clean);

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${clean}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('CNPJ não encontrado na Receita Federal');
            }
            throw new Error('Erro ao consultar CNPJ. Tente novamente.');
        }

        const data = await response.json();
        console.log('[CNPJ API] Data received:', data);

        // Transform API response to our format
        return {
            cnpj: formatCNPJ(data.cnpj),
            cnpj_raw: data.cnpj,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia || data.razao_social,
            cnae: data.cnae_fiscal?.toString(),
            cnae_desc: data.cnae_fiscal_descricao,
            porte: data.porte,
            endereco: {
                logradouro: data.logradouro,
                numero: data.numero,
                complemento: data.complemento,
                bairro: data.bairro,
                municipio: data.municipio,
                uf: data.uf,
                cep: data.cep
            },
            situacao: data.descricao_situacao_cadastral,
            data_abertura: data.data_inicio_atividade
        };
    } catch (error) {
        console.error('[CNPJ API] Error:', error);
        throw error;
    }
}

/**
 * Formats phone number to WhatsApp format
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone
 */
export function formatWhatsApp(phone) {
    const clean = phone.replace(/[^\d]/g, '');

    if (clean.length === 11) {
        return clean.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (clean.length === 10) {
        return clean.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    }

    return phone;
}

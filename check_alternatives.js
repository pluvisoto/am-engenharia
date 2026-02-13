
import https from 'https';

const checkAPI = (url, name) => {
    console.log(`Checking ${name}: ${url}`);

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        console.log(`[${name}] Status: ${res.statusCode}`);
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            if (res.statusCode === 200) {
                try {
                    const json = JSON.parse(data);
                    console.log(`[${name}] SUCCESS. Name: ${json.nome || json.razao_social}`);
                    console.log(`[${name}] CNAE: ${json.atividade_principal?.[0]?.code || json.cnae_fiscal}`);
                } catch (e) {
                    console.error(`[${name}] Parse Error:`, e.message);
                }
            } else {
                console.error(`[${name}] Failed. Body prefix: ${data.substring(0, 100)}`);
            }
        });
    }).on('error', e => console.error(`[${name}] Network Error:`, e.message));
};

const cnpj = '27644520000193'; // User provided this one
checkAPI(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, 'ReceitaWS');
checkAPI(`https://publica.cnpj.ws/cnpj/${cnpj}`, 'PublicaCNPJ');

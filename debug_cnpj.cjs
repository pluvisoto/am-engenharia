
const https = require('https');

const cnpj = '44855281000130';
const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log(JSON.stringify(json, null, 2));
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw data:', data);
        }
    });

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});

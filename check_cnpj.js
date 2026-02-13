
import https from 'https';
import fs from 'fs';

const cnpj = '59551107000170';
const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;

console.log(`Fetching: ${url}`);

https.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            fs.writeFileSync('verify_cnpj.json', data);
            console.log('Saved to verify_cnpj.json');
        } else {
            console.error('Error Body:', data);
        }
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});

const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('docs/1 - PGR 2025-2026 - AM Engenharia Segurança do Trabalho - Assinado.pdf');

pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('docs/reference_text.txt', data.text);
    console.log('Text extracted successfully to docs/reference_text.txt');
}).catch(function (error) {
    console.error('Error extracting PDF text:', error);
});

import fs from 'fs';
import pdfLib from 'pdf-parse';

const pgrPath = 'docs/1 - PGR 2025-2026 - AM Engenharia Segurança do Trabalho - Assinado.pdf';

const run = async () => {
    try {
        const dataBuffer = fs.readFileSync(pgrPath);
        // Sometimes pdf-parse default export is the function itself, sometimes it's wrapped
        const pdf = pdfLib.default || pdfLib;

        const data = await pdf(dataBuffer);
        fs.writeFileSync('docs/pgr_extracted.txt', data.text);
        console.log('Success!');
    } catch (error) {
        console.error('Error:', error);
    }
};

run();

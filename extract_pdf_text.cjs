const fs = require('fs');
const pdf = require('pdf-parse');

const pgrPath = 'docs/1 - PGR 2025-2026 - AM Engenharia Segurança do Trabalho - Assinado.pdf';
const pcmsoPath = 'docs/2 - PCMSO - AM ENGENHARIA 2025 - AM Engenharia Inspeções - Assinado.pdf';

const extractText = async (filePath, outputPath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        // Handle both CommonJS and ES Module interop scenarios
        const parse = typeof pdf === 'function' ? pdf : pdf.default;
        if (typeof parse !== 'function') throw new Error('pdf-parse is not a function');

        const data = await parse(dataBuffer);
        fs.writeFileSync(outputPath, data.text);
        console.log(`Success: Extracted ${filePath} to ${outputPath}`);
    } catch (error) {
        console.error(`Error extracting ${filePath}:`, error.message);
    }
};

(async () => {
    await extractText(pgrPath, 'docs/pgr_text.txt');
    await extractText(pcmsoPath, 'docs/pcmso_text.txt');
})();

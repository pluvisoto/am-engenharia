
import html2pdf from 'html2pdf.js';

export const exportToPDF = (elementId, filename = 'documento.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id ${elementId} not found`);
        return;
    }

    const opt = {
        margin: [0, 0, 0, 0], // Let CSS control the margins for better precision
        filename: filename,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: {
            scale: 2, // Reduced from 3 to prevent canvas size limits
            useCORS: true,
            letterRendering: true,
            logging: true, // Enable logging for debugging
            windowWidth: 1024, // Optimized width
            scrollY: 0 // Force start from top
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();
};

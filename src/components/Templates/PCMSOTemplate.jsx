import React from 'react';
import { PCMSO_TEXT } from '../../utils/docContent';

/**
 * PCMSO TEMPLATE - NR-07 COMPLIANT (MAY 2025)
 * Linked to PGR Inventory (GHE / Risk mapping)
 */
const PCMSOTemplate = ({ companyData, data, date = new Date() }) => {

    const safeUpper = (val) => (val ? String(val).toUpperCase() : '');

    const RenderText = ({ text }) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            return <p key={i} style={styles.paragraph}>{trimmed}</p>;
        });
    };

    const Watermark = () => (
        <div style={styles.watermarkContainer}>
            <div style={styles.watermarkText}>W&DVidas</div>
        </div>
    );

    const PageHeader = () => (
        <div style={styles.vLogoHeader}>
            <div style={styles.headerLogoLeft}>
                <div style={{ color: '#ef4444', fontWeight: '900', fontSize: '18pt' }}>W&DVidas</div>
                <div style={{ fontSize: '7pt', marginTop: '-5px', fontWeight: 'bold' }}>Clínica Médica</div>
            </div>
            <div style={styles.headerLogoRight}>
                <div style={{ textAlign: 'right', marginRight: '10px' }}>
                    <div style={{ fontSize: '8pt', fontWeight: 'bold' }}>AM ENGENHARIA</div>
                    <div style={{ fontSize: '6pt', color: '#666' }}>GROUP</div>
                </div>
                <svg width="45" height="45" viewBox="0 0 100 100">
                    <path d="M50 10 L85 85 L15 85 Z" fill="#000" />
                    <path d="M50 35 L75 80 L25 80 Z" fill="#fff" />
                    <path d="M50 50 L65 75 L35 75 Z" fill="#000" />
                </svg>
            </div>
        </div>
    );

    const Footer = () => (
        <div style={styles.footerBranding}>
            <div style={styles.footerInfoBar}>
                W&D Vida Clínica Médica | Rua: Dr. Jose Pinto de Moura, 235 | Tel. (19) 2519.1890 | www.wdvidas.com.br
            </div>
        </div>
    );

    const Page = ({ children, title }) => (
        <div className="pdf-page" style={styles.pageStandard}>
            <Watermark />
            <PageHeader />
            <div style={styles.contentBody}>
                {title && <h1 style={styles.sectionHeading}>{safeUpper(title)}</h1>}
                {children}
            </div>
            <Footer />
        </div>
    );

    const ExamRow = ({ risk }) => {
        const isHighIntensity = risk.intensity >= (risk.leo * 0.5);
        const exams = [
            { name: 'Avaliação Clínica', p: 'Anual', adm: 'S', per: 'S', dem: 'S' }
        ];

        if (risk.category === 'Físico' && risk.name.includes('Ruído')) {
            exams.push({ name: 'Audiometria', p: isHighIntensity ? 'Anual' : 'Bienal', adm: 'S', per: 'S', dem: 'S' });
        }
        if (risk.category === 'Químico') {
            exams.push({ name: 'Espirometria', p: 'Anual', adm: 'S', per: 'S', dem: 'N' });
            if (isHighIntensity) exams.push({ name: 'Controle Biológico (Sangue/Urina)', p: 'Semestral', adm: 'S', per: 'S', dem: 'N' });
        }

        return exams.map((ex, i) => (
            <tr key={i}>
                <td style={styles.examTd}>{ex.name}</td>
                <td style={styles.examTd}>{ex.p}</td>
                <td style={styles.examTd}>{ex.adm}</td>
                <td style={styles.examTd}>{ex.per}</td>
                <td style={styles.examTd}>{ex.dem}</td>
                <td style={styles.examTd}>{risk.ghe || 'Geral'}</td>
            </tr>
        ));
    };

    return (
        <div id="pcmso-document-template" style={styles.container}>
            {/* ==================== CAPA ==================== */}
            <div style={styles.pageCover}>
                <PageHeader />
                <div style={styles.coverTextCenter}>
                    {['P', 'C', 'M', 'S', 'O'].map((l, i) => (
                        <div key={i} style={styles.coverLetterGroup}>
                            <span style={{ color: '#ef4444', fontSize: '80pt', fontWeight: '900' }}>{l}</span>
                            <span style={styles.coverLetterSub}>{['rograma de', 'ontrole', 'édico de', 'aúde', 'cupacional'][i]}</span>
                        </div>
                    ))}
                </div>
                <div style={styles.nrLabel}>NR-07</div>
                <div style={styles.coverFooterCompany}>
                    <div style={styles.compLabel}>EMPRESA</div>
                    <div style={styles.compValue}>{companyData.name}</div>
                </div>
                <Footer />
            </div>

            {/* IDENTIFICAÇÃO */}
            <Page title="1. IDENTIFICAÇÃO DA EMPRESA">
                <table style={styles.classicTable}>
                    <tbody>
                        <tr><td style={styles.classicLabel}>Razão Social</td><td style={styles.classicValue}>{companyData.name}</td></tr>
                        <tr><td style={styles.classicLabel}>CNPJ</td><td style={styles.classicValue}>{companyData.cnpj}</td></tr>
                        <tr><td style={styles.classicLabel}>Endereço</td><td style={styles.classicValue}>{companyData.address}</td></tr>
                    </tbody>
                </table>
                <RenderText text={PCMSO_TEXT.introduction} />
            </Page>

            {/* PLANEJAMENTO DE EXAMES - CONSISTÊNCIA CRUZADA PGR */}
            <Page title="2. PLANEJAMENTO MÉDICO (CONSISTÊNCIA NR-01)">
                <div style={styles.infoBox}>
                    Planos de exames gerados automaticamente a partir dos riscos identificados no PGR.
                </div>
                <table style={styles.examTable}>
                    <thead>
                        <tr style={styles.examThRow}>
                            <th style={styles.examTh}>EXAME OCUPACIONAL</th>
                            <th style={styles.examTh}>PERIOD.</th>
                            <th style={styles.examTh}>ADM</th>
                            <th style={styles.examTh}>PER</th>
                            <th style={styles.examTh}>DEM</th>
                            <th style={styles.examTh}>SETOR/GHE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.roles?.flatMap(r => r.risks || []).map((risk, idx) => (
                            <ExamRow key={idx} risk={risk} />
                        ))}
                    </tbody>
                </table>
            </Page>

            <Page title="CONSIDERAÇÕES FINAIS">
                <RenderText text={PCMSO_TEXT.final_provisions} />
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <div style={styles.signatureBox}>
                        <div style={styles.signatureName}>Médico do Trabalho</div>
                        <div style={styles.signatureLine}></div>
                        <div style={styles.signatureCaption}>CRM/SP Espec. Medicina do Trabalho</div>
                    </div>
                </div>
            </Page>
        </div>
    );
};

const styles = {
    container: { width: '210mm', backgroundColor: 'white', color: '#000', fontFamily: "'Segoe UI', Tahoma, sans-serif" },
    watermarkContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.03, pointerEvents: 'none', zIndex: 0 },
    watermarkText: { fontSize: '100pt', fontWeight: 'bold', transform: 'rotate(-45deg)', color: '#666' },
    pageStandard: { width: '210mm', height: '296.8mm', position: 'relative', backgroundColor: '#fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '30mm 0 20mm 0' },
    pageCover: { width: '210mm', height: '296.8mm', display: 'flex', flexDirection: 'column' },
    vLogoHeader: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', display: 'flex', justifyContent: 'space-between', padding: '20px 40px', boxSizing: 'border-box' },
    headerLogoLeft: { display: 'flex', flexDirection: 'column' },
    headerLogoRight: { display: 'flex', alignItems: 'center' },
    coverTextCenter: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' },
    coverLetterGroup: { display: 'flex', alignItems: 'center', marginBottom: '-30px' },
    coverLetterSub: { fontSize: '40pt', fontWeight: '700', marginLeft: '10px', color: '#1e293b' },
    nrLabel: { fontSize: '48pt', fontWeight: '900', textAlign: 'center', margin: '20px 0', color: '#ef4444' },
    coverFooterCompany: { margin: '0 40px 40px 40px', display: 'flex', border: '2px solid #000' },
    compLabel: { backgroundColor: '#000', color: '#fff', padding: '12px', fontWeight: 'bold', width: '120px', textAlign: 'center' },
    compValue: { padding: '12px', flex: 1, fontWeight: 'bold', fontSize: '12pt' },
    footerBranding: { padding: '10px 0', borderTop: '1px solid #eee' },
    footerInfoBar: { textAlign: 'center', fontSize: '7.5pt', color: '#0056b3' },
    contentBody: { flex: 1, padding: '0 15mm', zIndex: 1 },
    sectionHeading: { fontSize: '18pt', fontWeight: '900', textAlign: 'center', color: '#1e3a8a', marginBottom: '25px', textTransform: 'uppercase' },
    paragraph: { fontSize: '9pt', lineHeight: '1.6', textAlign: 'justify', marginBottom: '10px' },
    infoBox: { backgroundColor: '#eff6ff', padding: '10px', fontSize: '8pt', borderLeft: '4px solid #3b82f6', marginBottom: '15px' },
    classicTable: { width: '100%', borderCollapse: 'collapse', marginBottom: '15px' },
    classicLabel: { border: '1px solid #999', backgroundColor: '#f3f4f6', padding: '8px', fontSize: '9pt', fontWeight: 'bold', width: '25%' },
    classicValue: { border: '1px solid #999', padding: '8px', fontSize: '9pt' },
    examTable: { width: '100%', borderCollapse: 'collapse' },
    examThRow: { backgroundColor: '#f9f9f9' },
    examTh: { border: '1px solid #000', padding: '6px', fontSize: '8pt' },
    examTd: { border: '1px solid #000', padding: '6px', fontSize: '8pt', textAlign: 'center' },
    signatureBox: { textAlign: 'center', width: '50%' },
    signatureName: { fontFamily: "'Dancing Script', cursive", fontSize: '20pt', color: '#102e7a' },
    signatureLine: { borderTop: '2px solid #000', margin: '5px 0' },
    signatureCaption: { fontSize: '8pt' }
};

export default PCMSOTemplate;

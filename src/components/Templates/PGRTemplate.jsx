import React from 'react';
import { PGR_TEXT } from '../../utils/docContent';

/**
 * PGR TEMPLATE - NR-01 COMPLIANT
 * High-Density technical document with AIHA Matrix 5x5
 * Visual Branding: AM Engenharia (Black/Yellow/White)
 */
const PGRTemplate = ({ companyData, data, date = new Date() }) => {

    const safeUpper = (val) => (val ? String(val).toUpperCase() : '');

    const RenderText = ({ text }) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return <br key={i} />;
            return <p key={i} style={styles.paragraph}>{trimmed}</p>;
        });
    };

    const PageHeader = ({ pageNum }) => (
        <div style={styles.vLogoHeader}>
            <div style={styles.headerDecorLeft}>
                <div style={styles.headerTriangleYellow}></div>
                <div style={styles.headerTriangleBlack}></div>
            </div>
            <div style={styles.headerContentRight}>
                <div style={styles.headerTextGroup}>
                    <div style={{ fontSize: '9pt', fontWeight: 'bold' }}>AM ENGENHARIA</div>
                    <div style={{ fontSize: '7pt', color: '#666', letterSpacing: '4px' }}>GROUP</div>
                </div>
                <svg width="40" height="40" viewBox="0 0 100 100">
                    <path d="M50 10 L85 85 L15 85 Z" fill="#000" />
                    <path d="M50 35 L75 80 L25 80 Z" fill="#fff" />
                    <path d="M50 50 L65 75 L35 75 Z" fill="#000" />
                </svg>
                <div style={styles.pageNumberPlaceholder}>{pageNum || '1'}/30</div>
            </div>
        </div>
    );

    const Footer = () => (
        <div style={styles.footerBranding}>
            <div style={styles.footerContactBar}>
                <span>19 971515665</span> | <span>@amengenhariaseg</span> | <span>contato@amengenhariaseg.com.br</span>
            </div>
            <div style={styles.footerUrlBar}>WWW.AMENGENHARIASEG.COM.BR</div>
        </div>
    );

    const Page = ({ children, title, pageNum }) => (
        <div className="pdf-page" style={styles.pageStandard}>
            <PageHeader pageNum={pageNum} />
            <div style={styles.contentBody}>
                {title && <h1 style={styles.sectionHeading}>{safeUpper(title)}</h1>}
                {children}
            </div>
            <Footer />
        </div>
    );

    const SignatureBlock = () => (
        <div style={styles.signatureContainer}>
            <div style={styles.signatureBox}>
                <div style={styles.signatureName}>Diego Dalla Costa</div>
                <div style={styles.signatureLine}></div>
                <div style={{ fontWeight: 'bold', fontSize: '8pt' }}>Diego Dalla Costa</div>
                <div style={styles.signatureCaption}>Resp. Técnico | CREA-SP 5069508472</div>
            </div>
        </div>
    );

    // AIHA 5x5 Matrix Helper
    const getRiskInfo = (p, s) => {
        const score = p * s;
        if (score >= 25) return { label: 'INTOLERÁVEL', color: '#7f1d1d' };
        if (score >= 15) return { label: 'SUBSTANCIAL', color: '#ef4444' };
        if (score >= 6) return { label: 'MODERADO', color: '#facc15' };
        if (score >= 3) return { label: 'TOLERÁVEL', color: '#60a5fa' };
        return { label: 'TRIVIAL', color: '#4ade80' };
    };

    const InventoryGridItem = ({ risk }) => {
        if (!risk) return null;
        const p = risk.probability || 1;
        const s = risk.severity || 1;
        const info = getRiskInfo(p, s);

        return (
            <div style={styles.inventoryGridCard}>
                <div style={styles.riskBannerHeader(risk.category)}>
                    {safeUpper(risk.name || 'Agente de Risco')}
                </div>
                <table style={styles.tightTable}>
                    <tbody>
                        <tr>
                            <td style={styles.tightLabel}>Fonte Geradora:</td>
                            <td style={styles.tightValue}>{risk.source || 'Não identificada'}</td>
                            <td style={styles.tightLabel}>Exposição:</td>
                            <td style={styles.tightValue}>{risk.exposureType || 'Habitual/Intermitente'}</td>
                        </tr>
                        <tr>
                            <td style={styles.tightLabel}>GHE:</td>
                            <td style={styles.tightValue} colSpan="3">{risk.ghe || 'Mesmo Grupo de Exposição'}</td>
                        </tr>
                        <tr>
                            <td style={styles.tightLabel}>Danos / Lesões:</td>
                            <td style={styles.tightValue} colSpan="3">{risk.impact || 'Danos à integridade física'}</td>
                        </tr>
                    </tbody>
                </table>
                <table style={styles.riskMatrixTable}>
                    <tbody>
                        <tr>
                            <td style={styles.matrixCell}>Probabilidade: {p}/5</td>
                            <td style={styles.matrixCell}>Severidade: {s}/5</td>
                            <td style={{ ...styles.matrixCellLevel, backgroundColor: info.color, color: (p * s) >= 15 ? '#fff' : '#000' }}>
                                Nível do Risco: {info.label} ({p * s})
                            </td>
                        </tr>
                    </tbody>
                </table>
                {risk.justification && (
                    <div style={styles.justificationBox}>
                        <b>Justificativa Técnica (NR-01):</b> {risk.justification}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div id="pgr-document-template" style={styles.container}>
            {/* ==================== CAPA ==================== */}
            <div style={styles.pageCover}>
                <div style={styles.coverMain}>
                    <div style={styles.coverLeft}>
                        <div style={styles.coverTopV}><div style={styles.vYellow}></div><div style={styles.vBlack}></div></div>
                        <div style={styles.coverTitleGroup}>
                            <h1 style={styles.pgrYellowLarge}>PGR</h1>
                            <div style={styles.pgrSubtitle}>Programa de Gerenciamento de Riscos</div>
                        </div>
                        <div style={styles.coverLogoCenter}>
                            <svg width="150" height="150" viewBox="0 0 100 100"><path d="M50 10 L90 90 L10 90 Z" fill="#000" /><path d="M50 40 L75 80 L25 80 Z" fill="#fff" /><path d="M50 55 L65 75 L35 75 Z" fill="#000" /></svg>
                            <div style={styles.logoTextMain}>AM ENGENHARIA</div>
                        </div>
                        <div style={styles.coverCompanyBox}>
                            <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>{companyData.name}</div>
                            <div style={{ fontSize: '10pt', marginTop: '10px' }}>Vigência: {new Date().getFullYear()} - {new Date().getFullYear() + 1}</div>
                        </div>
                    </div>
                    <div style={styles.coverRightImage}>
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop" style={styles.fullImage} />
                    </div>
                </div>
            </div>

            {/* ==================== IDENTIFICAÇÃO ==================== */}
            <Page title="IDENTIFICAÇÃO E SUMÁRIO" pageNum="2">
                <table style={styles.refTable}>
                    <tbody>
                        <tr><td style={styles.refLabel}>Razão Social</td><td style={styles.refValue}>{companyData.name}</td></tr>
                        <tr><td style={styles.refLabel}>CNPJ</td><td style={styles.refValue}>{companyData.cnpj}</td></tr>
                        <tr><td style={styles.refLabel}>Endereço</td><td style={styles.refValue}>{companyData.address}</td></tr>
                        <tr><td style={styles.refLabel}>CNAE</td><td style={styles.refValue}>{companyData.cnae} - Grau de Risco {companyData.grau_risco || 2}</td></tr>
                    </tbody>
                </table>
                <div style={styles.summaryArea}>
                    <h3 style={styles.summaryTitle}>SEÇÕES DO DOCUMENTO</h3>
                    <div style={styles.summaryList}>
                        <span>1. Introdução e Metodologia</span>
                        <span>2. Inventário de Riscos Ocupacionais (NR-01.5.7.1)</span>
                        <span>3. Plano de Ação e Cronograma (NR-01.5.7.2)</span>
                        <span>4. Medidas de Prevenção e Controle</span>
                        <span>5. Disposições Finais</span>
                    </div>
                </div>
                <div style={{ marginTop: 'auto' }}><SignatureBlock /></div>
            </Page>

            {/* ==================== INVENTÁRIO DE RISCOS ==================== */}
            <Page title="2. INVENTÁRIO DE RISCOS OCUPACIONAIS" pageNum="10">
                <div style={styles.infoBox}>Exposições baseadas na Matriz 5x5 AIHA/Fundacentro e NR-01.</div>
                {data.roles?.map((role, rIdx) => (
                    <div key={rIdx}>
                        <div style={styles.roleHeaderBox}>GHE: {safeUpper(role.name)} | SETOR: {safeUpper(role.sector)}</div>
                        {role.risks?.map((risk, kIdx) => (
                            <InventoryGridItem key={kIdx} risk={risk} />
                        ))}
                    </div>
                ))}
            </Page>

            {/* ==================== PLANO DE AÇÃO ==================== */}
            <Page title="3. PLANO DE AÇÃO E CRONOGRAMA" pageNum="25">
                <table style={styles.actionTable}>
                    <thead>
                        <tr>
                            <th style={styles.actionTh}>Risco / Medida</th>
                            <th style={styles.actionTh}>Tipo (Hie.)</th>
                            <th style={styles.actionTh}>Prazo</th>
                            <th style={styles.actionTh}>Status</th>
                            <th style={styles.actionTh}>Evidência</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.roles?.flatMap(r => r.risks || []).map((risk, idx) => (
                            <tr key={idx}>
                                <td style={styles.actionTd}>
                                    <b>{risk.name}</b><br />
                                    <span style={{ fontSize: '7pt' }}>{risk.controls || 'Não especificado'}</span>
                                </td>
                                <td style={styles.actionTd}>EPC/EPI</td>
                                <td style={styles.actionTd}>Imediato</td>
                                <td style={styles.actionTd}><div style={styles.statusPill}>Planejado</div></td>
                                <td style={styles.actionTd}>---</td>
                            </tr>
                        ))}
                        <tr>
                            <td style={styles.actionTd}>Treinamento NR-01 Integ.</td>
                            <td style={styles.actionTd}>ADM</td>
                            <td style={styles.actionTd}>12/2025</td>
                            <td style={styles.actionTd}><div style={styles.statusPill}>Aguardando</div></td>
                            <td style={styles.actionTd}>Certificados</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ marginTop: '20px', fontSize: '8pt', fontStyle: 'italic' }}>
                    * Status: Planejado (Aguardando início), Em andamento (Execução parcial), Realizado (Concluído com evidência).
                </div>
            </Page>

            <Page title="DISPOSIÇÕES FINAIS" pageNum="30">
                <RenderText text={PGR_TEXT.final_provisions || 'Documento elaborado conforme NR-01.'} />
                <div style={{ marginTop: 'auto' }}><SignatureBlock /></div>
            </Page>
        </div>
    );
};

const styles = {
    container: { width: '210mm', backgroundColor: 'white', color: '#000', fontFamily: "'Segoe UI', Roboto, sans-serif" },
    pageStandard: { width: '210mm', height: '296.8mm', position: 'relative', backgroundColor: '#fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '35mm 0 25mm 0' },

    // CAPA
    pageCover: { width: '210mm', height: '296.8mm', backgroundColor: '#fff' },
    coverMain: { display: 'flex', height: '100%' },
    coverLeft: { flex: 0.6, padding: '60px 40px', display: 'flex', flexDirection: 'column', position: 'relative' },
    coverRightImage: { flex: 0.4 },
    fullImage: { width: '100%', height: '100%', objectFit: 'cover' },
    coverTopV: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100px' },
    vYellow: { width: '100px', height: '100px', backgroundColor: '#f9b800', transform: 'translate(-50%, -50%) rotate(45deg)', position: 'absolute' },
    vBlack: { width: '120px', height: '120px', backgroundColor: '#000', transform: 'translate(-40%, -60%) rotate(45deg)', position: 'absolute', zIndex: -1 },
    pgrYellowLarge: { fontSize: '120pt', fontWeight: '900', color: '#f9b800', lineHeight: '1', margin: '40px 0 0 -5px' },
    pgrSubtitle: { fontSize: '14pt', fontWeight: 'bold', color: '#000', marginTop: '-10px' },
    coverLogoCenter: { margin: '80px auto', textAlign: 'center' },
    logoTextMain: { fontSize: '24pt', fontWeight: '900', marginTop: '10px' },
    coverCompanyBox: { marginTop: 'auto', borderLeft: '10px solid #f9b800', paddingLeft: '20px' },

    // HEADER/FOOTER
    vLogoHeader: { position: 'absolute', top: 0, left: 0, width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between' },
    headerDecorLeft: { position: 'relative', width: '100px' },
    headerTriangleYellow: { position: 'absolute', top: '-40px', left: '-40px', width: '100px', height: '100px', backgroundColor: '#f9b800', transform: 'rotate(45deg)' },
    headerTriangleBlack: { position: 'absolute', top: '-45px', left: '-45px', width: '110px', height: '110px', backgroundColor: '#000', transform: 'rotate(45deg)', zIndex: -1 },
    headerContentRight: { padding: '15px 40px', display: 'flex', alignItems: 'center' },
    headerTextGroup: { textAlign: 'right', marginRight: '10px' },
    pageNumberPlaceholder: { position: 'absolute', right: '40px', top: '10px', fontSize: '8pt', color: '#666' },
    footerBranding: { marginTop: 'auto', padding: '10px 0' },
    footerContactBar: { display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '8pt', color: '#fff', backgroundColor: '#000', padding: '10px 0' },
    footerUrlBar: { backgroundColor: '#f9b800', color: '#000', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', padding: '6px' },

    // CONTENT
    contentBody: { flex: 1, padding: '0 15mm' },
    sectionHeading: { fontSize: '14pt', fontWeight: '900', color: '#000', marginBottom: '15px', borderBottom: '3px solid #f9b800', paddingBottom: '5px' },
    paragraph: { fontSize: '9pt', lineHeight: '1.6', textAlign: 'justify', marginBottom: '8px' },
    infoBox: { backgroundColor: '#f1f5f9', padding: '10px', fontSize: '8pt', borderLeft: '4px solid #000', marginBottom: '15px' },
    justificationBox: { padding: '8px', fontSize: '7.5pt', backgroundColor: '#fff7ed', border: '1px solid #fdba74', marginTop: '5px', fontStyle: 'italic' },

    // TABLES
    refTable: { width: '100%', borderCollapse: 'collapse', margin: '5px 0' },
    refLabel: { border: '1px solid #000', backgroundColor: '#f2f2f2', padding: '6px', fontSize: '9pt', fontWeight: 'bold', width: '25%' },
    refValue: { border: '1px solid #000', padding: '6px', fontSize: '9pt' },
    summaryArea: { marginTop: '30px' },
    summaryTitle: { fontSize: '12pt', fontWeight: 'bold', borderBottom: '2px solid #000', marginBottom: '10px' },
    summaryList: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '10pt' },

    // INVENTORY CARD
    roleHeaderBox: { backgroundColor: '#f9b800', padding: '8px', fontWeight: 'bold', textAlign: 'center', fontSize: '12pt', border: '2px solid #000', marginBottom: '10px', marginTop: '10px' },
    inventoryGridCard: { border: '1px solid #000', marginBottom: '15px' },
    riskBannerHeader: (cat) => ({ backgroundColor: cat === 'Físico' ? '#10b981' : cat === 'Químico' ? '#ef4444' : cat === 'Ergonômico' ? '#a855f7' : '#3b82f6', color: '#fff', padding: '5px 12px', fontWeight: '900', fontSize: '10pt' }),
    tightTable: { width: '100%', borderCollapse: 'collapse' },
    tightLabel: { border: '1px solid #000', padding: '4px 8px', fontSize: '8pt', fontWeight: 'bold', width: '120px', backgroundColor: '#fafafa' },
    tightValue: { border: '1px solid #000', padding: '4px 8px', fontSize: '8pt' },
    riskMatrixTable: { width: '100%', borderCollapse: 'collapse' },
    matrixCell: { border: '1px solid #000', padding: '6px', fontSize: '8pt', width: '33%', textAlign: 'center', fontWeight: 'bold' },
    matrixCellLevel: { border: '1px solid #000', padding: '6px', fontSize: '8pt', width: '33%', textAlign: 'center', fontWeight: 'bold' },

    // ACTION PLAN
    actionTable: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
    actionTh: { border: '1px solid #000', backgroundColor: '#000', color: '#fff', padding: '8px', fontSize: '8pt' },
    actionTd: { border: '1px solid #000', padding: '8px', fontSize: '8pt' },
    statusPill: { backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '10px', fontSize: '7pt', textAlign: 'center', border: '1px solid #ccc' },

    signatureContainer: { display: 'flex', justifyContent: 'center', margin: '20px 0' },
    signatureBox: { textAlign: 'center', width: '50%' },
    signatureName: { fontFamily: "'Dancing Script', cursive", fontSize: '18pt' },
    signatureLine: { borderTop: '2px solid #000', margin: '5px 0' },
    signatureCaption: { fontSize: '7.5pt' }
};

export default PGRTemplate;

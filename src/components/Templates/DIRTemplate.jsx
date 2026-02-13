import React from 'react';

const DIRTemplate = ({ companyData, date = new Date() }) => {
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const PageHeader = () => (
        <div style={styles.vLogoHeader}>
            <div style={styles.triangleTopLeft}></div>
            <div style={styles.triangleTopRight}>
                <div style={styles.topRightContent}>
                    <div style={{ fontSize: '7pt', fontWeight: 'bold' }}>AM ENGENHARIA</div>
                    <div style={{ fontSize: '5pt' }}>GROUP</div>
                    <svg width="25" height="25" viewBox="0 0 100 100" style={{ marginTop: '2px' }}>
                        <path d="M50 10 L85 80 L15 80 Z" fill="#000" />
                        <path d="M50 30 L70 70 L30 70 Z" fill="#fff" />
                        <path d="M50 45 L60 65 L40 65 Z" fill="#000" />
                    </svg>
                </div>
            </div>
            <div style={styles.headerTitleSide}>
                <div style={{ fontSize: '9pt', fontWeight: '900', color: '#f9b800' }}>AM ENGENHARIA DIR</div>
                <div style={{ fontSize: '6pt', color: '#666', marginTop: '-2px' }}>{companyData.name}</div>
            </div>
        </div>
    );

    const Footer = () => (
        <div style={styles.footerBranding}>
            <div style={styles.footerContactBar}>
                <span style={{ marginRight: '10px' }}>19 971515665</span>
                <span>@amengenhariaseg</span> | <span>contato@amengenhariaseg.com.br</span>
            </div>
            <div style={styles.footerUrlBar}>
                WWW.AMENGENHARIASEG.COM
            </div>
        </div>
    );

    return (
        <div id="dir-document-template" style={styles.container}>
            <div style={styles.pageStandard}>
                <PageHeader />

                <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '10px' }}>
                    <h2 style={styles.mainTitle}>DECLARAÇÃO DE INEXISTÊNCIA DE RISCO (DIR)</h2>
                    <span style={{ fontSize: '9pt', color: '#666' }}>Conforme NR-1 (Item 1.8.4) - Portaria SEPRT nº 6.730/2020</span>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>1. IDENTIFICAÇÃO DO EMPREGADOR</h3>
                    <table style={styles.classicTable}>
                        <tbody>
                            <tr>
                                <td style={styles.classicLabel}>Razão Social:</td>
                                <td style={styles.classicValue}>{companyData.name}</td>
                            </tr>
                            <tr>
                                <td style={styles.classicLabel}>CNPJ:</td>
                                <td style={styles.classicValue}>{companyData.cnpj}</td>
                            </tr>
                            <tr>
                                <td style={styles.classicLabel}>CNAE Principal:</td>
                                <td style={styles.classicValue}>{companyData.cnae} - {companyData.cnae_desc || 'Atividade consultiva'}</td>
                            </tr>
                            <tr>
                                <td style={styles.classicLabel}>Grau de Risco:</td>
                                <td style={styles.classicValue}>{companyData.grau_risco || '1/2'}</td>
                            </tr>
                            <tr>
                                <td style={styles.classicLabel}>Endereço:</td>
                                <td style={styles.classicValue}>{companyData.address || 'Endereço não cadastrado'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionHeader}>2. DECLARAÇÃO</h3>
                    <p style={styles.paragraph}>
                        Declaramos, para fins de dispensa da obrigatoriedade de elaboração do Programa de Gerenciamento de Riscos (PGR), conforme previsto no item 1.8.4 da Norma Regulamentadora nº 01 (NR-01), que o estabelecimento acima identificado <strong>não possui riscos físicos, químicos ou biológicos</strong> em seus ambientes de trabalho.
                    </p>
                    <p style={styles.paragraph}>
                        Declaramos ainda que as informações prestadas são verdadeiras e assumimos o compromisso de manter as medidas de prevenção necessárias, bem como de revisar esta declaração caso ocorram alterações no ambiente de trabalho que impliquem no surgimento dos referidos riscos.
                    </p>
                </div>

                <div style={styles.signatureArea}>
                    <p style={{ marginBottom: '50px' }}>{companyData.city || 'São Paulo'}, {formattedDate}</p>

                    <div style={styles.signatureBox}>
                        <div style={styles.signatureName}>Assinatura Digital</div>
                        <div style={styles.signatureLine}></div>
                        <div style={styles.signatureCaption}>
                            <strong>{companyData.name}</strong><br />
                            Empregador / Responsável Legal
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

const styles = {
    container: { width: '210mm', backgroundColor: 'white', color: '#000', fontFamily: "'Inter', sans-serif" },
    pageStandard: { width: '210mm', minHeight: '297mm', position: 'relative', padding: '35mm 15mm 25mm 15mm', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },

    vLogoHeader: { position: 'absolute', top: 0, left: 0, width: '100%', height: '80px', pointerEvents: 'none', zIndex: 1 },
    triangleTopLeft: { position: 'absolute', top: '-40px', left: '-40px', width: '120px', height: '120px', backgroundColor: '#000', transform: 'rotate(45deg)', zIndex: -1 },
    triangleTopRight: { position: 'absolute', top: 0, right: 0, textAlign: 'right', padding: '15px', zIndex: 10 },
    topRightContent: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'none' },
    headerTitleSide: { position: 'absolute', top: '15px', right: '85px', textAlign: 'right', zIndex: 5 },

    mainTitle: { margin: '0', fontSize: '18pt', fontWeight: '900', color: '#000' },
    section: { marginBottom: '30px' },
    sectionHeader: { fontSize: '11pt', fontWeight: 'bold', borderBottom: '2px solid #f9b800', marginBottom: '15px', paddingBottom: '5px' },

    classicTable: { width: '100%', borderCollapse: 'collapse' },
    classicLabel: { border: '1px solid #ddd', backgroundColor: '#f8fafc', padding: '8px', fontSize: '9pt', fontWeight: 'bold', width: '25%' },
    classicValue: { border: '1px solid #ddd', padding: '8px', fontSize: '9pt' },

    paragraph: { fontSize: '10pt', lineHeight: '1.6', textAlign: 'justify', marginBottom: '15px', textIndent: '20px' },

    signatureArea: { marginTop: '60px', textAlign: 'center' },
    signatureBox: { display: 'inline-block', width: '300px', textAlign: 'center' },
    signatureName: { fontFamily: "'Dancing Script', cursive", fontSize: '18pt', color: '#102e7a', marginBottom: '5px' },
    signatureLine: { borderTop: '2px solid #000', marginBottom: '10px' },
    signatureCaption: { fontSize: '8pt', color: '#333' },

    footerBranding: { marginTop: 'auto', paddingBottom: '10px' },
    footerContactBar: { display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '8pt', color: '#333', borderTop: '1px solid #ddd', paddingTop: '10px' },
    footerUrlBar: { backgroundColor: '#000', color: '#fff', textAlign: 'center', fontSize: '9pt', fontWeight: 'bold', padding: '5px', marginTop: '5px' }
};

export default DIRTemplate;

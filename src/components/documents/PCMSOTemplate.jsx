import React from 'react';

/**
 * PCMSO ULTRA PREMIUM - V4.0.0
 * Alinhado ao PGR e à Nova NR-07
 * Identidade Visual AM ENGENHARIA (Preto/Amarelo)
 */
const PCMSOTemplate = ({ companyData, data, date = new Date() }) => {
    const safeUpper = (val) => (val ? String(val).toUpperCase() : '');
    const currentYear = date.getFullYear();

    const PageHeader = ({ pageNum }) => (
        <div style={styles.header}>
            <div style={styles.headerTop}>
                <div style={styles.headerLogo}>
                    <span style={{ fontWeight: 'bold' }}>AM ENGENHARIA</span> GROUP
                </div>
                <div style={styles.headerRight}>PCMSO ● {currentYear} ● PÁGINA {pageNum}</div>
            </div>
            <div style={styles.headerLine}></div>
        </div>
    );

    const PageFooter = () => (
        <div style={styles.footer}>
            <div style={styles.footerContent}>
                <span style={styles.footerContact}>&copy; AM ENGENHARIA E MEDICINA DO TRABALHO</span>
                <span style={styles.footerWeb}>WWW.AMENGENHARIASEG.COM.BR</span>
            </div>
            <div style={styles.footerLine}></div>
        </div>
    );

    const Page = ({ children, pageNum }) => (
        <div className="pdf-page" style={styles.page}>
            <PageHeader pageNum={pageNum} />
            <div style={styles.pageBody}>
                {children}
            </div>
            <PageFooter />
        </div>
    );

    return (
        <div id="pcmso-document-template" style={styles.container}>

            {/* --- CAPA --- */}
            <div className="pdf-page" style={styles.coverPage}>
                <div style={styles.coverBlackCorner}></div>
                <div style={styles.coverLogoTop}>
                    <div style={styles.logoLabel}>AM ENGENHARIA</div>
                    <div style={styles.logoSub}>MEDICINA DO TRABALHO</div>
                </div>

                <div style={styles.coverCenter}>
                    <div style={styles.coverSymbol}>✚</div>
                    <h1 style={styles.coverMainTitle}>PCMSO</h1>
                    <p style={styles.coverSubtitle}>PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL</p>
                    <div style={styles.coverYellowDivider}></div>

                    <div style={styles.coverClientBox}>
                        <h2 style={styles.coverClientName}>{safeUpper(companyData.name)}</h2>
                        <p style={styles.coverClientCnpj}>CNPJ: {companyData.cnpj}</p>
                        <p style={styles.coverClientAddress}>{safeUpper(companyData.address)}</p>
                    </div>
                </div>

                <div style={styles.coverBottomInfo}>
                    <div style={styles.coverPeriod}>VIGÊNCIA: {currentYear} - {currentYear + 1}</div>
                </div>
            </div>

            {/* --- PAGINA 1: IDENTIFICAÇÃO E DIRETRIZES --- */}
            <Page pageNum="1">
                <table style={styles.tableRef}>
                    <tbody>
                        <tr><td style={styles.tdLabel}>Empregador:</td><td style={styles.tdValue} colSpan="3">{safeUpper(companyData.name)}</td></tr>
                        <tr><td style={styles.tdLabel}>Endereço:</td><td style={styles.tdValue} colSpan="3">{safeUpper(companyData.address)}</td></tr>
                        <tr><td style={styles.tdLabel}>CNPJ:</td><td style={styles.tdValue}>{companyData.cnpj}</td><td style={styles.tdLabel}>Grau de Risco:</td><td style={styles.tdValue}>{companyData.grau_risco || 'ESTIMADO: 2'}</td></tr>
                    </tbody>
                </table>

                <h3 style={styles.h3Title}>1. DIRETRIZES DO PROGRAMA (NR-07)</h3>
                <p style={styles.pText}>O presente PCMSO tem como objetivo o diagnóstico precoce dos agravos à saúde relacionados ao trabalho, inclusive de natureza subclínica, além da detecção de casos de doenças profissionais ou danos irreversíveis à saúde dos trabalhadores.</p>
                <p style={styles.pText}>Este programa é parte integrante do conjunto mais amplo de iniciativas da empresa no campo da saúde dos trabalhadores, devendo estar harmonizado com o PGR (Programa de Gerenciamento de Riscos).</p>

                <h3 style={styles.h3Title}>2. RESPONSABILIDADES</h3>
                <p style={styles.pBullet}>● <b>Do Empregador:</b> Garantir a elaboração e efetiva implementação do PCMSO, bem como custear todos os procedimentos sem ônus ao empregado.</p>
                <p style={styles.pBullet}>● <b>Do Médico Coordenador:</b> Elaborar o PCMSO com base nos riscos identificados no PGR e realizar o relatório analítico anual.</p>
            </Page>

            {/* --- PAGINA 2: QUADRO DE EXAMES --- */}
            <Page pageNum="2">
                <h3 style={styles.h3Title}>3. PLANEJAMENTO DE EXAMES E PROTOCOLO MÉDICO</h3>
                <p style={styles.pText}>Abaixo, detalhamos os exames complementares necessários para cada grupo, baseados na exposição ocupacional identificada no PGR.</p>

                <table style={styles.tableExams}>
                    <thead>
                        <tr style={styles.thYellow}>
                            <th>EXAME</th>
                            <th>CARGOS / GHE</th>
                            <th>PERIODICIDADE</th>
                            <th>JUSTIFICATIVA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data.medical_exams || []).map((exam, idx) => (
                            <tr key={idx}>
                                <td style={styles.tdEx}><b>{safeUpper(exam.exam_type)}</b></td>
                                <td style={styles.tdEx}>TODOS DO SETOR</td>
                                <td style={styles.tdEx}>{exam.periodicidade}</td>
                                <td style={styles.tdEx}>{exam.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Page>

            {/* --- PAGINA 3: PRIMEIROS SOCORROS E ASO --- */}
            <Page pageNum="3">
                <h3 style={styles.h3Title}>4. PROTOCOLO DE PRIMEIROS SOCORROS</h3>
                <p style={styles.pText}>A empresa mantém kit de primeiros socorros adequado às suas atividades, sob cuidado de colaborador treinado. Em casos de emergência grave, acionar o SAMU (192) ou o Hospital de Referência indicado no PGR.</p>

                <div style={styles.asoBox}>
                    <div style={styles.asoHeader}>ASO - MODELO DE REFERÊNCIA</div>
                    <div style={styles.asoRow}>NOME: ___________________________________________________________</div>
                    <div style={styles.asoRow}>CARGO: _________________________________________ GHE: ___________</div>
                    <div style={styles.asoRow}>TIPO: ( ) ADM ( ) PER ( ) RET ( ) MUD ( ) DEM</div>
                    <div style={styles.asoFooter}>CONCLUSÃO MÉDICA: ( ) APTO ( ) INAPTO</div>
                </div>

                <div style={styles.signatureArea}>
                    <div style={styles.sigBox}>
                        <div style={styles.sigLine}></div>
                        <p style={styles.sigName}>MÉDICO DO TRABALHO COORDENADOR</p>
                        <p style={styles.sigSub}>Registro CRM Ativo / Especialista</p>
                    </div>
                </div>
            </Page>

        </div>
    );
};

const styles = {
    container: { width: '210mm', backgroundColor: '#fff', color: '#1a1a1a', fontFamily: "'Segoe UI', sans-serif" },
    page: { width: '210mm', height: '297mm', padding: '15mm', boxSizing: 'border-box', position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', borderBottom: '1px dashed #ccc' },
    pageBody: { flex: 1, padding: '10px 0' },

    header: { marginBottom: '15px' },
    headerTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '3px' },
    headerLogo: { fontSize: '10pt', color: '#000' },
    headerRight: { fontSize: '8.5pt', color: '#999', fontWeight: 'bold' },
    headerLine: { height: '3px', backgroundColor: '#facc15', width: '100%' },

    footer: { marginTop: 'auto', paddingTop: '10px' },
    footerContent: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' },
    footerContact: { fontSize: '7.5pt', color: '#444' },
    footerWeb: { fontSize: '6.5pt', color: '#aaa', marginTop: '2px' },
    footerLine: { height: '8px', backgroundColor: '#facc15', width: '100%' },

    coverPage: { width: '210mm', height: '297mm', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' },
    coverBlackCorner: { position: 'absolute', top: 0, left: 0, width: '40%', height: '40%', backgroundColor: '#000', clipPath: 'polygon(0 0, 100% 0, 0 100%)' },
    coverLogoTop: { position: 'absolute', top: '40px', right: '40px', textAlign: 'right' },
    logoLabel: { fontSize: '18pt', fontWeight: 'bold' },
    logoSub: { fontSize: '10pt', color: '#666', letterSpacing: '2px' },
    coverCenter: { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 50px' },
    coverSymbol: { fontSize: '60pt', fontWeight: '900', color: '#facc15' },
    coverMainTitle: { fontSize: '100pt', fontWeight: '900', margin: '-10px 0', letterSpacing: '-5px' },
    coverSubtitle: { fontSize: '16pt', letterSpacing: '2px', color: '#444', marginBottom: '40px', fontWeight: 'bold', textAlign: 'center' },
    coverYellowDivider: { width: '180px', height: '14px', backgroundColor: '#000' },
    coverClientBox: { marginTop: '60px', textAlign: 'center' },
    coverClientName: { fontSize: '24pt', fontWeight: '900' },
    coverClientCnpj: { fontSize: '14pt', marginTop: '10px', color: '#555' },
    coverClientAddress: { fontSize: '10pt', marginTop: '5px', color: '#888' },
    coverBottomInfo: { position: 'absolute', bottom: '60px', width: '100%', textAlign: 'center' },
    coverPeriod: { fontSize: '13pt', fontWeight: 'bold', color: '#000' },

    tableRef: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px', border: '1.5px solid #000' },
    tdLabel: { width: '20%', padding: '10px', fontSize: '9pt', fontWeight: 'bold', border: '1px solid #000', backgroundColor: '#f4f4f4' },
    tdValue: { padding: '10px', fontSize: '9pt', border: '1px solid #000' },

    h3Title: { fontSize: '12pt', fontWeight: '900', margin: '20px 0 10px 0', borderLeft: '4px solid #facc15', paddingLeft: '10px' },
    pText: { fontSize: '9.5pt', lineHeight: '1.5', textAlign: 'justify', marginBottom: '10px' },
    pBullet: { fontSize: '9.5pt', marginBottom: '8px' },

    tableExams: { width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000' },
    thYellow: { backgroundColor: '#facc15', padding: '10px', border: '1px solid #000', fontSize: '9pt' },
    tdEx: { padding: '10px', border: '1px solid #000', fontSize: '9pt' },

    asoBox: { border: '1.5px solid #000', padding: '20px', marginTop: '30px' },
    asoHeader: { textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #000', paddingBottom: '10px', marginBottom: '20px' },
    asoRow: { marginBottom: '15px', fontSize: '10pt' },
    asoFooter: { fontWeight: 'bold', marginTop: '20px' },

    signatureArea: { marginTop: 'auto', paddingTop: '30px', display: 'flex', justifyContent: 'center' },
    sigBox: { textAlign: 'center', width: '300px' },
    sigLine: { height: '1.2px', backgroundColor: '#000', marginBottom: '10px' },
    sigName: { fontWeight: 'bold', fontSize: '10pt' },
    sigSub: { fontSize: '8.5pt', color: '#666' }
};

export default PCMSOTemplate;

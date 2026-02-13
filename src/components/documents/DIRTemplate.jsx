import React from 'react';

/**
 * DIR PREMIUM - DECLARAÇÃO DE INEXISTÊNCIA DE RISCOS
 * Conformidade: NR-01.8.4
 */
const DIRTemplate = ({ companyData, date = new Date() }) => {
    const safeUpper = (val) => (val ? String(val).toUpperCase() : '');

    const PageHeader = () => (
        <div style={styles.header}>
            <div style={styles.headerLeft}>
                <div style={styles.headerLineYellow}></div>
                <div style={styles.headerTitle}>DIR ● DECLARAÇÃO DE INEXISTÊNCIA DE RISCO</div>
            </div>
        </div>
    );

    const PageFooter = () => (
        <div style={styles.footer}>
            <div style={styles.footerBrand}>AM ENGENHARIA E MEDICINA DO TRABALHO</div>
            <div style={styles.footerRule}></div>
            <div style={styles.footerContact}>WWW.AMENGENHARIASEG.COM.BR ● CONTATO@AMENGENHARIASEG.COM.BR</div>
        </div>
    );

    return (
        <div id="dir-document-template" style={styles.container}>
            <div className="pdf-page" style={styles.page}>
                <PageHeader />

                <div style={styles.coverContent}>
                    <div style={styles.docBanner}>DOCUMENTO OFICIAL</div>
                    <h1 style={styles.mainTitle}>DIR</h1>
                    <p style={styles.subTitle}>DECLARAÇÃO DE INEXISTÊNCIA DE RISCOS</p>
                    <div style={styles.divider}></div>
                </div>

                <div style={styles.content}>
                    <table style={styles.tableRef}>
                        <tbody>
                            <tr><td style={styles.tdLabel}>EMPRESA</td><td style={styles.tdValue}>{safeUpper(companyData.name || companyData.razao_social)}</td></tr>
                            <tr><td style={styles.tdLabel}>CNPJ</td><td style={styles.tdValue}>{companyData.cnpj}</td></tr>
                            <tr><td style={styles.tdLabel}>CNAE</td><td style={styles.tdValue}>{companyData.cnae} ● {safeUpper(companyData.cnae_desc)}</td></tr>
                        </tbody>
                    </table>

                    <div style={styles.declarationBox}>
                        <p style={styles.p}>
                            DECLARAMOS, PARA OS DEVIDOS FINS DE DIREITO E CONFORME O ITEM 1.8.4 DA NORMA REGULAMENTADORA Nº 01 (NR 01), QUE O ESTABELECIMENTO IDENTIFICADO NESTA DECLARAÇÃO <b>NÃO POSSUI RISCOS FÍSICOS, QUÍMICOS OU BIOLÓGICOS</b> EM SEU AMBIENTE DE TRABALHO.
                        </p>
                        <p style={styles.p}>
                            ESTA DECLARAÇÃO ISENTA A ORGANIZAÇÃO DA ELABORAÇÃO DO PGR, DESDE QUE MANTIDAS AS CONDIÇÕES AQUI DESCRITAS. O MONITORAMENTO DE RISCOS ERGONÔMICOS E DE ACIDENTES SEGUE AS DEMAIS NORMAS VIGENTES.
                        </p>
                    </div>

                    <div style={styles.signatureArea}>
                        <p style={{ fontSize: '10pt', marginBottom: '40px' }}>GERADO EM {date.toLocaleDateString()}</p>
                        <div style={styles.sigBox}>
                            <div style={styles.sigLine}></div>
                            <p style={styles.sigName}>{safeUpper(companyData.name || companyData.razao_social)}</p>
                            <p style={styles.sigRole}>RESPONSÁVEL LEGAL</p>
                        </div>
                    </div>
                </div>

                <PageFooter />
            </div>
        </div>
    );
};

const styles = {
    container: { width: '210mm', backgroundColor: 'white', color: '#1a1a1a', fontFamily: "'Outfit', 'Inter', sans-serif" },
    page: { width: '210mm', height: '296.8mm', padding: '15mm 15mm 20mm 15mm', boxSizing: 'border-box', position: 'relative', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', alignItems: 'center', marginBottom: '10mm', paddingBottom: '5px', borderBottom: '1px solid #e5e7eb' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    headerLineYellow: { width: '4px', height: '24px', backgroundColor: '#facc15' },
    headerTitle: { fontSize: '8pt', fontWeight: '900', letterSpacing: '2px' },
    footer: { position: 'absolute', bottom: '15mm', left: '15mm', right: '15mm' },
    footerBrand: { fontSize: '9pt', fontWeight: '900', textAlign: 'center' },
    footerRule: { height: '1px', backgroundColor: '#e5e7eb', margin: '5px 0' },
    footerContact: { fontSize: '7pt', textAlign: 'center', color: '#9ca3af', letterSpacing: '1px' },
    coverContent: { textAlign: 'center', marginTop: '20mm', marginBottom: '20mm' },
    docBanner: { display: 'inline-block', backgroundColor: '#000', color: '#facc15', padding: '4px 12px', fontSize: '9pt', fontWeight: '900', marginBottom: '10px' },
    mainTitle: { fontSize: '80pt', fontWeight: '900', margin: 0 },
    subTitle: { fontSize: '14pt', letterSpacing: '4px', opacity: 0.6 },
    divider: { width: '60px', height: '6px', backgroundColor: '#facc15', margin: '20px auto' },
    content: { flex: 1 },
    tableRef: { width: '100%', borderCollapse: 'collapse', marginBottom: '30px' },
    tdLabel: { width: '25%', padding: '12px', fontSize: '9pt', fontWeight: 'bold', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' },
    tdValue: { padding: '12px', fontSize: '10pt', border: '1px solid #e5e7eb' },
    declarationBox: { padding: '30px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' },
    p: { fontSize: '11pt', lineHeight: 1.8, marginBottom: '20px', textAlign: 'justify' },
    signatureArea: { marginTop: '40mm', textAlign: 'center' },
    sigBox: { textAlign: 'center', width: '300px', margin: '0 auto' },
    sigLine: { height: '1px', backgroundColor: '#000', marginBottom: '10px' },
    sigName: { fontSize: '11pt', fontWeight: 'bold', margin: 0 },
    sigRole: { fontSize: '8pt', opacity: 0.7, margin: 0 }
};

export default DIRTemplate;

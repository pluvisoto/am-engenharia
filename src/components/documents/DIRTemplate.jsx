import React from 'react';

const DIRTemplate = ({ companyData, date = new Date() }) => {
    // Format date: "Cidade, DD de Mês de AAAA"
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div id="dir-document-template" style={{
            padding: '40px',
            fontFamily: 'Times New Roman, serif',
            color: '#000',
            background: '#fff',
            width: '210mm', // A4 width
            minHeight: '297mm', // A4 height
            margin: '0 auto',
            fontSize: '12pt',
            lineHeight: '1.5'
        }}>
            {/* CABEÇALHO */}
            <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #000', paddingBottom: '20px' }}>
                <h2 style={{ margin: '0', fontSize: '16pt', fontWeight: 'bold' }}>DECLARAÇÃO DE INEXISTÊNCIA DE RISCO (DIR)</h2>
                <span style={{ fontSize: '10pt' }}>Conforme NR-1 (Item 1.8.4) - Portaria SEPRT nº 6.730/2020</span>
            </div>

            {/* 1. IDENTIFICAÇÃO DO EMPREGADOR */}
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>1. IDENTIFICAÇÃO DO EMPREGADOR</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '5px', fontWeight: 'bold', width: '30%' }}>Razão Social:</td>
                            <td style={{ padding: '5px' }}>{companyData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', fontWeight: 'bold' }}>CNPJ:</td>
                            <td style={{ padding: '5px' }}>{companyData.cnpj}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', fontWeight: 'bold' }}>CNAE Principal:</td>
                            <td style={{ padding: '5px' }}>{companyData.cnae} - {companyData.cnae_desc}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', fontWeight: 'bold' }}>Grau de Risco:</td>
                            <td style={{ padding: '5px' }}>{companyData.grau_risco || '1/2'}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '5px', fontWeight: 'bold' }}>Endereço:</td>
                            <td style={{ padding: '5px' }}>{companyData.address || 'Endereço não cadastrado'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* 2. DECLARAÇÃO */}
            <div style={{ marginBottom: '40px', textAlign: 'justify' }}>
                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>2. DECLARAÇÃO</h3>
                <p style={{ marginBottom: '15px', textIndent: '30px' }}>
                    Declaramos, para fins de dispensa da obrigatoriedade de elaboração do Programa de Gerenciamento de Riscos (PGR), conforme previsto no item 1.8.4 da Norma Regulamentadora nº 01 (NR-01), que o estabelecimento acima identificado <strong>não possui riscos físicos, químicos ou biológicos</strong> em seus ambientes de trabalho.
                </p>
                <p style={{ marginBottom: '15px', textIndent: '30px' }}>
                    Declaramos ainda que as informações prestadas são verdadeiras e assumimos o compromisso de manter as medidas de prevenção necessárias, bem como de revisar esta declaração caso ocorram alterações no ambiente de trabalho que impliquem no surgimento dos referidos riscos.
                </p>
                <p style={{ marginBottom: '15px', textIndent: '30px' }}>
                    Esta declaração não isenta a empresa do cumprimento das demais obrigações previstas nas Normas Regulamentadoras, incluindo a gestão de riscos ergonômicos e de acidentes.
                </p>
            </div>

            {/* 3. ASSINATURAS */}
            <div style={{ marginTop: '80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <p>{companyData.city || 'Local'}, {formattedDate}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
                    <div style={{ textAlign: 'center', width: '45%' }}>
                        <div style={{ borderTop: '1px solid #000', paddingTop: '5px' }}>
                            <strong>{companyData.name}</strong><br />
                            <span style={{ fontSize: '10pt' }}>Empregador / Responsável Legal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RODAPÉ */}
            <div style={{ position: 'fixed', bottom: '20px', left: '40px', right: '40px', textAlign: 'center', fontSize: '8pt', color: '#666', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                Documento gerado automaticamente pelo Sistema AM Engenharia em {formattedDate}.
            </div>
        </div>
    );
};

export default DIRTemplate;

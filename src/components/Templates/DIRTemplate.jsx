import React from 'react';
import SignatureBlock from '../SignatureBlock';
import DocumentCover from '../DocumentCover';

const DIRTemplate = ({ companyData }) => {
    const currentDate = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });

    const PageBreak = () => <div style={{ pageBreakAfter: 'always', height: '1px' }}></div>;

    return (
        <div className="dir-document" style={{
            background: 'white',
            color: '#1e293b',
            padding: '40px',
            fontSize: '12pt',
            fontFamily: '"Times New Roman", serif',
            lineHeight: '1.6',
            textAlign: 'justify'
        }}>
            <DocumentCover
                title="DIR"
                subtitle="DECLARAÇÃO DE INEXISTÊNCIA DE RISCOS"
                companyName={companyData.name}
                validity="2025"
                docCode={`DIR-${companyData.cnpj.slice(0, 8)}`}
            />

            <PageBreak />

            <div style={{ border: '1px solid #1e293b', padding: '40px', minHeight: '260mm' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold' }}>DECLARAÇÃO DE INEXISTÊNCIA DE RISCOS</h2>
                    <p style={{ fontSize: '14pt', fontStyle: 'italic', marginTop: '10px' }}>(Conforme NR-01, item 1.8.4)</p>
                </div>

                <div style={{ textAlign: 'justify', marginBottom: '40px' }}>
                    <p style={{ marginBottom: '20px' }}>
                        A empresa <strong>{companyData.name}</strong>, inscrita no CNPJ sob o nº <strong>{companyData.cnpj}</strong>,
                        classificada com Grau de Risco <strong>{companyData.grau_risco || '1/2'}</strong>, declara para fins de comprovação junto à fiscalização do trabalho:
                    </p>

                    <p style={{ marginBottom: '20px' }}>
                        1. Que realizou o levantamento preliminar de perigos em suas atividades e instalações.
                    </p>

                    <p style={{ marginBottom: '20px' }}>
                        2. Que <strong>NÃO IDENTIFICOU</strong> exposições ocupacionais a agentes físicos, químicos ou biológicos
                        em conformidade com a Norma Regulamentadora nº 01 (Disposições Gerais e Gerenciamento de Riscos Ocupacionais)
                        e a Norma Regulamentadora nº 09 (Avaliação e Controle das Exposições Ocupacionais a Agentes Físicos, Químicos e Biológicos).
                    </p>

                    <p style={{ marginBottom: '20px' }}>
                        3. Que <strong>DECLARA A INEXISTÊNCIA DE RISCOS</strong> físicos, químicos e biológicos no estabelecimento,
                        ficando dispensada da elaboração do Programa de Gerenciamento de Riscos (PGR), conforme o subitem 1.8.4 da NR-01.
                    </p>

                    <p>
                        Esta declaração não isenta a empresa do cumprimento das demais disposições previstas nas Normas Regulamentadoras,
                        incluindo a necessidade de emissão de Atestado de Saúde Ocupacional (ASO) quando aplicável.
                    </p>
                </div>

                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '2rem' }}>{currentDate}</p>
                    <SignatureBlock
                        signatories={[
                            { name: companyData.name, role: 'Responsável Legal', doc: 'Declarado conforme NR-01' }
                        ]}
                    />
                </div>

                <div style={{ marginTop: '100px', fontSize: '10pt', color: '#666', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                    <p><strong>Nota:</strong> A dispensa do PGR não desobriga a empresa de realizar os exames médicos (PCMSO) se houver riscos ergonômicos ou de acidentes identificados.</p>
                </div>
            </div>
        </div>
    );
};

export default DIRTemplate;

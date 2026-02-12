
import React from 'react';
import DocumentCover from '../DocumentCover';
import SignatureBlock from '../SignatureBlock';

const FichaMEITemplate = ({ companyData }) => {
    const PageBreak = () => <div style={{ pageBreakAfter: 'always', height: '1px' }}></div>;

    return (
        <div className="mei-document" style={{
            background: 'white',
            color: '#1e293b',
            padding: '40px',
            fontSize: '11pt',
            fontFamily: '"Times New Roman", serif',
            lineHeight: '1.5',
            textAlign: 'justify'
        }}>
            <DocumentCover
                title="FICHA MEI"
                subtitle="ORIENTAÇÕES DE SEGURANÇA E SAÚDE"
                companyName={companyData.name}
                validity="2025 - 2026"
                docCode={`MEI-${companyData.cnpj.slice(0, 8)}`}
            />

            <PageBreak />

            <div style={{ padding: '20px', border: '1px solid #000', minHeight: '260mm' }}>
                <h2 style={{ borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>FICHA DE ORIENTAÇÃO - MEI</h2>

                {/* COMPANY INFO */}
                <section style={{ marginBottom: '30px', background: '#f8f9fa', padding: '15px', borderRadius: '4px' }}>
                    <h3 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '5px', marginBottom: '15px', color: '#0056b3' }}>
                        1. Identificação do MEI
                    </h3>
                    <p><strong>Razão Social:</strong> {companyData.name}</p>
                    <p><strong>CNPJ:</strong> {companyData.cnpj}</p>
                    <p><strong>Atividade (CNAE):</strong> {companyData.cnae} - {companyData.cnae_desc}</p>
                </section>

                {/* SAFETY GUIDELINES */}
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '5px', marginBottom: '15px', color: '#0056b3' }}>
                        2. Orientações Gerais de Segurança
                    </h3>
                    <ul style={{ paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Ambiente de Trabalho:</strong> Manter o local de trabalho limpo, organizado e com boa iluminação.
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Instalações Elétricas:</strong> Verificar periodicamente o estado de fios, tomadas e equipamentos para evitar curto-circuitos e choques.
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Prevenção de Incêndios:</strong> Manter extintores desobstruídos e dentro do prazo de validade (se aplicável ao local).
                        </li>
                        <li style={{ marginBottom: '10px' }}>
                            <strong>Equipamentos de Proteção (EPI):</strong> Utilizar calçados fechados e outros equipamentos recomendados para a atividade específica.
                        </li>
                    </ul>
                </section>

                {/* EMERGENCY */}
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '5px', marginBottom: '15px', color: '#0056b3' }}>
                        3. Em Caso de Emergência
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #fee2e2' }}>
                            <strong>BOMBEIROS</strong>
                            <div style={{ fontSize: '24pt', fontWeight: 'bold', color: '#ef4444' }}>193</div>
                        </div>
                        <div style={{ background: '#fef2f2', padding: '10px', borderRadius: '4px', textAlign: 'center', border: '1px solid #fee2e2' }}>
                            <strong>SAMU</strong>
                            <div style={{ fontSize: '24pt', fontWeight: 'bold', color: '#ef4444' }}>192</div>
                        </div>
                    </div>
                </section>

                <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
                    <p style={{ textAlign: 'center', fontSize: '10pt', fontStyle: 'italic', marginBottom: '40px' }}>
                        Declaro que recebi as orientações de Segurança e Saúde do Trabalho contidas nesta Ficha e estou ciente da importância de adotá-las em minhas atividades diárias.
                    </p>
                    <SignatureBlock
                        signatories={[
                            { name: companyData.name, role: 'Microempreendedor Individual', doc: `CPF: ${companyData.cpf || '_____'}` }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default FichaMEITemplate;

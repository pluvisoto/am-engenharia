import React from 'react';

const PCMSOTemplate = ({ companyData, data = {}, date = new Date() }) => {
    // Format date
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const year = date.getFullYear();
    const nextYear = year + 1; // PCMSO renewal is typically annual regarding the report, but the program follows PGR risks.

    const styles = {
        page: {
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box',
            margin: '0 auto',
            position: 'relative',
            pageBreakAfter: 'always',
            fontSize: '11pt',
            lineHeight: '1.5'
        },
        coverPage: {
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            background: '#fff',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '290mm',
            margin: '0 auto',
            position: 'relative',
            pageBreakAfter: 'always',
            fontSize: '11pt',
            lineHeight: '1.5',
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            borderBottom: '2px solid #047857', // Green for Health
            paddingBottom: '15px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        footer: {
            position: 'absolute',
            bottom: '20px',
            left: '40px',
            right: '40px',
            borderTop: '1px solid #ccc',
            paddingTop: '10px',
            fontSize: '8pt',
            textAlign: 'center',
            color: '#666'
        },
        titleMain: {
            fontSize: '24pt',
            fontWeight: 'bold',
            color: '#065f46', // Dark Green
            textAlign: 'center',
            marginTop: '100px',
            marginBottom: '20px'
        },
        subtitle: {
            fontSize: '14pt',
            textAlign: 'center',
            color: '#64748b',
            marginBottom: '100px'
        },
        sectionTitle: {
            fontSize: '14pt',
            fontWeight: 'bold',
            color: '#065f46',
            borderBottom: '1px solid #cbd5e1',
            paddingBottom: '5px',
            marginTop: '30px',
            marginBottom: '15px',
            textTransform: 'uppercase'
        },
        p: {
            textAlign: 'justify',
            marginBottom: '15px',
            textIndent: '30px'
        },
        list: {
            marginLeft: '20px',
            marginBottom: '15px'
        },
        listItem: {
            marginBottom: '5px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
            fontSize: '9pt'
        },
        th: {
            background: '#ecfdf5', // Light green
            padding: '8px',
            border: '1px solid #6ee7b7',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '9pt',
            color: '#064e3b'
        },
        td: {
            padding: '8px',
            border: '1px solid #cbd5e1',
            verticalAlign: 'top'
        },
        medicalBox: {
            border: '1px solid #10b981',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '4px',
            background: '#f0fdf4'
        }
    };

    return (
        <div id="pcmso-document-template">
            {/* ==================== CAPA ==================== */}
            <div style={styles.coverPage}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <img src="https://placehold.co/150x80/png?text=LOGO" alt="Logo Empresa" style={{ marginBottom: '30px' }} />
                    <h2 style={{ fontSize: '16pt', textTransform: 'uppercase' }}>{companyData.name}</h2>
                </div>

                <h1 style={styles.titleMain}>PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL (PCMSO)</h1>
                <p style={styles.subtitle}>Norma Regulamentadora nº 07 (NR-07)</p>

                <div style={{ margin: '0 auto', textAlign: 'center', width: '60%', border: '1px solid #10b981', padding: '20px', borderRadius: '8px', color: '#064e3b' }}>
                    <p style={{ margin: '5px 0' }}><strong>VIGÊNCIA</strong></p>
                    <p style={{ margin: '5px 0', fontSize: '14pt' }}>{year} / {nextYear}</p>
                </div>

                <div style={{ marginTop: 'auto', textAlign: 'center', marginBottom: '50px' }}>
                    <p><strong>Local:</strong> {companyData.city}/{companyData.state}</p>
                    <p><strong>Data de Emissão:</strong> {formattedDate}</p>
                </div>
            </div>

            {/* ==================== 1. IDENTIFICAÇÃO ==================== */}
            <div style={styles.page}>
                <div style={styles.header}>
                    <span>PCMSO - NR-07</span>
                    <span>{year}/{nextYear}</span>
                </div>

                <h2 style={styles.sectionTitle}>1. Identificação da Empresa</h2>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc', width: '30%' }}><strong>Razão Social:</strong></td>
                            <td style={styles.td}>{companyData.name}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>CNPJ:</strong></td>
                            <td style={styles.td}>{companyData.cnpj}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>CNAE Principal:</strong></td>
                            <td style={styles.td}>{companyData.cnae} - {companyData.cnae_desc}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>Grau de Risco (NR-4):</strong></td>
                            <td style={styles.td}>{companyData.grau_risco || 'Não Classificado'}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>Endereço:</strong></td>
                            <td style={styles.td}>{companyData.address}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>Efetivo Total:</strong></td>
                            <td style={styles.td}>{data.employee_count || 'Não informado'} colaboradores</td>
                        </tr>
                    </tbody>
                </table>

                <h2 style={styles.sectionTitle}>2. Responsável Técnico (Médico Coordenador)</h2>
                <div style={styles.medicalBox}>
                    <p style={{ margin: '0 0 10px 0' }}><strong>Nome:</strong> {data.coordenadorMedico?.name || 'A Definir'}</p>
                    <p style={{ margin: '0 0 10px 0' }}><strong>CRM:</strong> {data.coordenadorMedico?.crm || '-'}</p>
                    <p style={{ margin: '0' }}><strong>UF:</strong> {data.coordenadorMedico?.uf || '-'}</p>
                </div>

                <h2 style={styles.sectionTitle}>3. Objetivo e Desenvolvimento</h2>
                <p style={styles.p}>
                    O Programa de Controle Médico de Saúde Ocupacional (PCMSO) é parte integrante do conjunto mais amplo de iniciativas da empresa no campo da saúde dos trabalhadores, devendo estar articulado com o disposto nas demais Normas Regulamentadoras, especialmente com o Programa de Gerenciamento de Riscos (PGR).
                </p>
                <p style={styles.p}>
                    Este Programa tem caráter de prevenção, rastreamento e diagnóstico precoce dos agravos à saúde relacionados ao trabalho, inclusive de natureza subclínica, além da constatação da existência de casos de doenças profissionais ou danos irreversíveis à saúde dos trabalhadores.
                </p>
            </div>

            {/* ==================== 4. DIRETRIZES DE EXAMES ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Diretrizes</span></div>

                <h2 style={styles.sectionTitle}>4. Diretrizes para Realização de Exames</h2>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px', color: '#065f46' }}>4.1. Exame Admissional</h3>
                <p style={styles.p}>
                    Deve ser realizado antes que o trabalhador assuma suas atividades. O exame clínico e complementar (se houver) visa avaliar a aptidão física e mental do candidato para a função.
                </p>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px', color: '#065f46' }}>4.2. Exame Periódico</h3>
                <p style={styles.p}>
                    Realizado de acordo com os intervalos mínimos de tempo discriminados na NR-07 ou a critério do médico coordenador. Para trabalhadores expostos a riscos ou com doenças crônicas, a periodicidade pode ser semestral ou anual.
                </p>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px', color: '#065f46' }}>4.3. Exame de Retorno ao Trabalho</h3>
                <p style={styles.p}>
                    Deve ser realizado obrigatoriamente no primeiro dia da volta ao trabalho de trabalhador ausente por período igual ou superior a 30 (trinta) dias por motivo de doença ou acidente, de natureza ocupacional ou não, ou parto.
                </p>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px', color: '#065f46' }}>4.4. Exame de Mudança de Risco</h3>
                <p style={styles.p}>
                    Deve ser realizado antes da data da mudança, adequando-se o controle médico aos novos riscos a que o trabalhador ficará exposto.
                </p>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px', color: '#065f46' }}>4.5. Exame Demissional</h3>
                <p style={styles.p}>
                    Deve ser realizado em até 10 (dez) dias contados do término do contrato, podendo ser dispensado caso o exame clínico ocupacional mais recente tenha sido realizado há menos de 135 dias (para empresas de grau de risco 1 e 2) ou 90 dias (grau de risco 3 e 4).
                </p>
            </div>

            {/* ==================== 5. PLANEJAMENTO ANUAL DE EXAMES (CRONOGRAMA) ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Planejamento de Exames</span></div>

                <h2 style={styles.sectionTitle}>5. Planejamento Anual de Exames</h2>
                <p style={styles.p}>
                    Abaixo são listados os grupos de exposição e os exames complementares necessários, definidos com base nos riscos identificados no PGR.
                </p>

                {data.medical_exams && data.medical_exams.length > 0 ? (
                    data.medical_exams.map((item, idx) => (
                        <div key={idx} style={{ breakInside: 'avoid', marginBottom: '20px' }}>
                            <div style={{ background: '#065f46', color: '#fff', padding: '8px', fontSize: '10pt', fontWeight: 'bold' }}>
                                {item.role || 'Função Geral'} ({item.sector || 'Setor Geral'})
                            </div>
                            <table style={{ ...styles.table, marginTop: '0' }}>
                                <tbody>
                                    <tr style={{ background: '#f0fdf4' }}>
                                        <td style={{ ...styles.td, width: '40%' }}><strong>Riscos Ocupacionais:</strong></td>
                                        <td style={styles.td}>{item.risks ? item.risks.join(', ') : 'Não identificados riscos específicos'}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ ...styles.td, verticalAlign: 'middle' }}><strong>Exames Complementares:</strong></td>
                                        <td style={{ ...styles.td, padding: '0' }}>
                                            <table style={{ width: '100%', border: 'none' }}>
                                                <tbody>
                                                    {item.exams && item.exams.length > 0 ? (
                                                        item.exams.map((ex, i) => (
                                                            <tr key={i}>
                                                                <td style={{ border: 'none', borderBottom: '1px solid #eee', padding: '5px' }}>
                                                                    • {ex.name}
                                                                </td>
                                                                <td style={{ border: 'none', borderBottom: '1px solid #eee', padding: '5px', fontSize: '9pt', color: '#666' }}>
                                                                    Period.: {ex.periodicity || 'Anual'}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td style={{ border: 'none', padding: '5px' }}>Apenas Exame Clínico Ocupacional</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <div style={styles.medicalBox}>
                        <p>Não há exames complementares cadastrados. Apenas o <strong>Exame Clínico Ocupacional</strong> é obrigatório para todas as funções (Admissional, Periódico, Demissional, etc.), com anamnese ocupacional e exame físico e mental.</p>
                    </div>
                )}

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '20px', color: '#065f46' }}>5.1. Protocolos Padrão</h3>
                <p style={styles.p}>
                    Além dos exames específicos citados acima, todo atendimento médico ocupacional deve incluir:
                </p>
                <ul style={styles.list}>
                    <li>Anamnese ocupacional completa.</li>
                    <li>Exame físico detalhado.</li>
                    <li>Avaliação de acuidade visual (quando aplicável).</li>
                    <li>Avaliação de desordens musculoesqueléticas.</li>
                </ul>
            </div>

            {/* ==================== 6. PRIMEIROS SOCORROS E EMERGÊNCIA ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Primeiros Socorros</span></div>

                <h2 style={styles.sectionTitle}>6. Kit de Primeiros Socorros</h2>
                <p style={styles.p}>
                    Todo estabelecimento deverá estar equipado com material necessário à prestação dos primeiros socorros, considerando-se as características da atividade desenvolvida. O material deve ser guardado em local adequado e aos cuidados de pessoa treinada para esse fim.
                </p>

                <div style={styles.medicalBox}>
                    <strong>Sugestão de Itens Básicos:</strong>
                    <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                        <li>Luvas descatáveis;</li>
                        <li>Ataduras de crepe e gaze esterilizada;</li>
                        <li>Esparadrapo e fita adesiva;</li>
                        <li>Soro fisiológico 0,9%;</li>
                        <li>Tesoura ponta romba;</li>
                        <li>Termômetro;</li>
                        <li>Curativos adesivos (Band-aid).</li>
                    </ul>
                    <p style={{ fontSize: '9pt', marginTop: '10px', fontStyle: 'italic' }}>Nota: É vedada a utilização de medicamentos sem prescrição médica.</p>
                </div>
            </div>

            {/* ==================== 7. RELATÓRIO ANUAL (MODELO) ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Relatório Anual</span></div>

                <h2 style={styles.sectionTitle}>7. Modelo de Relatório Analítico (Anual)</h2>
                <p style={styles.p}>
                    O médico responsável deverá elaborar anualmente um relatório analítico contendo o número e a natureza dos exames médicos, incluindo avaliações clínicas e exames complementares, estatísticas de resultados anormais, assim como o planejamento para o próximo ano.
                </p>

                <table style={{ ...styles.table, marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th style={styles.th} rowSpan="2">Setor</th>
                            <th style={styles.th} rowSpan="2">Natureza do Exame</th>
                            <th style={styles.th} colSpan="2">Resultados</th>
                            <th style={styles.th} rowSpan="2">Total Anual</th>
                        </tr>
                        <tr>
                            <th style={styles.th}>Normal</th>
                            <th style={styles.th}>Alterado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Administrativo</td>
                            <td style={styles.td}>Clínico (Periódico)</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Produção</td>
                            <td style={styles.td}>Audiometria</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Geral</td>
                            <td style={styles.td}>Admissional</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                            <td style={styles.td}>____</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ==================== 8. ENCERRAMENTO ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Encerramento</span></div>

                <h2 style={styles.sectionTitle}>8. Considerações Finais</h2>
                <p style={styles.p}>
                    Este Programa de Controle Médico de Saúde Ocupacional foi elaborado para atender à NR-07, visando promover e preservar a saúde do conjunto dos seus trabalhadores. A eficácia deste programa depende do cumprimento das diretrizes aqui estabelecidas pela empresa e pelos trabalhadores.
                </p>

                <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', width: '60%', borderTop: '1px solid #333', paddingTop: '10px' }}>
                        <strong>{data.coordenadorMedico?.name || 'A Definir - Médico Coordenador'}</strong><br />
                        <span>CRM: {data.coordenadorMedico?.crm || '_______'} / {data.coordenadorMedico?.uf || '__'}</span><br />
                        <span>Médico Responsável pelo PCMSO</span>
                    </div>

                    <div style={{ textAlign: 'center', width: '60%', borderTop: '1px solid #333', paddingTop: '10px' }}>
                        <strong>{companyData.name}</strong><br />
                        <span>Representante Legal da Empresa</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PCMSOTemplate;

import React from 'react';

const PGRTemplate = ({ companyData, data, date = new Date() }) => {
    // Format date
    const formattedDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const year = date.getFullYear();
    const nextYear = year + 2; // Validade de 2 anos conforme NR-1

    const styles = {
        page: {
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            background: '#fff',
            width: '210mm',
            minHeight: '297mm',
            margin: '0 auto',
            position: 'relative',
            pageBreakAfter: 'always',
            fontSize: '11pt',
            lineHeight: '1.5'
        },
        header: {
            borderBottom: '2px solid #1e3a8a',
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
            color: '#1e3a8a',
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
            color: '#1e3a8a',
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
            background: '#f1f5f9',
            padding: '8px',
            border: '1px solid #94a3b8',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '9pt'
        },
        td: {
            padding: '8px',
            border: '1px solid #cbd5e1',
            verticalAlign: 'top'
        },
        riskBox: {
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            background: '#fafafa'
        }
    };

    const RiskLevelBadge = ({ level, p, s }) => {
        let color = '#15803d';
        let label = 'Trivial';

        if (level >= 20) { color = '#7f1d1d'; label = 'Crítico'; }
        else if (level >= 15) { color = '#b91c1c'; label = 'Substancial'; }
        else if (level >= 9) { color = '#c2410c'; label = 'Moderado'; }
        else if (level >= 4) { color = '#1d4ed8'; label = 'Tolerável'; }

        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color, fontSize: '11pt' }}>{label}</div>
                <div style={{ fontSize: '8pt', color: '#666' }}>Nível {level} (P:{p} x S:{s})</div>
            </div>
        );
    };

    return (
        <div id="pgr-document-template">
            {/* ==================== CAPA ==================== */}
            <div style={{ ...styles.page, display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <img src="https://placehold.co/150x80/png?text=LOGO" alt="Logo Empresa" style={{ marginBottom: '30px' }} />
                    <h2 style={{ fontSize: '16pt', textTransform: 'uppercase' }}>{companyData.name}</h2>
                </div>

                <h1 style={styles.titleMain}>PROGRAMA DE GERENCIAMENTO DE RISCOS (PGR)</h1>
                <p style={styles.subtitle}>Norma Regulamentadora nº 01 (NR-01)</p>

                <div style={{ margin: '0 auto', textAlign: 'center', width: '60%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
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
                    <span>PGR - Programa de Gerenciamento de Riscos</span>
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
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>Nome Fantasia:</strong></td>
                            <td style={styles.td}>{companyData.fantasy_name || companyData.name}</td>
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
                            <td style={styles.td}>{companyData.address} - {companyData.neighborhood}, {companyData.city}/{companyData.state}</td>
                        </tr>
                        <tr>
                            <td style={{ ...styles.td, background: '#f8fafc' }}><strong>Número de Funcionários:</strong></td>
                            <td style={styles.td}>{data.employee_count || 'Não informado'}</td>
                        </tr>
                    </tbody>
                </table>

                <h2 style={styles.sectionTitle}>2. Responsáveis Técnicos</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Função</th>
                            <th style={styles.th}>Nome</th>
                            <th style={styles.th}>Registro Profissional</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>Responsável Técnico (Elaborador)</td>
                            <td style={styles.td}>{data.responsavelTecnico?.name || 'A Definir'}</td>
                            <td style={styles.td}>{data.responsavelTecnico?.registration_type} {data.responsavelTecnico?.registration_number}</td>
                        </tr>
                        <tr>
                            <td style={styles.td}>Coordenador do PCMSO</td>
                            <td style={styles.td}>{data.coordenadorMedico?.name || 'A Definir'}</td>
                            <td style={styles.td}>{data.coordenadorMedico?.crm ? `CRM ${data.coordenadorMedico.crm}` : '-'}</td>
                        </tr>
                    </tbody>
                </table>

                <h2 style={styles.sectionTitle}>3. Objetivo</h2>
                <p style={styles.p}>
                    Este Programa de Gerenciamento de Riscos (PGR) tem como objetivo principal a preservação da saúde e da integridade física dos trabalhadores, através da antecipação, reconhecimento, avaliação e consequente controle da ocorrência de riscos ambientais existentes ou que venham a existir no ambiente de trabalho, tendo em consideração a proteção do meio ambiente e dos recursos naturais.
                </p>
                <p style={styles.p}>
                    O documento atende aos requisitos estabelecidos na Norma Regulamentadora nº 01 (Disposições Gerais e Gerenciamento de Riscos Ocupacionais), Portaria SEPRT nº 6.730, de 09 de março de 2020.
                </p>
            </div>

            {/* ==================== 4. METODOLOGIA ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Metodologia</span></div>

                <h2 style={styles.sectionTitle}>4. Metodologia de Avaliação</h2>
                <p style={styles.p}>
                    A avaliação dos riscos ocupacionais foi realizada utilizando uma abordagem qualitativa e, quando necessário, quantitativa, seguindo a matriz de risco AIHA (American Industrial Hygiene Association) adaptada. O Nível de Risco (NR) é determinado pela combinação da Severidade (S) das possíveis lesões ou agravos à saúde e a Probabilidade (P) de sua ocorrência.
                </p>

                <h3 style={{ fontSize: '12pt', fontWeight: 'bold', marginTop: '20px' }}>4.1 Matriz de Risco (5x5)</h3>
                <table style={{ ...styles.table, textAlign: 'center', marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.th, background: '#fff', border: 'none' }}></th>
                            <th colSpan="5" style={styles.th}>SEVERIDADE (S)</th>
                        </tr>
                        <tr>
                            <th style={{ ...styles.th, writingMode: 'vertical-rl' }}>PROBABILIDADE (P)</th>
                            <th style={styles.th}>1. Desprezível</th>
                            <th style={styles.th}>2. Leve</th>
                            <th style={styles.th}>3. Moderada</th>
                            <th style={styles.th}>4. Grave</th>
                            <th style={styles.th}>5. Fatal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.th}>5. Frequente</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>5 (Mod)</td>
                            <td style={{ ...styles.td, background: '#f97316' }}>10 (Subs)</td>
                            <td style={{ ...styles.td, background: '#ef4444' }}>15 (Alto)</td>
                            <td style={{ ...styles.td, background: '#b91c1c', color: '#fff' }}>20 (Crít)</td>
                            <td style={{ ...styles.td, background: '#7f1d1d', color: '#fff' }}>25 (Crít)</td>
                        </tr>
                        <tr>
                            <td style={styles.th}>4. Provável</td>
                            <td style={{ ...styles.td, background: '#86efac' }}>4 (Tol)</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>8 (Mod)</td>
                            <td style={{ ...styles.td, background: '#f97316' }}>12 (Subs)</td>
                            <td style={{ ...styles.td, background: '#ef4444' }}>16 (Alto)</td>
                            <td style={{ ...styles.td, background: '#b91c1c', color: '#fff' }}>20 (Crít)</td>
                        </tr>
                        <tr>
                            <td style={styles.th}>3. Ocasional</td>
                            <td style={{ ...styles.td, background: '#86efac' }}>3 (Tol)</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>6 (Mod)</td>
                            <td style={{ ...styles.td, background: '#f97316' }}>9 (Subs)</td>
                            <td style={{ ...styles.td, background: '#f97316' }}>12 (Subs)</td>
                            <td style={{ ...styles.td, background: '#ef4444' }}>15 (Alto)</td>
                        </tr>
                        <tr>
                            <td style={styles.th}>2. Raro</td>
                            <td style={{ ...styles.td, background: '#bbf7d0' }}>2 (Triv)</td>
                            <td style={{ ...styles.td, background: '#86efac' }}>4 (Tol)</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>6 (Mod)</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>8 (Mod)</td>
                            <td style={{ ...styles.td, background: '#f97316' }}>10 (Subs)</td>
                        </tr>
                        <tr>
                            <td style={styles.th}>1. Remoto</td>
                            <td style={{ ...styles.td, background: '#bbf7d0' }}>1 (Triv)</td>
                            <td style={{ ...styles.td, background: '#bbf7d0' }}>2 (Triv)</td>
                            <td style={{ ...styles.td, background: '#86efac' }}>3 (Tol)</td>
                            <td style={{ ...styles.td, background: '#86efac' }}>4 (Tol)</td>
                            <td style={{ ...styles.td, background: '#fcd34d' }}>5 (Mod)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ==================== 5. INVENTÁRIO DE RISCOS ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Inventário de Riscos</span></div>

                <h2 style={styles.sectionTitle}>5. Inventário de Riscos Ocupacionais</h2>
                <p style={styles.p}>
                    Abaixo são apresentados os riscos identificados para cada Grupo Homogêneo de Exposição (GHE), avaliados conforme a metodologia descrita.
                </p>

                {data.risk_inventory && data.risk_inventory.length > 0 ? (
                    data.risk_inventory.map((risk, index) => (
                        <div key={index} style={{ marginBottom: '20px', breakInside: 'avoid' }}>
                            <div style={{ background: '#1e3a8a', color: '#fff', padding: '10px', fontWeight: 'bold' }}>
                                {risk.sector_id || 'Setor Geral'} - {risk.role_id || 'Todas as Funções'}
                            </div>
                            <table style={styles.table}>
                                <tbody>
                                    <tr>
                                        <td style={{ ...styles.td, width: '20%', background: '#f1f5f9' }}><strong>Agente / Perigo:</strong></td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold' }}>{risk.hazard}</div>
                                            <span style={{ fontSize: '8pt', background: '#e2e8f0', padding: '2px 4px', borderRadius: '3px' }}>Tipo: {risk.type}</span>
                                        </td>
                                        <td style={{ ...styles.td, width: '20%', background: '#f1f5f9' }}><strong>Fonte Geradora:</strong></td>
                                        <td style={styles.td}>{risk.source}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ ...styles.td, background: '#f1f5f9' }}><strong>Danos Potenciais:</strong></td>
                                        <td colSpan="3" style={styles.td}>{risk.impact}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ ...styles.td, background: '#f1f5f9' }}><strong>Medidas de Controle:</strong></td>
                                        <td colSpan="3" style={styles.td}>
                                            <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                                <li>{risk.prevention_measures || 'Implementar medidas conformes NR.'}</li>
                                                <li>Uso de EPIs adequados (se aplicável).</li>
                                                <li>Treinamento e orientação.</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ ...styles.td, background: '#f1f5f9' }}><strong>Avaliação de Risco:</strong></td>
                                        <td colSpan="3" style={{ ...styles.td, padding: '0' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ border: 'none', borderRight: '1px solid #ccc', textAlign: 'center', padding: '5px' }}>
                                                            <div style={{ fontSize: '8pt' }}>Probabilidade</div>
                                                            <strong>{risk.probability || 1}</strong>
                                                        </td>
                                                        <td style={{ border: 'none', borderRight: '1px solid #ccc', textAlign: 'center', padding: '5px' }}>
                                                            <div style={{ fontSize: '8pt' }}>Severidade</div>
                                                            <strong>{risk.severity || 1}</strong>
                                                        </td>
                                                        <td style={{ border: 'none', textAlign: 'center', padding: '5px' }}>
                                                            <RiskLevelBadge level={(risk.probability || 1) * (risk.severity || 1)} p={risk.probability || 1} s={risk.severity || 1} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p style={{ padding: '20px', background: '#ffe4e6', border: '1px solid #f43f5e', color: '#881337' }}>
                        Nenhum risco cadastrado. Recomenda-se revisar o levantamento de perigos.
                    </p>
                )}
            </div>

            {/* ==================== 6. PLANO DE AÇÃO ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Plano de Ação</span></div>

                <h2 style={styles.sectionTitle}>6. Plano de Ação</h2>
                <p style={styles.p}>
                    As medidas de controle propostas devem ser implementadas conforme o cronograma abaixo, visando a mitigação ou eliminação dos riscos identificados.
                </p>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Ação / Medida</th>
                            <th style={styles.th}>Fonte do Risco</th>
                            <th style={styles.th}>Responsável</th>
                            <th style={styles.th}>Prazo</th>
                            <th style={styles.th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.action_plan && data.action_plan.length > 0 ? (
                            data.action_plan.map((action, idx) => (
                                <tr key={idx}>
                                    <td style={styles.td}>{action.description}</td>
                                    <td style={styles.td}>{action.related_risk || '-'}</td>
                                    <td style={styles.td}>{action.responsible || 'Diretoria'}</td>
                                    <td style={styles.td}>{action.deadline || 'Imediato'}</td>
                                    <td style={{ ...styles.td, textAlign: 'center' }}>
                                        <span style={{ fontSize: '10pt', color: action.status === 'Concluído' ? '#15803d' : '#ea580c' }}>
                                            ● {action.status || 'Pendente'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ ...styles.td, textAlign: 'center', padding: '20px' }}>Não há ações pendentes registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ==================== 7. PLANO DE EMERGÊNCIA ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Emergência</span></div>

                <h2 style={styles.sectionTitle}>7. Procedimentos de Emergência</h2>
                <p style={styles.p}>
                    A empresa deve manter procedimentos de resposta a cenários de emergência, de acordo com o porte e a natureza das atividades.
                </p>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px' }}>7.1. Primeiros Socorros</h3>
                <p style={styles.p}>
                    A empresa manterá kit de primeiros socorros em local acessível e devidamente sinalizado, contendo itens básicos conforme recomendação da NR-7. Em caso de acidente:
                </p>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Manter a calma e isolar a área.</li>
                    <li style={styles.listItem}>Não mover a vítima se houver suspeita de fratura.</li>
                    <li style={styles.listItem}>Acionar o serviço de emergência (192 - SAMU / 193 - Bombeiros).</li>
                    <li style={styles.listItem}>Comunicar imediatamente a supervisão/gerência.</li>
                </ul>

                <h3 style={{ fontWeight: 'bold', fontSize: '12pt', marginTop: '15px' }}>7.2. Combate a Incêndio</h3>
                <p style={styles.p}>
                    Os extintores devem ser mantidos desobstruídos e inspecionados periodicamente. Em caso de princípio de incêndio:
                </p>
                <ul style={styles.list}>
                    <li style={styles.listItem}>Acionar o alarme de incêndio.</li>
                    <li style={styles.listItem}>Utilizar o extintor adequado ao tipo de fogo (A, B ou C), se souber manuseá-lo.</li>
                    <li style={styles.listItem}>Evacuar a área de forma ordenada pelas rotas de fuga.</li>
                </ul>
            </div>

            {/* ==================== 8. ENCERRAMENTO ==================== */}
            <div style={styles.page}>
                <div style={styles.header}><span>Encerramento</span></div>

                <h2 style={styles.sectionTitle}>8. Encerramento</h2>
                <p style={styles.p}>
                    Este Programa de Gerenciamento de Riscos foi elaborado com base nas informações fornecidas pela empresa e nas inspeções realizadas (virtualmente ou presencialmente). As avaliações quantitativas e qualitativas refletem o cenário atual. Qualquer alteração no layout, maquinário ou processos de trabalho exigirá a revisão imediata deste documento.
                </p>
                <p style={styles.p}>
                    Este documento deve permanecer à disposição da fiscalização do trabalho e dos representantes dos trabalhadores.
                </p>

                <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', width: '60%', borderTop: '1px solid #333', paddingTop: '10px' }}>
                        <strong>{companyData.name}</strong><br />
                        <span>Representante Legal</span>
                    </div>

                    <div style={{ textAlign: 'center', width: '60%', borderTop: '1px solid #333', paddingTop: '10px' }}>
                        <strong>{data.responsavelTecnico?.name || 'Responsável Técnico AM Engenharia'}</strong><br />
                        <span>{data.responsavelTecnico?.registration_type} {data.responsavelTecnico?.registration_number}</span><br />
                        <span>Elaborador do PGR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PGRTemplate;

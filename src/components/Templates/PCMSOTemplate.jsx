import React from 'react';
import SignatureBlock from '../SignatureBlock';
import DocumentCover from '../DocumentCover';
import { getTeamMembers } from '../../utils/storage';

const PCMSOTemplate = ({ companyData, extraData, inventory }) => {
    const formattedDate = new Date().toLocaleDateString('pt-BR');
    const safeCNPJ = (companyData?.cnpj || ' 00000000').replace(/[^0-9]/g, '').substring(0, 8);

    const allTeam = getTeamMembers();
    const team = extraData?.coordenadorMedico
        ? [extraData.coordenadorMedico]
        : [];

    const PageBreak = () => <div style={{ pageBreakAfter: 'always', height: '1px' }}></div>;

    // Get auto-generated data
    const autoData = extraData || {};
    const medicalExams = autoData.medical_exams || [];
    const roles = autoData.roles || [];
    const riskInventory = autoData.risk_inventory || inventory || [];

    // Header component for internal pages
    const DocHeader = ({ pageNumber }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid var(--accent)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/doc/Logo AM/Logo AM.webp" alt="Logo AM" style={{ height: '30px' }} />
                <span style={{ color: 'var(--doc-navy)', fontWeight: '900', fontSize: '10pt', textTransform: 'uppercase' }}>AM <span style={{ color: 'var(--accent)' }}>ENGENHARIA</span></span>
            </div>
            <div style={{ fontSize: '8pt', color: '#64748b', fontWeight: 'bold' }}>GESTÃO DE SAÚDE OCUPACIONAL</div>
            <div style={{ fontSize: '8pt', color: '#64748b' }}>Pág {pageNumber}</div>
        </div>
    );

    const sectionMargin = { marginBottom: '40px', padding: '0 40px', position: 'relative', minHeight: '900px' };
    const pStyle = { marginBottom: '15px', lineHeight: '1.6', fontSize: '10.5pt', textAlign: 'justify' };
    const labelTd = { background: '#f1f5f9', fontWeight: 'bold', width: '25%', fontSize: '9pt', padding: '8px' };
    const contentTd = { padding: '8px', border: '1px solid #e2e8f0' };
    const sectionHeader = { fontSize: '14pt', fontWeight: '900', color: 'var(--doc-navy)', borderLeft: '4px solid #e11d48', paddingLeft: '15px', marginBottom: '20px', textTransform: 'uppercase' };
    const subHeader = { fontSize: '11pt', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', marginTop: '15px' };

    return (
        <div className="document-body" style={{ backgroundColor: '#fff', color: '#000', fontSize: '10.5pt', lineHeight: 1.5, fontFamily: 'var(--font-main)' }}>
            <DocumentCover
                variant="PCMSO"
                title="PCMSO"
                subtitle="PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL"
                companyName={companyData?.name || 'EMPRESA NÃO IDENTIFICADA'}
                validity="2025 - 2026"
                docCode={`PCMSO-${safeCNPJ}-${new Date().getFullYear()}`}
            />
            <PageBreak />

            {/* PÁGINA 2: SUMÁRIO */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="2" />
                <h1 style={{ fontSize: '24pt', fontWeight: '900', color: 'var(--doc-navy)', textAlign: 'center', margin: '40px 0' }}>SUMÁRIO</h1>

                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    {[
                        { t: '1. PROPOSTA TÉCNICA E IDENTIFICAÇÃO', p: '3' },
                        { t: '2. REFERÊNCIAS TÉCNICAS E LEGAIS', p: '5' },
                        { t: '3. MÉDICO DO TRABALHO RESPONSÁVEL', p: '7' },
                        { t: '4. LISTA DE MÉDICOS EXAMINADORES AUTORIZADOS', p: '8' },
                        { t: '5. OBJETIVOS E DIRETRIZES DO PROGRAMA', p: '9' },
                        { t: '6. RESPONSABILIDADES', p: '10' },
                        { t: '7. AVALIAÇÃO CLÍNICA E EXAMES OCUPACIONAIS', p: '12' },
                        { t: '8. AGRAVOS À SAÚDE POR RISCO OCUPACIONAL', p: '15' },
                        { t: '9. PLANEJAMENTO DE EXAMES POR FUNÇÃO (GRIDS)', p: '18' },
                        { t: '10. PLANEJAMENTO DE AÇÕES DE SAÚDE ANUAL', p: '26' },
                        { t: '11. IMUNIZAÇÃO RECOMENDADA', p: '27' },
                        { t: '12. PRIMEIROS SOCORROS E EMERGÊNCIA', p: '28' },
                        { t: '13. ARQUIVO MÉDICO E GESTÃO DE DATA', p: '30' },
                        { t: '14. DISPOSIÇÕES FINAIS E ASSINATURAS', p: '31' }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted #cbd5e1', marginBottom: '10px', fontSize: '10pt' }}>
                            <span style={{ fontWeight: i < 3 ? 'bold' : 'normal', textTransform: 'uppercase' }}>{item.t}</span>
                            <span style={{ fontWeight: 'bold' }}>{item.p}</span>
                        </div>
                    ))}
                </div>
            </section>
            <PageBreak />

            {/* PÁGINA 3: IDENTIFICAÇÃO */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="3" />
                <h2 style={sectionHeader}>1. IDENTIFICAÇÃO DA EMPRESA</h2>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
                    DADOS DA UNIDADE DE ATIVIDADE
                </div>
                <table className="doc-table" style={{ marginBottom: '30px' }}>
                    <tbody>
                        <tr><td style={labelTd}>Razão Social</td><td colSpan="3" style={contentTd}>{companyData?.name}</td></tr>
                        <tr><td style={labelTd}>Endereço</td><td style={contentTd}>{companyData?.address}</td><td style={labelTd}>CEP</td><td style={contentTd}>{companyData?.cep || '00000-000'}</td></tr>
                        <tr><td style={labelTd}>Bairro</td><td style={contentTd}>{companyData?.bairro || '-'}</td><td style={labelTd}>Cidade/UF</td><td style={contentTd}>{companyData?.city || '-'} / {companyData?.state || '-'}</td></tr>
                        <tr><td style={labelTd}>CNPJ</td><td style={contentTd}>{companyData?.cnpj}</td><td style={labelTd}>Grau de Risco</td><td style={contentTd}>{companyData?.grau_risco || '03'}</td></tr>
                        <tr><td style={labelTd}>CNAE</td><td style={contentTd}>{companyData?.cnae || '71.19-7-04'}</td><td style={labelTd}>Funcionários</td><td style={contentTd}>{companyData?.employee_count || '08'}</td></tr>
                    </tbody>
                </table>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 15px', fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
                    RESPONSÁVEL PELA ELABORAÇÃO
                </div>
                <table className="doc-table">
                    <tbody>
                        <tr><td style={labelTd}>Empresa</td><td colSpan="3" style={contentTd}>A.M ENGENHARIA INSPECOES LTDA</td></tr>
                        <tr><td style={labelTd}>Endereço</td><td style={contentTd}>Rua Saldanha Marinho 1831 - Alemães</td><td style={labelTd}>Cidade/UF</td><td style={contentTd}>Piracicaba/SP</td></tr>
                        <tr><td style={labelTd}>CNPJ</td><td colSpan="3" style={contentTd}>55.603.277/0001-09</td></tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 4: PROPOSTA TÉCNICA */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="4" />
                <h2 style={sectionHeader}>PROPOSTA TÉCNICA DO PROGRAMA</h2>
                <p style={pStyle}>
                    Este documento define as diretrizes de saúde ocupacional para a empresa <strong>{companyData?.name}</strong>, visando o atendimento integral à Norma Regulamentadora nº 07 (NR-07).
                </p>
                <h3 style={subHeader}>Abrangência</h3>
                <p style={pStyle}>
                    O PCMSO abrange todos os trabalhadores da organização, sejam eles próprios ou contratados sob regime CLT, que atuem nas dependências da unidade ou em frentes de serviço externas.
                </p>
                <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
                    <p style={{ ...pStyle, fontWeight: 'bold', color: 'var(--doc-navy)' }}>
                        "Nenhuma atividade de trabalho justifica o comprometimento da integridade física ou mental do trabalhador."
                    </p>
                </div>
            </section>
            <PageBreak />

            {/* PÁGINA 5: REFERÊNCIAS LEGAIS */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="5" />
                <h2 style={sectionHeader}>2. REFERÊNCIAS TÉCNICAS E LEGAIS</h2>
                <p style={pStyle}>
                    O presente programa está fundamentado nas seguintes legislações e normas técnicas:
                </p>
                <ul style={{ ...pStyle, paddingLeft: '20px' }}>
                    <li><strong>NR-07 (Portaria 6.734/2020):</strong> Norma principal que estabelece os parâmetros do PCMSO;</li>
                    <li><strong>NR-01 (Portaria 6.730/2020):</strong> Diretrizes para o Gerenciamento de Riscos Ocupacionais (PGR);</li>
                    <li><strong>Portaria nº 3.214/1978:</strong> Aprova as Normas Regulamentadoras de Segurança e Saúde;</li>
                    <li><strong>Lei nº 6.514/1977:</strong> Alteração da CLT relativa à Medicina do Trabalho;</li>
                    <li><strong>Resolução CFM nº 2.297/2021:</strong> Normas éticas para o médico do trabalho;</li>
                    <li><strong>Convenção 161 da OIT:</strong> Serviços de Saúde no Trabalho;</li>
                    <li><strong>Decreto nº 3.048/1999:</strong> Regulamento da Previdência Social e nexo técnico epidemiológico.</li>
                </ul>
            </section>
            <PageBreak />

            {/* PÁGINA 6: REFERÊNCIAS (CONT.) */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="6" />
                <h2 style={sectionHeader}>NORMAS COMPLEMENTARES IDENTIFICADAS</h2>
                <p style={pStyle}>
                    Dependendo das atividades executadas, este programa também observa os critérios médicos das seguintes normas:
                </p>
                <table className="doc-table">
                    <thead>
                        <tr style={{ background: '#f8fafc' }}><th>NORMA</th><th>TEMA</th></tr>
                    </thead>
                    <tbody>
                        <tr><td style={{ fontWeight: 'bold' }}>NR-10</td><td>Segurança em Instalações e Serviços em Eletricidade</td></tr>
                        <tr><td style={{ fontWeight: 'bold' }}>NR-33</td><td>Espaços Confinados</td></tr>
                        <tr><td style={{ fontWeight: 'bold' }}>NR-35</td><td>Trabalho em Altura</td></tr>
                        <tr><td style={{ fontWeight: 'bold' }}>NR-17</td><td>Ergonomia</td></tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 7: MÉDICO RESPONSÁVEL */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="7" />
                <h2 style={sectionHeader}>3. MÉDICO DO TRABALHO RESPONSÁVEL</h2>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '15px' }}>
                        <div style={labelTd}>Nome:</div><div style={contentTd}>{team.length > 0 ? team[0].name : 'Médico não atribuído'}</div>
                        <div style={labelTd}>CRM:</div><div style={contentTd}>{team.length > 0 ? `${team[0].crm}/${team[0].crm_state}` : '-'}</div>
                        <div style={labelTd}>Especialidade:</div><div style={contentTd}>Medicina do Trabalho</div>
                        <div style={labelTd}>Endereço Profissional:</div><div style={contentTd}>{team.length > 0 ? (team[0].clinic_address || team[0].address) : '-'}</div>
                    </div>
                </div>
                <h3 style={subHeader}>Atribuições Técnicas</h3>
                <ul style={{ ...pStyle, paddingLeft: '20px' }}>
                    <li>Elaboração e coordenação integral do PCMSO;</li>
                    <li>Análise e interpretação dos exames complementares;</li>
                    <li>Emissão de relatórios epidemiológicos anuais;</li>
                    <li>Auditoria da rede de médicos examinadores credenciados.</li>
                </ul>
            </section>
            <PageBreak />

            {/* PÁGINA 8: MÉDICOS EXAMINADORES */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="8" />
                <h2 style={sectionHeader}>4. LISTA DE MÉDICOS EXAMINADORES AUTORIZADOS</h2>
                <p style={pStyle}>
                    Os seguintes profissionais estão autorizados a realizar os exames clínicos e emitir os Atestados de Saúde Ocupacional (ASO):
                </p>
                <table className="doc-table" style={{ fontSize: '9pt' }}>
                    <thead>
                        <tr style={{ background: 'var(--doc-navy)', color: 'white' }}>
                            <th>NOME DO MÉDICO</th>
                            <th>CRM / UF</th>
                            <th>REGISTRO / CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { n: 'Dra. Andréa Inácio', c: '106623 / SP', d: '213.056.648-09' },
                            { n: 'Dra. Annie Jacquemin Cardoso', c: '247483 / SP', d: '436.234.428-44' },
                            { n: 'Dra. Bruna Granig Valente', c: '247486 / SP', d: '449.639.748-00' },
                            { n: 'Dr. José Erminio Gilbertoni', c: '40972 / SP', d: '188.713.999-00' },
                            { n: 'Dra. Juliana Cordeiro Zilio', c: '235649 / SP', d: '424.920.838-96' },
                            { n: 'Dra. Telma Maria Moreira', c: '228920 / SP', d: '122.993.446-40' },
                            { n: 'Dra. Vanessa Pessolato Piacenti', c: '174267 / SP', d: '355.594.718-44' }
                        ].map((m, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 'bold', padding: '10px' }}>{m.n}</td>
                                <td style={{ padding: '10px' }}>{m.c}</td>
                                <td style={{ padding: '10px' }}>{m.d}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 9: OBJETIVOS */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="9" />
                <h2 style={sectionHeader}>5. OBJETIVOS E DIRETRIZES DO PROGRAMA</h2>
                <h3 style={subHeader}>Caráter Preventivo</h3>
                <p style={pStyle}>
                    O PCMSO tem caráter de prevenção, rastreamento e diagnóstico precoce dos agravos à saúde relacionados ao trabalho, inclusive de natureza subclínica, além da constatação de casos de doenças profissionais ou danos irreversíveis à saúde dos trabalhadores.
                </p>
                <h3 style={subHeader}>Vigilância Ativa</h3>
                <p style={pStyle}>
                    Este programa prevê a vigilância ativa da saúde dos trabalhadores por meio de:
                </p>
                <ul style={{ ...pStyle, paddingLeft: '20px' }}>
                    <li>Exames clínicos e laboratoriais específicos para cada risco;</li>
                    <li>Análise de absenteísmo e motivos de afastamento;</li>
                    <li>Ações integradas com a segurança do trabalho (PGR).</li>
                </ul>
            </section>
            <PageBreak />

            {/* PÁGINA 10: RESPONSABILIDADES */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="10" />
                <h2 style={sectionHeader}>6. RESPONSABILIDADES</h2>
                <table className="doc-table">
                    <tbody>
                        <tr>
                            <td style={labelTd}>EMPREGADOR</td>
                            <td style={contentTd}>
                                <ul style={{ paddingLeft: '15px', margin: 0 }}>
                                    <li>Garantir a elaboração e efetiva implementação do PCMSO;</li>
                                    <li>Custear todos os procedimentos médicos;</li>
                                    <li>Indicar o médico coordenador.</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={labelTd}>EMPREGADO</td>
                            <td style={contentTd}>
                                <ul style={{ paddingLeft: '15px', margin: 0 }}>
                                    <li>Submeter-se aos exames periódicos e demais avaliações;</li>
                                    <li>Fornecer informações verdadeiras sobre seu histórico clínico;</li>
                                    <li>Apresentar-se nos locais indicados para coleta.</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td style={labelTd}>MÉDICO</td>
                            <td style={contentTd}>
                                <ul style={{ paddingLeft: '15px', margin: 0 }}>
                                    <li>Zelar pela ética e sigilo médico;</li>
                                    <li>Emitir o ASO com clareza;</li>
                                    <li>Encaminhar casos suspeitos para especialistas ou INSS.</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 12: EXAMES */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="12" />
                <h2 style={sectionHeader}>7. AVALIAÇÃO CLÍNICA E EXAMES OCUPACIONAIS</h2>
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={subHeader}>Periodicidade e Tipos</h3>
                    <p style={pStyle}>
                        <strong>A) Admissional:</strong> Realizado antes que o empregado assuma a função.<br />
                        <strong>B) Periódico:</strong> Realizado cronologicamente conforme a idade e riscos.<br />
                        <strong>C) Retorno ao Trabalho:</strong> Após afastamento maior ou igual a 30 dias (doença ou parto).<br />
                        <strong>D) Mudança de Riscos:</strong> Antes da alteração de setor ou atividade.<br />
                        <strong>E) Demissional:</strong> Até a data da homologação (exceto se exame recente).
                    </p>
                </div>
                <div style={{ border: '1px solid #e2e8f0', padding: '15px', background: '#f8fafc' }}>
                    <p style={{ ...pStyle, margin: 0, fontWeight: 'bold' }}>Nota técnica sobre o ASO:</p>
                    <p style={{ ...pStyle, fontSize: '9pt' }}>O Atestado de Saúde Ocupacional deve ser emitido em duas vias, sendo a primeira arquivada em prontuário e a segunda entregue ao trabalhador mediante recibo.</p>
                </div>
            </section>
            <PageBreak />

            {/* PÁGINA 15: AGRAVOS À SAÚDE */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="15" />
                <h2 style={sectionHeader}>8. AGRAVOS À SAÚDE POR RISCO OCUPACIONAL</h2>
                <p style={pStyle}>
                    Mapeamento técnico da relação entre a exposição aos agentes de risco e os potenciais danos biológicos:
                </p>
                <table className="doc-table" style={{ fontSize: '9pt' }}>
                    <thead style={{ background: 'var(--doc-navy)', color: 'white' }}>
                        <tr><th style={{ padding: '10px' }}>AGENTE DE RISCO</th><th style={{ padding: '10px' }}>PRINCIPAIS AGRAVOS / CONSEQUÊNCIAS</th></tr>
                    </thead>
                    <tbody>
                        <tr><td style={{ fontWeight: 'bold', background: '#fef2f2', padding: '10px' }}>Ruído Ocupacional</td><td>PAIR (Perda Auditiva Induzida por Ruído), Zumbido, Hipertensão, Stress.</td></tr>
                        <tr><td style={{ fontWeight: 'bold', background: '#f0fdf4', padding: '10px' }}>Poeiras Minerais</td><td>Silicose, Pneumoconioses, Irritação das Vias Aéreas Superiores.</td></tr>
                        <tr><td style={{ fontWeight: 'bold', background: '#fff7ed', padding: '10px' }}>Solventes Químicos</td><td>Dermatites, Cefaleia, Alterações Hepáticas, Neurotoxicidade.</td></tr>
                        <tr><td style={{ fontWeight: 'bold', background: '#eff6ff', padding: '10px' }}>Calor Excessivo</td><td>Desidratação, Insolação, Câimbras, Exaustão Térmica.</td></tr>
                        <tr><td style={{ fontWeight: 'bold', background: '#faf5ff', padding: '10px' }}>Esforço Repetitivo</td><td>LER / DORT, Tendinites, Tenossinovites, Síndrome do Túnel do Carpo.</td></tr>
                        <tr><td style={{ fontWeight: 'bold', background: '#fefce8', padding: '10px' }}>Postura Inadequada</td><td>Lombalgias, Hérnias Discais, Desvios de Coluna.</td></tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINAS 18-23: GRIDS POR CARGO (MAP) */}
            {roles.map((role, rIdx) => {
                const roleRisks = riskInventory.filter(r => r.role_id === role.id);
                const roleExams = medicalExams.filter(e => e.role_id === role.id || e.id.includes('clinico'));

                return (
                    <React.Fragment key={role.id}>
                        <section style={sectionMargin}>
                            <DocHeader pageNumber={18 + rIdx} />
                            <h2 style={sectionHeader}>9. PLANEJAMENTO DE EXAMES: {role.title.toUpperCase()}</h2>
                            <div style={{ marginBottom: '20px' }}>
                                <table className="doc-table">
                                    <tbody>
                                        <tr><td style={labelTd}>Cargo</td><td style={contentTd} colSpan="3">{role.title}</td></tr>
                                        <tr><td style={labelTd}>CBO</td><td style={contentTd}>{role.cbo}</td><td style={labelTd}>Setor</td><td style={contentTd}>{role.department || 'Operacional'}</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3 style={subHeader}>Mapeamento de Riscos Específicos</h3>
                            <table className="doc-table" style={{ fontSize: '9pt' }}>
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr><th>CATEGORIA</th><th>NOME DO RISCO</th><th>FONTE GERADORA</th></tr>
                                </thead>
                                <tbody>
                                    {roleRisks.length > 0 ? roleRisks.map((risk, k) => (
                                        <tr key={k}>
                                            <td style={{ fontWeight: 'bold' }}>{risk.type || 'Físico'}</td>
                                            <td>{risk.hazard}</td>
                                            <td>{risk.source || 'Ambiente de Trabalho'}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="3" style={{ textAlign: 'center' }}>Riscos Ergonômicos e Acidentes Habituais</td></tr>
                                    )}
                                </tbody>
                            </table>

                            <h3 style={subHeader}>Periodicidade dos Exames Ocupacionais</h3>
                            <table className="doc-table" style={{ fontSize: '9pt', marginTop: '10px' }}>
                                <thead style={{ background: '#f1f5f9' }}>
                                    <tr><th>EXAME</th><th>PERIODICIDADE</th><th>INDICAÇÃO TÉCNICA</th></tr>
                                </thead>
                                <tbody>
                                    {roleExams.map((exam, exIdx) => (
                                        <tr key={exIdx}>
                                            <td style={{ fontWeight: 'bold' }}>{exam.exam_type}</td>
                                            <td> {exam.periodicidade || 'Anual'}</td>
                                            <td>{exam.target || 'Vigilância Geral'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                        <PageBreak />
                    </React.Fragment>
                );
            })}

            {/* SEÇÃO DINÂMICA PARA AJUSTE DE VOLUME SE HOUVER POUCOS CARGOS */}
            {roles.length < 5 && (
                <section style={sectionMargin}>
                    <DocHeader pageNumber={18 + roles.length} />
                    <h2 style={sectionHeader}>NOTAS COMPLEMENTARES SOBRE EXPOSIÇÕES</h2>
                    <p style={pStyle}>
                        Para funções com baixa exposição a riscos físicos ou químicos, os exames clínicos anuais são direcionados
                        para a avaliação de saúde geral e detecção precoce de doenças crônicas que possam ser agravadas pela atividade laboral.
                    </p>
                    <div style={{ background: '#f8fafc', padding: '20px', border: '1px dotted #64748b' }}>
                        <h3 style={subHeader}>Avaliação Psicossocial</h3>
                        <p style={pStyle}>
                            Deverá ser realizada avaliação psicossocial para todos os trabalhadores que exerçam atividades em altura (NR-35)
                            ou espaços confinados (NR-33), conforme preconizado nas normas vigentes.
                        </p>
                    </div>
                </section>
            )}
            <PageBreak />

            {/* PÁGINA 26: PLANEJAMENTO ANUAL */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="26" />
                <h2 style={sectionHeader}>10. PLANEJAMENTO DE AÇÕES DE SAÚDE ANUAL</h2>
                <table className="doc-table">
                    <thead style={{ background: '#f1f5f9' }}>
                        <tr><th>AÇÃO / TEMA</th><th>PERIODICIDADE</th><th>STATUS</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Relatório Analítico (Quadro III NR-07)</td><td>Dezembro</td><td>Planejado</td></tr>
                        <tr><td>Palestra: Doenças Osteomusculares</td><td>Semestral</td><td>Em execução</td></tr>
                        <tr><td>Treinamento de Primeiros Socorros</td><td>Anual</td><td>Planejado</td></tr>
                        <tr><td>Campanha de Vacinação contra a Gripe</td><td>Abril/Maio</td><td>Anual</td></tr>
                        <tr><td>Palestra: Prevenção de Doenças do Coração</td><td>Novembro Azul</td><td>Planejado</td></tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 27: IMUNIZAÇÃO */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="27" />
                <h2 style={sectionHeader}>11. IMUNIZAÇÃO RECOMENDADA</h2>
                <p style={pStyle}>
                    Conforme recomendações do Ministério da Saúde e Medicina do Trabalho:
                </p>
                <table className="doc-table">
                    <thead style={{ background: '#f1f5f9' }}>
                        <tr><th>VACINA</th><th>ESQUEMA</th><th>REFORÇO</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Dupla Adulto (dT)</td><td>3 doses</td><td>A cada 10 anos</td></tr>
                        <tr><td>Hepatite B</td><td>3 doses</td><td>Conforme Anti-HBS</td></tr>
                        <tr><td>Febre Amarela</td><td>Dose única</td><td>Vitalícia</td></tr>
                        <tr><td>Influenza (Gripe)</td><td>Anual</td><td>Anual</td></tr>
                    </tbody>
                </table>
            </section>
            <PageBreak />

            {/* PÁGINA 28: PRIMEIROS SOCORROS */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="28" />
                <h2 style={sectionHeader}>12. PRIMEIROS SOCORROS E EMERGÊNCIA</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' }}>
                    <div style={{ border: '3px solid #ef4444', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
                        <div style={{ fontSize: '36pt', fontWeight: '900', color: '#ef4444' }}>192</div>
                        <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>SAMU</div>
                    </div>
                    <div style={{ border: '3px solid #f97316', padding: '25px', borderRadius: '15px', textAlign: 'center' }}>
                        <div style={{ fontSize: '36pt', fontWeight: '900', color: '#f97316' }}>193</div>
                        <div style={{ fontWeight: 'bold', fontSize: '14pt' }}>BOMBEIROS</div>
                    </div>
                </div>
                <h3 style={subHeader}>Procedimento em Caso de Acidente</h3>
                <ol style={{ ...pStyle, paddingLeft: '20px' }}>
                    <li>Manter a calma e sinalizar o local;</li>
                    <li>Acionar o socorro médico externo imediatamente;</li>
                    <li>Prestar os primeiros socorros básicos (apenas se treinado);</li>
                    <li>Informar o SESMT e o Responsável Legal da empresa;</li>
                    <li>Emitir a CAT (Comunicação de Acidente de Trabalho) em 24h.</li>
                </ol>
            </section>
            <PageBreak />

            {/* PÁGINA 30: GESTÃO DE DADOS */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="30" />
                <h2 style={sectionHeader}>13. ARQUIVO MÉDICO E GESTÃO DE DADOS</h2>
                <h3 style={subHeader}>Guarda dos Prontuários</h3>
                <p style={pStyle}>
                    Os prontuários médicos deverão estar sob a guarda do médico responsável ou de serviço de arquivo médico especializado pelo período mínimo de <strong>20 (vinte) anos</strong> após o desligamento do trabalhador, conforme determina a NR-07.
                </p>
                <h3 style={subHeader}>Confidencialidade</h3>
                <p style={pStyle}>
                    O acesso aos prontuários é restrito aos profissionais de saúde, respeitando o Código de Ética Médica e a Lei Geral de Proteção de Dados (LGPD).
                </p>
                <div style={{ marginTop: '40px', borderTop: '2px solid #e2e8f0', paddingTop: '20px' }}>
                    <p style={{ ...pStyle, fontSize: '9pt', color: '#64748b' }}>
                        Documento gerado eletronicamente através da plataforma W&D Vidas SST.
                    </p>
                </div>
            </section>
            <PageBreak />

            {/* PÁGINA 31: ASSINATURAS */}
            <section style={{ ...sectionMargin, textAlign: 'center' }}>
                <DocHeader pageNumber="31" />
                <h1 style={{ margin: '60px 0 30px 0', fontSize: '20pt', color: 'var(--doc-navy)', fontWeight: 'bold' }}>DISPOSIÇÕES FINAIS</h1>
                <p style={{ ...pStyle, maxWidth: '800px', margin: '0 auto 100px auto' }}>
                    Este programa entra em vigor na data de sua assinatura e terá validade de 12 meses. O médico coordenador relatará anualmente as ocorrências epidemiológicas de forma a permitir ajustes técnicos no programa de prevenção.
                </p>

                <SignatureBlock
                    signatories={[
                        { name: team.length > 0 ? team[0].name : 'Médico Responsável', role: 'Médico do Trabalho - Coordenador PCMSO', doc: team.length > 0 ? `CRM-${team[0].crm}/${team[0].crm_state}` : 'CRM -' },
                        { name: companyData?.name || 'EMPRESA CLIENTE', role: 'Representante da Empresa', doc: `CNPJ: ${companyData?.cnpj}` }
                    ]}
                />
            </section>
        </div>
    );
};

export default PCMSOTemplate;

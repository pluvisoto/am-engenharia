import React from 'react';
import SignatureBlock from '../SignatureBlock';
import DocumentCover from '../DocumentCover';
import TableOfContents from '../TableOfContents';
import { getTeamMembers } from '../../utils/storage';

const PGRTemplate = ({ companyData, extraData, inventory }) => {
    // Default data fallback
    const data = extraData || {
        horarioTrabalho: '08:00 às 18:00',
        turnos: 'Diurno',
        numFuncionarios: '10',
        responsavelLegal: '[Responsável]',
        hospitalReferencia: 'Pronto Socorro Local'
    };

    const safeCNPJ = (companyData?.cnpj || '00000000').replace(/[^0-9]/g, '').substring(0, 8);
    const allTeam = getTeamMembers();
    const team = extraData?.responsavelTecnico
        ? allTeam.filter(t => t.id === extraData.responsavelTecnico)
        : allTeam;

    const PageBreak = () => <div style={{ pageBreakAfter: 'always', height: '1px' }}></div>;

    const DocHeader = ({ pageNumber }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid var(--accent)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/doc/Logo AM/Logo AM.webp" alt="Logo AM" style={{ height: '30px' }} />
                <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '10pt', textTransform: 'uppercase' }}>AM <span style={{ color: 'var(--accent)' }}>ENGENHARIA</span></span>
            </div>
            <div style={{ fontSize: '8pt', color: '#64748b', fontWeight: 'bold' }}>CONTROLE DE RISCOS OPERACIONAIS</div>
            <div style={{ fontSize: '8pt', color: '#64748b' }}>{pageNumber}</div>
        </div>
    );

    return (
        <div className="document-body" style={{ backgroundColor: '#fff', color: '#000', fontSize: '11pt', lineHeight: 1.6 }}>
            <DocumentCover
                title="PGR"
                subtitle="PROGRAMA DE GERENCIAMENTO DE RISCOS"
                companyName={companyData?.name || 'EMPRESA NÃO IDENTIFICADA'}
                validity="2025 - 2026"
                docCode={`PGR-${safeCNPJ}-${new Date().getFullYear()}`}
            />
            <PageBreak />

            {/* PÁGINA 2: IDENTIFICAÇÃO + SUMÁRIO */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="Pág 02" />
                <table className="doc-table" style={{ marginBottom: '30px' }}>
                    <tbody>
                        <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>Empregador:</td><td>{companyData?.name} (Grau de Risco: {companyData?.grau_risco || '1'} conforme NR 4)</td></tr>
                        <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>Endereço:</td><td>{companyData?.address || 'Endereço não informado'}</td></tr>
                        <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>CNPJ:</td><td>{companyData?.cnpj}</td><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>Telefone:</td><td>{companyData?.phone || '(00) 00000-0000'}</td></tr>
                        <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>CNAE:</td><td colSpan="3">{companyData?.cnae} - {companyData?.cnae_descricao || 'Descrição não disponível'}</td></tr>
                    </tbody>
                </table>

                {team.length > 0 && (
                    <table className="doc-table" style={{ marginBottom: '30px' }}>
                        <tbody>
                            <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>Autor:</td><td>{team[0]?.name}</td><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>CREA:</td><td>{team[0]?.registration || 'SP 0000000000'}</td></tr>
                            <tr><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>Coordenador:</td><td>{team[0]?.name}</td><td style={{ background: '#f0f0f0', fontWeight: 'bold' }}>CREA:</td><td>{team[0]?.registration || 'SP 0000000000'}</td></tr>
                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>{team[0]?.role || 'Engenheiro Mecânico e de Segurança do Trabalho'}</td></tr>
                        </tbody>
                    </table>
                )}

                <h2 className="doc-section-title">SUMÁRIO</h2>
                <ol style={{ paddingLeft: '20px', marginTop: '20px' }}>
                    <li>INTRODUÇÃO</li>
                    <li>DEFINIÇÕES E CRITÉRIOS DE RISCOS</li>
                    <li>AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS</li>
                    <li>RECONHECIMENTO E AVALIAÇÃO DOS RISCOS AMBIENTAIS</li>
                    <li>MEDIDAS GERAIS DE CONTROLE PARA OS RISCOS</li>
                    <li>EQUIPAMENTOS DE PROTEÇÃO</li>
                    <li>TIPOS DE EQUIPAMENTOS DE PROTEÇÃO</li>
                    <li>ANÁLISE DOS ACIDENTES</li>
                    <li>INSTRUÇÕES PARA PROTEÇÃO CONTRA INCÊNDIO E PÂNICO</li>
                    <li>PLANO DE AÇÃO</li>
                    <li>DISPOSIÇÕES GERAIS</li>
                </ol>

                <p style={{ marginTop: '30px', textAlign: 'justify' }}>
                    O Programa de Gerenciamento de Riscos visa preservar a vida e evitar danos físicos e psíquicos às pessoas, além de controlar agentes ambientais por meio de monitoramento periódico, considerando a proteção do meio ambiente e dos recursos naturais. O programa busca evitar danos à propriedade e paralisações nos serviços. Ao antecipar, identificar e avaliar os fatores de risco, as empresas podem estabelecer critérios para selecionar as medidas de controle mais adequadas à sua realidade.
                </p>

                {team.length > 0 && (
                    <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ borderTop: '1px solid #000', width: '250px', margin: '0 auto 5px' }}></div>
                            <div>{team[0]?.name}</div>
                            <div style={{ fontSize: '9pt' }}>Responsável pela AM ENGENHARIA LTDA</div>
                            <div style={{ fontSize: '9pt' }}>CREA-SP {team[0]?.registration}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ borderTop: '1px solid #000', width: '250px', margin: '0 auto 5px' }}></div>
                            <div>{team[0]?.name}</div>
                            <div style={{ fontSize: '9pt' }}>Eng. Mecânico e Segurança</div>
                            <div style={{ fontSize: '9pt' }}>CREA-SP {team[0]?.registration}</div>
                        </div>
                    </div>
                )}
            </section>
            <PageBreak />

            {/* SEÇÃO 1: INTRODUÇÃO */}
            <section style={sectionMargin}>
                <DocHeader pageNumber="Pág 03" />
                <h2 className="doc-section-title">1. INTRODUÇÃO</h2>

                <h3 style={subHeader}>NORMA REGULAMENTADORA N.º 01 - DISPOSIÇÕES GERAIS e GERENCIAMENTO DE RISCOS OCUPACIONAIS</h3>
                <p style={pStyle}>
                    A NR-1, pela Portaria SEPRT n.º 6.730, de 09/03/20, estabelece as disposições gerais e o Gerenciamento de Riscos Ocupacionais na Saúde e Segurança do Trabalho:
                </p>
                <p style={pStyle}>
                    "1.1.1 O objetivo desta Norma é estabelecer as disposições gerais, o campo de aplicação, os termos e as definições comuns às Normas Regulamentadoras - NR relativas a segurança e saúde no trabalho e as diretrizes e os requisitos para o gerenciamento de riscos ocupacionais e as medidas de prevenção em Segurança e Saúde no Trabalho - SST"
                </p>
                <p style={pStyle}>
                    <strong>O PGR - Programa de Gerenciamento de Riscos</strong> é um documento que deve estar incluso no Gerenciamento de Riscos Ocupacionais.
                </p>

                <h3 style={subHeader}>O Programa de Gerenciamento de Riscos - PGR</h3>
                <p style={pStyle}>
                    Este documento representa a implementação do PGR - Programa de Gerenciamento de Riscos, estabelecido pela NR-1 (Portaria SEPRT n.º 6.730):
                </p>
                <p style={pStyle}>
                    "1.5.3.1. A organização deve implementar, por estabelecimento, o gerenciamento de riscos ocupacionais em suas atividades.
                </p>
                <p style={pStyle}>
                    1.5.3.1.1 O gerenciamento de riscos ocupacionais deve constituir um Programa de Gerenciamento de Riscos - PGR.<br />
                    1.5.3.1.1.1 A critério da organização, o PGR pode ser implementado por unidade operacional, setor ou atividade.<br />
                    1.5.3.1.2 O PGR pode ser atendido por sistemas de gestão, desde que estes cumpram as exigências previstas nesta NR e emdispositivos legais de segurança e saúde no trabalho.
                </p>
                <p style={pStyle}>
                    1.5.3.1.3 O PGR deve contemplar ou estar integrado com planos, programas e outros documentos previstos na legislação desegurança e saúde no trabalho"
                </p>
                <p style={pStyle}>
                    Segundo a <strong>NR-1</strong>, o PGR deve conter dois documentos base:
                </p>
                <p style={pStyle}>
                    <strong>Inventário de Riscos e Plano de Ação</strong>."1.5.7.1 O PGR deve conter, no mínimo, os seguintes documentos:
                </p>
                <p style={pStyle}>
                    a) <strong>inventário de riscos</strong>; e<br />
                    b) <strong>plano de ação</strong>.
                </p>
                <p style={pStyle}>
                    1.5.7.2 Os documentos integrantes do PGR devem ser elaborados sob a responsabilidade da organização, respeitado o disposto nasd emais Normas Regulamentadoras, datados e assinados.
                </p>
                <p style={pStyle}>
                    1.5.7.2.1 Os documentos integrantes do PGR devem estar sempre disponíveis aos trabalhadores interessados ou seusrepresentantes e à Inspeção do Trabalho."
                </p>

                <h3 style={subHeader}>Sobre o Inventário de Riscos</h3>
                <p style={pStyle}>
                    Os riscos identificados e avaliados neste PGR - Programa de Gerenciamento de Riscos, foram formalizados em um inventário deriscos, da maneira estabelecida pela NR-1 (Portaria SEPRT n.º 6.730):
                </p>
                <p style={pStyle}>
                    "1.5.7.3.1 Os dados da identificação dos perigos e das avaliações dos riscos ocupacionais devem ser consolidados em um inventáriode riscos ocupacionais.
                </p>
                <p style={pStyle}>
                    1.5.7.3.2 O Inventário de Riscos Ocupacionais deve contemplar, no mínimo, as seguintes informações:
                </p>
                <p style={pStyle}>
                    a) caracterização dos processos e ambientes de trabalho;<br />
                    b) caracterização das atividades;<br />
                    c) descrição de perigos e de possíveis lesões ou agravos à saúde dos trabalhadores, com a identificação das fontes ou circunstâncias,descrição de riscos gerados pelos perigos, com a indicação dos grupos de trabalhadores sujeitos a esses riscos, e descrição de medidas de prevenção implementadas;
                </p>
            </section>
            <PageBreak />

            {/* Continuação da Seção 1 */}
            <section style={sectionMargin}>
                <p style={pStyle}>
                    d) dados da análise preliminar ou do monitoramento das exposições a agentes físicos, químicos e biológicos e os resultados daavaliação de ergonomia nos termos da NR-17.
                </p>
                <p style={pStyle}>
                    e) avaliação dos riscos, incluindo a classificação para fins de elaboração do plano de ação; e
                </p>
                <p style={pStyle}>
                    f) critérios adotados para avaliação dos riscos e tomada de decisão.
                </p>
                <p style={pStyle}>
                    1.5.7.3.3 O inventário de riscos ocupacionais deve ser mantido atualizado.
                </p>
                <p style={pStyle}>
                    1.5.7.3.3.1 O histórico das atualizações deve ser mantido por um período mínimo de 20 (vinte) anos ou pelo período estabelecido em normatização específica."
                </p>
                <p style={pStyle}>
                    A caracterização dos ambientes está disposta logo no início do inventário. O inventário de riscos está disposto por cargo. Na descrição dos cargos está disposta a caracterização dos processos e atividades.
                </p>
                <p style={pStyle}>
                    Para compor o inventário de riscos, foram avaliados os níveis de riscos através da matriz de riscos definida. Para isso foi necessário avaliar os níveis de probabilidade e severidade de cada perigo e risco identificado, através de tabelas de gradações mencionadas em"<strong>2.DEFINIÇÕES E CRITÉRIOS DE RISCOS</strong>".
                </p>
                <p style={pStyle}>
                    O inventário de riscos, quando feito através de um sistema de gestão sofisticado, deve ser exposto de maneira listada, como é feito neste documento (de acordo com as recomendações da Fundacentro).
                </p>

                <h3 style={subHeader}>Sobre o Plano de Ação</h3>
                <p style={pStyle}>
                    Após feito o Inventário de Riscos, foi consolidado um plano de ação para controle dos riscos ocupacionais necessários, como estabelecido pela NR-1 (Portaria SEPRT n.º 6.730):
                </p>
                <p style={pStyle}>
                    "1.5.5.2.1 A organização deve elaborar plano de ação, indicando as medidas de prevenção a serem introduzidas, aprimoradas ou mantidas, conforme o subitem 1.5.4.4.5.
                </p>
                <p style={pStyle}>
                    1.5.5.2.2 Para as medidas de prevenção deve ser definido cronograma, formas de acompanhamento e aferição de resultados."
                </p>
                <p style={pStyle}>
                    O modelo exposto neste documento é um cronograma de ações planejadas, onde cada ação tem sua descrição e data deplanejamento. Na descrição de cada ação são informadas as medidas de prevenção com as respectivas ações necessárias para controle e mitigação dos riscos ocupacionais.
                </p>
            </section>
            <PageBreak />

            {/* SEÇÃO 2: DEFINIÇÕES E CRITÉRIOS DE RISCOS */}
            <section style={sectionMargin}>
                <h2 className="doc-section-title">2. DEFINIÇÕES E CRITÉRIOS DE RISCOS</h2>

                <h3 style={subHeader}>Tabelas de Gradação de Probabilidade e Severidade</h3>
                <p style={pStyle}>
                    As tabelas de gradação de severidade e probabilidade sugeridas são as tabelas da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Todas elas possuem gradações de 1 a 5, que vão desde a classificação da severidade e probabilidade maior até a menor.
                </p>
                <p style={pStyle}>
                    As gradações de <strong>probabilidade</strong> são 5 (cinco): Rara (1); Pouco Provável (2); Possível (3); Provável (4) e Muito Provável (5). Nas avaliações qualitativas, de acordo com o controle e exposição ao risco, determina-se de 1 a 5 o nível de probabilidade. Em avaliações quantitativas, a probabilidade é classificada de acordo com a porcentagem do valor de exposição ao LEO - Limite de Exposição Ocupacional.
                </p>

                <table className="doc-table" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ background: '#FFD966', fontWeight: 'bold' }}>
                            <th colSpan="3">GRADAÇÃO DE PROBABILIDADE - AVALIAÇÕES QUANTITATIVAS</th>
                        </tr>
                        <tr style={{ background: '#FFE699' }}>
                            <th colSpan="3">Estimativa de Probabilidade baseada no LEO (Limite de Exposição Ocupacional (sem considerar EPI) | <em>AIHA (2015)</em></th>
                        </tr>
                        <tr style={{ background: '#FFF2CC' }}>
                            <th>Nível</th><th>Categoria</th><th>Níveis de Exposição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Exposição a níveis muito baixos</td><td>Exposições &lt; 10% LEO</td></tr>
                        <tr><td>2</td><td>Exposição baixa</td><td>Exposições &gt; 10% e &lt;50% LEO</td></tr>
                        <tr><td>3</td><td>Exposição moderada</td><td>Exposições &gt; 50% e &lt;100% LEO</td></tr>
                        <tr><td>4</td><td>Exposição excessiva</td><td>Exposições &gt; 100% e 500% LEO</td></tr>
                        <tr><td>5</td><td>Exposição muito excessiva</td><td>Exposições superiores a 5 x LEO</td></tr>
                    </tbody>
                </table>

                <table className="doc-table" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ background: '#D9D9D9', fontWeight: 'bold' }}>
                            <th colSpan="3">GRADAÇÃO DE PROBABILIDADE - AVALIAÇÕES QUALITATIVAS</th>
                        </tr>
                        <tr style={{ background: '#E7E6E6' }}>
                            <th colSpan="3">Estimativa de Probabilidade para avaliação de Riscos Mecânicos / Ergonômicos / Biológicos / outros</th>
                        </tr>
                        <tr style={{ background: '#F2F2F2' }}>
                            <th>Nível</th><th>Controle Existente</th><th>Medidas de Prevenção</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Controle Excelente</td><td>Representa a melhor tecnologia ou prática de controle disponível.</td></tr>
                        <tr><td>2</td><td>Controle em conformidade legal</td><td>Controle seguindo as normais legais, mantido adequadamente.</td></tr>
                        <tr><td>3</td><td>Controle com pequenas deficiências</td><td>Controle adequado com pequenas deficiências na operação ou manutenção.</td></tr>
                        <tr><td>4</td><td>Controle deficiente</td><td>Controle incompleto ou com deficiências relevantes.</td></tr>
                        <tr><td>5</td><td>Controle inexistente</td><td>As medidas de controle são inexistentes ou totalmente inadequadas.</td></tr>
                    </tbody>
                </table>

                <p style={pStyle}>
                    As gradações de <strong>severidade</strong> são 5 (cinco): Leve (1); Baixa (2); Moderada (3); Alta (4) e Extrema (5). A severidade é classificada de 1 a5, de acordo com o nível de consequência à exposição.
                </p>

                <table className="doc-table" style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <thead>
                        <tr style={{ background: '#D9D9D9', fontWeight: 'bold' }}>
                            <th colSpan="2">GRADAÇÃO DE SEVERIDADE - AVALIAÇÕES QUANTITATIVAS/QUALITATIVAS</th>
                        </tr>
                        <tr style={{ background: '#E7E6E6' }}>
                            <th colSpan="2">Estimativas de Severidade | <em>AIHA (2015)</em></th>
                        </tr>
                        <tr style={{ background: '#F2F2F2' }}>
                            <th>Nível</th><th>Definição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1</td><td>Lesão leve sem necessidade atenção médica, incômodos ou mal estar.</td></tr>
                        <tr><td>2</td><td>Lesão ou doenças sérias reversíveis.</td></tr>
                        <tr><td>3</td><td>Lesão ou doenças críticas irreversíveis que podem limitar a capacidade funcional.</td></tr>
                        <tr><td>4</td><td>Lesão ou doença incapacitante ou mortal.</td></tr>
                        <tr><td>5</td><td>Mortes ou incapacidades múltiplas (&gt;10).</td></tr>
                    </tbody>
                </table>

                <h3 style={subHeader}>Matriz de Risco Utilizada</h3>
                <p style={pStyle}>
                    A Matriz de Risco utilizada neste Programa de Gerenciamento de Riscos é uma matriz no formato 5x5, baseada nas estimativas de gradação de Severidade e Probabilidade da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Esta matriz funciona para avaliações qualitativas e quantitativas, pois as tabelas de gradações sugeridas possuem as estimativas adequadas para ambas as avaliações.
                </p>
                <p style={pStyle}>
                    Os níveis de risco presentes na matriz são 5 (cinco): Trivial (1-3); Tolerável (3-8); Moderado (4-12); Substancial (10-15) e Intolerável (15-25). Cada nível de risco possui o seu método de controle sugerido, baseado na estimativa (grau de certeza) da avaliação, onde osriscos de níveis mais altos têm prioridade na ação de controle. A ação de controle é classificada de acordo com a estimativa, que pode ser: certa (0); incerta (1) e altamente incerta (2).
                </p>
            </section>
            <PageBreak />

            {/* MATRIZ 5x5 COLORIDA */}
            <section style={sectionMargin}>
                <table className="doc-table" style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th colSpan="2" rowSpan="2" style={{ border: '1px solid #000', background: '#D9D9D9', padding: '10px' }}>MATRIZ DE RISCO 5X5 Baseada na Metodologia AIHA</th>
                            <th colSpan="5" style={{ border: '1px solid #000', background: '#D9D9D9', padding: '10px' }}>SEVERIDADE</th>
                        </tr>
                        <tr>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>Leve</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>Baixa</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>Moderada</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>Alta</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>Extrema</th>
                        </tr>
                        <tr>
                            <th rowSpan="6" style={{ border: '1px solid #000', background: '#D9D9D9', padding: '10px', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>PROBABILIDADE</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}></th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>1</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>2</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>3</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>4</th>
                            <th style={{ border: '1px solid #000', background: '#E7E6E6', padding: '5px' }}>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF' }}>Muito Provável</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF', textAlign: 'center' }}>5</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>5</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFFF00', textAlign: 'center' }}>10</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFC000', textAlign: 'center' }}>15</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FF0000', textAlign: 'center', color: '#FFF' }}>20</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FF0000', textAlign: 'center', color: '#FFF' }}>25</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF' }}>Provável</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF', textAlign: 'center' }}>4</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>4</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>8</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFFF00', textAlign: 'center' }}>12</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFC000', textAlign: 'center' }}>16</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FF0000', textAlign: 'center', color: '#FFF' }}>20</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF' }}>Possível</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF', textAlign: 'center' }}>3</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', textAlign: 'center' }}>3</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>6</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>9</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFFF00', textAlign: 'center' }}>12</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFC000', textAlign: 'center' }}>15</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF' }}>Pouco Provável</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF', textAlign: 'center' }}>2</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', textAlign: 'center' }}>2</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>4</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>6</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>8</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFFF00', textAlign: 'center' }}>10</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF' }}>Rara</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#FFF', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', textAlign: 'center' }}>1</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', textAlign: 'center' }}>2</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', textAlign: 'center' }}>3</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>4</td>
                            <td style={{ border: '1px solid #000', padding: '5px', background: '#92D050', textAlign: 'center' }}>5</td>
                        </tr>
                        <tr>
                            <td colSpan="6" style={{ border: '1px solid #000', padding: '5px', background: '#E7E6E6', fontWeight: 'bold', textAlign: 'center' }}>Legenda do Nível de Risco</td>
                        </tr>
                    </tbody>
                </table>

                <table className="doc-table" style={{ width: '80%', margin: '0 auto 20px' }}>
                    <tbody>
                        <tr><td style={{ border: '1px solid #000', padding: '5px', background: '#00B0F0', width: '30%' }}>1 até 3</td><td style={{ border: '1px solid #000', padding: '5px' }}>Trivial</td></tr>
                        <tr><td style={{ border: '1px solid #000', padding: '5px', background: '#92D050' }}>3 até 8</td><td style={{ border: '1px solid #000', padding: '5px' }}>Tolerável</td></tr>
                        <tr><td style={{ border: '1px solid #000', padding: '5px', background: '#FFFF00' }}>4 até 12</td><td style={{ border: '1px solid #000', padding: '5px' }}>Moderado</td></tr>
                        <tr><td style={{ border: '1px solid #000', padding: '5px', background: '#FFC000' }}>10 até 15</td><td style={{ border: '1px solid #000', padding: '5px' }}>Substancial</td></tr>
                        <tr><td style={{ border: '1px solid #000', padding: '5px', background: '#FF0000', color: '#FFF' }}>15 até 25</td><td style={{ border: '1px solid #000', padding: '5px' }}>Intolerável</td></tr>
                    </tbody>
                </table>

                <p style={pStyle}>
                    <strong>Exemplo</strong> de aplicação:
                </p>
                <p style={pStyle}>
                    <em>Probabilidade: ruído ocupacional de 40 dB é &gt; 10% e &lt; 50% do LEO (85 dB) permitido para 8 horas de atividade, classificando-o como <strong>probabilidade de nível 2</strong> (pouco provável), de acordo com a tabela de gradação AIHA.</em>
                </p>
                <p style={pStyle}>
                    <em>Severidade: a severidade de uma doença que possa surgir de um ruído ocupacional classifica-se como "Lesão ou doenças críticas irreversíveis que podem limitar a capacidade funcional", de acordo com a tabela sugerida, classificando-a como <strong>severidade de nível 3</strong> (moderada).</em>
                </p>
                <p style={pStyle}>
                    <em>Nível do Risco: o nível do risco é a probabilidade x (vezes) a severidade. No caso, <strong>2 x 3</strong>, resultando em <strong>6 (moderado)</strong> de acordo com amatriz.</em>
                </p>
                <p style={pStyle}>
                    Obs.: suponha-se que os valores fossem invertidos (severidade 3 e probabilidade 2), o nível do risco ainda seria 6 (3x2), porém o nível do risco serial Tolerável (6), ao invés de Moderado (6). Isso se deve ao fato de a severidade ter maior relevância ao se definir o nível de risco.
                </p>

                <h3 style={subHeader}>Métodos de Controle e Ação</h3>
                <p style={pStyle}>
                    Os métodos de controle são classificados de acordo com o nível do risco e grau de certeza da estimativa da avaliação. Os níveis de risco mais altos devem ter prioridade na ação de controle. A ação de controle é classificada de acordo com a estimativa, que pode ser: certa (0); incerta (1) e altamente incerta (2).
                </p>
                <p style={pStyle}>
                    Esta classificação padrão dos métodos de controle funciona apenas para o Inventário de Riscos e não deve ser adotada como método único para o Plano de Ação. Contudo, como as ações de controle serão feitas baseadas no inventário, estas classificações servem para definir a prioridade das ações.
                </p>
                <p style={pStyle}>
                    A tabela utilizada foi recomendada pela Fundacentro.
                </p>
            </section>
            <PageBreak />

            {/* TABELA DE MÉTODOS DE CONTROLE */}
            <section style={sectionMargin}>
                <table className="doc-table" style={{ fontSize: '9pt' }}>
                    <thead>
                        <tr>
                            <th style={{ background: '#D9D9D9', padding: '8px' }}>NÍVEIS DE RISCO<br />(ordem deprioridade)</th>
                            <th colSpan="3" style={{ background: '#D9D9D9', padding: '8px' }}>MÉTODOS DE<br />CONTROLE E AÇÕES<br />Estimativa</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th style={{ background: '#F2F2F2', padding: '5px' }}>0 - Certa</th>
                            <th style={{ background: '#F2F2F2', padding: '5px' }}>1 - Incerta</th>
                            <th style={{ background: '#F2F2F2', padding: '5px' }}>2 - Altamente Incerta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ background: '#FF0000', color: '#FFF', fontWeight: 'bold', padding: '5px' }}>1º Intolerável</td>
                            <td style={{ padding: '5px' }}>Ação imediata ou interrupção da atividade</td>
                            <td style={{ padding: '5px' }}>Controle e informação adicional necessários.</td>
                            <td style={{ padding: '5px' }}>Controle e informação adicional necessários.</td>
                        </tr>
                        <tr>
                            <td style={{ background: '#FFC000', fontWeight: 'bold', padding: '5px' }}>2º Substancial</td>
                            <td style={{ padding: '5px' }}>Controle necessário.</td>
                            <td style={{ padding: '5px' }}>Controle e informação adicional necessários.</td>
                            <td style={{ padding: '5px' }}>Controle e informação adicional necessários.</td>
                        </tr>
                        <tr>
                            <td style={{ background: '#FFFF00', fontWeight: 'bold', padding: '5px' }}>3º Moderado</td>
                            <td style={{ padding: '5px' }}>Controle adicional,se possível/viável.</td>
                            <td style={{ padding: '5px' }}>Informação adicional necessária.</td>
                            <td style={{ padding: '5px' }}>Informação adicional necessária.</td>
                        </tr>
                        <tr>
                            <td style={{ background: '#92D050', fontWeight: 'bold', padding: '5px' }}>4º Tolerável</td>
                            <td style={{ padding: '5px' }}>Nenhum controle adicional necessário.</td>
                            <td style={{ padding: '5px' }}>Informação adicional necessária.</td>
                            <td style={{ padding: '5px' }}>Informação adicional necessária.</td>
                        </tr>
                        <tr>
                            <td style={{ background: '#00B0F0', fontWeight: 'bold', padding: '5px' }}>5º Trivial</td>
                            <td style={{ padding: '5px' }}>Nenhuma ação necessária.</td>
                            <td style={{ padding: '5px' }}>Nenhuma informação adicional énecessária.</td>
                            <td style={{ padding: '5px' }}>Nenhuma informação adicional énecessária.</td>
                        </tr>
                    </tbody>
                </table>

                <h3 style={subHeader}>Indicador de Qualidade das Condições de Trabalho - IQCT</h3>
                <p style={pStyle}>
                    Para cada atividade existe um indicador de qualidade, chamado de IQCT - Indicador da Qualidade das Condições de Trabalho. O IQCTvaria de 25 (todos riscos altos) a 100 (todos os riscos baixos). Contudo, apesar dos 5 (cinco) níveis de risco existentes, considera-se apenas três níveis de Risco: Tolerável (<strong>B</strong>), Moderado(<strong>M</strong>) e Substancial (<strong>A</strong>). Exclui-se deste cálculo riscos Triviais e riscos Intoleráveis que exijam atuação imediata.
                </p>
                <p style={pStyle}>
                    O cálculo é feito através da seguinte fórmula:
                </p>

                <table style={{ width: '60%', margin: '20px auto', border: '1px solid #000' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>IQCT =</td>
                            <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>4nB + 3nM + nA<br />────────────<br />(nB + nM + nA) x4</td>
                            <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>x100</td>
                        </tr>
                    </tbody>
                </table>

                <p style={pStyle}>
                    O resultado vai variar de 25 a 100. Quanto maior o resultado, maior o índice de qualidade na atividade exercida.
                </p>
            </section>
            <PageBreak />

            {/* SEÇÃO 3: AMBIENTES, CARGOS E INVENTÁRIO */}
            <section style={sectionMargin}>
                <h2 className="doc-section-title">3. AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS</h2>

                {(extraData?.sectors || [
                    { name: 'ADMINISTRATIVO', description: 'Ambiente climatizado, em alvenaria, com iluminação artificial.' },
                    { name: 'OPERACIONAL', description: 'Galpão industrial, ventilação natural, iluminação mista.' }
                ]).map((s, idx) => (
                    <div key={idx}>
                        <div style={{ background: '#FFD966', padding: '15px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center', border: '2px solid #000' }}>
                            {String.fromCharCode(65 + idx)} – SETOR – {s.name.toUpperCase()}
                        </div>
                        <table className="doc-table" style={{ marginBottom: '30px' }}>
                            <tbody>
                                <tr>
                                    <td style={{ background: '#F2F2F2', fontWeight: 'bold', padding: '8px', width: '30%' }}>Descrição do Ambiente</td>
                                    <td style={{ padding: '8px' }}>{s.description || 'Ambiente de trabalho conforme vistorias in loco.'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </section>

            {/* SEÇÃO 4: RECONHECIMENTO E AVALIAÇÃO */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">4. RECONHECIMENTO E AVALIAÇÃO DOS RISCOS AMBIENTAIS</h2>

                <table className="doc-table" style={{ marginBottom: '30px', fontSize: '9pt' }}>
                    <thead>
                        <tr style={{ background: '#FFD966' }}>
                            <th>SETOR</th>
                            <th>C.B.O.</th>
                            <th>FUNÇÃO</th>
                            <th>Nº de Trabalhadores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(extraData?.roles || []).map((role, idx) => {
                            const sector = extraData?.sectors?.find(s => s.id === role.sector_id);
                            return (
                                <tr key={idx}>
                                    <td>{sector?.name || 'Geral'}</td>
                                    <td>{role.cbo}</td>
                                    <td>{role.title}</td>
                                    <td>{role.employee_count}</td>
                                </tr>
                            );
                        })}
                        {(extraData?.roles?.length === 0 || !extraData?.roles) && (
                            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Nenhum cargo identificado no motor automático.</td></tr>
                        )}
                    </tbody>
                </table>

                <div style={{ border: '2px solid #FFD966', padding: '5px', marginBottom: '20px' }}>
                    <div style={{ background: '#FFD966', padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                        Ambientes: A - SETOR - ENGENHARIA
                    </div>
                </div>

                <p style={pStyle}>
                    <strong>Atividades:</strong> Conceber, analisar e selecionar materiais; Fabricar, controlar e manter sistemas térmicos, de estruturas e elementos de máquinas; Participar na coordenação, fiscalização e execução de instalações mecânicas, termodinâmicas e eletromecânicas; Elaborar desenhos técnicos; Gerir atividades de produção; Elaborar documentos técnicos; Executar testes e simulações em equipamentos; Criar estratégias de manutenção; Desenvolver dispositivos, equipamentos e máquinas; Dimensionar estruturas metálicas; Contatar clientes e fornecedores; Criar relatórios
                </p>
                <p style={pStyle}>
                    <strong>IQCT:</strong> <span style={{ background: '#92D050', padding: '2px 10px', fontWeight: 'bold' }}>100/100</span>
                </p>

                {/* Risk Cards for each hazard */}
                <div style={{ marginTop: '30px', border: '1px solid #000' }}>
                    <div style={{ background: '#FFD966', padding: '10px', fontWeight: 'bold' }}>INVENTÁRIO DE RISCOS - A - ENGENHEIRO MECÂNICO</div>
                    <div style={{ background: '#FFD966', padding: '5px', fontWeight: 'bold', textAlign: 'center' }}>CBO 2144-05</div>

                    {/* Risk Inventory per Role */}
                    {(extraData?.roles || []).map((role, rIdx) => {
                        const roleRisks = inventory?.filter(risk => risk.role_id === role.id) || [];
                        if (roleRisks.length === 0) return null;

                        return (
                            <div key={rIdx} style={{ marginTop: '30px', border: '1px solid #000', pageBreakInside: 'avoid' }}>
                                <div style={{ background: '#FFD966', padding: '10px', fontWeight: 'bold' }}>INVENTÁRIO DE RISCOS - {role.title.toUpperCase()}</div>
                                <div style={{ background: '#FFD966', padding: '5px', fontWeight: 'bold', textAlign: 'center' }}>CBO {role.cbo}</div>

                                {roleRisks.map((risk, idx) => (
                                    <div key={idx} style={{ padding: '0px', borderTop: '1px solid #000' }}>
                                        <div style={{
                                            background: risk.level > 12 ? '#FF0000' : risk.level > 8 ? '#FFC000' : risk.level > 3 ? '#92D050' : '#00B0F0',
                                            padding: '8px', fontWeight: 'bold', color: risk.level > 12 ? '#FFF' : '#000'
                                        }}>
                                            {risk.hazard}
                                        </div>
                                        <table className="doc-table" style={{ fontSize: '9pt', marginBottom: '0px' }}>
                                            <tbody>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold', width: '35%' }}>Exposição:</td><td>Contínua</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Perigos, fontes e circunstâncias:</td><td>{risk.hazard}</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Metodologia:</td><td>{risk.impact?.includes('Ruído') ? 'NHO 01' : risk.impact?.includes('Calor') ? 'NHO 06' : 'Critério Qualitativo NR-01'}</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Descrição do Agente Nocivo:</td><td>{risk.impact}</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Danos a saúde:</td><td>Comprometimento da funcionalidade biológica e bem-estar.</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Probabilidade (P):</td><td>{risk.p}</td></tr>
                                                <tr><td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Severidade (S):</td><td>{risk.s}</td></tr>
                                                <tr>
                                                    <td style={{ background: '#F2F2F2', fontWeight: 'bold' }}>Nível do Risco (PxS):</td>
                                                    <td><span style={{
                                                        background: risk.level > 12 ? '#FF0000' : risk.level > 8 ? '#FFC000' : risk.level > 3 ? '#FFFF00' : '#00B0F0',
                                                        padding: '2px 10px', fontWeight: 'bold', color: risk.level > 12 ? '#FFF' : '#000'
                                                    }}>{risk.level} - {risk.level > 15 ? 'Intolerável' : risk.level > 9 ? 'Substancial' : risk.level > 3 ? 'Moderado' : 'Trivial'}</span></td>
                                                </tr>
                                                <tr style={{ background: '#00B0F0' }}>
                                                    <td colSpan="2" style={{ padding: '5px', textAlign: 'center' }}>
                                                        {risk.level > 9 ? 'Ação imediata recomendada.' : 'Controle adicional se possível/viável.'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SEÇÃO 5: MEDIDAS GERAIS DE CONTROLE */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">5. MEDIDAS GERAIS DE CONTROLE PARA OS RISCOS</h2>

                <h3 style={subHeader}>Riscos Atrelados e Medidas de Controle</h3>

                {['FÍSICO', 'QUÍMICO', 'BIOLÓGICO', 'ERGONÔMICO', 'ACIDENTE'].map((type, tIdx) => {
                    const typeRisks = inventory?.filter(r => r.hazard?.toUpperCase().includes(type) || r.impact?.toUpperCase().includes(type)) || [];
                    if (typeRisks.length === 0) return null;

                    return (
                        <div key={tIdx} style={{ border: '1px solid #000', marginBottom: '20px', pageBreakInside: 'avoid' }}>
                            <div style={{
                                background: type === 'FÍSICO' ? '#92D050' : type === 'QUÍMICO' ? '#FF0000' : type === 'ERGONÔMICO' ? '#FFC000' : '#D9D9D9',
                                padding: '10px', fontWeight: 'bold', color: type === 'QUÍMICO' ? '#FFF' : '#000'
                            }}>
                                Risco: {type}
                            </div>
                            <table className="doc-table" style={{ fontSize: '8pt' }}>
                                <thead>
                                    <tr style={{ background: '#F2F2F2' }}>
                                        <th>Risco/Agente</th>
                                        <th>Fonte Geradora</th>
                                        <th>Exposição</th>
                                        <th>EPI Recomendado</th>
                                        <th>Danos à Saúde</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {typeRisks.map((risk, idx) => (
                                        <tr key={idx}>
                                            <td>{risk.hazard}</td>
                                            <td>Ambiente de Trabalho / Operação</td>
                                            <td>Contínua</td>
                                            <td>{extraData?.epis?.filter(e => e.applicable_roles?.includes(risk.role_id))?.map(e => e.name)?.join(', ') || 'Ver Tabela de EPIs'}</td>
                                            <td>{risk.impact}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="5" style={{ background: '#F2F2F2', fontWeight: 'bold' }}>MEDIDAS DE PREVENÇÃO E CONTROLE E SUA EFICÁCIA</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            - Uso obrigatório de EPIs adequados conforme riscos identificados.<br />
                                            - Treinamentos admissionais e periódicos (NR-01, NR-06).<br />
                                            - Manutenção preventiva de máquinas e equipamentos.<br />
                                            - Pausas e revezamentos em atividades críticas.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}

                <h3 style={subHeader}>Riscos Acidentes</h3>
                <p style={pStyle}>
                    Agente de risco inerente a atividade de produção de documentação técnica de engenharia. Para mitigação desse risco, recomenda-se a utilização de cadeira ergonômica no escritório, assim como efetuar o ajuste correto do monitor do computador para execução das atividades mencionadas.
                </p>

                <h3 style={subHeader}>• Condução Veicular</h3>
                <p style={pStyle}>
                    Agente de risco inerente a própria atividade em algumas funções. Recomenda-se a intermitência programada das atividades, com periodicidade a ser definida, dependendo da função. Exigência de Carteira de Habilitação e utilização de cinto de segurança e condução defensiva, respeitando sempre sinalizações e leis de trânsito.
                </p>

                <h3 style={subHeader}>• Queda Em Altura</h3>
                <p style={pStyle}>
                    Agente de risco inerente ao trabalho em altura. Recomenda-se o uso de EPIs, assim como treinamento adequado para a utilização dos mesmos.
                </p>

                <h3 style={subHeader}>• Eletricidade</h3>
                <p style={pStyle}>
                    As medidas de controle de risco para eletricidade são essenciais para garantir a segurança no ambiente de trabalho. Primeiramente, é fundamental realizar uma avaliação de risco para identificar as áreas e equipamentos com potencial de perigo. Em seguida, devem ser implementadas práticas como a utilização de Equipamentos de Proteção Individual (EPIs) adequados, como luvas isolantes e calçados de segurança, que ajudam a proteger os trabalhadores.
                </p>
                <p style={pStyle}>
                    Além disso, é imprescindível que todos os funcionários sejam treinados sobre os procedimentos de segurança elétrica, incluindo o desligamento da energia antes de qualquer trabalho e o uso de ferramentas adequadas e em bom estado. Sinalizações claras de áreas de risco devem ser colocadas, e é importante realizar inspeções regulares nas instalações elétricas para detectar possíveis falhas ou desgastes.
                </p>
                <p style={pStyle}>
                    Outra medida eficaz é a instalação de dispositivos de proteção, como disjuntores e fusíveis, que interrompem a corrente em caso de sobrecarga ou curto-circuito. A manutenção preventiva das instalações elétricas também deve ser uma prioridade, assim como a implementação de um programa de segurança que inclua inspeções periódicas e auditorias. Essas ações ajudam a minimizar os riscos elétricos e a proteger a saúde e a segurança de todos os colaboradores.
                </p>

                <h3 style={subHeader}>• Trabalho em Espaço Confinado</h3>
                <p style={pStyle}>
                    Incluem a avaliação constante da atmosfera com detectores de gases e monitores de oxigênio, garantindo uma ventilação adequada (forçada ou natural) para manter níveis seguros de oxigênio e remover gases tóxicos. O acesso ao espaço deve ser restrito e controlado, com permissão de entrada para trabalhadores capacitados e uso de EPIs adequados como respiradores, capacetes e cintos de segurança. Além disso, é essencial a implementação de um plano de resgate com equipamentos de resgate prontos para uso imediato, e o treinamento contínuo dos trabalhadores sobre os riscos e procedimentos de segurança. A manutenção regular de equipamentos e documentação adequada das atividades realizadas também são fundamentais para garantir segurança.
                </p>
            </section>

            {/* SEÇÃO 6: EQUIPAMENTOS DE PROTEÇÃO */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">6. EQUIPAMENTOS DE PROTEÇÃO</h2>

                <p style={pStyle}>
                    A importância da proteção individual e coletiva está diretamente ligada à preservação da saúde e da integridade física do trabalhador. E indiretamente ligada ao aumento da produtividade e lucros para a empresa, através da minimização dos acidentes e doenças do trabalho e suas consequências.
                </p>
                <p style={pStyle}>
                    Paralelamente ao desenvolvimento da Legislação sobre Segurança e Medicina do Trabalho, ocorre o da Engenharia de Controle dos Riscos nos locais de trabalho.
                </p>
                <p style={pStyle}>
                    Desta forma, livrar os locais de trabalho de fatores de risco pode requerer estudos que vão desde uma extensa revisão da engenharia e processo ou de métodos de fabricação até a escolha do adequado método de movimentação e manuseio de materiais.
                </p>
                <p style={pStyle}>
                    Por exemplo, reduzindo o ruído a níveis aceitáveis, suavizando o funcionamento de uma máquina ou enclausurando-a, é uma medida de engenharia superior em muito à de fornecer o protetor auricular adequado ao trabalhador.
                </p>
                <p style={pStyle}>
                    Analogicamente, os riscos que apresentam os solventes, os produtos químicos, os vapores, os fumos metálicos, devem ser controlados através do adequado sistema de ventilação ou do enclausuramento total do processo.
                </p>
                <p style={pStyle}>
                    Esta forma de proteção é mais eficaz do que o uso de um respirador pelo trabalhador de deva atuar em um ambiente com tais fatores de risco.
                </p>
                <p style={pStyle}>
                    O protetor de uso pessoal, depende, entre outros fatores, da disposição do trabalhador em usá-lo, o que, pode gerar o não uso ou a retirada do mesmo após pouco tempo, tornando ineficiente a proteção.
                </p>
                <p style={pStyle}>
                    Somente em casos em que é impossível eliminar uma causa de acidente ou doença de trabalho por uma revisão de Engenharia, mediante proteção em máquinas, equipamentos ou locais de trabalho, ou reduzindo o tempo de exposição após exposição, névoas, fumos, vapores perigosos ou ruídos excessivos, então o uso de equipamentos de proteção pessoal faz-se indispensável.
                </p>

                <table className="doc-table" style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <thead>
                        <tr style={{ background: '#FFC000' }}>
                            <th colSpan="3">RELAÇÃO DE EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL (EPI)</th>
                        </tr>
                        <tr style={{ background: '#FFE699' }}>
                            <th>EPI</th>
                            <th>QUANTIDADE Sugerida</th>
                            <th>C.A. (Certificado de Aprovação)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(extraData?.epis || [
                            { name: 'Óculos De Segurança', ca: '10346' },
                            { name: 'Botina De Segurança', ca: '43377' }
                        ]).map((epi, idx) => (
                            <tr key={idx}>
                                <td>{epi.name}</td>
                                <td>1 par/unid</td>
                                <td>{epi.ca || 'Consultar Fabricante'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p style={pStyle}>
                    Equipamentos de proteção individual acima somente obrigatório em caso de exposição ao risco atrelado ao EPI.
                </p>
            </section>

            {/* SEÇÃO 7: TIPOS DE EQUIPAMENTOS */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">7. TIPOS DE EQUIPAMENTOS DE PROTEÇÃO</h2>

                <p style={pStyle}>
                    Distinguimos dois tipos básicos de proteção: a individual e a coletiva.
                </p>

                <h3 style={subHeader}>PROTEÇÃO COLETIVA</h3>
                <p style={pStyle}>
                    São as medidas de ordem geral executadas no ambiente de trabalho, nas máquinas e nos equipamentos, assim como medidas orientativas quanto ao comportamento dos trabalhadores para evitar os atos inseguros e medidas preventivas de Medicina do Trabalho.
                </p>

                <p style={pStyle}>
                    <strong>Exemplos de Equipamentos de Proteção Coletiva – EPC</strong>
                </p>

                <ul style={ulStyle}>
                    <li>Sistemas de ventilação;</li>
                    <li>Proteção de máquinas;</li>
                    <li>Proteção em circuitos e equipamentos elétricos;</li>
                    <li>Proteção contra ruído e vibrações;</li>
                    <li>Proteção contra quedas;</li>
                    <li>Proteção contra incêndios;</li>
                    <li>Sinalização de segurança;</li>
                    <li>Normas e regulamentos de segurança;</li>
                </ul>

                <h3 style={subHeader}>Proteção Individual</h3>
                <p style={pStyle}>
                    É todo meio ou dispositivo de uso pessoal, destinado a preservar a saúde do trabalhador no exercício de suas funções.
                </p>

                <p style={pStyle}>• Exemplos de Equipamento de proteção individual – EPI</p>
                <p style={pStyle}>• Proteção para a cabeça: capacete, óculos, protetores faciais;</p>
                <p style={pStyle}>• Proteção auricular: protetores de inserção e circunauxiliares;</p>
                <p style={pStyle}>• Proteção respiratória: máscaras e filtros;</p>
                <p style={pStyle}>• Proteção contra quedas: cintos de segurança;</p>
                <p style={pStyle}>• Proteção do tronco: coletes e aventais;</p>
                <p style={pStyle}>• Proteção para membros superiores: mangas e luvas;</p>
                <p style={pStyle}>• Proteção para membros inferiores: perneiras caleiras, polainas, sapato de segurança, botinas, botas.</p>
            </section>

            {/* SEÇÃO 8: ANÁLISE DOS ACIDENTES */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">8. ANÁLISE DOS ACIDENTES</h2>

                <p style={pStyle}>
                    É fundamental diante de um acidente ocorrido, a busca de suas causas e a proposição de medidas para que acidentes semelhantes podem ser cuidados. O acidente de trabalho, quanto a sua consequência, classifica-se em:
                </p>

                <h3 style={subHeader}>• Acidentes Com Afastamento:</h3>
                <p style={pStyle}>
                    É o acidente que provoca incapacidade para o trabalho ou morte do acidentado, podendo resultar:
                </p>
                <ul style={ulStyle}>
                    <li>Morte;</li>
                    <li>Incapacidade temporária;</li>
                    <li>Incapacidade permanente (parcial ou total);</li>
                </ul>

                <p style={pStyle}>
                    Incapacidade Parcial E Permanente: É a diminuição, por toda a vida para o trabalho. Ex. Perda de um dos olhos ou dedos.
                </p>
                <p style={pStyle}>
                    Incapacidade Total Permanente: É a invalidez incurável para o trabalho
                </p>

                <h3 style={subHeader}>• Acidentes Sem Afastamento:</h3>
                <p style={pStyle}>
                    É o acidente em que o acidentado pode exercer a função normal no mesmo dia do acidente, ou seja, acidente capacitado.
                </p>

                <h3 style={subHeader}>• Comunicação de Acidentes</h3>
                <p style={pStyle}>
                    É obrigação legal, assim que houver um acidente, o acidentado ou qualquer pessoa, fazer a comunicação do acidente logo que se dê a ocorrência, convém lembrar que nem todos os acidentes ocorrem no recinto da empresa. A empresa por sua vez faz a comunicação ao INSS.O acidentado deve comunicar ao SESMT a ocorrência, para que se possa tomar todas as providências legais e sua investigação.
                </p>

                <h3 style={subHeader}>• Registro de Acidentes</h3>
                <p style={pStyle}>
                    Assim como nas empresas existem preocupações com controles de qualidade, de produção, de estoques, etc., deve existir também igual ou maior interesse com os acidentados. O acompanhamento da variação na ocorrência de informação exige que se façam registros cuidadosos sobre acidentes. Tais registros podem colocar em destaque a situação dos acidentes por setores, por mês, função, idade etc.
                </p>
                <p style={pStyle}>
                    Através dos registros, monta-se as estatísticas de acidentes de que vem satisfazer às exigências legais. Prevenir acidentes significa, principalmente, atuar antes de sua ocorrência o que significa identificar e eliminar riscos nos ambientes de trabalho.
                </p>

                <h3 style={subHeader}>• Investigação de Acidentes</h3>
                <p style={pStyle}>
                    Nas investigações devemos identificar:
                </p>
                <p style={pStyle}>
                    Agente do Acidente - É a máquina, o local, o equipamento que se relaciona diretamente com o dano físico que o acidente sofreu. Há 03 tipos de riscos que podem ser agentes de acidentes:
                </p>
                <ul style={ulStyle}>
                    <li>Riscos locais: piso escorregadio;</li>
                    <li>Riscos ambientais: proveniente de agentes físicos, químicos, biológicos e ergonômicos;</li>
                    <li>Riscos operacionais: ferramentas com defeito ou mal estado de conservação;</li>
                </ul>

                <p style={pStyle}>
                    Fonte de Lesão: É o objeto, o material, a matéria-prima, a substância, a espécie de energia que entrando em contato com a pessoa, provoca a lesão. É o local da máquina que bate, num parte do corpo do trabalhador. A descarga elétrica, um respingo de ácido ou o estilhaço, o piso escorregadio, etc.
                </p>
                <p style={pStyle}>
                    Na investigação do acidente, a análise da causa da lesão terá muito valor, porque ficará muito fácil a identificação dos atos inseguros cometidos ou da condição insegura existente.
                </p>
            </section>

            {/* SEÇÃO 9: INSTRUÇÕES PARA INCÊNDIO */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">9. INSTRUÇÕES PARA PROTEÇÃO CONTRA INCÊNDIO E PÂNICO</h2>

                <p style={pStyle}>
                    De acordo com a NR 23 Todos os empregadores devem adotar medidas de prevenção de incêndios, em conformidade com a legislação estadual e as normas técnicas aplicáveis.
                </p>
                <p style={pStyle}>
                    De acordo com o item 5 Requisitos da NBR 12.693/10, os extintores devem ser mantidos com sua carga completa e em condições de operação e instalados nos locais designados.
                </p>
                <p style={pStyle}>
                    Os extintores devem estar em locais facilmente acessíveis e prontamente disponíveis numa ocorrência de incêndio. Preferencialmente, devem estar localizados nos caminhos normais e passagem, incluindo saídas das áreas, não podendo ser instalados em escadas.
                </p>
                <p style={pStyle}>
                    Os extintores não podem estar obstruídos e devem estar visíveis e sinalizados conforme NBR 13434-1.
                </p>
                <p style={pStyle}>
                    Os extintores portáteis devem ser instalados em suportes ou em abrigos.
                </p>
                <p style={pStyle}>
                    Os extintores sobre rodas, instalados em locais sujeitos a intempéries devem estar protegidos por abrigos.
                </p>
                <p style={pStyle}>
                    Os extintores instalados em condições onde podem ocorrer danos físicos devem estar protegidos contra impactos.
                </p>
                <p style={pStyle}>
                    Os extintores portáteis devem ser instalados nas seguintes condições:
                </p>
                <p style={pStyle}>a) sua alça deve estar no máximo a 1,60m do piso; ou</p>
                <p style={pStyle}>b) o fundo deve estar no mínimo a 0,10m do piso, mesmo que apoiado em suporte.</p>
                <p style={pStyle}>
                    Deve haver no mínimo um extintor de incêndio distante a não mais de 5m da porta de acesso da entrada principal da edificação, entrada do pavimento ou entrada da área de risco.
                </p>
                <p style={pStyle}>
                    Para cada ponto de hidrante ou de mangotinho, são obrigatórios os materiais de abrigo de mangueiras; mangueiras de incêndio; chave para hidrantes, engate rápido e esguicho.
                </p>
                <p style={pStyle}>
                    Quanto à localização a NBR diz que os pontos de tomada de água devem ser posicionados:
                </p>
                <p style={pStyle}>a) nas proximidades das portas externas e/ou acessos à área a ser protegida, a não mais de 5m;</p>
                <p style={pStyle}>b) em posições centrais nas áreas protegidas;</p>
                <p style={pStyle}>c) fora das escadas ou antecâmaras de fumaça;</p>
            </section>

            {/* SEÇÃO 10: PLANO DE AÇÃO */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">10. PLANO DE AÇÃO</h2>

                <table className="doc-table" style={{ fontSize: '8pt', marginBottom: '30px' }}>
                    <thead>
                        <tr style={{ background: '#D9D9D9' }}>
                            <th>Nº</th>
                            <th>Descrição da Ação</th>
                            <th>Prazo / Periodicidade</th>
                            <th>Status</th>
                            <th>Responsável</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(extraData?.actionPlan || [
                            { description: 'Implementação de medidas preventivas gerais', deadline: 'Imediato', status: 'Iniciado' }
                        ]).map((action, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{action.description}</td>
                                <td>{action.deadline || 'Imediato'}</td>
                                <td>{action.status || 'Pendente'}</td>
                                <td>Segurança do Trabalho / Gestão</td>
                            </tr>
                        ))}
                        <tr><td>{(extraData?.actionPlan?.length || 0) + 1}</td><td>Treinamentos de Integração (NR-01)</td><td>Na Admissão</td><td>Concluido</td><td>RH / TST</td></tr>
                        <tr><td>{(extraData?.actionPlan?.length || 0) + 2}</td><td>Renovação do PGR / PCMSO</td><td>Anual</td><td>Agendado</td><td>Engenharia</td></tr>
                    </tbody>
                </table>
            </section>

            {/* SEÇÃO 11: DISPOSIÇÕES GERAIS */}
            <PageBreak />
            <section style={sectionMargin}>
                <h2 className="doc-section-title">11. DISPOSIÇÕES GERAIS</h2>

                <p style={pStyle}>
                    A legislação brasileira define direitos e deveres, tanto de empregados como das empresas. A Lei 6.514, de 22 de dezembro de 1977, da Consolidação da Leis do Trabalho.
                </p>
                <p style={pStyle}>
                    O Artigo 157 refere-se a competência das empresa e o artigo 158 discorre sobre a competência dos empregados, onde diz que, é facultado a empresa punir o trabalhador, dentro dos critérios legais, quando caracterizada a "recusa injustificada... à observância das instruções expedidas pelo empregado" no que tange as " precauções a tomar no sentido de evitar acidentes do trabalho ou doenças ocupacionais."
                </p>
                <p style={pStyle}>
                    Quando a empresa não cobra de seus empregados as suas responsabilidades, é cobrada pela legislação por ter sido omissa, quando não negligente.
                </p>
                <p style={pStyle}>
                    Conforme a lei, no que diz respeito a direitos e deveres a NR1 - Norma Regulamentadora n.º 1 estabelece obrigações de empregadores e de empregados, conforme ilustrado abaixo:
                </p>

                <h3 style={subHeader}>Cabe ao empregador</h3>
                <p style={pStyle}>
                    a) Cumprir e fazer cumprir as disposições legais e regulamentares sobre segurança e medicina do trabalho;
                </p>
                <p style={pStyle}>
                    b) Elaborar ordens de serviço sobre segurança e medicina do trabalho, dando ciência aos empregados, com os seguintes objetivos:
                </p>
                <p style={pStyle}>
                    I - prevenir atos inseguros no desempenho do trabalho;<br />
                    II - divulgar as obrigações e proibições que os empregados devam conhecer e cumprir.<br />
                    III - dar conhecimento aos empregados de que serão passíveis de punição, pelo descumprimento das ordens de serviço expedidas.<br />
                    IV - determinar os procedimentos que deverão ser adotados em caso de acidente do trabalho e doenças profissionais ou do trabalho.<br />
                    V - adotar medidas determinadas pelo MTb.<br />
                    VI - adotar medidas para eliminar ou neutralizar a insalubridade e as condições inseguras de trabalho.
                </p>

                <p style={pStyle}>
                    c) Informar aos trabalhadores:
                </p>
                <p style={pStyle}>
                    I - os riscos profissionais que possam originar-se nos locais de trabalho.<br />
                    II - os meios para prevenir e limitar tais riscos e as medidas adotadas pela empresa.<br />
                    III - os resultados dos exames médicos e de exames complementares de diagnóstico aos quais os próprios trabalhadores forem submetidos.<br />
                    IV - os resultados das avaliações ambientais realizadas nos locais de trabalho.
                </p>

                <h3 style={subHeader}>Cabe ao empregado</h3>
                <p style={pStyle}>
                    a) Observar as normas de segurança e medicina do trabalho, inclusive as instruções de que trata o item II, alínea "b";
                </p>
                <p style={pStyle}>
                    b) Colaborar com a empresa na aplicação dos dispositivos deste Capítulo.
                </p>
                <p style={pStyle}>
                    Parágrafo único - Constitui ato faltoso do empregado a recusa injustificada:
                </p>
                <p style={pStyle}>
                    a) à observância das instruções expedidas pelo empregador na forma do item II do subitem 1.7.1.<br />
                    b) ao uso dos equipamentos de proteção individual fornecidos pela empresa.
                </p>

                <SignatureBlock
                    signatories={[
                        { name: 'AM ENGENHARIA', role: 'Assessoria Técnica', doc: 'CREA/MTE: Registro Central' },
                        { name: companyData?.name || 'EMPRESA', role: 'Representante Legal', doc: 'CNPJ: ' + (companyData?.cnpj || '') }
                    ]}
                />
            </section>
        </div>
    );
};

// Styles
const pStyle = { marginBottom: '15px', lineHeight: '1.7', fontSize: '11pt', textAlign: 'justify' };
const sectionMargin = { marginBottom: '40px' };
const ulStyle = { paddingLeft: '40px', marginBottom: '20px' };
const subHeader = { fontSize: '13pt', color: 'var(--doc-navy)', marginTop: '25px', marginBottom: '15px', fontWeight: '800' };

export default PGRTemplate;

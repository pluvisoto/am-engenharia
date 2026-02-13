import React from 'react';

/**
 * PGR PREMIUM - FIDELIDADE TOTAL (V11.0.0)
 * Replicando exatamente as 4 primeiras páginas conforme solicitado.
 */
const PGRTemplate = ({ companyData, data, inventory, date = new Date() }) => {
    const safeUpper = (val) => (val ? String(val).toUpperCase() : '');
    const currentYear = date.getFullYear();

    // --- Componentes de Layout ---

    const PageHeader = ({ pageNum }) => (
        <div style={styles.header}>
            <div style={styles.headerTop}>
                <div style={styles.headerLogoContainer}>
                    <div style={styles.headerLogoTriangle}>
                        <div style={styles.headerTriangleSmall}></div>
                    </div>
                    <div style={styles.headerLogoText}>
                        <div style={{ fontWeight: 'bold', fontSize: '10pt' }}>AM ENGENHARIA</div>
                        <div style={{ fontSize: '8pt', color: '#666', letterSpacing: '1px' }}>GROUP</div>
                    </div>
                </div>
                {/* Geométrico superior esquerdo (triângulos amarelo e preto) */}
                <div style={styles.headerGeometric}>
                    <div style={styles.headerYellowTriangle}></div>
                    <div style={styles.headerBlackTriangle}></div>
                </div>
            </div>
            {/* O número da página não aparece no cabeçalho das imagens de referência, 
                apenas o logo e o geométrico. */}
        </div>
    );

    const PagePage = ({ children, pageNum }) => (
        <div className="pdf-page" style={styles.page}>
            <PageHeader />
            <div style={styles.pageBody}>
                {children}
            </div>
            {/* O rodapé tem o geométrico inferior direito em algumas páginas? 
                Nas imagens 2 e 3 tem o logo em transparência (marca d'água). 
                Vou adicionar o marca d'água no fundo. */}
            <div style={styles.watermark}>
                <div style={styles.watermarkLogo}>▲</div>
            </div>
        </div>
    );

    return (
        <div id="pgr-document-template" style={styles.container}>

            {/* --- PAGINA 1: CAPA (Fiel à Imagem 1) --- */}
            <div className="pdf-page" style={styles.coverPage}>
                {/* Geométrico Superior */}
                <div style={styles.coverTopGeometric}>
                    <div style={styles.coverYellowTri1}></div>
                    <div style={styles.coverBlackTri1}></div>
                </div>

                <div style={styles.coverContent}>
                    <h1 style={styles.coverMainTitle}>PGR</h1>
                    <p style={styles.coverSubtitle}>Programa de Gerenciamento de Riscos</p>

                    <div style={styles.coverLogoMain}>
                        <div style={styles.logoTriangleLarge}>
                            <div style={styles.logoInnerTriangle}></div>
                        </div>
                        <div style={styles.logoTextLarge}>
                            <div style={styles.logoTextAM}>AM ENGENHARIA</div>
                            <div style={styles.logoTextGroup}>GROUP</div>
                        </div>
                    </div>

                    <div style={styles.coverClientInfo}>
                        <p style={styles.coverClientName}>{safeUpper(companyData.name)}</p>
                        <p style={styles.coverValidity}>Início da vigência: 09/2025</p>
                        <p style={styles.coverValidity}>Fim da vigência: 09/2026</p>
                    </div>

                    <div style={styles.coverFooter}>
                        <div style={styles.coverWebIcon}>🌐</div>
                        <span style={styles.coverWebLink}>https://amengenhariaseg.com</span>
                    </div>
                </div>

                {/* Geométrico Inferior */}
                <div style={styles.coverBottomGeometric}>
                    <div style={styles.coverYellowTri2}></div>
                    <div style={styles.coverBlackTri2}></div>
                </div>
            </div>

            {/* --- PAGINA 2: IDENTIFICAÇÃO E SUMÁRIO (Fiel à Imagem 2) --- */}
            <PagePage pageNum="1">
                <table style={styles.tableId}>
                    <tbody>
                        <tr>
                            <td style={styles.tdLabel}>Empregador:</td>
                            <td style={styles.tdValue} colSpan="3">{safeUpper(companyData.name)} (Grau de Risco: {companyData.grau_risco || '1'} conforme NR 4)</td>
                        </tr>
                        <tr>
                            <td style={styles.tdLabel}>Endereço:</td>
                            <td style={styles.tdValue} colSpan="3">{safeUpper(companyData.address)}</td>
                        </tr>
                        <tr>
                            <td style={styles.tdLabel}>CNPJ:</td>
                            <td style={styles.tdValue}>{companyData.cnpj}</td>
                            <td style={styles.tdLabel}>Telefone:</td>
                            <td style={styles.tdValue}>{companyData.telefone || '(19) 99736-0112'}</td>
                        </tr>
                        <tr>
                            <td style={styles.tdLabel}>CNAE:</td>
                            <td style={styles.tdValue} colSpan="3">{companyData.cnae} - {safeUpper(companyData.cnae_desc)}</td>
                        </tr>
                    </tbody>
                </table>

                <table style={styles.tableRoles}>
                    <tbody>
                        <tr>
                            <td style={styles.tdLabel}>Autor:</td>
                            <td style={styles.tdValue}>DIEGO DALLA COSTA</td>
                            <td style={styles.tdLabel}>CREA:</td>
                            <td style={styles.tdValue}>SP 5069508472</td>
                        </tr>
                        <tr>
                            <td style={styles.tdLabel}>Coordenador:</td>
                            <td style={styles.tdValue}>DIEGO DALLA COSTA</td>
                            <td style={styles.tdLabel}>CREA:</td>
                            <td style={styles.tdValue}>SP 5069508472</td>
                        </tr>
                        <tr>
                            <td colSpan="4" style={styles.tdFooterRole}>Engenheiro Mecânico e de Segurança do Trabalho</td>
                        </tr>
                    </tbody>
                </table>

                <h3 style={styles.h3Summary}>SUMÁRIO</h3>
                <div style={styles.summaryContainer}>
                    {[
                        "INTRODUÇÃO",
                        "DEFINIÇÕES E CRITÉRIOS DE RISCOS",
                        "AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS",
                        "RECONHECIMENTO E AVALIAÇÃO DOS RISCOS AMBIENTAIS",
                        "MEDIDAS GERAIS DE CONTROLE PARA OS RISCOS",
                        "EQUIPAMENTOS DE PROTEÇÃO",
                        "TIPOS DE EQUIPAMENTOS DE PROTEÇÃO",
                        "ANÁLISE DOS ACIDENTES",
                        "INSTRUÇÕES PARA PROTEÇÃO CONTRA INCÊNDIO E PÂNICO",
                        "PLANO DE AÇÃO",
                        "DISPOSIÇÕES GERAIS"
                    ].map((item, idx) => (
                        <div key={idx} style={styles.summaryItem}>
                            <span style={styles.summaryNum}>{idx + 1}</span>
                            <span style={styles.summaryText}>{item}</span>
                        </div>
                    ))}
                </div>

                <p style={styles.pObjective}>
                    O Programa de Gerenciamento de Riscos visa preservar a vida e evitar danos físicos e psíquicos às pessoas, além de controlar agentes ambientais por meio de monitoramento periódico, considerando a proteção do meio ambiente e dos recursos naturais. O programa busca evitar danos à propriedade e paralisações nos serviços. Ao antecipar, identificar e avaliar os fatores de risco, as empresas podem estabelecer critérios para selecionar as medidas de controle mais adequadas à sua realidade.
                </p>

                <div style={styles.signatureRow}>
                    <div style={styles.sigBox}>
                        <div style={styles.sigLinePlaceholder}>~~~~~~~~ signature ~~~~~~~~</div>
                        <p style={styles.sigName}>{safeUpper(companyData.representative_name || 'RESPONSÁVEL LEGAL')}</p>
                        <p style={styles.sigSub}>Responsável pela {safeUpper(companyData.name)}</p>
                        <p style={styles.sigSub}>CPF: {companyData.representative_cpf}</p>
                    </div>
                    <div style={styles.sigBox}>
                        <div style={styles.sigLinePlaceholder}>~~~~~~~~ signature ~~~~~~~~</div>
                        <p style={styles.sigName}>Diego Dalla Costa</p>
                        <p style={styles.sigSub}>Eng. Mecânico e Segurança</p>
                        <p style={styles.sigSub}>CREA-SP 5069508472</p>
                    </div>
                </div>
            </PagePage>

            {/* --- PAGINA 3: INTRODUÇÃO (Fiel à Imagem 3) --- */}
            <PagePage pageNum="2">
                <h3 style={styles.pageTitle}>1. INTRODUÇÃO</h3>
                <h4 style={styles.normativeHeader}>NORMA REGULAMENTADORA N.º 01 - DISPOSIÇÕES GERAIS e GERENCIAMENTO DE RISCOS OCUPACIONAIS</h4>

                <p style={styles.pDense}>A NR-1, pela Portaria SEPRT n.º 6.730, de 09/03/20, estabelece as disposições gerais e o Gerenciamento de Riscos Ocupacionais na Saúde e Segurança do Trabalho:</p>

                <p style={styles.pQuote}>“1.1.1 O objetivo desta Norma é estabelecer as disposições gerais, o campo de aplicação, os termos e as definições comuns às Normas Regulamentadoras - NR relativas a segurança e saúde no trabalho e as diretrizes e os requisitos para o gerenciamento de riscos ocupacionais e as medidas de prevenção em Segurança e Saúde no Trabalho - SST”</p>

                <p style={styles.pDense}>O PGR - <b>Programa de Gerenciamento de Riscos</b> é um documento que deve estar incluso no Gerenciamento de Riscos Ocupacionais.</p>

                <h4 style={styles.subHeader}>O Programa de Gerenciamento de Riscos - PGR</h4>
                <p style={styles.pDense}>Este documento representa a implementação do PGR - Programa de Gerenciamento de Riscos, estabelecido pela NR-1 (Portaria SEPRT n.º 6.730):</p>

                <p style={styles.pQuote}>
                    “1.5.3.1. A organização deve implementar, por estabelecimento, o gerenciamento de riscos ocupacionais em suas atividades.<br /><br />
                    1.5.3.1.1 O gerenciamento de riscos ocupacionais deve constituir um Programa de Gerenciamento de Riscos - PGR.<br /><br />
                    1.5.3.1.1.1 A critério da organização, o PGR pode ser implementado por unidade operacional, setor ou atividade.<br /><br />
                    1.5.3.1.2 O PGR pode ser atendido por sistemas de gestão, desde que estes cumpram as exigências previstas nesta NR e em dispositivos legais de segurança e saúde no trabalho.<br /><br />
                    1.5.3.1.3 O PGR deve contemplar ou estar integrado com planos, programas e outros documentos previstos na legislação desegurança e saúde no trabalho”
                </p>

                <p style={styles.pDense}>Segundo a <b>NR-1</b>, o PGR deve conter dois documentos base:</p>
                <p style={styles.pDense}><b>Inventário de Riscos</b> e <b>Plano de Ação</b>.“1.5.7.1 O PGR deve conter, no mínimo, os seguintes documentos:</p>

                <p style={styles.pList}>a) <b>inventário de riscos</b>; e</p>
                <p style={styles.pList}>b) <b>plano de ação</b>.</p>

                <p style={styles.pDense}>1.5.7.2 Os documentos integrantes do PGR devem ser elaborados sob a responsabilidade da organização, respeitado o disposto nas demais Normas Regulamentadoras, datados e assinados.</p>
                <p style={styles.pDense}>1.5.7.2.1 Os documentos integrantes do PGR devem estar sempre disponíveis aos trabalhadores interessados ou seus representantes e à Inspeção do Trabalho.”</p>

                <h4 style={styles.subHeader}>Sobre o Inventário de Riscos</h4>
                <p style={styles.pDense}>Os riscos identificados e avaliados neste PGR - Programa de Gerenciamento de Riscos, foram formalizados em um inventário de riscos, da maneira estabelecida pela NR-1 (Portaria SEPRT n.º 6.730):</p>

                <p style={styles.pQuote}>“1.5.7.3.1 Os dados da identificação dos perigos e das avaliações dos riscos ocupacionais devem ser consolidados em um inventário de riscos ocupacionais.<br /><br />
                    1.5.7.3.2 O Inventário de Riscos Ocupacionais deve contemplar, no mínimo, as seguintes informações:<br /><br />
                    a) caracterização dos processos e ambientes de trabalho;<br /><br />
                    b) caracterização das atividades;<br /><br />
                    c) descrição de perigos e de possíveis lesões ou agravos à saúde dos trabalhadores, com a identificação das fontes ou”</p>
            </PagePage>

            {/* --- PAGINA 4: INTRODUÇÃO CONT. E DEFINIÇÕES (Fiel à Imagem 4) --- */}
            <PagePage pageNum="3">
                <p style={styles.pDense}>circunstâncias, descrição de riscos gerados pelos perigos, com a indicação dos grupos de trabalhadores sujeitos a esses riscos, e descrição de medidas de prevenção implementadas;</p>
                <p style={styles.pDense}>d) dados da análise preliminar ou do monitoramento das exposições a agentes físicos, químicos e biológicos e os resultados da avaliação de ergonomia nos termos da NR-17.</p>
                <p style={styles.pDense}>e) avaliação dos riscos, incluindo a classificação para fins de elaboração do plano de ação; e</p>
                <p style={styles.pDense}>f) critérios adotados para avaliação dos riscos e tomada de decisão.</p>
                <p style={styles.pDense}>1.5.7.3.3 O inventário de riscos ocupacionais deve ser mantido atualizado.</p>
                <p style={styles.pDense}>1.5.7.3.3.1 O histórico das atualizações deve ser mantido por um período mínimo de 20 (vinte) anos ou pelo período estabelecido em normatização específica.”</p>

                <p style={styles.pDense}>A caracterização dos ambientes está disposta logo no início do inventário. O inventário de riscos está disposto por cargo. Na descrição dos cargos está disposto a caracterização dos processos e atividades.</p>

                <p style={styles.pDense}>Para compor o inventário de riscos, foram avaliados os níveis de riscos através da matriz de riscos definida. Para isso foi necessário avaliar os níveis de probabilidade e severidade de cada perigo e risco identificado, através de tabelas de gradações mencionadas em “2. DEFINIÇÕES E CRITÉRIOS DE RISCOS”.</p>

                <p style={styles.pDense}>O inventário de riscos, quando feito através de um sistema de gestão sofisticado, deve ser exposto de maneira listada, como é feito neste documento (de acordo com as recomendações da Fundacentro).</p>

                <h4 style={styles.subHeader}>Sobre o Plano de Ação</h4>
                <p style={styles.pDense}>Após feito o Inventário de Riscos, foi consolidado um plano de ação para controle dos riscos ocupacionais necessários, como estabelecido pela NR-1 (Portaria SEPRT n.º 6.730):</p>

                <p style={styles.pQuote}>
                    “1.5.5.2.1 A organização deve elaborar plano de ação, indicando as medidas de prevenção a serem introduzidas, aprimoradas ou mantidas, conforme o subitem 1.5.4.4.5.<br /><br />
                    1.5.5.2.2 Para as medidas de prevenção deve ser definido cronograma, formas de acompanhamento e aferição de resultados.”
                </p>

                <p style={styles.pDense}>O modelo exposto neste documento é um cronograma de ações planejadas , onde cada ação tem sua descrição e data de planejamento. Na descrição de cada ação são informadas as medidas de prevenção com as respectivas ações necessárias para controle e mitigação dos riscos ocupacionais.</p>

                <h3 style={styles.pageTitleAlt}>2. DEFINIÇÕES E CRITERIOS DE RISCOS</h3>
                <p style={styles.pDense}>As tabelas de gradação de severidade e probabilidade sugeridas são as tabelas da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Todas elas possuem gradações de 1 a 5, que vão determinar a classificação da severidade e probabilidade.</p>

                <p style={styles.pDense}>As gradações de <b>probabilidade</b> são 5 (cinco): Rara (1); Pouco Provável (2); Possível (3); Provável (4) e Muito Provável (5). Nas avaliações qualitativas, de acordo com o controle e exposição ao risco, determina-se de 1 a 5 o nível de probabilidade. Em avaliações quantitativas, a probabilidade é classificada de acordo com a porcentagem do valor de exposição ao LEO - Limite de Exposição Ocupacional.</p>
            </PagePage>

            {/* --- PAGINA 5: GRADAÇÕES (Fiel à Imagem 1) --- */}
            <PagePage pageNum="4">
                <h4 style={styles.tableHeaderHeaderYellow}>GRADAÇÃO DE PROBABILIDADE - AVALIAÇÕES QUANTITATIVAS</h4>
                <div style={styles.tableSubHeaderYellow}>Estimativa de Probabilidade baseada no LEO (Limite de Exposição Ocupacional (sem considerar EPI) | AIHA (2015)</div>
                <table style={styles.matrixTableRef}>
                    <thead>
                        <tr style={styles.thGrey}>
                            <th style={styles.tdCenterHeader}>Nível</th>
                            <th style={styles.tdCenterHeader}>Categoria</th>
                            <th style={styles.tdCenterHeader}>Níveis de Exposição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style={styles.tdCenterBold}>1</td><td style={styles.tdCenter}>Exposição a níveis muito baixos</td><td style={styles.tdCenter}>Exposições &lt; 10% LEO</td></tr>
                        <tr><td style={styles.tdCenterBold}>2</td><td style={styles.tdCenter}>Exposição baixa</td><td style={styles.tdCenter}>Exposições &gt; 10% e &lt; 50% LEO</td></tr>
                        <tr><td style={styles.tdCenterBold}>3</td><td style={styles.tdCenter}>Exposição moderada</td><td style={styles.tdCenter}>Exposições &gt; 50% e &lt; 100% LEO</td></tr>
                        <tr><td style={styles.tdCenterBold}>4</td><td style={styles.tdCenter}>Exposição excessiva</td><td style={styles.tdCenter}>Exposições &gt; 100% e 500% LEO</td></tr>
                        <tr><td style={styles.tdCenterBold}>5</td><td style={styles.tdCenter}>Exposição muito excessiva</td><td style={styles.tdCenter}>Exposições superiores a 5 x LEO</td></tr>
                    </tbody>
                </table>




                <h4 style={styles.tableHeaderHeaderGrey}>GRADAÇÃO DE PROBABILIDADE - AVALIAÇÕES QUALITATIVAS</h4>
                <div style={styles.tableSubHeaderGrey}>Estimativa de Probabilidade para avaliação de Riscos Mecânicos / Ergonomicos / Biológicos / outros</div>
                <table style={styles.matrixTableRef}>
                    <thead>
                        <tr style={styles.thGrey}>
                            <th style={styles.tdCenterHeader}>Nível</th>
                            <th style={styles.tdCenterHeader}>Controle Existente</th>
                            <th style={styles.tdCenterHeader}>Medidas de Prevenção</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style={styles.tdCenterBold}>1</td><td style={styles.tdCenter}>Controle Excelente</td><td style={styles.tdSmallText}>Representa a melhor tecnologia ou prática de controle disponível.</td></tr>
                        <tr><td style={styles.tdCenterBold}>2</td><td style={styles.tdCenter}>Controle em conformidade legal</td><td style={styles.tdSmallText}>Controle seguindo as normais legais, mantido adequadamente.</td></tr>
                        <tr><td style={styles.tdCenterBold}>3</td><td style={styles.tdCenter}>Controle com pequenas deficiências</td><td style={styles.tdSmallText}>Controle adequado com pequenas deficiências na operação ou manutenção.</td></tr>
                        <tr><td style={styles.tdCenterBold}>4</td><td style={styles.tdCenter}>Controle deficiente</td><td style={styles.tdSmallText}>Controle incompleto ou com deficiências relevantes.</td></tr>
                        <tr><td style={styles.tdCenterBold}>5</td><td style={styles.tdCenter}>Controle inexistente</td><td style={styles.tdSmallText}>As medidas de controle são inexistentes ou totalmente inadequadas.</td></tr>
                    </tbody>
                </table>

                <p style={styles.pDense}>As gradações de <b>severidade</b> são 5 (cinco): Leve (1); Baixa (2); Moderada (3); Alta (4) e Extrema (5). A severidade é classificada de 1 a 5, de acordo com o nível de consequência à exposição.</p>

                <h4 style={styles.tableHeaderHeaderGrey}>GRADAÇÃO DE SEVERIDADE - AVALIAÇÕES QUANTITATIVAS/QUALITATIVAS</h4>
                <div style={styles.tableSubHeaderGrey}>Estimativas de Severidade | AIHA (2015)</div>
                <table style={styles.matrixTableRef}>
                    <thead>
                        <tr style={styles.thGrey}>
                            <th style={styles.tdCenterHeader}>Nível</th>
                            <th style={styles.tdCenterHeader}>Definição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style={styles.tdCenterBold}>1</td><td style={styles.tdCenter}>Lesão leve sem necessidade atenção médica, incômodos ou mal estar.</td></tr>
                        <tr><td style={styles.tdCenterBold}>2</td><td style={styles.tdCenter}>Lesão ou doenças sérias reversíveis.</td></tr>
                        <tr><td style={styles.tdCenterBold}>3</td><td style={styles.tdCenter}>Lesão ou doenças críticas irreversíveis que podem limitar a capacidade funcional.</td></tr>
                        <tr><td style={styles.tdCenterBold}>4</td><td style={styles.tdCenter}>Lesão ou doença incapacitante ou mortal.</td></tr>
                        <tr><td style={styles.tdCenterBold}>5</td><td style={styles.tdCenter}>Mortes ou incapacidades múltiplas (&gt;10).</td></tr>
                    </tbody>
                </table>

                <h4 style={styles.subHeaderAlt}>Matriz de Risco Utilizada</h4>
                <p style={styles.pDense}>A Matriz de Risco utilizada neste Programa de Gerenciamento de Riscos é uma matriz no formato 5x5, baseada nas estimativas de gradações de Severidade e Probabilidade da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Esta matriz funciona para avaliações qualitativas e quantitativas, pois as tabelas sugeridas possuem as estimativas adequadas para ambas as avaliações.</p>
                <p style={styles.pDense}>Os níveis de risco presentes na matriz são 5 (cinco): Trivial (1-3); Tolerável (3-8); Moderado (4-12); Substancial (10-15) e Intolerável (15-25). Cada nível de risco possui o seu método de controle sugerido, baseado na estimativa (grau de certeza) da avaliação, onde os riscos de níveis mais altos têm prioridade de ação.</p>
            </PagePage>

            {/* --- PAGINA 6: MATRIZ E AÇÕES (Fiel à Imagem 2) --- */}
            <PagePage pageNum="5">
                <table style={styles.matrix5x5}>
                    <thead>
                        <tr>
                            <th rowSpan="2" colSpan="2" style={styles.tdMatrixTitle}>MATRIZ DE RISCO 5X5 Baseada na Metodologia AIHA</th>
                            <th colSpan="5" style={styles.tdMatrixHeader}>SEVERIDADE</th>
                        </tr>
                        <tr style={styles.thGrey}>
                            <th style={styles.tdMatrixSub}>Leve</th><th style={styles.tdMatrixSub}>Baixa</th><th style={styles.tdMatrixSub}>Moderada</th><th style={styles.tdMatrixSub}>Alta</th><th style={styles.tdMatrixSub}>Extrema</th>
                        </tr>
                        <tr style={styles.thGrey}>
                            <th colSpan="2"></th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="5" style={styles.matrixVerticalLabel}>PROBABILIDADE</td>
                            <td style={styles.tdMatrixLabel}>Muito Provável (5)</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>5</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>10</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffff00' }}>15</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ff0000' }}>20</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ff0000' }}>25</td>
                        </tr>
                        <tr>
                            <td style={styles.tdMatrixLabel}>Provável (4)</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>4</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>8</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>12</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>16</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ff0000' }}>20</td>
                        </tr>
                        <tr>
                            <td style={styles.tdMatrixLabel}>Possível (3)</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#00b0f0' }}>3</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>6</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>9</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>12</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>15</td>
                        </tr>
                        <tr>
                            <td style={styles.tdMatrixLabel}>Pouco Provável (2)</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#00b0f0' }}>2</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>4</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>6</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>8</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#ffc000' }}>10</td>
                        </tr>
                        <tr>
                            <td style={styles.tdMatrixLabel}>Rara (1)</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#00b0f0' }}>1</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#00b0f0' }}>2</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#00b0f0' }}>3</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>4</td>
                            <td style={{ ...styles.tdScore, backgroundColor: '#92d050' }}>5</td>
                        </tr>
                    </tbody>
                </table>

                <div style={styles.legendBox}>
                    <div style={styles.legendHeader}>Legenda do Nível de Risco</div>
                    <div style={styles.legendRow}><span style={styles.legendColorBox}>1 até 3</span><div style={{ ...styles.colorCell, backgroundColor: '#00b0f0' }}></div><span style={styles.legendText}>Trivial</span></div>
                    <div style={styles.legendRow}><span style={styles.legendColorBox}>3 até 8</span><div style={{ ...styles.colorCell, backgroundColor: '#92d050' }}></div><span style={styles.legendText}>Tolerável</span></div>
                    <div style={styles.legendRow}><span style={styles.legendColorBox}>4 até 12</span><div style={{ ...styles.colorCell, backgroundColor: '#ffff00' }}></div><span style={styles.legendText}>Moderado</span></div>
                    <div style={styles.legendRow}><span style={styles.legendColorBox}>10 até 15</span><div style={{ ...styles.colorCell, backgroundColor: '#ffc000' }}></div><span style={styles.legendText}>Substancial</span></div>
                    <div style={styles.legendRow}><span style={styles.legendColorBox}>15 até 25</span><div style={{ ...styles.colorCell, backgroundColor: '#ff0000' }}></div><span style={styles.legendText}>Intolerável</span></div>
                </div>

                <p style={styles.pExample}><b>Exemplo</b> de aplicação:</p>
                <p style={styles.pDense}><b>Probabilidade</b>: ruído ocupacional de 40 dB é <b>&gt; 10% e &lt; 50% do LEO</b> (85 dB) permitido para 8 horas de atividade, classificando-o como <b>probabilidade de nível 2</b> (pouco provável), de acordo com a tabela de gradação AIHA.</p>
                <p style={styles.pDense}><b>Severidade</b>: a severidade de uma doença que possa surgir de um ruído ocupacional classifica-se como “<b>Lesão ou doenças críticas irreversíveis que podem limitar a capacidade funcional</b>”, de acordo com a tabela sugerida, classificando-a como <b>severidade de nível 3</b> (moderada).</p>
                <p style={styles.pDense}><b>Nível do Risco</b>: o nível do risco é a probabilidade x (vezes) a severidade. No caso, <b>2 x 3, resultando em 6 (moderado)</b> de acordo com a matriz.</p>
                <p style={styles.pSmallQuote}>Obs.: suponha-se que os valores fossem invertidos (severidade 3 e probabilidade 2), o nível do risco ainda seria 6 (3x2), porém o nível do risco seria Tolerável (6), ao invés de Moderado (6). Isso se deve ao fato de a severidade ter maior relevância ao se definir o nível de risco.</p>

                <h4 style={styles.subHeaderAlt}>Métodos de Controle e Ação</h4>
                <p style={styles.pDense}>Os métodos de controle são classificados de acordo com o nível do risco e o grau de certeza da estimativa da avaliação. Os níveis de risco mais altos devem ter prioridade na seção de controle. A ação de controle é classificada de acordo com a estimativa, que pode ser: certa (0); incerta (1) e altamente incerta (2).</p>
                <p style={styles.pDense}>Esta classificação padrão dos métodos de controle funciona apenas para o Inventário de Riscos e não deve ser adotada como método único para o Plano de Ação. Contudo, como as ações de controle serão feitas baseadas no inventário, estas classificações servem para definir a prioridade das ações.</p>
                <p style={styles.pDense}>A tabela utilizada foi recomendada pela Fundacentro.</p>
            </PagePage>

            {/* --- PAGINA 7: IQCT E AMBIENTES (Fiel à Imagem 3) --- */}
            <PagePage pageNum="6">
                <table style={styles.controlTable}>
                    <thead>
                        <tr style={styles.thGrey}>
                            <th rowSpan="2" style={styles.tdCenterHeader}>NÍVEIS DE RISCO (ordem de prioridade)</th>
                            <th colSpan="3" style={styles.tdCenterHeader}>MÉTODOS DE CONTROLE E AÇÕES</th>
                        </tr>
                        <tr style={styles.thGrey}>
                            <th>0 - Certa</th><th>1 - Incerta</th><th>2 - Altamente Incerta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style={{ ...styles.tdPriority, backgroundColor: '#ff0000' }}>1º Intolerável</td><td style={styles.tdControlCell}>Ação imediata ou interrupção da atividade</td><td style={styles.tdControlCell}>Controle e informação adicional necessários.</td><td style={styles.tdControlCell}>Controle e informação adicional necessários.</td></tr>
                        <tr><td style={{ ...styles.tdPriority, backgroundColor: '#ffc000' }}>2º Substancial</td><td style={styles.tdControlCell}>Controle necessário.</td><td style={styles.tdControlCell}>Controle e informação adicional necessários.</td><td style={styles.tdControlCell}>Controle e informação adicional necessários.</td></tr>
                        <tr><td style={{ ...styles.tdPriority, backgroundColor: '#ffff00' }}>3º Moderado</td><td style={styles.tdControlCell}>Controle adicional, se possível/viável.</td><td style={styles.tdControlCell}>Informação adicional necessária.</td><td style={styles.tdControlCell}>Informação adicional necessária.</td></tr>
                        <tr><td style={{ ...styles.tdPriority, backgroundColor: '#92d050' }}>4º Tolerável</td><td style={styles.tdControlCell}>Nenhum controle adicional necessário.</td><td style={styles.tdControlCell}>Informação adicional necessária.</td><td style={styles.tdControlCell}>Informação adicional necessária.</td></tr>
                        <tr><td style={{ ...styles.tdPriority, backgroundColor: '#00b0f0' }}>5º Trivial</td><td style={styles.tdControlCell}>Nenhuma ação necessária.</td><td style={styles.tdControlCell}>Nenhuma informação adicional necessária.</td><td style={styles.tdControlCell}>Nenhuma informação adicional necessária.</td></tr>
                    </tbody>
                </table>

                <h4 style={styles.subHeaderAlt}>Indicador de Qualidade das Condições de Trabalho - IQCT</h4>
                <p style={styles.pDense}>Para cada atividade existe um indicador de qualidade, chamado de IQCT - Indicador da Qualidade das Condições de Trabalho. O IQCT varia de 25 (todos os riscos altos) a 100 (todos os riscos baixos). Contudo, apesar dos 5 (cinco) níveis de risco existentes, considera-se apenas três níveis de Risco: Tolerável (B), Moderado(M) e Substancial (A). Exclui-se deste cálculo riscos Triviais e riscos Intoleráveis que exijam atuação imediata.</p>
                <p style={styles.pDense}>O cálculo é feito através da seguinte fórmula:</p>

                <div style={styles.formulaBox}>
                    <div style={styles.formulaLabel}>IQCT = </div>
                    <div style={styles.formulaFraction}>
                        <div style={styles.fractionTop}>4nB + 3nM + nA</div>
                        <div style={styles.fractionBottom}>(nB + nM + nA) x4</div>
                    </div>
                    <div style={styles.formulaMultiplier}>x100</div>
                </div>

                <p style={styles.pDense}>O resultado vai variar de 25 a 100. Quanto maior o resultado, maior o índice de qualidade na atividade exercida.</p>

                <h3 style={styles.pageTitleAlt}>3. AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS</h3>

                {(data.sectors || []).map((sector, idx) => (
                    <div key={idx} style={styles.sectorBox}>
                        <div style={styles.sectorHeader}>{String.fromCharCode(65 + idx)} - SETOR – {safeUpper(sector.name)}</div>
                        <div style={styles.sectorContent}>
                            <div style={styles.envLabelBox}>Descrição do Ambiente</div>
                            <div style={styles.envValueBox}>{sector.description}</div>
                        </div>
                    </div>
                ))}
            </PagePage>

        </div>
    );
};


const styles = {
    container: {
        width: '210mm',
        backgroundColor: '#fff',
        color: '#333',
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    },
    page: {
        width: '210mm',
        height: '297mm',
        padding: '10mm 15mm',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    pageBody: {
        flex: 1,
        marginTop: '10mm',
        zIndex: 2
    },
    watermark: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.03,
        zIndex: 1,
        pointerEvents: 'none'
    },
    watermarkLogo: {
        fontSize: '400pt',
        fontWeight: '900',
        color: '#000'
    },

    // --- Header ---
    header: {
        width: '100%',
        position: 'relative'
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLogoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    headerLogoTriangle: {
        width: '40px',
        height: '40px',
        backgroundColor: '#000',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        position: 'relative'
    },
    headerTriangleSmall: {
        width: '20px',
        height: '10px',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: '5px',
        left: '10px',
        clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
    },
    headerLogoText: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerGeometric: {
        position: 'absolute',
        top: '-10mm',
        left: '-15mm',
        display: 'flex'
    },
    headerYellowTriangle: {
        width: '150px',
        height: '80px',
        backgroundColor: '#facc15',
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    },
    headerBlackTriangle: {
        width: '120px',
        height: '60px',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        zIndex: 1
    },

    // --- Cover ---
    coverPage: {
        width: '210mm',
        height: '297mm',
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    coverTopGeometric: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    coverYellowTri1: {
        width: '200px',
        height: '120px',
        backgroundColor: '#facc15',
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    },
    coverBlackTri1: {
        width: '160px',
        height: '90px',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    },
    coverContent: {
        textAlign: 'center',
        zIndex: 5
    },
    coverMainTitle: {
        fontSize: '80pt',
        fontWeight: '900',
        color: '#facc15',
        margin: 0,
        letterSpacing: '-5px'
    },
    coverSubtitle: {
        fontSize: '18pt',
        fontWeight: 'bold',
        color: '#000',
        marginTop: '-10px',
        letterSpacing: '1px'
    },
    coverLogoMain: {
        margin: '50px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logoTriangleLarge: {
        width: '180px',
        height: '180px',
        backgroundColor: '#000',
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        position: 'relative'
    },
    logoInnerTriangle: {
        width: '90px',
        height: '45px',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: '25px',
        left: '45px',
        clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)'
    },
    logoTextLarge: {
        textAlign: 'center',
        marginTop: '10px'
    },
    logoTextAM: {
        fontSize: '22pt',
        fontWeight: 'bold',
        color: '#333'
    },
    logoTextGroup: {
        fontSize: '16pt',
        color: '#666',
        letterSpacing: '2px'
    },
    coverClientInfo: {
        marginTop: '100px',
        textAlign: 'center'
    },
    coverClientName: {
        fontSize: '16pt',
        fontWeight: 'bold',
        margin: '5px 0'
    },
    coverValidity: {
        fontSize: '14pt',
        fontWeight: 'bold',
        margin: '5px 0'
    },
    coverFooter: {
        marginTop: '150px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    coverWebIcon: {
        fontSize: '16pt',
        color: '#facc15'
    },
    coverWebLink: {
        fontSize: '12pt',
        color: '#000',
        fontWeight: 'bold'
    },
    coverBottomGeometric: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        transform: 'rotate(180deg)'
    },
    coverYellowTri2: {
        width: '200px',
        height: '120px',
        backgroundColor: '#facc15',
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    },
    coverBlackTri2: {
        width: '160px',
        height: '90px',
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    },

    // --- Page 2 Tables ---
    tableId: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '15px'
    },
    tableRoles: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '30px'
    },
    tdLabel: {
        border: '1px solid #000',
        padding: '8px',
        fontSize: '9pt',
        fontWeight: 'bold',
        backgroundColor: '#f9f9f9',
        width: '15%'
    },
    tdValue: {
        border: '1px solid #000',
        padding: '8px',
        fontSize: '9pt'
    },
    tdFooterRole: {
        border: '1px solid #000',
        padding: '8px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    h3Summary: {
        fontSize: '12pt',
        fontWeight: 'bold',
        margin: '20px 0 10px 0'
    },
    summaryContainer: {
        marginLeft: '20px'
    },
    summaryItem: {
        display: 'flex',
        gap: '20px',
        margin: '10px 0'
    },
    summaryNum: {
        fontWeight: 'bold',
        fontSize: '10pt',
        minWidth: '20px'
    },
    summaryText: {
        fontWeight: 'bold',
        fontSize: '10pt'
    },
    pObjective: {
        fontSize: '10pt',
        lineHeight: '1.6',
        textAlign: 'justify',
        marginTop: '30px'
    },
    signatureRow: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '50px'
    },
    sigBox: {
        textAlign: 'center',
        width: '180px'
    },
    sigLinePlaceholder: {
        height: '40px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderBottom: '1px solid #000',
        marginBottom: '5px',
        color: 'transparent'
    },
    sigName: {
        fontWeight: 'bold',
        fontSize: '10pt',
        margin: '5px 0'
    },
    sigSub: {
        fontSize: '8pt',
        margin: '2px 0'
    },

    // --- Common Text Styles ---
    pageTitle: {
        fontSize: '14pt',
        fontWeight: '900',
        borderLeft: '5px solid #facc15',
        paddingLeft: '10px',
        margin: '20px 0'
    },
    pageTitleAlt: {
        fontSize: '12pt',
        fontWeight: 'bold',
        backgroundColor: '#ccc',
        padding: '5px 10px',
        margin: '40px 0 20px 0'
    },
    normativeHeader: {
        fontSize: '10pt',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '10px 0'
    },
    subHeader: {
        fontSize: '11pt',
        fontWeight: 'bold',
        color: '#c2410c', // Orange-ish
        margin: '20px 0 10px 0'
    },
    subHeaderAlt: {
        fontSize: '11pt',
        fontWeight: 'bold',
        margin: '10px 0'
    },
    pDense: {
        fontSize: '9.5pt',
        lineHeight: '1.5',
        textAlign: 'justify',
        marginBottom: '10px'
    },
    pQuote: {
        fontSize: '9.5pt',
        fontStyle: 'italic',
        lineHeight: '1.5',
        textAlign: 'justify',
        margin: '15px 0',
        paddingLeft: '10px',
        borderLeft: '2px solid #ddd'
    },
    pList: {
        fontSize: '9.5pt',
        margin: '5px 0',
        paddingLeft: '10px'
    },

    // --- New Styles for Pages 4-6 ---
    tableHeaderHeaderYellow: {
        backgroundColor: '#facc15',
        color: '#000',
        padding: '8px',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0 0 0',
        border: '1px solid #000'
    },
    tableSubHeaderYellow: {
        backgroundColor: '#f9f9f9',
        padding: '4px',
        fontSize: '8pt',
        textAlign: 'center',
        border: '1px solid #000',
        fontStyle: 'italic'
    },
    tableHeaderHeaderGrey: {
        backgroundColor: '#ccc',
        color: '#000',
        padding: '8px',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0 0 0',
        border: '1px solid #000'
    },
    tableSubHeaderGrey: {
        backgroundColor: '#f9f9f9',
        padding: '4px',
        fontSize: '8pt',
        textAlign: 'center',
        border: '1px solid #000',
        fontStyle: 'italic'
    },
    matrixTableRef: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        border: '1px solid #000'
    },
    tdCenterHeader: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tdCenterBold: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tdCenter: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '9pt',
        textAlign: 'center'
    },
    tdSmallText: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '8.5pt',
        textAlign: 'center'
    },
    thGrey: {
        backgroundColor: '#eee'
    },
    matrix5x5: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '30px',
        border: '2px solid #000'
    },
    tdMatrixTitle: {
        border: '1px solid #000',
        padding: '10px',
        fontSize: '10pt',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tdMatrixHeader: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    tdMatrixSub: {
        border: '1px solid #000',
        padding: '4px',
        fontSize: '8pt',
        textAlign: 'center'
    },
    tdMatrixLabel: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '8pt',
        fontWeight: 'bold',
        textAlign: 'right',
        backgroundColor: '#f9f9f9'
    },
    tdScore: {
        border: '1px solid #000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '10pt',
        width: '60px'
    },
    matrixVerticalLabel: {
        border: '1px solid #000',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        padding: '5px'
    },
    legendBox: {
        border: '1.5px solid #000',
        padding: '10px',
        marginTop: '10px',
        width: '100%'
    },
    legendHeader: {
        fontWeight: 'bold',
        fontSize: '9pt',
        borderBottom: '1px solid #000',
        paddingBottom: '3px',
        marginBottom: '5px',
        textAlign: 'center'
    },
    legendRow: {
        display: 'flex',
        alignItems: 'center',
        margin: '3px 0'
    },
    legendColorBox: {
        fontSize: '8pt',
        width: '80px',
        fontWeight: 'bold'
    },
    colorCell: {
        width: '100px',
        height: '15px',
        border: '1px solid #000',
        margin: '0 10px'
    },
    legendText: {
        fontSize: '8.5pt',
        fontWeight: 'bold'
    },
    pExample: {
        marginTop: '20px',
        fontSize: '10pt'
    },
    pSmallQuote: {
        fontSize: '8.5pt',
        fontStyle: 'italic',
        margin: '10px 0',
        borderLeft: '3px solid #ccc',
        paddingLeft: '10px'
    },
    controlTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        border: '1px solid #000'
    },
    tdPriority: {
        border: '1px solid #000',
        padding: '8px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000'
    },
    tdControlCell: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '8pt',
        textAlign: 'center'
    },
    formulaBox: {
        border: '1.5px solid #000',
        padding: '15px',
        margin: '20px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
    },
    formulaLabel: {
        fontSize: '14pt',
        fontWeight: 'bold',
        marginRight: '10px'
    },
    formulaFraction: {
        textAlign: 'center'
    },
    fractionTop: {
        borderBottom: '1.5px solid #000',
        padding: '0 10px',
        fontSize: '12pt'
    },
    fractionBottom: {
        padding: '5px 10px 0',
        fontSize: '12pt'
    },
    formulaMultiplier: {
        fontSize: '14pt',
        marginLeft: '10px'
    },
    sectorBox: {
        border: '2px solid #000',
        marginBottom: '20px'
    },
    sectorHeader: {
        backgroundColor: '#facc15',
        color: '#000',
        padding: '8px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '2px solid #000'
    },
    sectorContent: {
        display: 'flex'
    },
    envLabelBox: {
        width: '25%',
        padding: '15px',
        borderRight: '2px solid #000',
        fontSize: '9pt',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    envValueBox: {
        flex: 1,
        padding: '10px',
        fontSize: '8.5pt',
        textAlign: 'justify'
    }
};

export default PGRTemplate;

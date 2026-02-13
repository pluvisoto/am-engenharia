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
                        <div style={{ fontWeight: '900', fontSize: '11pt', letterSpacing: '0.5px' }}>AM ENGENHARIA</div>
                        <div style={{ fontSize: '7.5pt', color: '#666', letterSpacing: '2px', marginTop: '-2px' }}>GROUP</div>
                    </div>
                </div>
                {/* Geométrico superior esquerdo (triângulos amarelo e preto) */}
                <div style={styles.headerGeometric}>
                    <div style={styles.headerYellowTriangle}></div>
                    <div style={styles.headerBlackTriangle}></div>
                </div>
            </div>
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
            <div style={styles.footer}>
                <div style={styles.footerContact}>
                    <span>📞 19 971515665</span>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <span>@amengenhariaseg</span>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <span>contato@amengenhariaseg.com.br</span>
                </div>
                <div style={styles.footerWeb}>WWW.AMENGENHARIASEG.COM.BR</div>
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
                        "AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS",
                        "DEFINIÇÕES E CRITÉRIOS DE RISCO",
                        "RECONHECIMENTO E AVALIAÇÃO DOS RISCOS AMBIENTAIS",
                        "MEDIDAS GERAIS DE CONTROLE PARA OS RISCOS",
                        "EQUIPAMENTOS DE PROTEÇÃO (EPI/EPC)",
                        "ANÁLISE DOS ACIDENTES",
                        "INSTRUÇÕES PARA PROTEÇÃO CONTRA INCÊNDIO E PÂNICO",
                        "PLANO DE AÇÃO",
                        "DISPOSIÇÕES GERAIS",
                        "CONSIDERAÇÕES FINAIS"
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
            </PagePage>

            <PagePage pageNum="3">
                <h4 style={styles.subHeader}>Sobre o Inventário de Riscos</h4>
                <p style={styles.pDense}>Os riscos identificados e avaliados neste PGR - Programa de Gerenciamento de Riscos, foram formalizados em um inventário de riscos, da maneira estabelecida pela NR-1 (Portaria SEPRT n.º 6.730):</p>

                <p style={styles.pDense}>
                    “1.5.7.3.1 Os dados da identificação dos perigos e das avaliações dos riscos ocupacionais devem ser consolidados em um inventário deriscos ocupacionais.<br /><br />
                    1.5.7.3.2 O Inventário de Riscos Ocupacionais deve contemplar, no mínimo, as seguintes informações:<br /><br />
                    a) caracterização dos processos e ambientes de trabalho;<br /><br />
                    b) caracterização das atividades;<br /><br />
                    c) descrição de perigos e de possíveis lesões ou agravos à saúde dos trabalhadores, com a identificação das fontes ou circunstâncias,descrição de riscos gerados pelos perigos, com a indicação dos grupos de trabalhadores sujeitos a esses riscos, e descrição de medidas de prevenção implementadas;<br /><br />
                    d) dados da análise preliminar ou do monitoramento das exposições a agentes físicos, químicos e biológicos e os resultados da avaliação de ergonomia nos termos da NR-17;<br /><br />
                    e) avaliação dos riscos, including a classificação para fins de elaboração do plano de ação; e<br /><br />
                    f) critérios adotados para avaliação dos riscos e tomada de decisão.<br /><br />
                    1.5.7.3.3 O inventário de riscos ocupacionais deve ser mantido atualizado.<br /><br />
                    1.5.7.3.3.1 O histórico das atualizações deve ser mantido por um período mínimo de 20 (vinte) anos ou pelo período estabelecido em normatização específica.”
                </p>

                <p style={styles.pDense}>A caracterização dos ambientes está disposta logo no início do inventário. O inventário de riscos está disposto por cargo. Na descrição dos cargos está disposto a caracterização dos processos e atividades.</p>

                <p style={styles.pDense}>Para compor o inventário de riscos, foram avaliados os níveis de riscos através da matriz de riscos definida. Para isso foi necessário avaliar os níveis de probabilidade e severidade de cada perigo e risco identificado, através de tabelas de gradações mencionadas em “3. DEFINIÇÕES E CRITÉRIOS DE RISCOS”.</p>

                <p style={styles.pDense}>O inventário de riscos, quando feito através de um sistema de gestão sofisticado, deve ser exposto de maneira listada, como é feito neste documento (de acordo com as recomendações da Fundacentro).</p>
            </PagePage>

            <PagePage pageNum="4">
                <h4 style={styles.subHeader}>Sobre o Plano de Ação</h4>
                <p style={styles.pDense}>Após feito o Inventário de Riscos, foi consolidado um plano de ação para controle dos riscos ocupacionais necessários, como estabelecido pela NR-1 (Portaria SEPRT n.º 6.730):</p>

                <p style={styles.pDense}>
                    “1.5.5.2.1 A organização deve elaborar plano de ação, indicando as medidas de prevenção a serem introduzidas, aprimoradas ou mantidas, conforme o subitem 1.5.4.4.5.<br /><br />
                    1.5.5.2.2 Para as medidas de prevenção deve ser definido cronograma, formas de acompanhamento e aferição de resultados.”
                </p>

                <p style={styles.pDense}>O modelo exposto neste documento é um cronograma de ações planejadas , onde cada ação tem sua descrição e data de planejamento. Na descrição de cada ação são informadas as medidas de prevenção com as respectivas ações necessárias para controle e mitigação dos riscos ocupacionais.</p>

                <h3 style={styles.pageTitleAlt}>2. AMBIENTES, CARGOS E INVENTÁRIO DE RISCOS OCUPACIONAIS</h3>
                <p style={styles.pDense}>Abaixo seguem os quadros detalhados por setor e os respectivos inventários de riscos identificados para cada ambiente de trabalho.</p>
            </PagePage>

            {/* --- PAGINACAO DINAMICA DE SETORES (MOVIMENTADA PARA ITEM 2) --- */}
            {(data.sectors || []).map((sector, idx) => (
                <PagePage key={idx} pageNum={`5.${idx + 1}`}>
                    <div style={styles.sectorBox}>
                        <div style={styles.sectorHeader}>{String.fromCharCode(65 + idx)} - SETOR – {safeUpper(sector.name)}</div>
                        <div style={styles.sectorContent}>
                            <div style={styles.envLabelBox}>Descrição do Ambiente</div>
                            <div style={styles.envValueBox}>{sector.description || 'Ambiente em alvenaria, piso de concreto, ventilação e iluminação adequadas.'}</div>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '11pt', fontWeight: 'bold', margin: '15px 0 10px 0', borderBottom: '1px solid #000', paddingBottom: '3px' }}>Riscos Atrelados</h4>

                    {(() => {
                        const standardCats = ['FÍSICO', 'QUÍMICO', 'BIOLÓGICO', 'ERGONÔMICO', 'ACIDENTE'];
                        const sectorRoles = (data.roles || []).filter(r => r.sector_id === sector.id).map(r => r.id);
                        const risksInSector = (data.risk_inventory || []).filter(r => sectorRoles.includes(r.role_id));

                        const catsToRender = standardCats.filter(cat => risksInSector.some(r => safeUpper(r.type) === cat));
                        const finalCats = catsToRender.length > 0 ? catsToRender : ['FÍSICO'];

                        return finalCats.map((cat, cIdx) => {
                            const catColor = cat === 'FÍSICO' ? '#10b981' : (cat === 'QUÍMICO' ? '#ef4444' : (cat === 'ERGONÔMICO' ? '#facc15' : '#3b82f6'));
                            const risks = risksInSector.filter(r => safeUpper(r.type) === cat);

                            return (
                                <div key={cIdx} style={{ marginTop: '15px', border: '1px solid #000', pageBreakInside: 'avoid' }}>
                                    <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
                                        <div style={{ padding: '4px 12px', backgroundColor: '#eee', borderRight: '1px solid #000', fontWeight: 'bold', fontSize: '9pt' }}>Risco</div>
                                        <div style={{ padding: '4px 12px', backgroundColor: '#fff', borderRight: '1px solid #000', fontWeight: 'bold', fontSize: '9pt' }}>{cat}</div>
                                        <div style={{ flex: 1, backgroundColor: catColor }}></div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '3px', fontSize: '7.5pt', backgroundColor: '#f9f9f9', borderBottom: '1px solid #000', fontStyle: 'italic' }}>
                                        Avaliar o ambiente em relação aos riscos {cat.toLowerCase()}s presentes
                                    </div>
                                    <div style={{ padding: '8px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '8pt', marginBottom: '3px' }}>Descrição do ambiente</div>
                                        <div style={{ fontSize: '8pt', fontStyle: 'italic', marginBottom: '8px' }}>Atividades administrativas e operacionais no setor.</div>

                                        <table style={styles.inventoryFullTable}>
                                            <thead>
                                                <tr>
                                                    <td style={styles.tdInvHead}>Riscos</td>
                                                    <td style={styles.tdInvHead}>Fonte geradora</td>
                                                    <td style={styles.tdInvHead}>Meio de propagação</td>
                                                    <td style={styles.tdInvHead}>Concentração</td>
                                                    <td style={styles.tdInvHead}>Limite de Tolerância</td>
                                                    <td style={styles.tdInvHead}>Técnica utilizada</td>
                                                    <td style={styles.tdInvHead}>Exposição</td>
                                                    <td style={styles.tdInvHead}>EPI</td>
                                                    <td style={styles.tdInvHead}>EPC</td>
                                                    <td style={styles.tdInvHead}>Danos à saúde</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {risks.length === 0 ? (
                                                    <tr>
                                                        <td style={styles.tdInvCell}>Exemplo</td>
                                                        <td style={styles.tdInvCell}>Ambiente</td>
                                                        <td style={styles.tdInvCell}>Ar</td>
                                                        <td style={styles.tdInvCell}>N/A</td>
                                                        <td style={styles.tdInvCell}>N/A</td>
                                                        <td style={styles.tdInvCell}>Qualit.</td>
                                                        <td style={styles.tdInvCell}>Habitual</td>
                                                        <td style={styles.tdInvCell}>-</td>
                                                        <td style={styles.tdInvCell}>-</td>
                                                        <td style={styles.tdInvCell}>Saúde</td>
                                                    </tr>
                                                ) : risks.map((r, rIdx) => (
                                                    <tr key={rIdx}>
                                                        <td style={styles.tdInvCell}>{r.hazard}</td>
                                                        <td style={styles.tdInvCell}>{r.source}</td>
                                                        <td style={styles.tdInvCell}>{r.propagation || '-'}</td>
                                                        <td style={styles.tdInvCell}>{r.measurement_value || '-'}</td>
                                                        <td style={styles.tdInvCell}>{r.limit_tolerance || '-'}</td>
                                                        <td style={styles.tdInvCell}>{r.is_quantitative ? 'Quant.' : 'Qualit.'}</td>
                                                        <td style={styles.tdInvCell}>Habitual</td>
                                                        <td style={styles.tdInvCell}>{(data.epis || []).filter(e => r.epi_ids?.includes(e.id)).map(e => e.name).join(', ') || '-'}</td>
                                                        <td style={styles.tdInvCell}>{r.control_epc || '-'}</td>
                                                        <td style={styles.tdInvCell}>{r.impact || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div style={{ display: 'flex', borderTop: '1px solid #000' }}>
                                        <div style={{ flex: 1, borderRight: '1px solid #000' }}>
                                            <div style={styles.controlSubHead}>MEDIDAS DE CONTROLE EXISTENTE</div>
                                            <div style={styles.controlContent}>{risks[0]?.controls_existing || 'Uso correto e obrigatório de EPI e sistema de revestimento.'}</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={styles.controlSubHead}>MEDIDAS DE CONTROLE NECESSÁRIAS E SUA EFICÁCIA</div>
                                            <div style={styles.controlContent}>Adaptações e manutenções das máquinas em dia, aumentando vida útil dos componentes das máquinas e o conforto para os colaboradores; Espaço ventilado.</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', borderTop: '1px solid #000' }}>
                                        <div style={{ flex: 1, borderRight: '1px solid #000' }}>
                                            <div style={styles.controlSubHead}>OBSERVAÇÕES</div>
                                            <div style={styles.controlContent}>Deve haver o controle continuo dos níveis de radiação e ruidos causados pelas máquinas em operação muitas vezes pode significar outros perigos mecânicos em conjunto. Quanto à proteção solar, sempre que possível optar pelo serviço em áreas com sombra.</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={styles.controlSubHead}>INDICATIVOS DE POSSÍVEL COMPROMETIMENTO DA SAÚDE DECORRENTE DO TRABALHO</div>
                                            <div style={styles.controlContent}>Níveis altos de ruídos podem causar danos à saúde. Além de perda ou redução da capacidade auditiva, existem outros efeitos nocivos, entre eles: Insônia, e dores de cabeça; Elevação de batimentos cardíacos e variações na pressão arterial; Vertigens, falta de equilíbrio, desmaios e lesões dos músculos e articulações; Desidratação, Insolação e Vertigens podem indicar a alta exposição ao Sol.</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    })()}
                </PagePage>
            ))}

            <PagePage pageNum="6">
                <h3 style={styles.pageTitleAlt}>3. DEFINIÇÕES E CRITÉRIOS DE RISCOS</h3>
                <p style={styles.pDense}>As tabelas de gradação de severidade e probabilidade sugeridas são as tabelas da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Todas elas possuem gradações de 1 a 5, que vão determinar a classificação da severidade e probabilidade.</p>

                <p style={styles.pDense}>As gradações de <b>probabilidade</b> são 5 (cinco): Rara (1); Pouco Provável (2); Possível (3); Provável (4) e Muito Provável (5). Nas avaliações qualitativas, de acordo com o controle e exposição ao risco, determina-se de 1 a 5 o nível de probabilidade. Em avaliações quantitativas, a probabilidade é classificada de acordo com a porcentagem do valor de exposição ao LEO - Limite de Exposição Ocupacional.</p>
            </PagePage>

            {/* --- PAGINA 5: GRADAÇÕES (Fiel à Imagem 1) --- */}
            <PagePage pageNum="7">
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

            </PagePage>

            <PagePage pageNum="8">
                <h4 style={styles.subHeaderAlt}>Matriz de Risco Utilizada</h4>
                <p style={styles.pDense}>
                    A Matriz de Risco utilizada neste Programa de Gerenciamento de Riscos é uma matriz no formato 5x5, baseada nas estimativas de gradações de Severidade e Probabilidade da AIHA - American Industrial Hygiene Association, AS/NZS 4360 e European Comission (recomendadas pela Fundacentro). Esta matriz funciona para avaliações qualitativas e quantitativas, pois as tabelas de gradações sugeridas possuem as estimativas adequadas para ambas as avaliações.
                </p>
                <p style={styles.pDense}>
                    Os níveis de risco presentes na matriz são 5 (cinco): Trivial (1-3); Tolerável (3-8); Moderado (4-12); Substancial (10-15) e Intolerável (15-25). Cada nível de risco possui o seu método de controle sugerido, baseado na estimativa (grau de certeza) da avaliação, onde osriscos de níveis mais altos têm prioridade de ação.
                </p>

                <table style={styles.matrix5x5}>
                    <thead>
                        <tr>
                            <th rowSpan="3" colSpan="2" style={styles.tdMatrixTitle}>MATRIZ DE RISCO 5X5 Baseada na Metodologia AIHA</th>
                            <th colSpan="5" style={styles.tdMatrixHeader}>SEVERIDADE</th>
                        </tr>
                        <tr>
                            <th style={styles.tdMatrixSubGrey}>Leve</th><th style={styles.tdMatrixSubGrey}>Baixa</th><th style={styles.tdMatrixSubGrey}>Moderada</th><th style={styles.tdMatrixSubGrey}>Alta</th><th style={styles.tdMatrixSubGrey}>Extrema</th>
                        </tr>
                        <tr>
                            <th style={styles.tdMatrixSubGrey}>1</th><th style={styles.tdMatrixSubGrey}>2</th><th style={styles.tdMatrixSubGrey}>3</th><th style={styles.tdMatrixSubGrey}>4</th><th style={styles.tdMatrixSubGrey}>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="5" style={styles.matrixVerticalLabel}>
                                {"PROBABILIDADE".split("").map((c, i) => (
                                    <div key={i}>{c}</div>
                                ))}
                            </td>
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
            </PagePage>

            {/* --- PAGINA 6: MATRIZ E AÇÕES (Fiel à Imagem 2) --- */}
            <PagePage pageNum="9">
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

            <PagePage pageNum="10">
                <table style={styles.controlTable}>
                    <thead>
                        <tr>
                            <th rowSpan="2" style={styles.tdCenterHeader}>NÍVEIS DE RISCO (ordem de prioridade)</th>
                            <th colSpan="3" style={styles.tdMatrixHeader}>MÉTODOS DE CONTROLE E AÇÕES</th>
                        </tr>
                        <tr>
                            <th style={styles.tdMatrixSubGrey}>0 - Certa</th><th style={styles.tdMatrixSubGrey}>1 - Incerta</th><th style={styles.tdMatrixSubGrey}>2 - Altamente Incerta</th>
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
            </PagePage>

            {/* --- PAGINA 8: RECONHECIMENTO E AVALIAÇÃO --- */}
            <PagePage pageNum="11">
                <h3 style={styles.pageTitleAlt}>4. RECONHECIMENTO E AVALIAÇÃO DOS RISCOS AMBIENTAIS</h3>
                <div style={{ paddingLeft: '10px' }}>
                    {[
                        { key: 'a', title: 'FÍSICO' },
                        { key: 'b', title: 'QUÍMICO' },
                        { key: 'c', title: 'BIOLÓGICO' },
                        { key: 'd', title: 'ERGONÔMICO' },
                        { key: 'e', title: 'ACIDENTE' }
                    ].map((cat) => {
                        const risks = (data.risk_inventory || []).filter(r => safeUpper(r.type) === cat.title);
                        return (
                            <div key={cat.key} style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '10pt', marginBottom: '5px' }}>{cat.key}) {cat.title}</div>
                                {risks.length > 0 ? (
                                    Array.from(new Set(risks.map(r => r.hazard))).map((hazardName, idx) => {
                                        const hRisks = risks.filter(r => r.hazard === hazardName);
                                        return (
                                            <div key={idx} style={{ marginBottom: '10px' }}>
                                                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                                    <li style={{ fontWeight: 'bold', fontSize: '9pt' }}>{hazardName}:</li>
                                                </ul>
                                                <p style={{ ...styles.pDense, marginLeft: '20px' }}>
                                                    Fonte: {Array.from(new Set(hRisks.map(r => r.source))).join(', ')}. Danos: {Array.from(new Set(hRisks.map(r => r.impact))).join(', ')}.
                                                </p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <ul style={{ margin: '0', paddingLeft: '20px' }}><li style={{ fontSize: '9pt', fontStyle: 'italic', color: '#666' }}>Não aplicável para as atividades e ambiente da empresa.</li></ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </PagePage>

            {/* --- PAGINA 9: MEDIDAS GERAIS DE CONTROLE --- */}
            <PagePage pageNum="12">
                <h3 style={styles.pageTitleAlt}>5. MEDIDAS GERAIS DE CONTROLE PARA OS RISCOS</h3>
                <div style={{ paddingLeft: '10px' }}>
                    {(() => {
                        const catConfigs = [
                            {
                                title: 'Riscos Físicos', type: 'FÍSICO',
                                measures: [
                                    { hazard: 'Ruído', text: 'Os pontos críticos de elevado nível de ruído foram amplamente discutidos. Quando o enclausuramento é impraticável, utiliza-se abafadores tipo concha ou plug com redução de aprox. 25% conforme fabricante.' },
                                    { hazard: 'Calor', text: 'Para minimizar o calor de fontes próximas, utiliza-se exaustores e ventilação artificial para garantir o conforto térmico.' }
                                ]
                            },
                            {
                                title: 'Riscos Químicos', type: 'QUÍMICO',
                                measures: [
                                    { hazard: 'Gases/Poeiras', text: 'Uso de máscaras de proteção respiratória adequadas ao agente químico em qualquer situação que se faça necessário, com avaliação periódica do local.' },
                                    { hazard: 'Produtos Químicos', text: 'Uso obrigatório de EPIs (luvas, óculos e máscara). Armazenamento em locais frescos e secos, longe de fontes de calor.' }
                                ]
                            },
                            {
                                title: 'Riscos Ergonômicos', type: 'ERGONÔMICO',
                                measures: [
                                    { hazard: 'Postura', text: 'Recomenda-se a utilização de cadeiras ergonômicas (NR-17) com ajuste de altura e apoio, além do posicionamento correto do monitor para evitar fadiga visual e muscular.' }
                                ]
                            },
                            {
                                title: 'Riscos Acidentes', type: 'ACIDENTE',
                                measures: [
                                    { hazard: 'Condução', text: 'Exigência de CNH válida, uso obrigatório de cinto de segurança e treinamentos periódicos de condução defensiva.' },
                                    { hazard: 'Altura', text: 'Uso rigoroso de EPIs para trabalho em altura (NR-35) e treinamento de capacitação para todos os envolvidos.' },
                                    { hazard: 'Eletricidade', text: 'Avaliação prévia de risco em instalações elétricas, uso de luvas isolantes e calçados específicos, seguindo a NR-10.' },
                                    { hazard: 'Espaço Confinado', text: 'Monitoramento constante da atmosfera com detectores de gases e plano de resgate estabelecido conforme NR-33.' }
                                ]
                            }
                        ];

                        return catConfigs.map((cat, idx) => {
                            const risksInCat = (data.risk_inventory || []).filter(r => safeUpper(r.type) === cat.type);
                            if (risksInCat.length === 0) return null;

                            return (
                                <div key={idx} style={{ marginBottom: '20px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '10pt', color: 'var(--primary)', marginBottom: '5px' }}>{cat.title}</div>
                                    {cat.measures.map((m, mIdx) => {
                                        const hasHazard = risksInCat.some(r => safeUpper(r.hazard).includes(safeUpper(m.hazard)));
                                        if (!hasHazard && cat.measures.length > 1) return null; // Only skip if it's a specific sub-measure not found

                                        return (
                                            <div key={mIdx} style={{ marginBottom: '10px' }}>
                                                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                                                    <li style={{ fontWeight: 'bold', fontSize: '9pt' }}>{m.hazard}</li>
                                                </ul>
                                                <p style={styles.pDense}>{m.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        });
                    })()}
                </div>
            </PagePage>

            {/* --- PAGINA 10: EQUIPAMENTOS DE PROTEÇÃO --- */}
            <PagePage pageNum="13">
                <h3 style={styles.pageTitleAlt}>6. EQUIPAMENTOS DE PROTEÇÃO</h3>
                <p style={styles.pDense}>
                    A importância da proteção individual e coletiva está diretamente ligada à preservação da saúde e da integridade física do trabalhador. E indiretamente ligada ao aumento da produtividade e lucros para a empresa, através da minimização dos acidentes e doenças do trabalho e suas consequências.
                </p>
                <p style={styles.pDense}>
                    Paralelamente ao desenvolvimento da Legislação sobre Segurança e Medicina do Trabalho, ocorre o da Engenharia de Controle dos Riscos nos locais de trabalho.
                </p>
                <p style={styles.pDense}>
                    Desta forma, livrar os locais de trabalho de fatores de risco pode requerer estudos que vão desde uma extensa revisão da engenharia de processo ou de métodos de fabricação até a escolha do adequado método de movimentação e manuseio de materiais.
                </p>

                <div style={{ marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10pt', marginBottom: '10px' }}>6.1 Equipamentos de Proteção Coletiva (EPC)</div>
                    <p style={styles.pDense}>
                        No ambiente de escritório, os principais EPCs envolvem iluminação adequada (NHO 11), ventilação/ar-condicionado e sinalização de saídas de emergência e extintores.
                    </p>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10pt', marginBottom: '10px' }}>6.2 Equipamentos de Proteção Individual (EPI)</div>
                    {(data.epis || []).length > 0 ? (
                        <table style={styles.tableId}>
                            <thead>
                                <tr style={styles.thGrey}>
                                    <th style={styles.tdLabel}>EPI</th>
                                    <th style={styles.tdLabel}>CA</th>
                                    <th style={styles.tdLabel}>Finalidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(data.epis || []).map((epi, idx) => (
                                    <tr key={idx}>
                                        <td style={styles.tdValue}>{epi.name}</td>
                                        <td style={styles.tdValue}>{epi.ca}</td>
                                        <td style={styles.tdValue}>{epi.observations || 'Proteção residual'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p style={{ ...styles.pDense, fontStyle: 'italic', color: '#666' }}>
                            Para as atividades de rotina neste ambiente (administrativo), não foi identificada a necessidade de uso obrigatório de EPIs.
                        </p>
                    )}
                </div>
            </PagePage>

            {/* --- PAGINA 11: ACIDENTES --- */}
            <PagePage pageNum="14">
                <h3 style={styles.pageTitleAlt}>7. ANÁLISE DOS ACIDENTES</h3>
                <p style={styles.pDense}>
                    É fundamental diante de um acidente ocorrido, a busca de suas causas e a preposição de medidas para que acidentes semelhantes podem ser preventivamente cuidados. O acidente de trabalho, quanto a sua consequência, classifica-se em:
                </p>
                <ul style={{ ...styles.pDense, paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}><b>Acidentes Com Afastamento:</b> É o acidente que provoca incapacidade para o trabalho ou morte do acidentado, podendo resultar em: Morte; Incapacidade temporária; Incapacidade permanente (parcial ou total).</li>
                    <li style={{ marginBottom: '8px' }}><b>Incapacidade Parcial E Permanente:</b> É a diminuição, por toda a vida para o trabalho. Ex. Perda de um dos olhos ou dedos.</li>
                    <li style={{ marginBottom: '8px' }}><b>Incapacidade Total Permanente:</b> É a invalidez incurável para o trabalho.</li>
                    <li style={{ marginBottom: '8px' }}><b>Acidentes Sem Afastamento:</b> É o acidente em que o acidentado pode exercer a função normal no mesmo dia do acidente, ou seja, acidente capacitado.</li>
                </ul>

                <div style={{ fontWeight: 'bold', fontSize: '10pt', marginTop: '15px', marginBottom: '5px' }}>Comunicação de Acidentes</div>
                <p style={styles.pDense}>
                    É obrigação legal, assim que houver um acidente, o acidentado ou qualquer pessoa fazer a comunicação do acidente logo que se dê a ocorrência, convém lembrar que nem todos os acidentes ocorrem no recinto da empresa. A empresa por sua vez faz a comunicação ao INSS. O acidentado deve comunicar ao SESMT a ocorrência, para que se possa tomar todas as providências legais e sua investigação.
                </p>

                <div style={{ fontWeight: 'bold', fontSize: '10pt', marginTop: '15px', marginBottom: '5px' }}>Registro de Acidentes</div>
                <p style={styles.pDense}>
                    Assim como nas empresas existem preocupações com controles de qualidade, de produção, de estoques, etc., deve existir também igual ou maior interesse com os acidentados. O acompanhamento da variação na ocorrência de informação exige que se façam registros cuidadosos sobre acidentes. Tais registros podem colocar em destaque a situação dos acidentes por setores, por mês, função, idade etc. Através dos registros, monta-se as estatísticas de acidentes de que vem satisfazer às exigências legais. Prevenir acidentes significa, principalmente, atuar antes de sua ocorrência o que significa identificar e eliminar riscos nos ambientes de trabalho.
                </p>

                <div style={{ fontWeight: 'bold', fontSize: '10pt', marginTop: '15px', marginBottom: '5px' }}>Investigação de Acidentes</div>
                <p style={styles.pDense}>Nas investigações devemos identificar:</p>
                <p style={styles.pDense}>
                    <b>Agente do Acidente</b> - É a máquina, o local, o equipamento que se relaciona diretamente com o dano físico que o acidente sofreu. Há 03 tipos de riscos que podem ser agentes de acidentes: Riscos locais (piso escorregadio); Riscos ambientais (proveniente de agentes físicos, químicos, biológicos e ergonômicos); Riscos operacionais (ferramentas com defeito ou mal estado de conservação).
                </p>
                <p style={styles.pDense}>
                    <b>Fonte de Lesão</b> - É o objeto, o material, a matéria-prima, a substância, a espécie de energia que entrando em contato com a pessoa, provoca a lesão. É o local da máquina que bate, numa parte do corpo do trabalhador. A descarga elétrica, um respingo de ácido o estilhaço, o piso escorregadio, etc. Na investigação do acidente, a análise da causa da lesão terá muito valor, porque ficará muito fácil a identificação dos atos inseguros cometidos ou da condição insegura existente.
                </p>
            </PagePage>

            {/* --- PAGINA 12: INCÊNDIO --- */}
            <PagePage pageNum="15">
                <h3 style={styles.pageTitleAlt}>8. INSTRUÇÕES PARA PROTEÇÃO CONTRA INCÊNDIO E PÂNICO</h3>
                <p style={styles.pDense}>De acordo com a NR 23 Todos os empregadores devem adotar medidas de prevenção de incêndios, em conformidade com a legislação estadual e as normas técnicas aplicáveis.</p>
                <p style={styles.pDense}>De acordo com o item 5 Requisitos da NBR 12.693/10, os extintores devem ser mantidos com sua carga completa e em condições de operação e instalados nos locais designados. Os extintores devem estar em locais facilmente acessíveis e prontamente disponíveis numa ocorrência de incêndio. Preferencialmente, devem estar localizados nos caminhos normais e passagem, incluindo saídas das áreas, não podendo ser instalados em escadas.</p>
                <p style={styles.pDense}>Os extintores não podem estar obstruídos e devem estar visíveis e sinalizados conforme NBR 13434-1. Os extintores portáteis devem ser instalados em suportes ou em abrigos. Os extintores sobre rodas, instalados em locais sujeitos a intempéries devem estar protegidos por abrigos. Os extintores instalados em condições onde podem ocorrer danos físicos devem estar protegidos contra impactos.</p>

                <p style={styles.pDense}>Os extintores portáteis devem ser instalados nas seguintes condições:</p>
                <ul style={{ ...styles.pDense, paddingLeft: '20px' }}>
                    <li>a) sua alça deve estar no máximo a 1,60m do piso; ou</li>
                    <li>b) o fundo deve estar no mínimo a 0,10m do piso, mesmo que apoiado em suporte.</li>
                </ul>
                <p style={styles.pDense}>Deve haver no mínimo um extintor de incêndio distante a não mais de 5m da porta de acesso da entrada principal da edificação, entrada do pavimento ou entrada da área de risco.</p>

                <p style={styles.pDense}>Para cada ponto de hidrante ou de mangotinho, são obrigatórios os materiais de abrigo de mangueiras; mangueiras de incêndio; chave para hidrantes, engate rápido e esguicho. Quanto à localização a NBR diz que os pontos de tomada de água devem ser posicionados:</p>
                <ul style={{ ...styles.pDense, paddingLeft: '20px' }}>
                    <li>a) nas proximidades das portas externas e/ou acessos à área a ser protegida, a não mais de 5m;</li>
                    <li>b) em posições centrais nas áreas protegidas;</li>
                    <li>c) fora das escadas ou antecâmaras de fumaça;</li>
                    <li>d) de 1,0 m a 1,5 m do piso.</li>
                </ul>
                <p style={styles.pDense}>Nos hidrantes externos, quando afastados de no mínimo 15m ou 1,5 vez a altura da parede externa da edificação a ser protegida, poderão ser utilizados até 60m de mangueira (preferencialmente em lances de 15m), desde que devidamente dimensionados hidraulicamente. Recomenda-se que sejam utilizadas mangueiras de 65 mm de diâmetro para redução da perda de carga do sistema e o último lance de 40 mm para facilitar seu manuseio.</p>
                <p style={styles.pDense}>A utilização do sistema não deve comprometer a fuga dos ocupantes da edificação; portanto, deve ser projetado de tal forma que dê proteção em toda a edificação, sem que haja a necessidade de adentrar as escadas, antecâmaras ou outros locais determinados exclusivamente para servirem de rota de fuga dos ocupantes.</p>
            </PagePage>

            {/* --- PAGINA 16: PLANO DE AÇÃO (Texto) --- */}
            <PagePage pageNum="16">
                <h3 style={styles.pageTitleAlt}>9. PLANO DE AÇÃO</h3>
                <p style={styles.pDense}>
                    É crucial para garantir a segurança e a saúde dos colaboradores, bem como a continuidade das operações da empresa.
                </p>
                <div style={{ paddingLeft: '10px' }}>
                    {[
                        { t: '1. Identificação e Mitigação de Riscos', d: 'O plano permite identificar riscos específicos relacionados ao ambiente de trabalho, como ruído, ergonomia e trabalho em altura. Ao abordar esses riscos, a empresa pode implementar medidas que reduzam a probabilidade de acidentes e doenças ocupacionais.' },
                        { t: '2. Promoção da Saúde e Bem-Estar', d: 'Com ações voltadas para ergonomia, controle de calor e vibração, o plano de ação contribui para um ambiente de trabalho mais saudável. Isso resulta em menos afastamentos e maior satisfação dos colaboradores, impactando positivamente a moral da equipe.' },
                        { t: '3. Conformidade Legal', d: 'O cumprimento das normas de segurança e saúde no trabalho é uma obrigação legal. Um PGR bem estruturado, com um plano de ação eficaz, ajuda a garantir que a empresa esteja em conformidade com a legislação, evitando multas e penalidades.' },
                        { t: '4. Redução de Custos', d: 'Investir em medidas preventivas pode levar à redução de custos relacionados a acidentes de trabalho, como indenizações, tratamento médico e retrabalho. A longo prazo, um ambiente de trabalho seguro é economicamente vantajoso.' },
                        { t: '5. Melhoria da Image Corporativa', d: 'Empresas que demonstram comprometimento com a segurança e a saúde dos seus colaboradores fortalecem sua reputação no mercado. Isso pode ser um diferencial competitivo, atraindo talentos e clientes que valorizam práticas responsáveis.' },
                        { t: '6. Cultura de Segurança', d: 'Um plano de ação eficaz promove uma cultura de segurança dentro da empresa, onde todos os colaboradores se tornam mais conscientes dos riscos e da importância de seguir procedimentos de segurança. Isso aumenta o engajamento e a colaboração entre as equipes.' },
                        { t: '7. Monitoramento e Melhoria Contínua', d: 'O plano de ação deve incluir mecanismos de monitoramento e avaliação, permitindo que a empresa faça ajustes conforme necessário. Essa abordagem proativa assegura que a AM Engenharia esteja sempre melhorando seus processos e adaptando-se a novas situações.' }
                    ].map((item, id) => (
                        <div key={id} style={{ marginBottom: '10px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '9pt' }}>{item.t}</div>
                            <p style={{ ...styles.pDense, fontSize: '8.5pt', marginBottom: '5px' }}>{item.d}</p>
                        </div>
                    ))}
                </div>
            </PagePage>

            {/* --- PAGINA 17: PLANO DE AÇÃO (Quadros - Fiel à Imagem 2) --- */}
            <div className="pdf-page" style={{ ...styles.page, padding: '0 0 10mm 0' }}>
                <div style={{ backgroundColor: '#facc15', color: '#000', fontWeight: 'bold', fontSize: '13pt', textAlign: 'center', padding: '10px 0', borderBottom: '2px solid #000' }}>
                    PLANO DE AÇÃO
                </div>
                <div style={{ backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4px 0', fontSize: '7.5pt', gap: '12px' }}>
                    <span>📞 19 971515665</span>
                    <span>|</span>
                    <span>@amengenhariaseg</span>
                    <span>|</span>
                    <span>contato@amengenhariaseg.com.br</span>
                    <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>WWW.AMENGENHARIASEG.COM.BR</span>
                </div>

                <div style={{ padding: '0 15mm' }}>
                    {/* Marca d'água / Logo conforme Imagem 2 */}
                    <div style={{ position: 'relative', height: '100px', margin: '15px 0' }}>
                        <div style={{ position: 'absolute', left: '-15mm', top: '-10px', width: '120px' }}>
                            <svg width="120" height="100" viewBox="0 0 150 100">
                                <path d="M0 0 L150 0 L75 100 Z" fill="#facc15" transform="rotate(-40, 75, 50)" />
                                <path d="M0 0 L150 0 L75 100 Z" fill="#000" transform="translate(15, 10) rotate(-40, 75, 50)" />
                            </svg>
                        </div>
                        <div style={{ position: 'absolute', right: '0', top: '30px', textAlign: 'right' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '11pt', color: '#000', marginBottom: '-5px' }}>AM ENGENHARIA</div>
                            <div style={{ fontSize: '9pt', color: '#666', letterSpacing: '2px' }}>GROUP</div>
                            <div style={{ position: 'absolute', right: '-15px', top: '-15px', fontSize: '40pt', color: '#000', fontWeight: 'bold' }}>▲</div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#facc15', color: '#000', fontWeight: 'bold', padding: '3px 10px', textAlign: 'center', border: '1px solid #000', fontSize: '9pt', marginBottom: '2px' }}>
                        CRONOGRAMA DE AÇÕES PREVENTIVAS E CORRETIVAS
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#facc15' }}>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '25px' }}>Nº</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px' }}>Descrição</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '100px' }}>Prazo</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '85px' }}>Status</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '90px' }}>Responsável</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '120px' }}>Evidências de conclusão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { n: 1, d: 'Apresentar PGR', p: '', s: 'Concluido', r: 'TST', e: '-' },
                                { n: 2, d: 'Disponibilização de EPI', p: '', s: 'Em andamento', r: 'TST', e: 'Fichas de Entrega de EPI' },
                                { n: 3, d: 'Agentes Quantitativos avaliados', p: '', s: 'Concluido', r: 'Engenharia', e: '-' },
                                { n: 4, d: 'Treinamento NR 1 - Regras Gerais', p: 'Na contratação', s: 'Concluido', r: 'TST', e: 'Integração' },
                                { n: 5, d: 'Treinamento - Direção Defensiva', p: 'Conforme Cronograma', s: 'A concluir', r: 'TST', e: 'Certificado' },
                                { n: 6, d: 'Treinamento NR 6 - EPI', p: 'Na contratação', s: 'Concluido', r: 'TST', e: 'Integração / Certificado' },
                                { n: 7, d: 'Treinamento NR 10', p: 'Conforme Cronograma', s: 'Concluido', r: 'Antonio Gomes', e: 'Cronograma / Certificado' },
                                { n: 8, d: 'Treinamento NR 11', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 9, d: 'Treinamento NR 12', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 10, d: 'Treinamento NR 13', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 11, d: 'Treinamento NR 17', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 12, d: 'Treinamento NR 20', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 13, d: 'Treinamento NR 26', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 14, d: 'Treinamento NR 33', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 15, d: 'Treinamento NR 35', p: 'Conforme Cronograma', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Certificado' },
                                { n: 16, d: 'Renovação dos ASO', p: 'dez/24', s: 'A concluir', r: 'Diego Dalla Costa', e: 'Documento' }
                            ].map((row, idx) => (
                                <tr key={idx}>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px', textAlign: 'center' }}>{row.n}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.d}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.p}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.s}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.r}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px', textAlign: 'center' }}>{row.e}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000', marginTop: '15px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#c2410c' }}>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '80px' }}>Risco</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px' }}>Ação Proposta</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '100px' }}>Responsável</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '60px' }}>Prazo</th>
                                <th style={{ border: '1px solid #000', fontSize: '8pt', padding: '3px', width: '80px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { r: 'Ruído', a: 'Implementar protetores auriculares e realizar monitoramento regular dos níveis de ruído', res: 'Segurança do Trabalho', p: 'Imediato', s: 'Em andamento' },
                                { r: 'Calor', a: 'Implementar pausas e disponibilizar hidratação adequada', res: 'Segurança do Trabalho', p: 'Imediato', s: 'Em andamento' },
                                { r: 'Ergonomia', a: 'Treinamento sobre posturas corretas e ajustes de mobiliário para orientação', res: 'Segurança do Trabalho', p: 'Frequente', s: 'Em andamento' },
                                { r: 'Acidente Veicular', a: 'Campanhas de conscientização e treinamentos de direção defensiva', res: 'Segurança do Trabalho', p: 'cada 1 ano', s: 'Em andamento' },
                                { r: 'Prod. Químicos/Gases e Poeiras', a: 'Treinamento para utilização dos EPIs e análise das FDSs (FISPQ) para orientação', res: 'Segurança do Trabalho', p: 'Frequente', s: 'Em andamento' },
                                { r: 'Radiação Não Ionizante', a: 'Treinamento e sinalização em áreas de risco', res: 'Segurança do Trabalho', p: 'Imediato', s: 'Não iniciado' },
                                { r: 'Eletricidade', a: 'Treinamento e sinalização em áreas de risco', res: 'Engenharia de Seg.', p: 'Imediato', s: 'Em andamento' },
                                { r: 'Trabalho em Altura', a: 'Capacitação em técnicas de trabalho em altura e uso de EPIs', res: 'Segurança do Trabalho', p: 'Imediato', s: 'Não iniciado' }
                            ].map((row, idx) => (
                                <tr key={idx}>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px', fontWeight: 'bold' }}>{row.r}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.a}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.res}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.p}</td>
                                    <td style={{ border: '1px solid #000', fontSize: '7.5pt', padding: '2px' }}>{row.s}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ textAlign: 'right', fontSize: '7pt', marginTop: '5px', color: '#666' }}>Página 17</div>
                </div>
            </div>


            {/* --- PAGINA 18: DISPOSIÇÕES GERAIS (PARTE 1) --- */}
            <PagePage pageNum="18">
                <h3 style={styles.pageTitleAlt}>10. DISPOSIÇÕES GERAIS</h3>
                <p style={styles.pDense}>
                    A legislação brasileira define direitos e deveres, tanto de empregados como das empresas. A Lei 6.514, de 22 de dezembro de 1977, da Consolidação da Leis do Trabalho.
                </p>
                <p style={styles.pDense}>
                    O Artigo 157 refere-se a competência das empresa e o artigo 158 discorre sobre a competência dos empregados, onde diz que, é facultado a empresa punir o trabalhador, dentro dos critérios legais, quando caracterizada a “recusa injustificada… à observância das instruções expedidas pelo empregado” no que tange as “precauções a tomar no sentido de evitar acidentes do trabalho ou doenças ocupacionais.”
                </p>
                <p style={styles.pDense}>
                    Quando a empresa não cobra de seus empregados as suas responsabilidades, é cobrada pela legislação por ter sido omissa, quando não negligente.
                </p>
                <p style={styles.pDense}>
                    Conforme a lei, no que diz respeito a direitos e deveres a NR1 - Norma Regulamentadora n.º 1 estabelece obrigações de empregadores e de empregados, conforme ilustrado abaixo:
                </p>

                <div style={{ marginTop: '15px', paddingLeft: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10pt', marginBottom: '5px' }}>• Cabe ao empregador</div>
                    <p style={{ ...styles.pDense, marginBottom: '5px' }}>a) Cumprir e fazer cumprir as disposições legais e regulamentares sobre segurança e medicina do trabalho;</p>
                    <p style={{ ...styles.pDense, marginBottom: '5px' }}>b) Elaborar ordens de serviço sobre segurança e medicina do trabalho, dando ciência aos empregados, com os seguintes objetivos:</p>
                    <div style={{ paddingLeft: '20px' }}>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>I - Prevenir atos inseguros no desempenho do trabalho;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>II - Divulgar as obrigações e proibições que os empregados devem conhecer e cumprir; III - Dar conhecimento aos empregados de que serão passíveis de punição, pelo descumprimento das ordens de serviço expedidas;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>IV - Determinar os procedimentos que deverão ser adotados em caso de acidente do trabalho e doenças profissionais ou do trabalho;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>V - Adotar medidas determinadas pelo Ministério do Trabalho – MTB..</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>VI - Adotar medidas para eliminar ou neutralizar a insalubridade e as condições inseguras de trabalho;</p>
                    </div>
                </div>
            </PagePage>

            {/* --- PAGINA 19: DISPOSIÇÕES GERAIS (PARTE 2) --- */}
            <PagePage pageNum="19">
                <h3 style={styles.pageTitleAlt}>10. DISPOSIÇÕES GERAIS (Continuação)</h3>
                <div style={{ paddingLeft: '30px', marginTop: '10px' }}>
                    <p style={{ ...styles.pDense, marginBottom: '5px' }}>c) Informar aos trabalhadores:</p>
                    <div style={{ paddingLeft: '20px' }}>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>I – Os riscos profissionais que possam originar-se nos locais trabalho;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>II – Os meios para prevenir e limitar tais riscos e as medidas adotadas pela empresa;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>III – Os resultados dos exames médicos e de exames complementares de diagnóstico aos quais os próprios trabalhadores foram submetidos;</p>
                        <p style={{ ...styles.pDense, fontSize: '9pt', marginBottom: '3px' }}>IV – Os resultados das avaliações ambientais realizadas nos locais de trabalho.</p>
                    </div>
                    <p style={{ ...styles.pDense, marginTop: '5px' }}>d) Permitir que representantes dos trabalhadores acompanhem a fiscalização dos preceitos legais e regulamentares sobre segurança e medicina do trabalho;</p>
                </div>

                <div style={{ marginTop: '20px', paddingLeft: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '10pt', marginBottom: '5px' }}>• Cabe ao empregado</div>
                    <div style={{ paddingLeft: '10px' }}>
                        <p style={{ ...styles.pDense, marginBottom: '5px' }}>a) Cumprir as disposições legais e regulamentares sobre segurança e medicina do trabalho, inclusive as ordens de serviço expedidas pelo empregador;</p>
                        <p style={{ ...styles.pDense, marginBottom: '5px' }}>b) Usar o Equipamento de Proteção Individual – EPI fornecido pelo empregador;</p>
                        <p style={{ ...styles.pDense, marginBottom: '5px' }}>c) Submeter-ese aos exames médicos previstos nas Normas Regulamentadoras – NR;</p>
                        <p style={{ ...styles.pDense, marginBottom: '5px' }}>d) Colaborar com a empresa na aplicação das Normas Regulamentadoras;</p>
                    </div>
                </div>

                <div style={{ marginTop: '60px', borderTop: '1px solid #000', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '45%', textAlign: 'center' }}>
                            <div style={{ height: '60px' }}></div>
                            <div style={{ borderTop: '1px solid #000', fontSize: '9pt', fontWeight: 'bold', paddingTop: '5px' }}>{companyData.name}</div>
                            <div style={{ fontSize: '8pt' }}>Responsável Legal / Empregador</div>
                        </div>
                        <div style={{ width: '45%', textAlign: 'center' }}>
                            <div style={{ height: '60px' }}></div>
                            <div style={{ borderTop: '1px solid #000', fontSize: '9pt', fontWeight: 'bold', paddingTop: '5px' }}>Diego Dalla Costa</div>
                            <div style={{ fontSize: '8pt' }}>Resp. Técnico | CREA-SP 5069508472</div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '30px', textAlign: 'center' }}>
                    <p style={{ fontSize: '8pt', fontStyle: 'italic', color: '#666' }}>Documento oficial da AM Engenharia Group - Gerado via Sistema de Gestão Ocupacional.</p>
                </div>
            </PagePage>

            {/* --- PAGINA 20: CONSIDERAÇÕES FINAIS --- */}
            <PagePage pageNum="20">
                <h3 style={styles.pageTitleAlt}>11. CONSIDERAÇÕES FINAIS</h3>
                <p style={{ ...styles.pDense, marginTop: '20px' }}>
                    O presente Programa de Gerenciamento de Riscos (PGR) apresenta as medidas que devem ser tomadas pela empresa com relação à prevenção de acidentes do trabalho e melhoria das condições ambientais.
                </p>
                <p style={styles.pDense}>
                    Salientamos que as orientações contidas neste documento devem ser seguidas fielmente, visando a segurança dos colaboradores e o cumprimento da legislação vigente. A eficácia deste programa depende diretamente do comprometimento da direção da empresa e da participação ativa de todos os trabalhadores.
                </p>

                <div style={{ border: '2px solid #000', padding: '15px', margin: '30px 0', width: '100%', backgroundColor: '#f9f9f9' }}>
                    <div style={{ fontSize: '11pt', fontWeight: 'bold', textAlign: 'center' }}>
                        VALIDADE DO PGR: {data.expiry_date || '13/02/2028'} (Revisão a cada 2 anos conforme NR-01)
                    </div>
                </div>

                <p style={{ ...styles.pDense, margin: '40px 0', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold' }}>
                    Este documento possui {16 + (data.sectors?.length || 0)} (dezesseis) páginas enumeradas e timbradas.
                </p>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ ...styles.pDense, fontSize: '9pt' }}>
                        {companyData.city || 'Piracicaba'} - SP, {data.date || new Date().toLocaleDateString('pt-BR')}
                    </p>
                </div>

                <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{ height: '50px', backgroundImage: 'url("/sig-placeholder.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                        <div style={{ borderTop: '1.5px solid #000', width: '300px', margin: '0 auto', paddingTop: '5px' }}>
                            <div style={{ fontSize: '10pt', fontWeight: 'bold' }}>DIEGO DALLA COSTA</div>
                            <div style={{ fontSize: '9pt' }}>Engenheiro Mecânico e de Segurança do Trabalho</div>
                            <div style={{ fontSize: '9pt' }}>CREA-SP 5069508472</div>
                        </div>
                    </div>

                    <div style={{ margin: '20px 0', textAlign: 'center' }}>
                        <div style={{ fontSize: '8pt', color: '#555', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
                            <div style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '10pt', marginBottom: '2px' }}>ASSINADO DIGITALMENTE POR:</div>
                            <div style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '11pt' }}>DIEGO DALLA COSTA:36711775864</div>
                            <div style={{ fontSize: '7.5pt', marginTop: '5px', color: '#333' }}>Data de Emissão: {new Date().toLocaleDateString('pt-BR')} {new Date().toLocaleTimeString('pt-BR')}</div>
                            <div style={{ fontSize: '7pt', color: '#666' }}>Certificado ICP-Brasil</div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <div style={{ borderTop: '1px solid #000', width: '300px', margin: '0 auto', paddingTop: '5px' }}>
                            <div style={{ fontSize: '10pt', fontWeight: 'bold' }}>{safeUpper(companyData.name)}</div>
                            <div style={{ fontSize: '9pt' }}>Responsável Legal / Empregador</div>
                        </div>
                    </div>
                </div>
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
        minHeight: '297mm',
        padding: '15mm 20mm', // Margens mais profissionais
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    pageBody: {
        flex: 1,
        zIndex: 2,
        position: 'relative'
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
        height: '35mm', // Altura fixa para reservar espaço para os elementos visuais
        position: 'relative',
        marginBottom: '5mm'
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
        fontSize: '90pt',
        fontWeight: '900',
        color: '#facc15',
        margin: '20px 0 0 0',
        letterSpacing: '-5px',
        lineHeight: '0.8'
    },
    coverSubtitle: {
        fontSize: '22pt',
        fontWeight: 'bold',
        color: '#000',
        marginTop: '0',
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
        fontSize: '26pt',
        fontWeight: '900',
        color: '#000',
        letterSpacing: '1px'
    },
    logoTextGroup: {
        fontSize: '18pt',
        color: '#666',
        letterSpacing: '5px',
        marginTop: '-5px'
    },
    coverClientInfo: {
        marginTop: '60px',
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        width: '100%'
    },
    coverClientName: {
        fontSize: '20pt',
        fontWeight: 'bold',
        margin: '10px 0',
        color: '#333'
    },
    coverValidity: {
        fontSize: '12pt',
        fontWeight: '500',
        margin: '2px 0',
        color: '#666'
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
        fontSize: '10.5pt',
        lineHeight: '1.5',
        textAlign: 'justify',
        marginTop: '20px'
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
        fontSize: '11pt',
        fontWeight: 'bold',
        padding: '5px 0',
        margin: '40px 0 20px 0',
        borderBottom: '2px solid #facc15'
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
        fontSize: '10.5pt',
        lineHeight: '1.5',
        textAlign: 'justify',
        marginTop: '10px',
        marginBottom: '10px'
    },
    pSmall: {
        fontSize: '8pt',
        lineHeight: '1.4',
        color: '#666'
    },
    pQuote: {
        fontSize: '9pt',
        fontStyle: 'italic',
        lineHeight: '1.4',
        borderLeft: '3px solid #facc15',
        paddingLeft: '15px',
        margin: '15px 0',
        color: '#555'
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
        padding: '4px',
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
        padding: '5px',
        fontSize: '9.5pt',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '180px' // Largura fixa para evitar overlap
    },
    tdMatrixHeader: {
        border: '1px solid #000',
        padding: '6px',
        fontSize: '9pt',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#eee'
    },
    tdMatrixSub: {
        border: '1px solid #000',
        padding: '4px',
        fontSize: '8pt',
        textAlign: 'center'
    },
    tdMatrixSubGrey: {
        border: '1px solid #000',
        padding: '4px',
        fontSize: '8pt',
        textAlign: 'center',
        backgroundColor: '#eee'
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
        fontSize: '8.5pt',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '25px', // Estrito conforme imagem
        padding: '2px'
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
        fontSize: '10.5pt',
        lineHeight: '1.5',
        backgroundColor: '#fff9e6',
        padding: '10px',
        border: '1px solid #facc15',
        marginTop: '15px'
    },
    pSmallQuote: {
        fontSize: '8.5pt',
        fontStyle: 'italic',
        lineHeight: '1.5',
        margin: '10px 0',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderLeft: '4px solid #facc15'
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
        width: '150px' // Largura garantida
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
    },
    inventoryFullTable: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px'
    },
    tdInvHead: {
        border: '1px solid #000',
        backgroundColor: '#000',
        color: '#fff',
        padding: '4px',
        fontSize: '7pt',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    tdInvCell: {
        border: '1px solid #000',
        padding: '4px',
        fontSize: '7pt',
        textAlign: 'center'
    },
    controlSubHead: {
        backgroundColor: '#ddd',
        padding: '5px',
        fontSize: '8pt',
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottom: '1px solid #000'
    },
    controlContent: {
        padding: '8px',
        fontSize: '8pt',
        textAlign: 'justify'
    },
    footer: {
        position: 'absolute',
        bottom: '8mm',
        left: '20mm',
        right: '20mm',
        borderTop: '1px solid #eee',
        paddingTop: '8px',
        textAlign: 'center',
        zIndex: 5
    },
    footerContact: {
        fontSize: '6.5pt',
        color: '#888',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '2px',
        textTransform: 'uppercase'
    },
    footerWeb: {
        fontSize: '8pt',
        fontWeight: '900',
        color: '#333',
        letterSpacing: '2px'
    }
};

export default PGRTemplate;

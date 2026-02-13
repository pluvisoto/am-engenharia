import React from 'react';

const PCMSOTemplate = ({ companyData, data }) => {
    const safeUpper = (str) => str ? str.toString().toUpperCase() : '';
    const sectors = data?.sectors || [];
    const roles = data?.roles || [];
    const riskInventory = data?.risk_inventory || [];

    const getExamsForRole = (roleRisks) => {
        const exams = [
            { name: 'CLÍNICO (ANAMNESE GERAL E OCUPACIONAL)', periodic: 'ANUAL', adm: 'SIM', dem: 'SIM', ret: 'SIM', mud: 'SIM' }
        ];
        const rStr = roleRisks.map(r => safeUpper(r.hazard)).join(' ');
        if (rStr.includes('RUÍDO') || rStr.includes('RUIDO')) exams.push({ name: 'AUDIOMETRIA OCUPACIONAL', periodic: 'ANUAL', adm: 'SIM', dem: 'SIM', ret: 'NÃO', mud: 'SIM' });
        if (rStr.includes('ALTURA') || rStr.includes('CONFINADO') || rStr.includes('ELÉTRIC') || rStr.includes('ELETRIC') || rStr.includes('VEÍCULO')) {
            exams.push({ name: 'AVALIAÇÃO PSICOSSOCIAL', periodic: 'ANUAL', adm: 'SIM', dem: 'NÃO', ret: 'NÃO', mud: 'SIM' });
            exams.push({ name: 'ELETROCARDIOGRAMA (ECG)', periodic: 'ANUAL', adm: 'SIM', dem: 'NÃO', ret: 'NÃO', mud: 'SIM' });
            exams.push({ name: 'HEMOGRAMA COMPLETO', periodic: 'ANUAL', adm: 'SIM', dem: 'NÃO', ret: 'NÃO', mud: 'SIM' });
        }
        return exams;
    };

    const styles = {
        container: { fontFamily: 'Arial, sans-serif', color: '#000', width: '210mm', backgroundColor: '#fff', margin: '0 auto' },
        page: { width: '210mm', minHeight: '296.5mm', padding: '15mm 20mm', position: 'relative', backgroundColor: 'white', boxSizing: 'border-box', pageBreakAfter: 'always', display: 'block' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '5px' },
        footer: { position: 'absolute', bottom: '5mm', left: '0', right: '0', fontSize: '7pt', color: '#003366', textAlign: 'center', borderTop: 'none' },
        footerText: { color: '#0033a0', fontSize: '7.5pt' },
        logoW: { color: '#e11f26', fontWeight: '900', fontSize: '32pt' },
        logoV: { color: '#1a3668', fontSize: '12pt', fontWeight: 'bold' },
        h1Capa: { fontSize: '72pt', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.1' }
    };

    const PageHeader = ({ pageNum }) => (
        <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ color: '#e11f26', fontWeight: 'bold', fontSize: '24pt' }}>W&DVidas</div>
                <div style={{ color: '#1a3668', fontSize: '8pt', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '5px' }}>Clínica Médica</div>
            </div>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '8pt', color: '#666' }}>{pageNum}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
                    <div style={{ backgroundColor: '#000', color: '#fff', padding: '2px 10px', fontSize: '8pt', transform: 'skew(-15deg)' }}>AM ENGENHARIA<br /><span style={{ fontSize: '6pt' }}>GROUP</span></div>
                </div>
            </div>
        </div>
    );

    const PageFooter = () => (
        <div style={styles.footer}>
            <div style={styles.footerText}>
                W&D Vida Clínica Médica - Rua: Dr. Jose Pinto de Moura, 235 Novo Botafogo – Campinas/SP Tel. (19)-2519.1890 – (19)2519.1891 <span style={{ textDecoration: 'underline' }}>www.wdvidas.com.br</span>
            </div>
        </div>
    );

    return (
        <div id="pcmso-document-template" style={styles.container}>
            {/* ETAPA 1: PÁGINA 1 - CAPA (LITERAL) */}
            <div style={styles.page}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ color: '#e11f26', fontWeight: 'bold', fontSize: '36pt' }}>W&DVidas</div>
                        <div style={{ color: '#1a3668', fontSize: '10pt', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '10px' }}>Clínica Médica</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '10pt', color: '#666' }}>1</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <div style={{ backgroundColor: '#000', color: '#fff', padding: '5px 15px', fontSize: '10pt', fontWeight: 'bold' }}>AM ENGENHARIA<br /><span style={{ fontSize: '8pt', fontWeight: 'normal' }}>GROUP</span></div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <div style={{ fontSize: '80pt', fontWeight: 'bold', color: '#1a3668', letterSpacing: '-2px' }}>
                        <span style={{ color: '#e11f26' }}>P</span>rograma de
                    </div>
                    <div style={{ fontSize: '80pt', fontWeight: 'bold', color: '#1a3668', letterSpacing: '-2px' }}>
                        <span style={{ color: '#e11f26' }}>C</span>ontrole
                    </div>
                    <div style={{ fontSize: '80pt', fontWeight: 'bold', color: '#1a3668', letterSpacing: '-2px' }}>
                        <span style={{ color: '#e11f26' }}>M</span>édico de
                    </div>
                    <div style={{ fontSize: '80pt', fontWeight: 'bold', color: '#1a3668', letterSpacing: '-2px' }}>
                        <span style={{ color: '#e11f26' }}>S</span>aúde
                    </div>
                    <div style={{ fontSize: '80pt', fontWeight: 'bold', color: '#1a3668', letterSpacing: '-2px' }}>
                        <span style={{ color: '#e11f26' }}>O</span>cupacional
                    </div>
                </div>

                <div style={{ marginTop: '50px', textAlign: 'center', fontSize: '24pt', fontWeight: 'bold', color: '#1a3668' }}>
                    NR-07
                </div>

                <div style={{ position: 'absolute', bottom: '30mm', left: '20mm', right: '20mm' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #000' }}>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#f2f2f2', width: '20%', fontWeight: 'bold', fontSize: '10pt' }}>EMPRESA</td>
                                <td style={{ border: '1px solid #000', padding: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '11pt' }}>{safeUpper(companyData?.name)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 1: PÁGINA 2 - SUMÁRIO (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={2} />
                <div style={{ textAlign: 'center', margin: '40px 0' }}>
                    <h1 style={{ fontSize: '28pt', fontWeight: 'bold', color: '#1a3668', textDecoration: 'underline' }}>SUMÁRIO</h1>
                </div>

                <div style={{ fontSize: '11pt', lineHeight: '2.4', color: '#000' }}>
                    <div style={{ fontWeight: 'bold' }}>PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL CADASTRO DE IDENTIFICAÇÃO</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>MÉDICA MÉDICO DO TRABALHO RESPONSÁVEL PELO PCMSO ...................................................... 6</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>TERMO DE INDICAÇÃO PARA REALIZAÇÃO DE EXAMES DE APTIDÃO FISICA E MENTAL ....... 6</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>OBJETIVO ........................................................................................................................................................ 7</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>DIRETRIZES ..................................................................................................................................................... 7</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>RESPONSABILIDADES ............................................................................................................................... 7</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>LISTA DE MÉDICOS EXAMINADORES ...................................................................................................... 8</span>
                    </div>
                    <div style={{ fontWeight: 'bold' }}>ATIVIDADES DO PROGRAMA DE CONTROLE MÉDICO DE SAUDE OCUPACIONAL EXAMES</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>MÉDICOS OCUPACIONAIS ............................................................................................................................ 9</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                        <span>Exame Médico Admissional .......................................................................................................................... 9</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                        <span>Exames Médicos Periódicos ....................................................................................................................... 9</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                        <span>Exame Médico de Retorno ao Trabalho ................................................................................................... 9</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '20px' }}>
                        <span>Exame Médico Demissional ........................................................................................................................ 9</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>HOSPITAIS PARA ATENDIMENTO DE EMERGÊNCIA .......................................................................... 19</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>PLANEJAMENTO DE AÇÕES DE SAÚDE ................................................................................................... 21</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>IMUNIZAÇÃO ..................................................................................................................................................... 24</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>CONSIDERAÇÕES FINAIS ............................................................................................................................ 28</span>
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 2: PÁGINA 3 - IDENTIFICAÇÃO (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={3} />
                <div style={{ backgroundColor: '#cccccc', padding: '5px', textAlign: 'center', fontWeight: 'bold', fontSize: '10pt', border: '1px solid #000' }}>
                    IDENTIFICAÇÃO DA EMPRESA ONDE OCORRERÁ A ATIVIDADE
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px', width: '25%' }}><b>Empresa</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>{safeUpper(companyData?.name)}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Endereço</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px', width: '40%' }}>{safeUpper(companyData?.address)}</td>
                            <td style={{ border: '1px solid #000', padding: '4px', width: '10%' }}><b>CEP</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>{companyData?.zip_code}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Bairro</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>{safeUpper(companyData?.neighborhood)}</td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Cidade</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>{safeUpper(companyData?.city)}/{companyData?.state}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>CNPJ</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>{companyData?.cnpj}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cccccc' }}>
                            <td colSpan="4" style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}><b>ASPECTOS PROFISSIOGRÁFICOS</b></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Grau de Risco</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>{companyData?.risk_level || '03'}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cccccc' }}>
                            <td colSpan="4" style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}><b>IDENTIFICAÇÃO DA EMPRESA CONTRATADA OU SUBCONTRATADA</b></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Empresa</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>A.M ENGENHARIA INSPECOES LTDA</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Endereço</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>Rua Saldanha Marinho 1831</td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>CEP</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>13416-257</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Bairro</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>Alemães</td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Cidade</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>Piracicaba/SP</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>CNPJ</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>55.603.277/0001-09</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cccccc' }}>
                            <td colSpan="4" style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}><b>ASPECTOS PROFISSIOGRÁFICOS</b></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>CNAE</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>71.19-7-04</td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Grau de Risco</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>01</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Ramo de Atividade</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>Serviços de perícia técnica relacionados à segurança do trabalho</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Total de Funcionários</b></td>
                            <td style={{ border: '1px solid #000', padding: '4px' }}>{companyData?.employee_count || '08'}</td>
                            <td colSpan="2" style={{ border: '1px solid #000', padding: '4px' }}></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Implantação</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>11 de Novembro de 2025</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #000', padding: '4px' }}><b>Próxima Revisão</b></td>
                            <td colSpan="3" style={{ border: '1px solid #000', padding: '4px' }}>11 de Novembro de 2026</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <div style={{ fontSize: '100pt', fontWeight: 'bold', color: '#000', transform: 'scaleY(1.2)' }}>
                        A
                    </div>
                    <div style={{ fontSize: '24pt', fontWeight: 'bold', letterSpacing: '2px', marginTop: '-30px' }}>
                        AM ENGENHARIA
                    </div>
                    <div style={{ fontSize: '18pt', fontWeight: 'bold', letterSpacing: '4px' }}>
                        GROUP
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 3: PÁGINA 4 - REFERÊNCIAS TÉCNICAS E LEGAIS (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={4} />
                <div style={{ margin: '30px 0' }}>
                    <h2 style={{ fontSize: '16pt', fontWeight: 'bold', borderBottom: 'none' }}>REFERÊNCIAS TÉCNICAS E LEGAIS</h2>
                </div>
                <div style={{ fontSize: '10.5pt', lineHeight: '1.8', textAlign: 'justify' }}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '15px' }}>Portaria nº 34, de 20 de dezembro de 2001, do MTE.</li>
                        <li style={{ marginBottom: '15px' }}>Decreto Nº 6.856, de 25 de maio de 2009 – Regulamenta o art. 206-A da Lei nº 8.112, de 11 de dezembro de 1990 – Regime Jurídico Único, dispondo sobre os exames médicos periódicos de servidores.</li>
                        <li style={{ marginBottom: '15px' }}>Recomendação ANAMT Nº 01/2017 - Dispõe sobre a Comunicação de Acidente de Trabalho conforme o disposto na Lei no 8.213/1991 e sobre a Notificação Compulsória em Unidades Sentinelas conforme Portarias MS 204 e 205 de fevereiro de 2016.</li>
                        <li style={{ marginBottom: '15px' }}>Portaria nº 783, de 7 de abril de 2011 – Estabelece a obrigatoriedade da utilização do módulo de Exames Médicos Periódicos do SIAPE-Saúde aos órgãos e entidades do Sistema de Pessoal Civil da Administração Federal - SIPEC.</li>
                        <li style={{ marginBottom: '15px' }}>Portaria nº 24, de 29 de dezembro de 1994, do Ministério do Trabalho e Emprego – Programa de Controle Médico de Saúde Ocupacional.</li>
                        <li style={{ marginBottom: '15px' }}>Convenção Nº 161 da OIT – Serviços de Saúde no Trabalho. Ratificada pelo Governo Brasileiro em 18/05/1990.</li>
                        <li style={{ marginBottom: '15px' }}>Portaria nº 3.214, de 08 de junho de 1978 – Aprova as Normas Regulamentadoras – NR – do Capítulo V do Título II, da Consolidação das Leis do Trabalho, relativas à Segurança e Medicina do Trabalho, e suas subsequentes modificações.</li>
                        <li style={{ marginBottom: '15px' }}>Portaria Normativa Nº 4, de 15 de setembro de 2009 – Estabelece orientações para aplicação do Decreto nº 6.856, de 25 de maio de 2009, que dispõe sobre os exames médicos periódicos dos servidores dos órgãos e entidades do Sistema de Pessoal Civil da Administração Federal - SIPEC.</li>
                        <li style={{ marginBottom: '15px' }}>Lei nº 6.514, de 22 de dezembro de 1977 – Altera o Capítulo V do Título II da Consolidação das Leis do Trabalho, relativo à Segurança e Medicina do Trabalho.</li>
                        <li style={{ marginBottom: '15px' }}>Portaria nº 8, da SSST/MTE, de 08 de maio de 1996, republicada em 13 de maio de 1994, estabelece a obrigatoriedade por parte das empresas, da elaboração e implementação do</li>
                    </ul>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 3: PÁGINA 5 - CONTINUAÇÃO REFERÊNCIAS */}
            <div style={styles.page}>
                <PageHeader pageNum={5} />
                <div style={{ fontSize: '10.5pt', lineHeight: '1.8', textAlign: 'justify', marginTop: '30px' }}>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '15px' }}>Programa de Controle Médico de Saúde Ocupacional (PCMSO) – NR 7 e Portaria Nº 6.734, de 09 de março de 2020, que aprova a nova redação da Norma Regulamentadora nº 07 – Programa de Controle Médico de Saúde Ocupacional – PCMSO.</li>
                        <li style={{ marginBottom: '15px' }}>Decreto 3298/99 - Regulamenta a Lei no 7.853, de 24 de outubro de 1989, dispõe sobre a Política Nacional para Integração da Pessoa Portadora de Deficiência, consolida as normas de proteção, e dá outras providências.</li>
                        <li style={{ marginBottom: '15px' }}>Resolução Nº 171 da OIT – Programa de Vigilância do Ambiente de Trabalho e à Saúde dos Trabalhadores.</li>
                    </ul>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 4: PÁGINA 6 - CADASTRO MÉDICO E TERMO DE INDICAÇÃO (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={6} />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL</div>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>CADASTRO DE IDENTIFICAÇÃO MÉDICA</div>
                    <div style={{ fontSize: '12pt', fontWeight: 'bold', marginBottom: '30px' }}>MÉDICO DO TRABALHO RESPONSÁVEL PELO PCMSO</div>
                </div>

                <div style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '15px 0', fontSize: '10.5pt', lineHeight: '2' }}>
                    <div><b>NOME:</b> Dra. Ivonne Sanchez Sastre</div>
                    <div><b>ENDEREÇO:</b> Rua Dr. José Pinto de Moura, 235</div>
                    <div><b>BAIRRO:</b> Novo Botafogo</div>
                    <div><b>CEP:</b> 13.070-210 <b>CIDADE:</b> Campinas <b>ESTADO:</b> SP</div>
                    <div><b>TELEFONE:</b> (19) 2519.1890</div>
                    <div><b>E-MAIL:</b> ivone.sanchez@wdvidas.com.br</div>
                    <div><b>CRM/SP:</b> 128.501 <b>RQE nº</b>50944</div>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ fontSize: '12.5pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                        TERMO DE INDICAÇÃO PARA REALIZAÇÃO DE EXAMES DE APTIDÃO FISICA E MENTAL
                    </h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6' }}>
                        Por este termo de conformidade com o item 7.3.2 letra (a) da Nr 7 Programa de Controle Médico de Saúde Ocupacional e ainda como Médico do Trabalho responsável pela Empresa identificada no Cadastro em Anexo, indico o profissional Médico cujo carimbo e assinatura encontram-se estampados e rubricados nos Atestados de Saúde Ocupacional e Prontuários Clínicos Individuais. Encarrego ainda, de conformidade com item 7.3.2 letra b a Empresa prestadora de Serviço, razão social WD.
                    </p>
                </div>

                <div style={{ marginTop: '60px', marginLeft: 'auto', width: '300px' }}>
                    <div style={{ fontSize: '9pt', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>IVONNE SANCHEZ SASTRE:21570613800</span>
                        </div>
                        <div style={{ fontSize: '7pt', color: '#666', marginTop: '5px' }}>
                            Assinado de forma digital por IVONNE SANCHEZ SASTRE: 21570613800 Dados: 2025.11.11 11:46:05-03'00'
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '10pt', fontWeight: 'bold' }}>
                        Dra. Ivonne Sanchez Sastre<br />
                        CRM: 128.501 MTB 50.944<br />
                        Medica do Trabalho
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 5: PÁGINA 7 - OBJETIVOS, DIRETRIZES E RESPONSABILIDADES (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={7} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '15px' }}>OBJETIVO</h2>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6' }}>
                        O Programa de Controle Médico de Saúde Ocupacional (PCMSO) visa promover, prevenir e preservar a saúde dos colaboradores da AM Engenharia em serviço eventual em outras empresas e no local, considerando os riscos presentes no ambiente de trabalho e as doenças ocupacionais ou profissionais.
                    </p>

                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: 'none', marginTop: '30px', marginBottom: '15px' }}>DIRETRIZES</h2>
                    <ul style={{ paddingLeft: '20px', fontSize: '10.5pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <li style={{ marginBottom: '12px' }}>O PCMSO enfoca tanto as questões individuais quanto coletivas dos colaboradores, com ênfase na abordagem clínico-epidemiológica para analisar a relação entre saúde e trabalho.</li>
                        <li style={{ marginBottom: '12px' }}>O programa tem a finalidade de prevenir, rastrear e diagnosticar precocemente agravos à saúde relacionados ao trabalho, incluindo condições subclínicas, e identificar casos de doenças profissionais ou danos irreversíveis à saúde dos servidores.</li>
                        <li style={{ marginBottom: '12px' }}>O planejamento e a implantação do PCMSO baseiam-se na análise dos riscos à saúde identificados nas avaliações realizadas conforme as demais Normas Regulamentadoras (NR).</li>
                        <li style={{ marginBottom: '12px' }}>Os dados obtidos nos Exames Médicos Periódicos serão utilizados para vigilância epidemiológica coletiva e para a melhoria dos processos e ambientes de trabalho.</li>
                    </ul>

                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: 'none', marginTop: '30px', marginBottom: '15px' }}>RESPONSABILIDADES</h2>
                    <p style={{ fontSize: '10.5pt', fontWeight: 'bold', marginBottom: '15px' }}>A AM Engenharia compete:</p>
                    <ul style={{ paddingLeft: '20px', fontSize: '10.5pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <li style={{ marginBottom: '12px' }}>Garantir a elaboração e a implementação eficaz do PCMSO, assegurando sua eficácia.</li>
                        <li style={{ marginBottom: '12px' }}>Custear todos os procedimentos relacionados ao PCMSO sem custos para o servidor.</li>
                        <li style={{ marginBottom: '12px' }}>Designar um coordenador, dentre os médicos do trabalho da Divisão de Atenção em Saúde e Segurança do Servidor (DAS), para a execução do PCMSO.</li>
                    </ul>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 5/6: PÁGINA 8 - CONTINUAÇÃO RESPONSABILIDADES E LISTA DE MÉDICOS (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={8} />
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontSize: '10.5pt', fontWeight: 'bold', marginBottom: '15px' }}>Ao médico coordenador do PCMSO compete:</p>
                    <ul style={{ paddingLeft: '20px', fontSize: '10.5pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <li style={{ marginBottom: '12px' }}>Elaborar e atualizar anualmente o PCMSO, bem como preparar o Relatório Anual para apresentação e discussão em reunião da Comissão Interna de Saúde do Servidor (CISSP).</li>
                        <li style={{ marginBottom: '12px' }}>Orientar o processo administrativo para a contratação de serviços especializados de terceiros para a realização dos Exames Médicos Periódicos, incluindo exames laboratoriais conforme descrito nos itens da p</li>
                    </ul>

                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', borderBottom: 'none', marginTop: '30px', marginBottom: '15px' }}>LISTA DE MÉDICOS EXAMINADORES</h2>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        O Elaborador do documento deverá listar o Médico examinador, conforme NR 7 item 7.3.2, a fim de garantir que os mesmos estejam familiarizados com os princípios da patologia ocupacional e suas causas, bem como o ambiente e as condições de trabalho.
                    </p>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        Venho através desta, informar-lhe que os Médicos examinadores listados abaixo estão autorizados e devidamente qualificados para esta atividade.
                    </p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9pt', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#7f7f7f', color: '#fff' }}>
                                <th style={{ border: '1px solid #000', padding: '6px', width: '33%', color: '#ffff00' }}>MÉDICO</th>
                                <th style={{ border: '1px solid #000', padding: '6px', width: '33%', color: '#ffff00' }}>CRM</th>
                                <th style={{ border: '1px solid #000', padding: '6px', width: '33%', color: '#ffff00' }}>CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['Dra. Andréa Inácio', 'CRM/SP: 106623 RQEnº34.896', '213.056.648-09'],
                                ['Dra. Annie Jacquemin Cardoso', 'CRM/SP: 247483', '436.234.428-44'],
                                ['Dra. Bruna Granig Valente', 'CRM/SP: 247486', '449.639.748-00'],
                                ['Dra. Ivonne Sanchez Sastre', 'CRM/SP:128.501 MTB: 50.944', '215.706.138-00'],
                                ['Dr. José Erminio Gilbertoni', 'CRM/SP: 40972 RQE nº68.360', '188.713.999-00'],
                                ['Dra. Juliana Cordeiro Zilio', 'CRM/SP: 235649', '424.920.838-96'],
                                ['Dra. Juliana Schneider Da Silva', 'CRM/SP: 239597', '068.820.119-90'],
                                ['Dra Letícia Bertaglia', 'CRM SP 226243', '371.729.768-60'],
                                ['Dra. Maria do Perpetuo Socorro BAmoras', 'CRM SP 137997', 'RG: 534590779'],
                                ['Dra. Maria Rayane Lima de Souza', 'CRM/SP: 228875', '425.377.138-69'],
                                ['Dra. Mariana Santana Gondim', 'CRM/SP: 207225', '039.503.531-78'],
                                ['Dra. Marina Perencin Vizotto', 'CRM/SP: 228885', '424.706.198-40'],
                                ['Dra. Thamires Branco da Silva', 'CRM/SP: 187.065', '409.183.628-30'],
                                ['Dra Telma Maria Moreira', 'CRM SP 228920', '122.993.446-40'],
                                ['Dra. Vanessa Pessolato Piacenti', 'CRM/SP: 174267', '355.594.718-44']
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td style={{ border: '1px solid #000', padding: '4px' }}>{row[0]}</td>
                                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{row[1]}</td>
                                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 7: PÁGINA 9 - PROTOCOLO DE EXAMES OCUPACIONAIS (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={9} />
                <div style={{ marginTop: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>ATIVIDADES DO PROGRAMA DE CONTROLE MÉDICO DE SAUDE OCUPACIONAL</div>
                        <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>EXAMES MÉDICOS OCUPACIONAIS</div>
                    </div>

                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        Em cumprimento à Norma Regulamentadora nº 07, os trabalhadores serão submetidos aos seguintes exames médicos ocupacionais:
                    </p>

                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '10px' }}>Exame Médico Admissional</h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Deverá ser realizado antes que o trabalhador assuma suas atividades.
                    </p>

                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '10px' }}>Exames Médicos Periódicos</h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '10px' }}>
                        De acordo com NR-7 item 7.5.8.
                    </p>
                    <ul style={{ paddingLeft: '20px', fontSize: '10.5pt', lineHeight: '1.6', textAlign: 'justify' }}>
                        <li style={{ marginBottom: '8px' }}>Para trabalhadores expostos a riscos ocupacionais identificados e classificados no PGR e para portadores de doenças crônicas que aumentem a susceptibilidade a tais riscos:</li>
                        <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
                            <li style={{ marginBottom: '8px' }}>a) a cada ano ou a intervalos menores, a critério do médico responsável, ou se notificado pelo médico da organização, ou por negociação em convenção ou acordo coletivo de trabalho;</li>
                            <li style={{ marginBottom: '8px' }}>b) de acordo com a periodicidade especificada no Quadro 1, no Quadro 2 do Anexo IV desta NR;</li>
                        </ul>
                        <li style={{ marginBottom: '8px' }}>Para os demais trabalhadores, o exame médico periódico deve ser realizado a cada dois anos.</li>
                    </ul>

                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Exame Médico de Retorno ao Trabalho</h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Deverá ser realizado obrigatoriamente no primeiro dia da volta ao trabalho de trabalhador ausente por período igual ou superior a 30 (trinta) dias por motivo de doença ou acidente, de natureza ocupacional ou não, ou parto.
                    </p>

                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '10px' }}>Exames de Mudança de Riscos Ocupacionais</h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Deverá, obrigatoriamente, ser realizado antes da data da mudança, adequando-se o exame clínico aos novos riscos ocupacionais a que o trabalhador será exposto.
                    </p>

                    <h3 style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '10px' }}>Exame Médico Demissional</h3>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Deverá ser realizado em até 10 dias contados a partir do término do contrato, sendo dispensada a sua realização caso o exame médico ocupacional mais recente tenha sido realizado há menos de 135 (cento e trinta e cinco) dias, para as organizações de graus de risco 1 e 2, e há menos de 90 (noventa) dias, para as organizações de graus de risco 3 e 4.
                    </p>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 10: PÁGINA 10 - AVALIAÇÃO CLÍNICA E GRADE DE EXAMES (LITERAL/DINÂMICO) */}
            <div style={styles.page}>
                <PageHeader pageNum={10} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>AVALIAÇÃO CLÍNICA</h2>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        Será efetivada em FICHA MÉDICA ou PRONTUÁRIO padronizado, registrando-se os dados referentes ao trabalhador (identificação, antecedentes pessoais, registros ocupacionais e familiares), além do exame físico geral e/ou específico.
                    </p>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '30px' }}>
                        Cabe ao médico coordenador promover a correlação entre os achados obtidos e a presença de qualquer tipo de alteração e, proceder à conclusão sobre a APTIDÃO ou INAPTIDÃO, sempre fundamentada na função do trabalhador.
                    </p>

                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '10px' }}>GRADE EXAMES E RISCOS EXISTENTES</h2>

                    <div style={{ backgroundColor: '#a6a6a6', color: '#000', padding: '5px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #000', fontSize: '10pt', marginBottom: '10px' }}>
                        CARGOS DESCRITOS E AVALIADOS
                    </div>

                    {/* Mapeamento Dinâmico de Cargos */}
                    {roles.map((role, idx) => {
                        const roleRisks = riskInventory.filter(r => r.role === role.name);
                        const exams = getExamsForRole(roleRisks);

                        return (
                            <div key={idx} style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
                                <div style={{ border: '1px solid #000', borderBottom: 'none', backgroundColor: '#e2e2e2', padding: '2px', textAlign: 'center', fontSize: '8pt', fontWeight: 'bold' }}>
                                    SETOR: {safeUpper(role.sector)}
                                </div>
                                <div style={{ border: '1px solid #000', backgroundColor: '#e2e2e2', padding: '2px', textAlign: 'center', fontSize: '8pt', fontWeight: 'bold', marginBottom: '0' }}>
                                    FUNÇÃO: {safeUpper(role.name)}
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ border: '1px solid #000', padding: '2px', backgroundColor: '#00b050', color: '#fff', textAlign: 'center', width: '20%' }}><b>FÍSICO</b></td>
                                            <td style={{ border: '1px solid #000', padding: '2px', backgroundColor: '#ff0000', color: '#fff', textAlign: 'center', width: '20%' }}><b>QUÍMICO</b></td>
                                            <td style={{ border: '1px solid #000', padding: '2px', backgroundColor: '#7030a0', color: '#fff', textAlign: 'center', width: '20%' }}><b>BIOLÓGICO</b></td>
                                            <td style={{ border: '1px solid #000', padding: '2px', backgroundColor: '#ffff00', color: '#000', textAlign: 'center', width: '20%' }}><b>ERGONÔMICO</b></td>
                                            <td style={{ border: '1px solid #000', padding: '2px', backgroundColor: '#0070c0', color: '#fff', textAlign: 'center', width: '20%' }}><b>ACIDENTES</b></td>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid #000', padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>{roleRisks.filter(r => r.type === 'Físico').map(r => r.hazard).join(', ') || 'Ausência de Fatores de Risco'}</td>
                                            <td style={{ border: '1px solid #000', padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>{roleRisks.filter(r => r.type === 'Químico').map(r => r.hazard).join(', ') || 'Ausência de Fatores de Risco'}</td>
                                            <td style={{ border: '1px solid #000', padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>{roleRisks.filter(r => r.type === 'Biológico').map(r => r.hazard).join(', ') || 'Ausência de Fatores de Risco'}</td>
                                            <td style={{ border: '1px solid #000', padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>Vício de Postura</td>
                                            <td style={{ border: '1px solid #000', padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>{roleRisks.filter(r => r.type === 'Acidentes').map(r => r.hazard).join(', ') || 'Ausência de Fatores de Risco'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt', borderTop: 'none' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#e2e2e2' }}>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>EXAMES</th>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>ADMISSIONAL</th>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>PERIODICIDADE</th>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>RET. AO TRABALHO</th>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>MUD. DE RISCO</th>
                                            <th style={{ border: '1px solid #000', padding: '2px' }}>DEMISSIONAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exams.map((exam, ei) => (
                                            <tr key={ei}>
                                                <td style={{ border: '1px solid #000', padding: '2px' }}>{exam.name}</td>
                                                <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{exam.adm}</td>
                                                <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{exam.periodic}</td>
                                                <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{exam.ret}</td>
                                                {ei === 0 && (
                                                    <td rowSpan={exams.length} style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', width: '15%' }}>
                                                        Os exames serão realizados de acordo com a nova função.
                                                    </td>
                                                )}
                                                <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{exam.dem}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 8: PÁGINA 19 - HOSPITAIS DE EMERGÊNCIA (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={19} />
                <div style={{ marginTop: '20px', fontSize: '10.5pt', lineHeight: '1.6', textAlign: 'justify' }}>
                    <p style={{ marginBottom: '15px' }}>
                        SESMT - Serviço Especializado em Engenharia de Segurança e Medicina do Trabalho, pelo departamento ou entidade encarregado da gestão de pessoal, sob a supervisão do médico coordenador do PCMSO, dependendo da estrutura organizacional.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        Quando o funcionário não estiver na empresa devido a férias, viagens, trabalho, treinamento, curso ou licença, o encarregado imediato deve comunicar ao médico coordenador e/ou encarregado dos exames o motivo do impedimento, além da data prevista para o seu retorno.
                    </p>
                    <p style={{ marginBottom: '15px' }}>
                        Se o funcionário não comparecer ao final do impedimento, é responsabilidade do médico coordenador do PCMSO providenciar uma nova convocação para a realização dos exames.
                    </p>
                    <p style={{ marginBottom: '30px' }}>
                        A empresa precisa oferecer condições para que os empregados possam trabalhar.
                    </p>

                    <h2 style={{ fontSize: '16pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>HOSPITAIS PARA ATENDIMENTO DE EMERGÊNCIA</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Em caso de acidente ou mal súbito, encaminhe para o ambulatório da contratante. Caso necessite de remoção será feito por ambulância do SAMU.
                    </p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>O acompanhamento do colaborador deverá ter o preposto da Empresa.</li>
                        <li style={{ marginBottom: '10px' }}>Se necessário a remoção, deverá ser encaminhado para uma das unidades relacionadas abaixo:</li>
                    </ul>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#4472c4', color: '#fff' }}>
                                <th style={{ border: '1px solid #000', padding: '6px' }}>Unidade de Atendimento</th>
                                <th style={{ border: '1px solid #000', padding: '6px' }}>Endereço</th>
                                <th style={{ border: '1px solid #000', padding: '6px' }}>Contatos</th>
                                <th style={{ border: '1px solid #000', padding: '6px' }}>Observações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>UPA Piracicamirim</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Rua Rio Grande do Norte, 135</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>3426-4973 / 3411-3100 / 3426-5973</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>UPA Vila Cristina</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Rua Dona Anésia nº 950, Bairro Jaraguá</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>3434-2296 / 3434-9356 / 3402-6520</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>UPA Vila Sônia</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Rua Brigadeiro Eduardo Gomes, 106</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>3415-1450 / 3425-3284 / 3425-3598</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>UPA Vila Rezende</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Avenida Conceição, 350</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>3421-1439 / 3421-0676</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>Central de Ortopedia e Traumatologia (COT)</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Rua Luis de Camões, 3000 – Piracicamirim</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>(19) 3434-0324 / 3434-7823</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Específica para atendimentos de traumas ortopédicos, atendimento 24 horas, com avaliação de risco e encaminhamentos para cirurgias ou atendimento hospitalar.</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>Serviço de Atendimento Móvel de Urgência (SAMU)</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Av. Dr. Paulo de Moraes, 2000 – Paulista</td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>192</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Atendimento móvel de urgência e emergência.</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>Serviço de Urgência Bucal (SUB)</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Av. Independência, 2600/2626 – Centro</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>(19) 3402-2328</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}>Atendimento odontológico de urgência, alívio de dor e casos de traumas. Funciona de segunda a sexta-feira, das 7h às 21h e aos sábados, domingos e feriados, das 8h às 16h.</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '4px' }}><b>Corpos de Bombeiros</b></td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>193</td>
                                <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 8: PÁGINA 21 - PLANEJAMENTO DE AÇÕES DE SAÚDE (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={21} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>PLANEJAMENTO DE AÇÕES DE SAÚDE</h2>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        Dentro do que se pretende que seja desenvolvido pelo SST, algumas atividades, principalmente os exames médicos periódicos, devem ter uma periodicidade e uma previsão anual, e terão os meses de janeiro a dezembro para sua realização, por setores, e com contato prévio. Qualquer dos outros exames que fazem parte da avaliação médica do funcionário poderão ser realizados em qualquer época, conforme a necessidade da instituição.
                    </p>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '25px' }}>
                        É importante ficar registrado que todos os exames complementares a serem realizados pelo funcionário, e que estejam previstos no PCMSO, serão efetuados dentro da instituição, sem ônus para o funcionário, conforme legislação específica.
                    </p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt', marginBottom: '30px', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#fff' }}>
                                <th style={{ border: '1px solid #000', padding: '8px', width: '33%' }}>EXAMES MÉDICOS</th>
                                <th style={{ border: '1px solid #000', padding: '8px', width: '33%' }}>REPONSÁVEL</th>
                                <th style={{ border: '1px solid #000', padding: '8px', width: '33%' }}>CRONOGRAMA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '8px' }}>
                                    ADMISSIONAIS<br />
                                    PERIÓDICO<br />
                                    RETORNO AO TRABALHO<br />
                                    MUDANÇA DE FUNÇÃO<br />
                                    DEMISSIONAL
                                </td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>SST</td>
                                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', verticalAlign: 'middle' }}>Conforme as necessidades da Instituição</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ backgroundColor: '#a6a6a6', padding: '5px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #000', fontSize: '11pt' }}>
                        Planejamento Anual de Ações de Saúde
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#fff' }}>
                                <th style={{ border: '1px solid #000', padding: '4px', rowSpan: 2 }}>TEMAS</th>
                                <th colSpan="13" style={{ border: '1px solid #000', padding: '4px' }}>Mês/Ano</th>
                            </tr>
                            <tr style={{ backgroundColor: '#fff' }}>
                                {['Dez/24', 'Jan/25', 'Fev/25', 'Mar/25', 'Abr/25', 'Mai/25', 'Jun/25', 'Jul/25', 'Ago/25', 'Set/25', 'Out/25', 'Nov/25', 'Dez/25'].map(m => (
                                    <th key={m} style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{m}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: 1, text: 'Elaboração do PCMSO', marks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
                                { id: 2, text: 'Revisão do PCMSO', marks: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0] },
                                { id: 3, text: 'Relatório Analítico', marks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
                                { id: 4, text: 'Realização de ASOS e Exames Complementares', marks: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
                                { id: 5, text: 'Alcoolismo, Tabagismo', marks: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                                { id: 6, text: 'Diabetes Mellitus Hipertensão', marks: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
                                { id: 7, text: 'Saúde Mental', marks: [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0] },
                                { id: 8, text: 'Preconceito Racial', marks: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
                                { id: 9, text: 'IST\'s', marks: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
                            ].map((row, ri) => (
                                <tr key={ri}>
                                    <td style={{ border: '1px solid #000', padding: '4px' }}><b>{row.id}</b> {row.text}</td>
                                    {row.marks.map((m, mi) => (
                                        <td key={mi} style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontWeight: 'bold' }}>{m ? 'X' : ''}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ backgroundColor: '#bfbfbf', padding: '5px', fontSize: '8pt', textAlign: 'justify', border: '1px solid #000', borderTop: 'none' }}>
                        Observação: A empresa é livre para escolher as das e o instrutor que irá ministrar os treinamentos mencionados. No entanto, é de sua responsabilidade garantir que o conteúdo e cronograma sejam seguidos de acordo com o que está estabelecido neste documento, dentro dos prazos determinados antes da reavaliação do novo programa.
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 8: PÁGINA 24 - IMUNIZAÇÃO, SOCORROS E RELATÓRIO (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={24} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>IMUNIZAÇÃO</h2>
                    <div style={{ fontSize: '11pt', lineHeight: '2.0', textAlign: 'justify' }}>
                        <p>A- Vacinas recomendadas para adulto com menos de 65 anos: DTI, Influenza, Rubéola e Hepatite B</p>
                        <p>B- Vacina da Febre Amarela: á cada 10 anos</p>
                        <p>C- Hepatite B – três doses – Hepatite Anti HBS – na data do 1º periódico e a cada 10 anos</p>
                        <p>D - Dupla Adulto – Difteria/Tétano – á cada 10 anos</p>
                        <p>E - Tríplice viral</p>
                        <p>F - Influenza A e B Anualmente</p>
                        <p style={{ marginTop: '15px' }}><b>OBS.:</b> A carteira de Vacinação deve ser apresentada com todas as vacinas descritas acima em dia, e uma cópia é arquivada na pasta dos funcionários.</p>
                    </div>

                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginTop: '30px', marginBottom: '20px' }}>PRIMEIROS SOCORROS</h2>
                    <div style={{ fontSize: '11pt', lineHeight: '1.6', textAlign: 'justify' }}>
                        <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"Todo Atendimento de Primeiros Socorros deverá ser realizado pela Equipe de Saúde do Ambulatório Médico da Antilhas onde a empresa está em atividade"</p>
                        <p style={{ marginBottom: '15px' }}><b>OBS.:</b> Este item desconsidera qualquer informação de Primeiros Socorros já informada no PCMSO vigente.</p>
                        <div style={{ backgroundColor: '#ffff00', padding: '5px' }}>
                            Deve ser expressamente proibido o fornecimento de qualquer tipo de medicamento aos trabalhadores sem a devida prescrição médica (Decreto 20.931 de 11.01.1931), inclusive, aqueles adquiridos para dor de cabeça e afins.
                        </div>
                    </div>

                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginTop: '30px', marginBottom: '20px' }}>RELATÓRIO ANUAL</h2>
                    <div style={{ fontSize: '11pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <p style={{ marginBottom: '20px' }}>O Relatório Anual deve vir com dois anexos:</p>
                        <p>O Anexo I deve mostrar, por setores da AM Engenharia, o número e tipo de exames médicos realizados, incluindo consultas e exames adicionais. Também deve incluir estatísticas de resultados anormais e quantificação de comunicados de acidente de trabalho e o planejamento de ações de saúde para o próximo ano.</p>
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 9: PÁGINA 25 - RELATÓRIO ANALÍTICO (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={25} />
                <div style={{ marginTop: '20px' }}>
                    <ul style={{ paddingLeft: '20px', fontSize: '11pt', lineHeight: '1.6', textAlign: 'justify', marginBottom: '20px' }}>
                        <li style={{ marginBottom: '10px' }}>No Anexo I, no campo “Natureza do Exame”, devem ser listados apenas os exames adicionais feitos por causa de exposição ao trabalho, os que estão nos Quadros 1 e 2 da NR-7 e os sugeridos pela ACGIH (American Conference of Industrial Hygienists).</li>
                        <li style={{ marginBottom: '10px' }}>O Anexo II deve listar as investigações feitas pela equipe de Saúde e Segurança da AM Engenharia durante o período do PCMSO, que mostram uma relação entre os riscos do trabalho e as doenças, conforme o Quadro IV da NR-4.</li>
                    </ul>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '30px' }}>
                        O relatório anual deve ser apresentado e discutido em reunião com representante da CIPA, quando houver, e uma cópia deve ser adicionada ao livro de atas dessa comissão.
                    </p>

                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>RELATÓRIO ANALÍTICO</h2>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Por se tratar da elaboração inicial do PCMSO não é possível realizar o Relatório Analítico com base nos dois anos anteriores, sendo que, esse relatório será gerado e apresentado no PCMSO após o segundo ano de sua gestão, onde haverá as informações suficientes e necessárias para interpretação do médico responsável, conforme previsto no item 7.6.4 da nova NR 07.
                    </p>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '20px' }}>
                        Estamos enviando o relatório parcial dos dados contabilizados até o momento:
                    </p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', border: '1px solid #000' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#bdd7ee' }}>
                                <th style={{ border: '1px solid #000', padding: '5px', width: '20%' }}>EMPRESA:</th>
                                <th style={{ border: '1px solid #000', padding: '5px', width: '30%' }}>A.M. Engenharia e Segurança do Trabalho LTDA</th>
                                <th style={{ border: '1px solid #000', padding: '5px', width: '20%' }}>Médica Responsável:</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Dra. Ivonne Sanchez Sastre</th>
                            </tr>
                            <tr style={{ backgroundColor: '#bdd7ee' }}>
                                <th style={{ border: '1px solid #000', padding: '5px' }}></th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}></th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>CRM:</th>
                                <th style={{ border: '1px solid #000', padding: '5px', textAlign: 'left' }}>128.501</th>
                            </tr>
                            <tr style={{ backgroundColor: '#7f7f7f', color: '#fff' }}>
                                <th colSpan="4" style={{ border: '1px solid #000', padding: '3px' }}>11/12/2023 - 13/12/2025</th>
                            </tr>
                            <tr style={{ backgroundColor: '#bfbfbf' }}>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Setor</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Natureza</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>
                                    Exames<br />Realizados
                                </th>
                                <th style={{ border: '1px solid #000', padding: '5px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ width: '50%', textAlign: 'center' }}>Resultados<br />Anormais</span>
                                    <span style={{ width: '50%', textAlign: 'center' }}>% Anormais</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['TODOS', 'Acuidade Visual', '17', '0', '0.0'],
                                ['TODOS', 'Audiometria *', '17', '0', '0.0'],
                                ['TODOS', 'Avaliação Psicossocial *', '17', '0', '0.0'],
                                ['TODOS', 'Clínico', '18', '0', '0.0'],
                                ['TODOS', 'Eletrocardiograma *', '10', '0', '0.0'],
                                ['TODOS', 'Eletroencefalograma *', '10', '0', '0.0'],
                                ['TODOS', 'Glicemia de jejum *', '17', '0', '0.0'],
                                ['TODOS', 'Hemograma Completo *', '17', '0', '0.0'],
                                ['TODOS', 'Creatinina *', '9', '0', '0.0'],
                                ['TODOS', 'Fator RH + ABO *', '9', '0', '0.0']
                            ].map((row, ri) => (
                                <tr key={ri}>
                                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{row[0]}</td>
                                    <td style={{ border: '1px solid #000', padding: '4px' }}>{row[1]}</td>
                                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{row[2]}</td>
                                    <td style={{ border: '1px solid #000', padding: '4px', display: 'flex' }}>
                                        <span style={{ width: '50%', textAlign: 'center' }}>{row[3]}</span>
                                        <span style={{ width: '50%', textAlign: 'center' }}>{row[4]}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA 9: PÁGINA 28 - CONSIDERAÇÕES FINAIS (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={28} />
                <div style={{ marginTop: '40px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>CONSIDERAÇÕES FINAIS</h2>

                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.8', marginBottom: '25px' }}>
                        O acompanhamento e desenvolvimento, deve ser de responsabilidade do preposto e ou coordenador da empresa, qual deverá implementar as ações e promover condições e gerir recursos necessários para a execução das orientações do PCMSO e seus anexos contendo nesse documento, podendo este delegar ou contratar terceiros para este fim.
                    </p>
                    <p style={{ fontSize: '11pt', textAlign: 'justify', lineHeight: '1.8', marginBottom: '50px' }}>
                        Em cumprimento à sétima norma regulamentadora do trabalho Programa de Controle Médico de Saúde Ocupacional (PCMSO) o responsável legal pela empresa <b>{safeUpper(companyData?.name)}</b> ciente.
                    </p>

                    <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24pt', color: '#000080', marginBottom: '-10px' }}>
                                Diego Dalla Costa
                            </div>
                            <div style={{ borderTop: '1px solid #000', width: '400px', paddingTop: '5px', fontSize: '10pt', fontWeight: 'bold' }}>
                                EMPRESA: {safeUpper(companyData?.name)}
                            </div>
                            <div style={{ fontSize: '8pt', color: '#666' }}>
                                (RESPONSÁVEL PELA EMPRESA CIENTE DAS INFORMAÇÕES ACIMA)
                            </div>
                        </div>

                        <div style={{ marginTop: '30px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div style={{ fontSize: '24pt', color: '#000080', fontWeight: 'bold' }}>DIEGO</div>
                            <div style={{ fontSize: '8pt', lineHeight: '1.2' }}>
                                Assinado de forma digital por DIEGO DALLA COSTA:36711775864<br />
                                Dados: 2025.11.28 13:27:01 -03'00'
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px', textAlign: 'right', fontWeight: 'bold', fontSize: '11pt' }}>
                        Piracicaba, 11 de Novembro 2025
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA EXTRA: PÁGINA 20 - FLUXOGRAMA DE ACIDENTE (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={20} />
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '16pt', fontWeight: 'bold', border: '2px solid #000', padding: '10px', display: 'inline-block', borderRadius: '15px', marginBottom: '30px' }}>
                        EM CASO DE ACIDENTE OU<br />MAL SÚBITO
                    </h2>

                    {/* Representação simplificada do fluxograma */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div style={{ border: '1px solid #003366', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt' }}>Encaminhar ao ambulatório médico</div>
                            <div style={{ border: '1px solid #003366', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt' }}>Informar ao Responsável da Área/ Brigadista ou Técnico de Segurança</div>
                        </div>
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div style={{ border: '1px solid #003366', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt' }}>Médico avalia a gravidade da lesão ou do ocorrido</div>
                            <div style={{ border: '1px solid #ff0000', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt', color: '#ff0000' }}>Na falta de médico, chame ajuda imediatamente.</div>
                        </div>
                        <div style={{ border: '1px solid #000', padding: '10px', borderRadius: '10px', width: '150px', fontSize: '9pt' }}>Encaminhamento externo?</div>
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div style={{ border: '1px solid #003366', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt' }}>Médico define como sendo lesão grave</div>
                            <div style={{ border: '1px solid #003366', padding: '10px', borderRadius: '10px', width: '200px', fontSize: '9pt' }}>Médico define como sendo lesão leve</div>
                        </div>
                        <div style={{ display: 'flex', gap: '40px' }}>
                            <div style={{ border: '1px solid #ff0000', backgroundColor: '#f2f2f2', padding: '15px', borderRadius: '10px', width: '200px', fontSize: '10pt', fontWeight: 'bold' }}>Ir em Ambulância</div>
                            <div style={{ border: '1px solid #003366', padding: '15px', borderRadius: '10px', width: '200px', fontSize: '10pt' }}>Empresa leva com veículo próprio</div>
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '40mm', left: '25mm', fontSize: '8pt', textAlign: 'left', border: '1px solid #000', padding: '10px', width: '250px' }}>
                        <b>NOTA:</b><br />
                        Emissão da CAT de acordo com o Médico, se com ou sem afastamento em até 24h do ocorrido:<br />
                        • 1ª via ao INSS;<br />
                        • 2ª via ao segurado ou dependente;<br />
                        • 3ª via do sindicato de classe do trabalhador;<br />
                        • 4ª via à empresa, cadastro ao E-Social.
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA EXTRA: PÁGINA 22 - PROCEDIMENTOS ACIDENTE (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={22} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '20px' }}>ACIDENTE DE TRABALHO</h2>
                    <div style={{ fontSize: '11pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Procedimentos:</p>
                        <p style={{ marginBottom: '15px' }}>Em caso de acidente de trabalho, providenciar o imediato atendimento ao acidentado, inclusive, condução ao hospital, se for necessário.</p>
                        <p style={{ marginBottom: '15px' }}>Na ausência do médico, isto fica a cargo do SESMT – Serviço Especializado em Segurança e Medicina do Trabalho, através do Técnico em Segurança do Trabalho e/ou dos funcionários que tiverem recebido treinamento em primeiros socorros. Se necessário, poderá ser solicitado o acompanhamento médico local durante a remoção.</p>
                        <p style={{ marginBottom: '15px' }}>Providenciado o socorro, solicitar a emissão da CAT – Comunicação de Acidente de Trabalho (ver modelo abaixo) ao setor de Recursos Humanos e/ou ao SESMT, encaminhando ao hospital onde foi atendido o acidentado.</p>
                        <p style={{ marginBottom: '15px' }}>Todo acidente deve ser comunicado ao encarregado do setor onde ocorreu o evento para que sejam adotadas as medidas cabíveis a prevenção de outros infortúnios, bem como, deverá também ser comunicado ao médico do trabalho, coordenador do PCMSO, para se possível, prever o período de afastamento do acidentado e proceder o registro no prontuário médico.</p>
                        <p style={{ marginBottom: '15px' }}>Em caso de <b>ACIDENTE FATAL</b> deverá ser comunicado de imediato a <b>Autoridade Policial</b> e ao SESMT da empresa. Em caso de acidente de trabalho (incluindo de trajeto) será feita pelo SESMT da empresa a Investigação de Acidente do Trabalho, registrada em formulário padrão (que ficará sob arquivo do próprio SESMT), para posterior emissão da Comunicação de Acidente do Trabalho pelo Departamento Pessoal, que receberá cópia (fotocópia em “xerox”) da referida documentação.</p>
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA EXTRA: PÁGINA 23 - FORMULÁRIO CAT (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={23} />
                <div style={{ marginTop: '10px', border: '1px solid #000', padding: '2px' }}>
                    <div style={{ backgroundColor: '#f2f2f2', padding: '5px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #000', fontSize: '9pt' }}>
                        COMUNICAÇÃO DE ACIDENTE DO TRABALHO – CAT
                    </div>
                    {/* Representação visual simplificada do formulário CAT */}
                    <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', borderBottom: '1px solid #000' }}>
                        <div style={{ borderRight: '1px solid #000', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20pt', fontWeight: 'bold' }}>PREVIDÊNCIA SOCIAL</div>
                            </div>
                        </div>
                        <div style={{ padding: '5px', fontSize: '7pt' }}>
                            1. Emitente [ ]<br />
                            1-Empregador 2-Sindicato 3-Médico<br />
                            4-Segurando ou dependente 5-Autoridade Pública<br /><br />
                            2. Tipo de CAT [ ]<br />
                            1-Início 2-Reabertura<br />
                            3-Comunicação de Óbito em / /
                        </div>
                    </div>
                    {/* ... Resto do formulário representado por blocos de tabela ... */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7pt' }}>
                        <tbody>
                            <tr>
                                <td style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000', width: '50%', padding: '2px' }}>3. Razão Social/Nome</td>
                                <td style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000', width: '20%', padding: '2px' }}>4. Tipo [ ] 1-CGC 2-CEI 3-CPF 4-NIT</td>
                                <td style={{ borderBottom: '1px solid #000', padding: '2px' }}>5. CNAE</td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ height: '30px', borderBottom: '1px solid #000' }}></td>
                            </tr>
                            {/* Mais linhas simulando o formulário */}
                            <tr>
                                <td style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000', padding: '2px' }}>6. Endereço (Rua/Av./Nº/Comp.)</td>
                                <td style={{ borderBottom: '1px solid #000', borderRight: '1px solid #000', padding: '2px' }}>Bairro</td>
                                <td style={{ borderBottom: '1px solid #000', padding: '2px' }}>CEP</td>
                            </tr>
                            <tr>
                                <td colSpan="3" style={{ height: '30px', borderBottom: '1px solid #000' }}></td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ padding: '10px', fontSize: '8pt', textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>
                        A COMUNICAÇÃO DO ACIDENTE É OBRIGATÓRIA, MESMO NO CASO EM QUE NÃO HAJA AFASTAMENTO DO TRABALHO
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA EXTRA: PÁGINA 26 - TABELAS CAT/DOENÇAS (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={26} />
                <div style={{ marginTop: '20px' }}>
                    <div style={{ backgroundColor: '#bdd7ee', padding: '5px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #000', fontSize: '10pt' }}>
                        CAT
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', border: '1px solid #000', marginBottom: '20px' }}>
                        <thead style={{ backgroundColor: '#f2f2f2' }}>
                            <tr>
                                <th rowSpan="2" style={{ border: '1px solid #000', padding: '5px' }}>Setor</th>
                                <th colSpan="4" style={{ border: '1px solid #000', padding: '5px' }}>11/12/2023 - 13/12/2025</th>
                            </tr>
                            <tr>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Típico</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Doença</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Trajeto</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '5px' }}>ENGENHARIA</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ backgroundColor: '#bdd7ee', padding: '5px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #000', fontSize: '10pt' }}>
                        DOENÇAS
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '8pt', border: '1px solid #000', marginBottom: '30px' }}>
                        <thead style={{ backgroundColor: '#f2f2f2' }}>
                            <tr>
                                <th rowSpan="2" style={{ border: '1px solid #000', padding: '5px' }}>Setor</th>
                                <th rowSpan="2" style={{ border: '1px solid #000', padding: '5px' }}>CID</th>
                                <th colSpan="2" style={{ border: '1px solid #000', padding: '5px' }}>11/12/2023 - 13/12/2025</th>
                                <th rowSpan="2" style={{ border: '1px solid #000', padding: '5px' }}>ATESTADOS entregues</th>
                            </tr>
                            <tr>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Incidência</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Prevalência</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '5px' }}>ENGENHARIA</td>
                                <td style={{ border: '1px solid #000', padding: '5px' }}>Cefaleia CID R51</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>1.00</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0.00</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>7</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid #000', padding: '5px' }}>ENGENHARIA</td>
                                <td style={{ border: '1px solid #000', padding: '5px' }}>Dorsalgia CID M54.9</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>1.00</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>0.00</td>
                                <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>2</td>
                            </tr>
                        </tbody>
                    </table>

                    <p style={{ fontSize: '11pt', fontWeight: 'bold', marginBottom: '15px' }}>Discussão sobre as variações nos resultados:</p>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        No período avaliado não ocorreu nenhum agravo relacionado ao trabalho. Até o momento não houve acidentes de trabalho, considerando ramo de atividade e quantidade de funcionários, em decorrência de treinamentos e procedimentos de segurança. Manter cuidados.
                    </p>
                    <p style={{ fontSize: '10.5pt', textAlign: 'justify', lineHeight: '1.6', marginBottom: '15px' }}>
                        Através dos dados contidos no relatório analítico, observamos que o processo de gerenciamento de riscos está sendo bom o suficiente para prevenir os trabalhadores de adoecerem ou sofrerem acidentes.
                    </p>

                    <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '12pt', fontWeight: 'bold' }}>IVONNE SANCHEZ SASTRE</div>
                            <div style={{ fontSize: '8pt', color: '#666' }}>Assinado de forma digital por IVONNE SANCHEZ SASTRE: 215706138000</div>
                            <div style={{ borderTop: '1px solid #000', width: '300px', marginTop: '40px', paddingTop: '5px' }}>
                                <b>Dra. Ivonne Sanchez Sastre</b><br />
                                <b>CRM: 128.501 MTB 50.944</b><br />
                                <b>Medica do Trabalho</b>
                            </div>
                        </div>
                    </div>
                </div>
                <PageFooter />
            </div>

            {/* ETAPA EXTRA: PÁGINA 27 - OBSERVAÇÕES COMPLEMENTARES (LITERAL) */}
            <div style={styles.page}>
                <PageHeader pageNum={27} />
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ fontSize: '18pt', fontWeight: 'bold', borderBottom: 'none', marginBottom: '30px' }}>OBSERVAÇÕES COMPLEMENTARES</h2>
                    <div style={{ fontSize: '11pt', lineHeight: '1.8', textAlign: 'justify' }}>
                        <p style={{ marginBottom: '20px' }}>1-) Elaborado a avaliação dos riscos potenciais segundo o PGR – Programa de Gerenciamento de Riscos, pelo Engenheiro de Segurança do Trabalho <b>DIEGO DALLA COSTA</b> CREA-SP 5069508472 revisado em 11/11/2025.</p>

                        <p style={{ marginBottom: '20px' }}>2-) Informar os funcionários sobre o reconhecimento precoce de casos de D.O.R.T.;</p>
                        <p style={{ marginBottom: '20px' }}>Treinamento dos funcionários com relação a ajustes e correta utilização de mobiliário, equipamentos e atividades específicas (como de Trabalho em Altura);</p>
                        <p style={{ marginBottom: '20px' }}>Informar, facilitar o acesso e promover reciclagens dos conhecimentos sobre as normas de Higiene e Segurança do Trabalho, empresa deve procurar tomar medidas que garantam aos trabalhadores com deficiência e reabilitados, condições de trabalho seguras e saudáveis.</p>
                        <p style={{ marginBottom: '20px' }}>Executar as de promoção do programa de bem estar e saúde, contidas no planejamento de ações de saúde.</p>

                        <p style={{ marginBottom: '20px' }}>3-) Os funcionários com alterações encontradas nos exames clínicos e / ou subsidiários que não têm relação ocupacional, e encaminhados para as especialidades correspondentes.</p>

                        <p style={{ marginBottom: '20px' }}>4-) Os Primeiros Socorros a serem prestados na Empresa estão afeitos ao representante da empresa no que tange a segurança, após orientações e treinamentos atinentes conforme NR 05 - CIPA.</p>
                    </div>
                </div>
                <PageFooter />
            </div>
        </div>
    );
};

export default PCMSOTemplate;

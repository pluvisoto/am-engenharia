import React, { useState } from 'react';
import { exportToPDF } from '../utils/pdfExport';
import DIRTemplate from './documents/DIRTemplate';
import PGRTemplate from './documents/PGRTemplate';
// import PCMSOTemplate from './documents/PCMSOTemplate';

const ClientDashboard = ({ companyData, fullData, onStartIntake, onViewDocs }) => {
    console.log('[ClientDashboard] Received companyData:', companyData);

    // Configurações de Estado para Geração de PDF
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const [templateType, setTemplateType] = useState(null); // 'DIR' or 'PGR' or 'PCMSO'

    // Definir as etapas do projeto em ordem cronológica baseada no workflow_status
    const status = companyData?.workflow_status || 'draft';

    // Status mapping
    const hasIntake = status === 'intake_completed' || status === 'analysis_in_progress' || status === 'pending_review' || status === 'approved';
    const hasAnalysis = status === 'pending_review' || status === 'approved';
    const isApproved = status === 'approved';

    // Função de Geração de PDF
    const handleGeneratePDF = async (docType) => {
        const pgrType = companyData.intake_data?.pgr_type || 'FULL';

        if (docType === 'pgr') {
            setGeneratingPDF(true);

            if (pgrType === 'SIMPLIFIED') {
                setTemplateType('DIR');
                setTimeout(() => {
                    const element = document.getElementById('dir-document-template');
                    if (element) exportToPDF('dir-document-template', `DIR-${companyData.cnpj}.pdf`);
                    else alert('Erro ao renderizar template DIR.');
                    setGeneratingPDF(false);
                    setTemplateType(null);
                }, 1500);
            } else {
                // FULL PGR
                setTemplateType('PGR');
                setTimeout(() => {
                    const element = document.getElementById('pgr-document-template');
                    if (element) exportToPDF('pgr-document-template', `PGR-${companyData.cnpj}.pdf`);
                    else alert('Erro ao renderizar template PGR.');

                    setGeneratingPDF(false);
                    setTemplateType(null);
                }, 2000); // 2s buffer for larger document
            }
        } else if (docType === 'pcmso') {
            // TEMPORARY DEBUG: DISABLED PCMSO
            alert('Funcionalidade em manutenção (Debug Mode).');
            /*
            setGeneratingPDF(true);
            setTemplateType('PCMSO');
            setTimeout(() => {
                const element = document.getElementById('pcmso-document-template');
                if (element) exportToPDF('pcmso-document-template', `PCMSO-${companyData.cnpj}.pdf`);
                // Removed: else alert('Erro ao renderizar template PCMSO.');

                setGeneratingPDF(false);
                setTemplateType(null);
            }, 2000);
            */
        } else {
            if (onViewDocs) onViewDocs(docType);
        }
    };

    const steps = [
        {
            id: 1,
            title: 'Dados da Empresa',
            desc: 'Confirmação do CNPJ e dados cadastrais básicos.',
            status: 'completed'
        },
        {
            id: 2,
            title: 'Levantamento Técnico',
            desc: 'Responda ao formulário de setores, cargos e atividades.',
            status: hasIntake ? 'completed' : 'current'
        },
        {
            id: 3,
            title: 'Análise AM Engenharia',
            desc: 'Nossa equipe técnica revisa e gera os riscos inteligentes.',
            status: hasAnalysis ? 'completed' : (hasIntake ? 'current' : 'pending')
        },
        {
            id: 4,
            title: 'Revisão Final e Aprovação',
            desc: 'Você valida os documentos finais gerados pelo sistema.',
            status: isApproved ? 'completed' : (status === 'pending_review' ? 'current' : 'pending')
        },
        {
            id: 5,
            title: 'Emissão PGR / PCMSO',
            desc: 'Download dos documentos assinados e prontos para uso.',
            status: isApproved ? 'current' : 'pending'
        }
    ];

    const progress = ((steps.filter(s => s.status === 'completed').length) / steps.length) * 100;

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        Bem-vindo, <span style={{ color: 'var(--accent)' }}>{companyData?.name?.split(' ')[0] || 'Cliente'}</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Acompanhe abaixo o status de regularização da sua empresa.</p>
                </div>
                {status === 'pending_review' && (
                    <div style={{ background: '#dcfce7', color: '#166534', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid #bbf7d0', animation: 'pulse 2s infinite' }}>
                        ✨ STATUS: REVISADO PELA ENGENHARIA
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem', alignItems: 'start' }}>

                {/* TIMELINE SECTION */}
                <div className="card-premium">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        🏁 Jornada de Regularização
                    </h3>

                    <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid #e2e8f0', marginLeft: '10px' }}>
                        {steps.map((step, idx) => (
                            <div key={step.id} style={{
                                marginBottom: '2.5rem',
                                position: 'relative',
                                opacity: step.status === 'pending' ? 0.5 : 1
                            }}>
                                {/* Dot indicator */}
                                <div style={{
                                    position: 'absolute',
                                    left: '-2.05rem',
                                    top: '0',
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: step.status === 'completed' ? 'var(--accent)' : (step.status === 'current' ? 'var(--primary)' : '#cbd5e1'),
                                    boxShadow: step.status === 'current' ? '0 0 0 4px rgba(15, 23, 42, 0.1)' : 'none',
                                    zIndex: 2
                                }}></div>

                                <h4 style={{ margin: '0 0 0.25rem', color: step.status === 'current' ? 'var(--accent)' : 'var(--primary)' }}>
                                    {idx + 1}. {step.title}
                                    {step.status === 'completed' && ' ✅'}
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{step.desc}</p>

                                {step.status === 'current' && (
                                    <div style={{ marginTop: '1rem' }}>
                                        {step.id === 2 && (
                                            <button className="btn-primary" onClick={onStartIntake}>
                                                Iniciar Coleta de Dados ›
                                            </button>
                                        )}
                                        {step.id === 3 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', color: '#64748b', borderLeft: '4px solid #3b82f6' }}>
                                                    🕒 Nossa inteligência está processando seus dados. Visualize os rascunhos abaixo:
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button className="btn-secondary" onClick={() => handleGeneratePDF('pgr')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                                                        📄 {companyData.intake_data?.pgr_type === 'SIMPLIFIED' ? 'Baixar DIR' : 'PGR (Rascunho)'}
                                                    </button>
                                                    <button className="btn-secondary" onClick={() => handleGeneratePDF('pcmso')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>🩺 PCMSO (Rascunho)</button>
                                                </div>
                                            </div>
                                        )}
                                        {step.id === 4 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534', fontWeight: 'bold' }}>✅ A análise técnica foi concluída! Revise os documentos finais:</p>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button className="btn-primary" onClick={() => handleGeneratePDF('pgr')}>Validar {companyData.intake_data?.pgr_type === 'SIMPLIFIED' ? 'DIR' : 'PGR'} Final</button>
                                                    <button className="btn-primary" onClick={() => handleGeneratePDF('pcmso')} style={{ background: 'var(--primary)' }}>Validar PCMSO Final</button>
                                                </div>
                                            </div>
                                        )}
                                        {step.id === 5 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div style={{ padding: '1rem', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #10b981' }}>
                                                    <p style={{ margin: '0 0 1rem 0', color: '#065f46', fontWeight: 'bold' }}>🎉 Todos os documentos estão prontos!</p>
                                                    <button className="btn-primary" style={{ width: '100%' }} onClick={() => handleGeneratePDF('pgr')}>
                                                        📥 Baixar Kit SST Completo
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* INFO SUMMARY SECTION */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card-premium" style={{ background: 'var(--primary)', color: 'white' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>Dados Confirmados</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                            <div>
                                <label style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>CNPJ</label>
                                <div>{companyData?.cnpj}</div>
                            </div>
                            <div>
                                <label style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>Razão Social</label>
                                <div>{companyData?.name}</div>
                            </div>
                            <div>
                                <label style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>Grau de Risco</label>
                                <div>{companyData?.grau_risco || 'Consultando...'}</div>
                            </div>
                            <div>
                                <label style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</label>
                                <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{status.toUpperCase().replace('_', ' ')}</div>
                            </div>
                            <div>
                                <label style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>Enquadramento Legal (NR-1)</label>
                                <div style={{ marginTop: '4px' }}>
                                    {companyData?.intake_data?.pgr_type === 'SIMPLIFIED' ? (
                                        <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            PGR SIMPLIFICADO (DIR)
                                        </span>
                                    ) : companyData?.intake_data?.pgr_type === 'FULL' ? (
                                        <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            PGR COMPLETO
                                        </span>
                                    ) : (
                                        <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>Em análise...</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-premium">
                        <h4 style={{ marginBottom: '0.5rem' }}>Progresso Total</h4>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>{Math.round(progress)}%</div>
                        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                        </div>
                    </div>

                    <div style={{ padding: '1rem', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                            Precisa de ajuda? <br />
                            <a href="#" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>Falar com nosso Suporte</a>
                        </p>
                    </div>
                </div>

            </div>

            {/* HIDDEN TEMPLATES FOR PDF GENERATION */}
            {generatingPDF && (
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    {templateType === 'DIR' && <DIRTemplate companyData={companyData} />}
                    {templateType === 'PGR' && <PGRTemplate companyData={companyData} data={fullData || companyData?.auto_generated_data || {}} />}
                    {/* {templateType === 'PCMSO' && <PCMSOTemplate companyData={companyData} data={fullData || companyData?.auto_generated_data || {}} />} */}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ClientDashboard;

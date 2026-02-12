
import React from 'react';

const DocumentCover = ({ title, subtitle, companyName, validity, docCode, variant }) => {
    const isPCMSO = variant === 'PCMSO' || title === 'PCMSO';

    return (
        <div style={{
            height: '275mm',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '8px solid var(--doc-navy)',
            padding: '80px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            position: 'relative',
            fontFamily: 'var(--font-main)',
            overflow: 'hidden'
        }}>
            {/* Header / Logo Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                {/* W&D Vidas Logo Placeholder */}
                <div style={{ textAlign: 'left' }}>
                    <div style={{ color: '#e11d48', fontWeight: '900', fontSize: '18pt', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '24pt' }}>&hearts;</span> W&DVidas
                    </div>
                    <div style={{ color: 'var(--doc-navy)', fontSize: '8pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Clínica Médica</div>
                </div>

                {/* AM Engenharia Logo Area */}
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14pt', fontWeight: '900', color: 'var(--doc-navy)', letterSpacing: '2px' }}>AM ENGENHARIA</div>
                    <div style={{ height: '3px', background: 'var(--doc-emerald)', width: '60px', margin: '5px 0 5px auto' }}></div>
                    <p style={{ fontSize: '7pt', letterSpacing: '2px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
                        GROUP
                    </p>
                </div>
            </div>

            {/* Main Title Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                {isPCMSO && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        marginBottom: '30px',
                        fontSize: '48pt',
                        fontWeight: '900',
                        color: '#e11d48'
                    }}>
                        <span>P</span>
                        <span>C</span>
                        <span>M</span>
                        <span>S</span>
                        <span>O</span>
                    </div>
                )}

                <h1 style={{ fontSize: isPCMSO ? '32pt' : '60pt', fontWeight: '900', color: 'var(--doc-navy)', margin: '0 0 10px 0', lineHeight: 1 }}>{title}</h1>
                <h2 style={{ fontSize: '16pt', fontWeight: '400', color: '#475569', letterSpacing: '2px', textTransform: 'uppercase' }}>{subtitle}</h2>
                <div style={{ margin: '40px auto', width: '30%', borderBottom: '2px solid var(--doc-emerald)' }}></div>
                <h3 style={{ fontSize: '24pt', fontWeight: '800', color: 'var(--doc-navy)', textTransform: 'uppercase', maxWidth: '800px', margin: '0 auto' }}>{companyName}</h3>
            </div>

            {/* Bottom Info / Validity */}
            <div style={{ background: 'var(--doc-gray)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border)', zIndex: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                    <div>
                        <p style={{ fontSize: '10pt', color: '#64748b', textTransform: 'uppercase' }}>Vigência do Programa</p>
                        <p style={{ fontSize: '14pt', fontWeight: 'bold', color: 'var(--doc-navy)' }}>{validity}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '10pt', color: '#64748b', textTransform: 'uppercase' }}>Código de Rastreabilidade</p>
                        <p style={{ fontSize: '14pt', fontWeight: 'bold', color: 'var(--doc-navy)' }}>{docCode}</p>
                    </div>
                </div>
                <p style={{ marginTop: '20px', fontSize: '10pt', color: '#94a3b8', textAlign: 'center' }}>
                    Documento elaborado em conformidade com as Normas Regulamentadoras (NRs) vigentes.
                </p>
            </div>

            {/* Sidebar Accent */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '15px',
                background: 'var(--doc-navy)'
            }}></div>
            <div style={{
                position: 'absolute',
                left: '15px',
                top: 0,
                bottom: 0,
                width: '5px',
                background: 'var(--doc-emerald)'
            }}></div>

            {/* Subtle Watermark/Logo in Background if PCMSO */}
            {isPCMSO && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    fontSize: '120pt',
                    fontWeight: '900',
                    color: '#f1f5f9',
                    zIndex: 0,
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                }}>
                    W&D VIDAS
                </div>
            )}
        </div>
    );
};

export default DocumentCover;

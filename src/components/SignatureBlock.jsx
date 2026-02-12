import React from 'react';

const SignatureBlock = ({ signatories }) => {
    return (
        <div style={{ marginTop: '4rem', pageBreakInside: 'avoid', borderTop: '2px solid var(--border)', paddingTop: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', gap: '30px', flexWrap: 'wrap' }}>
                {signatories.map((sig, index) => (
                    <div key={index} style={{ textAlign: 'center', minWidth: '250px', flex: 1 }}>
                        <div style={{
                            borderBottom: '2px solid var(--doc-navy)',
                            marginBottom: '10px',
                            width: '100%',
                            height: '60px',
                            margin: '0 auto 10px auto',
                            position: 'relative'
                        }}>
                            <span style={{ position: 'absolute', bottom: '2px', left: '50%', transform: 'translateX(-50%)', fontSize: '8pt', color: '#94a3b8', opacity: 0.5 }}>ASSINATURA</span>
                        </div>
                        <p style={{ fontWeight: '800', margin: 0, textTransform: 'uppercase', fontSize: '10pt', color: 'var(--doc-navy)' }}>{sig.name}</p>
                        <p style={{ margin: 0, fontSize: '9pt', color: '#475569', fontWeight: '600' }}>{sig.role}</p>
                        {sig.doc && <p style={{ margin: 0, fontSize: '8pt', color: '#64748b' }}>{sig.doc}</p>}
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: 'var(--doc-gray)', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '10pt', fontWeight: 'bold' }}>DATA DE EMISSÃO: _____ / _____ / __________</p>
                <p style={{ fontSize: '8pt', color: '#94a3b8', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Validable via Sistema Integrado AM Engenharia Segurança do Trabalho
                </p>
            </div>
        </div>
    );
};

export default SignatureBlock;

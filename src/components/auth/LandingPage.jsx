import React from 'react';

const LandingPage = ({ onSelectRole }) => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                maxWidth: '500px',
                width: '90%'
            }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>AM ENGENHARIA</h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Sistema de Gestão de Segurança do Trabalho</p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    <button
                        onClick={() => onSelectRole('client')}
                        style={{
                            padding: '1.2rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'white',
                            color: '#0f172a',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <span>🏢</span> Sou Cliente (Empresa)
                    </button>

                    <button
                        onClick={() => onSelectRole('admin')}
                        style={{
                            padding: '1.2rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span>🛡️</span> Sou AM Engenharia
                    </button>
                </div>

                <p style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
                    SST Inteligente &copy; {new Date().getFullYear()}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;

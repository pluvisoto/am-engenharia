import React, { useState } from 'react';

const LoginView = ({ onLogin, loading, onSignUp }) => {
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ cnpj, password, isAdmin });
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '2rem'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '3rem',
        borderRadius: '1.5rem',
        width: '100%',
        maxWidth: '450px',
        color: 'white',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.75rem',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                        AM <span style={{ color: '#10b981' }}>ENGENHARIA</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Plataforma de Gestão SST Premium</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>CNPJ ou Usuário</label>
                        <input
                            required
                            type="text"
                            style={inputStyle}
                            placeholder="00.000.000/0000-00"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Senha</label>
                        <input
                            required
                            type="password"
                            style={inputStyle}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94a3b8', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            id="admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                            style={{ accentColor: '#10b981' }}
                        />
                        <label htmlFor="admin">Acesso Administrativo</label>
                    </div>

                    <button
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            padding: '1rem',
                            fontSize: '1rem',
                            marginTop: '1rem',
                            background: '#10b981',
                            boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        {loading ? 'Autenticando...' : 'Entrar na Plataforma'}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                        Primeiro acesso? Utilize seu CNPJ como senha e altere-a a seguir.
                    </div>

                    {onSignUp && (
                        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Ainda não tem conta?</p>
                            <button
                                type="button"
                                onClick={onSignUp}
                                style={{
                                    background: 'none',
                                    border: '1px solid #10b981',
                                    color: '#10b981',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    transition: 'all 0.3s',
                                    width: '100%'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'none';
                                }}
                            >
                                🚀 Cadastre sua Empresa Grátis
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginView;

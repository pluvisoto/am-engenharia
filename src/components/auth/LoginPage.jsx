import React, { useState } from 'react';
import { getClientByCNPJ } from '../../utils/storage';

const LoginPage = ({ role, onLogin, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [identifier, setIdentifier] = useState(role === 'client' ? '' : 'admin@amengenharia.com'); // CNPJ or Email
    const [password, setPassword] = useState(''); // Only for admin
    const [error, setError] = useState(null);

    const formatCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .slice(0, 18);
    };

    const handleClientLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            // Remove pontuação para busca
            const cleanCNPJ = identifier.replace(/[^\d]/g, '');

            if (cleanCNPJ.length !== 14) {
                throw new Error('CNPJ inválido. Digite 14 números.');
            }

            const client = await getClientByCNPJ(cleanCNPJ);

            if (client) {
                onLogin({
                    role: 'client',
                    ...client
                });
            } else {
                // Se não acha, pode ser um novo cliente querendo cadastrar
                if (window.confirm('Empresa não encontrada. Deseja iniciar um novo cadastro?')) {
                    onLogin({
                        role: 'client_new',
                        cnpj: cleanCNPJ
                    });
                } else {
                    setError('Empresa não encontrada.');
                }
            }
        } catch (err) {
            console.error(err);
            setError(err.message || 'Erro ao entrar.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdminLogin = async () => {
        setLoading(true);
        setError(null);
        // Simulação de login admin
        setTimeout(() => {
            if (password === 'admin123' || password === '') { // Senha vazia permitida para dev mode
                onLogin({
                    role: 'admin',
                    name: 'Administrador (AM)',
                    email: identifier
                });
            } else {
                setError('Senha incorreta.');
                setLoading(false);
            }
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'client') {
            handleClientLogin();
        } else {
            handleAdminLogin();
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f0f2f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
                    ← Voltar
                </button>

                <h2 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
                    {role === 'client' ? 'Acesso do Cliente' : 'Acesso Administrativo'}
                </h2>
                <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    {role === 'client' ? 'Digite o CNPJ da sua empresa' : 'Entre com suas credenciais'}
                </p>

                {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#475569', marginBottom: '0.5rem' }}>
                            {role === 'client' ? 'CNPJ' : 'Email'}
                        </label>
                        <input
                            type={role === 'client' ? 'text' : 'email'}
                            value={identifier}
                            onChange={(e) => {
                                const val = e.target.value;
                                setIdentifier(role === 'client' ? formatCNPJ(val) : val);
                            }}
                            placeholder={role === 'client' ? '00.000.000/0000-00' : 'seu@email.com'}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    {role === 'admin' && (
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#475569', marginBottom: '0.5rem' }}>
                                Senha
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

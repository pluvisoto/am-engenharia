import React, { useState } from 'react';
import { fetchCNPJData, validateCNPJ, formatCNPJ, formatWhatsApp } from '../utils/cnpjApi';
import { supabase } from '../utils/supabase';

const SignUpView = ({ onSuccess, onBackToLogin }) => {
    const [step, setStep] = useState(1); // 1 = form, 2 = loading CNPJ, 3 = success
    const [formData, setFormData] = useState({
        companyName: '',
        email: '',
        whatsapp: '',
        cnpj: '',
        password: '',
        confirmPassword: ''
    });
    const [cnpjData, setCnpjData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleCNPJBlur = async () => {
        if (!formData.cnpj) return;

        // Only proceed if CNPJ has 14 digits (complete)
        const cleanCNPJ = formData.cnpj.replace(/\D/g, '');
        if (cleanCNPJ.length < 14) {
            // Don't show error while user is still typing
            return;
        }

        const isValid = validateCNPJ(formData.cnpj);
        if (!isValid) {
            setError('CNPJ inválido. Verifique os dígitos.');
            setCnpjData(null);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await fetchCNPJData(formData.cnpj);
            setCnpjData(data);

            // Auto-fill company name and format CNPJ
            setFormData(prev => ({
                ...prev,
                companyName: data.nome_fantasia || data.razao_social,
                cnpj: formatCNPJ(formData.cnpj)
            }));

            console.log('[SignUp] CNPJ data fetched:', data);
        } catch (err) {
            setError(err.message || 'Erro ao buscar dados do CNPJ');
            setCnpjData(null);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.companyName.trim()) {
            setError('Nome da empresa é obrigatório');
            return false;
        }

        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Email inválido');
            return false;
        }

        if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) {
            setError('WhatsApp inválido');
            return false;
        }

        if (!validateCNPJ(formData.cnpj)) {
            setError('CNPJ inválido');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Senha deve ter no mínimo 6 caracteres');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError('');

        let authUserId = null;

        try {
            console.log('[SignUp] Starting registration...');

            // 1. Create user in Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        name: formData.companyName,
                        cnpj: formData.cnpj,
                        whatsapp: formData.whatsapp
                    }
                }
            });

            if (authError) throw authError;

            authUserId = authData.user?.id;
            console.log('[SignUp] User created in Auth:', authUserId);

            // 2. Create company record
            const { data: companyData, error: companyError } = await supabase
                .from('companies')
                .insert({
                    name: formData.companyName,
                    cnpj: formatCNPJ(formData.cnpj),
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    cnae: cnpjData?.cnae || null,
                    cnae_desc: cnpjData?.cnae_desc || null,
                    user_id: authUserId
                    // workflow_status will use database default value
                })
                .select()
                .single();

            if (companyError) {
                console.error('[SignUp] Company creation failed:', companyError);

                // ROLLBACK: Delete the auth user we just created
                if (authUserId) {
                    console.log('[SignUp] Rolling back - deleting auth user...');
                    await supabase.auth.admin.deleteUser(authUserId);
                }

                throw new Error('Erro ao criar empresa: ' + companyError.message);
            }

            console.log('[SignUp] Company created:', companyData);

            // 3. Success!
            setStep(3);

            // Redirect to login or auto-login after 2 seconds
            setTimeout(() => {
                if (onSuccess) {
                    onSuccess(formData.email, formData.password);
                }
            }, 2000);

        } catch (err) {
            console.error('[SignUp] Error:', err);
            setError(err.message || 'Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <div className="card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Conta Criada com Sucesso!</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                        Sua conta foi criada. Você será redirecionado para o login...
                    </p>
                    <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '2rem' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '2rem', fontWeight: 'bold' }}>
                        🏢 Cadastre sua Empresa
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                        Preencha o CNPJ e veja a mágica acontecer ✨
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* CNPJ - First field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            🏢 CNPJ da Empresa *
                        </label>
                        <input
                            type="text"
                            placeholder="00.000.000/0001-00"
                            value={formData.cnpj}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange('cnpj', value);

                                // Auto-format as user types
                                if (value.replace(/\D/g, '').length === 14) {
                                    handleCNPJBlur();
                                }
                            }}
                            onBlur={handleCNPJBlur}
                            maxLength={18}
                            required
                            disabled={loading && !formData.cnpj}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: cnpjData ? '2px solid #10b981' : '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#ffffff',
                                outline: 'none'
                            }}
                        />
                        {cnpjData && (
                            <div style={{ marginTop: '0.75rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', fontSize: '0.9rem' }}>
                                <div style={{ fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem', fontSize: '1rem' }}>✓ Empresa Encontrada na Receita Federal!</div>
                                <div style={{ color: '#d1fae5', fontSize: '0.85rem' }}>
                                    <div><strong>Razão Social:</strong> {cnpjData.razao_social}</div>
                                    {cnpjData.cnae_desc && <div style={{ marginTop: '0.25rem' }}><strong>Ramo:</strong> {cnpjData.cnae_desc}</div>}
                                    {cnpjData.endereco && (
                                        <div style={{ marginTop: '0.25rem' }}>
                                            <strong>Endereço:</strong> {cnpjData.endereco.logradouro}, {cnpjData.endereco.numero} - {cnpjData.endereco.bairro}, {cnpjData.endereco.municipio}/{cnpjData.endereco.uf}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Company Name - Auto-filled, disabled */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            📋 Nome da Empresa {cnpjData && <span style={{ fontSize: '0.75rem', color: '#10b981', marginLeft: '0.5rem' }}>✓ Preenchido automaticamente</span>}
                        </label>
                        <input
                            type="text"
                            placeholder="Preencha o CNPJ primeiro"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            required
                            disabled={!cnpjData}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: cnpjData ? 'rgba(16, 185, 129, 0.05)' : 'rgba(100, 116, 139, 0.1)',
                                color: cnpjData ? '#d1fae5' : '#64748b',
                                outline: 'none',
                                cursor: cnpjData ? 'not-allowed' : 'default'
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            📧 Email (será seu usuário) *
                        </label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#ffffff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* WhatsApp */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            📱 WhatsApp *
                        </label>
                        <input
                            type="tel"
                            placeholder="(00) 00000-0000"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#ffffff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            🔒 Senha *
                        </label>
                        <input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                            minLength={6}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#ffffff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            🔒 Confirmar Senha *
                        </label>
                        <input
                            type="password"
                            placeholder="Digite a senha novamente"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid rgba(226, 232, 240, 0.3)',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#ffffff',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', border: '1px solid #ef4444', borderRadius: '8px', fontSize: '0.9rem' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Infographic - How it works */}
                    {cnpjData && (
                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.85rem', color: '#bfdbfe' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#60a5fa' }}>🎯 O que acontece ao cadastrar:</div>
                                <div>✓ Dados da Receita Federal já validados</div>
                                <div>✓ Integração automática com eSocial</div>
                                <div>✓ PGR e PCMSO gerados em minutos</div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !cnpjData}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1.1rem',
                            marginBottom: '1rem',
                            background: cnpjData ? '#10b981' : '#64748b',
                            cursor: loading || !cnpjData ? 'not-allowed' : 'pointer',
                            opacity: loading || !cnpjData ? 0.6 : 1
                        }}
                    >
                        {loading ? '🔄 Criando conta...' : cnpjData ? '✨ Criar Conta Grátis' : '⏳ Preencha o CNPJ primeiro'}
                    </button>

                    {/* Back to Login */}
                    <div style={{ textAlign: 'center' }}>
                        <button
                            type="button"
                            onClick={onBackToLogin}
                            style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                        >
                            Já tem conta? Fazer login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpView;

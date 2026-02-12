import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

const PasswordChangeView = ({ user, onComplete }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        if (newPassword.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('companies')
                .update({ password_hash: newPassword })
                .eq('id', user.id);

            if (error) throw error;

            alert('✅ Senha alterada com sucesso!');
            onComplete();
        } catch (err) {
            console.error('Error changing password:', err);
            alert('Erro ao alterar senha.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', padding: '2rem' }}>
            <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', width: '100%', maxWidth: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#1e293b' }}>Primeiro Acesso</h2>
                <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' }}>
                    Para sua segurança, você deve alterar sua senha padrão antes de prosseguir.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Nova Senha</label>
                        <input
                            required
                            type="password"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Confirmar Nova Senha</label>
                        <input
                            required
                            type="password"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="btn-primary"
                        style={{ background: '#10b981', marginTop: '1rem' }}
                    >
                        {loading ? 'Salvando...' : 'Definir Senha e Acessar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeView;

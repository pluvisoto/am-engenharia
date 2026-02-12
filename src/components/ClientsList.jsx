import React, { useState, useEffect } from 'react';
import { getClients, deleteClient } from '../utils/storage';

const ClientsList = ({ onSelectClient, onNewClient, onEditClient }) => {
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = async () => {
        setLoading(true);
        setError(null);
        console.log('[ClientsList] Loading clients...');
        const result = await getClients();
        console.log('[ClientsList] Load result:', result);

        if (result && result.success) {
            const data = result.data;
            // Sort by created_at or updated_at desc
            if (data && Array.isArray(data)) {
                data.sort((a, b) => {
                    const dateA = new Date(b.updated_at || b.created_at || 0);
                    const dateB = new Date(a.updated_at || a.created_at || 0);
                    return dateA - dateB;
                });
                setClients(data);
            } else {
                setClients([]);
            }
        } else {
            console.error('[ClientsList] Error loading clients:', result?.error);
            setError(result?.error || 'Erro desconhecido ao carregar clientes');
            setClients([]);
        }
        setLoading(false);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
            await deleteClient(id); // Use id instead of cnpj for consistency if possible
            loadClients();
        }
    };

    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.cnpj.includes(searchTerm)
    );

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Carteira de Clientes</h2>
                    <p style={{ color: '#64748b' }}>Gerencie suas empresas e documentos salvos.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>

                    <button onClick={onNewClient} className="btn-primary" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <span>+</span> Nova Empresa
                    </button>
                </div>
            </div>

            <input
                type="text"
                placeholder="Buscar por nome ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', marginBottom: '2rem' }}
            />

            {error && (
                <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #ef4444', borderRadius: '8px', color: '#b91c1c', marginBottom: '2rem', textAlign: 'center' }}>
                    <strong>⚠️ Erro ao carregar dados:</strong> {error}
                    <button onClick={loadClients} style={{ marginLeft: '10px', background: '#dc2626', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>Tentar Novamente</button>
                </div>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem' }}>Carregando...</div>
            ) : clients.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '8px', border: '2px dashed #e2e8f0' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '1rem' }}>Sua carteira está vazia.</p>
                    <button onClick={onNewClient} style={{ color: 'var(--primary)', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>Começar Agora</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filtered.map(client => (
                        <div
                            key={client.cnpj}
                            onClick={() => onSelectClient(client)}
                            className="client-card"
                            style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span className={`badge badge-${client.grau_risco > 2 ? 'warning' : 'success'}`}>Risco {client.grau_risco || 1}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditClient && onEditClient(client);
                                        }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Editar Dados"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, client.id)}
                                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Excluir"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{client.name}</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '5px' }}>{client.cnpj}</p>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{client.cnae}</p>

                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', fontSize: '0.8rem', color: '#94a3b8', justifyContent: 'space-between' }}>
                                <span>Atualizado em:</span>
                                <span>{new Date(client.updated_at || client.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        .client-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-color: var(--primary); }
      `}</style>
        </div>
    );
};

export default ClientsList;

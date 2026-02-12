import React, { useMemo } from 'react';
import { getClients } from '../utils/storage';

const Dashboard = () => {
    const [clients, setClients] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            const result = await getClients();
            if (result.success) {
                setClients(result.data || []);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const stats = useMemo(() => {
        let totalPGR = 0;
        let totalPCMSO = 0;
        let totalMEI = 0;
        let potentialRevenue = 0;
        let pendingReview = 0;

        // Pricing Config (AM Engenharia Base)
        const PRICE_PGR = 650;
        const PRICE_PCMSO = 450;
        const PRICE_MEI = 250;
        const PRICE_DIR = 150;

        clients.forEach(client => {
            if (client.workflow_status === 'pending_review' || client.workflow_status === 'intake_completed') {
                pendingReview++;
            }

            if (client.mei) {
                totalMEI++;
                potentialRevenue += PRICE_MEI;
            } else if (client.grau_risco > 2) {
                totalPGR++;
                totalPCMSO++;
                potentialRevenue += (PRICE_PGR + PRICE_PCMSO);
            } else {
                potentialRevenue += PRICE_DIR;
            }
        });

        return {
            totalClients: clients.length,
            totalPGR,
            totalPCMSO,
            totalMEI,
            potentialRevenue,
            pendingReview
        };
    }, [clients]);

    const Card = ({ title, value, color, icon }) => (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderLeft: `5px solid ${color}`,
            flex: 1,
            minWidth: '200px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</h3>
                    <p style={{ margin: '10px 0 0', fontSize: '1.8rem', fontWeight: 'bold', color: '#1e293b' }}>{value}</p>
                </div>
                <div style={{ fontSize: '2rem', opacity: 0.2 }}>{icon}</div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', fontSize: '1.2rem', color: '#64748b' }}>
                <div className="spinner" style={{ marginRight: '15px' }}>⏳</div> Carregando métricas da carteira...
            </div>
        );
    }

    return (
        <div style={{ padding: '0.5rem', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ color: '#1e293b', margin: 0, fontWeight: '800' }}>Dashboard de Gestão AM</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Visão geral da sua operação e faturamento em tempo real.</p>
                </div>
                <div style={{ background: '#ecfdf5', color: '#059669', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    ● Sistema Online
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <Card
                    title="Faturamento Potencial"
                    value={`R$ ${stats.potentialRevenue.toLocaleString('pt-BR')},00`}
                    color="#10b981"
                    icon="💰"
                />
                <Card
                    title="Total de Clientes"
                    value={stats.totalClients}
                    color="#3b82f6"
                    icon="👥"
                />
                <Card
                    title="Aguardando Revisão"
                    value={stats.pendingReview}
                    color="#ef4444"
                    icon="✍️"
                />
                <Card
                    title="Contratos GRS 3-4"
                    value={stats.totalPGR}
                    color="#f59e0b"
                    icon="🛡️"
                />
                <Card
                    title="Fichas MEI"
                    value={stats.totalMEI}
                    color="#8b5cf6"
                    icon="🏷️"
                />
            </div>

            {/* Workflow Funnel & Analysis */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 350px', gap: '2rem', marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.1rem' }}>Funil de Produção (Documentos)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {[
                            { label: 'Em Coleta (Intake)', count: clients.filter(c => !c.workflow_status || c.workflow_status === 'draft').length, color: '#94a3b8' },
                            { label: 'Aguardando Revisão', count: stats.pendingReview, color: '#f59e0b' },
                            { label: 'Aprovado / Finalizado', count: clients.filter(c => c.workflow_status === 'approved').length, color: '#10b981' }
                        ].map((stage, i) => {
                            const percentage = stats.totalClients > 0 ? (stage.count / stats.totalClients) * 100 : 0;
                            return (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                                        <span>{stage.label}</span>
                                        <span style={{ fontWeight: 'bold' }}>{stage.count} ({Math.round(percentage)}%)</span>
                                    </div>
                                    <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percentage}%`, height: '100%', background: stage.color, transition: 'width 0.5s ease' }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={{ background: '#1e293b', color: 'white', padding: '25px', borderRadius: '12px' }}>
                    <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase' }}>🔔 Ações Recomendadas</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {stats.pendingReview > 0 && (
                            <li style={{ display: 'flex', gap: '10px' }}>
                                <span>⚡</span>
                                <div><strong>Revisão Urgente:</strong> Você tem {stats.pendingReview} documentos aguardando validação técnica.</div>
                            </li>
                        )}
                        {clients.filter(c => !c.cnae).length > 0 && (
                            <li style={{ display: 'flex', gap: '10px' }}>
                                <span>📝</span>
                                <div><strong>Completar Cadastros:</strong> {clients.filter(c => !c.cnae).length} empresas estão com dados fiscais incompletos.</div>
                            </li>
                        )}
                        <li style={{ display: 'flex', gap: '10px' }}>
                            <span>📈</span>
                            <div><strong>Dica AM:</strong> Empresas de Grau 3/4 representam {Math.round((stats.totalPGR / stats.totalClients) * 100)}% do seu faturamento potencial.</div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Detailed Table */}
            <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Detalhamento da Carteira</h3>
                </div>
                {clients.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nenhuma empresa cadastrada na sua carteira.</p>
                        <p style={{ fontSize: '0.9rem' }}>Clique em "Clientes" no menu superior para adicionar uma nova empresa via CNPJ.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f1f5f9' }}>
                            <tr>
                                <th style={thStyle}>Empresa</th>
                                <th style={thStyle}>Tipo</th>
                                <th style={thStyle}>Serviços Previstos</th>
                                <th style={thStyle}>Valor Est.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => {
                                let services = [];
                                let val = 0;
                                if (client.mei) {
                                    services.push('Ficha MEI');
                                    val = 250;
                                } else if (client.grau_risco > 2) {
                                    services.push('PGR', 'PCMSO');
                                    val = 1100;
                                } else {
                                    services.push('DIR');
                                    val = 150;
                                }

                                return (
                                    <tr key={client.cnpj} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: 'bold' }}>{client.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{client.cnpj}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                background: client.workflow_status === 'pending_review' ? '#ffedd5' :
                                                    client.workflow_status === 'approved' ? '#dcfce7' : '#f1f5f9',
                                                color: client.workflow_status === 'pending_review' ? '#9a3412' :
                                                    client.workflow_status === 'approved' ? '#166534' : '#475569'
                                            }}>
                                                {client.workflow_status?.toUpperCase() || 'EM COLETA'}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>{services.join(' + ')}</td>
                                        <td style={{ ...tdStyle, fontWeight: 'bold', color: '#10b981' }}>
                                            R$ {val},00
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

const thStyle = { padding: '15px', textAlign: 'left', fontSize: '0.9rem', color: '#475569', fontWeight: '600' };
const tdStyle = { padding: '15px', fontSize: '0.95rem', color: '#334155' };

export default Dashboard;

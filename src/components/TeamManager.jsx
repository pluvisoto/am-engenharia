import React, { useState, useEffect } from 'react';
import {
    getTechnicalResponsibles,
    createTechnicalResponsible,
    updateTechnicalResponsible,
    deleteTechnicalResponsible
} from '../utils/storage';
import TeamMemberCard from './TeamMemberCard';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        profession: 'Engenheiro de Segurança do Trabalho',
        registration_type: 'CREA',
        registration_number: '',
        registration_state: 'SP',
        specialization: ''
    });

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = async () => {
        setLoading(true);
        const { success, data } = await getTechnicalResponsibles();
        if (success) {
            // Map db fields to UI expectations for compatibility with TeamMemberCard
            // DB: profession, registration_number, specialization (string)
            // UI Card: role, registration, skills (array)
            const mapped = data.map(d => ({
                ...d,
                role: d.profession,
                registration: `${d.registration_type} ${d.registration_number}/${d.registration_state}`,
                skills: d.specialization ? d.specialization.split(',').map(s => s.trim()) : []
            }));
            setTeam(mapped);
        } else {
            console.error("Failed to load team");
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.registration_number) {
            alert('Preencha Nome e Número de Registro');
            return;
        }

        setLoading(true);
        let result;

        const payload = {
            name: formData.name,
            profession: formData.profession,
            registration_type: formData.registration_type,
            registration_number: formData.registration_number,
            registration_state: formData.registration_state,
            specialization: formData.specialization,
            // Defaults for required fields not in form
            phone: '',
            email: ''
        };

        if (formData.id) {
            result = await updateTechnicalResponsible(formData.id, payload);
        } else {
            result = await createTechnicalResponsible(payload);
        }

        if (result.success) {
            setIsEditing(false);
            resetForm();
            loadTeam();
        } else {
            alert('Erro ao salvar: ' + (result.error?.message || result.error || 'Erro desconhecido'));
        }
        setLoading(false);
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            profession: 'Engenheiro de Segurança do Trabalho',
            registration_type: 'CREA',
            registration_number: '',
            registration_state: 'SP',
            specialization: ''
        });
    };

    const handleEdit = (member) => {
        // Map back from UI model to Form model
        setFormData({
            id: member.id,
            name: member.name,
            profession: member.profession || member.role, // fallback
            registration_type: member.registration_type || 'CREA',
            registration_number: member.registration_number || '', // If mapped string, might be lost, but member object should have original db fields due to ...d spread
            registration_state: member.registration_state || 'SP',
            specialization: member.specialization || (member.skills ? member.skills.join(', ') : '')
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remover este profissional da equipe?')) {
            setLoading(true);
            await deleteTechnicalResponsible(id);
            loadTeam();
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Equipe Técnica & Qualificações</h2>

            {!isEditing ? (
                <div>
                    <button
                        onClick={() => { resetForm(); setIsEditing(true); }}
                        className="btn-primary"
                        style={{ marginBottom: '2rem' }}
                    >
                        + Novo Profissional
                    </button>

                    {loading ? <p>Carregando...</p> : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {team.map(member => (
                                <TeamMemberCard
                                    key={member.id}
                                    member={member}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}

                    {!loading && team.length === 0 && (
                        <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '40px' }}>
                            Nenhum profissional cadastrado. Adicione sua equipe técnica.
                        </p>
                    )}
                </div>
            ) : (
                <div className="card" style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
                        {formData.id ? 'Editar Profissional' : 'Novo Cadastro'}
                    </h3>

                    <label style={{ display: 'block', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Nome Completo *</span>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px'
                            }}
                        />
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Cargo / Função</span>
                            <select
                                value={formData.profession}
                                onChange={e => setFormData({ ...formData, profession: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px'
                                }}
                            >
                                <option>Engenheiro de Segurança do Trabalho</option>
                                <option>Técnico de Segurança do Trabalho</option>
                                <option>Médico do Trabalho</option>
                                <option>Higienista Ocupacional</option>
                                <option>Ergonomista</option>
                            </select>
                        </label>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', flex: 1 }}>
                                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Tipo</span>
                                <select
                                    value={formData.registration_type}
                                    onChange={e => setFormData({ ...formData, registration_type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <option>CREA</option>
                                    <option>CRM</option>
                                    <option>MTE</option>
                                </select>
                            </label>
                            <label style={{ display: 'block', marginBottom: '1rem', flex: 1 }}>
                                <span style={{ fontSize: '0.9rem', color: '#64748b' }}>UF</span>
                                <select
                                    value={formData.registration_state}
                                    onChange={e => setFormData({ ...formData, registration_state: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '5px',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <option>SP</option>
                                    <option>RJ</option>
                                    <option>MG</option>
                                    <option>ES</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <label style={{ display: 'block', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Número do Registro *</span>
                        <input
                            type="text"
                            required
                            placeholder="Ex: 1234567890"
                            value={formData.registration_number}
                            onChange={e => setFormData({ ...formData, registration_number: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px'
                            }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Especializações / Competências</span>
                        <textarea
                            value={formData.specialization}
                            onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                            placeholder="Ex: Higiene Ocupacional, Ergonomia, Perícias..."
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                                height: '80px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                fontFamily: 'inherit'
                            }}
                        />
                    </label>

                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '1rem' }}>Anexar Documentos de Credenciamento</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px' }}>
                                📁 Certificado de Especialidade
                            </button>
                            <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px' }}>
                                📁 CRM / RQE (Frente e Verso)
                            </button>
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '10px' }}>
                            * Estes documentos serão anexados automaticamente ao PCMSO deste profissional.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => { setIsEditing(false); resetForm(); }}
                            style={{ padding: '10px 20px', border: 'none', background: '#e2e8f0', cursor: 'pointer', borderRadius: '4px' }}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            className="btn-primary"
                        >
                            {loading ? 'Salvando...' : 'Salvar no Banco de Dados'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManager;

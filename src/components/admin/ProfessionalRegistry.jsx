import React, { useState, useEffect } from 'react';
import {
    getMedicalCoordinators,
    createMedicalCoordinator,
    updateMedicalCoordinator,
    deleteMedicalCoordinator,
    getTechnicalResponsibles,
    createTechnicalResponsible,
    updateTechnicalResponsible,
    deleteTechnicalResponsible,
    getReferenceHospitals,
    createReferenceHospital,
    updateReferenceHospital,
    deleteReferenceHospital
} from '../../utils/storage';

const ProfessionalRegistry = () => {
    const [activeTab, setActiveTab] = useState('medicos');
    const [loading, setLoading] = useState(false);

    // Data lists
    const [medicos, setMedicos] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [hospitais, setHospitais] = useState([]);

    // Forms visibility
    const [showMedicoForm, setShowMedicoForm] = useState(false);
    const [showTecnicoForm, setShowTecnicoForm] = useState(false);
    const [showHospitalForm, setShowHospitalForm] = useState(false);

    // Edit mode
    const [editingMedico, setEditingMedico] = useState(null);
    const [editingTecnico, setEditingTecnico] = useState(null);
    const [editingHospital, setEditingHospital] = useState(null);

    // Form data
    const [medicoForm, setMedicoForm] = useState({
        name: '', crm: '', crm_state: 'SP', cpf: '', specialty: '',
        clinic_name: '', clinic_address: '', clinic_phone: '', clinic_email: ''
    });
    const [tecnicoForm, setTecnicoForm] = useState({
        name: '', profession: 'Engenheiro de Segurança do Trabalho',
        registration_type: 'CREA', registration_number: '', registration_state: 'SP',
        cpf: '', specialization: '', address: '', phone: '', email: ''
    });
    const [hospitalForm, setHospitalForm] = useState({
        name: '', address: '', city: '', state: 'SP', zip_code: '',
        phone: '', emergency_phone: '', has_occupational_medicine: false, notes: ''
    });

    // Load data on mount
    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        setLoading(true);
        const [medResult, tecResult, hospResult] = await Promise.all([
            getMedicalCoordinators(),
            getTechnicalResponsibles(),
            getReferenceHospitals()
        ]);

        if (medResult.success) setMedicos(medResult.data);
        if (tecResult.success) setTecnicos(tecResult.data);
        if (hospResult.success) setHospitais(hospResult.data);
        setLoading(false);
    };

    // ===== MÉDICOS =====
    const handleSaveMedico = async () => {
        setLoading(true);
        let result;
        if (editingMedico) {
            result = await updateMedicalCoordinator(editingMedico.id, medicoForm);
        } else {
            result = await createMedicalCoordinator(medicoForm);
        }

        if (result.success) {
            alert('✅ Médico salvo com sucesso!');
            setShowMedicoForm(false);
            setEditingMedico(null);
            setMedicoForm({
                name: '', crm: '', crm_state: 'SP', cpf: '', specialty: '',
                clinic_name: '', clinic_address: '', clinic_phone: '', clinic_email: ''
            });
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
        setLoading(false);
    };

    const handleEditMedico = (medico) => {
        setEditingMedico(medico);
        setMedicoForm(medico);
        setShowMedicoForm(true);
    };

    const handleDeleteMedico = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este médico?')) return;
        const result = await deleteMedicalCoordinator(id);
        if (result.success) {
            alert('✅ Médico excluído!');
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
    };

    // ===== TÉCNICOS =====
    const handleSaveTecnico = async () => {
        setLoading(true);
        let result;
        if (editingTecnico) {
            result = await updateTechnicalResponsible(editingTecnico.id, tecnicoForm);
        } else {
            result = await createTechnicalResponsible(tecnicoForm);
        }

        if (result.success) {
            alert('✅ Responsável técnico salvo com sucesso!');
            setShowTecnicoForm(false);
            setEditingTecnico(null);
            setTecnicoForm({
                name: '', profession: 'Engenheiro de Segurança do Trabalho',
                registration_type: 'CREA', registration_number: '', registration_state: 'SP',
                cpf: '', specialization: '', address: '', phone: '', email: ''
            });
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
        setLoading(false);
    };

    const handleEditTecnico = (tecnico) => {
        setEditingTecnico(tecnico);
        setTecnicoForm(tecnico);
        setShowTecnicoForm(true);
    };

    const handleDeleteTecnico = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este responsável técnico?')) return;
        const result = await deleteTechnicalResponsible(id);
        if (result.success) {
            alert('✅ Responsável técnico excluído!');
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
    };

    // ===== HOSPITAIS =====
    const handleSaveHospital = async () => {
        setLoading(true);
        let result;
        if (editingHospital) {
            result = await updateReferenceHospital(editingHospital.id, hospitalForm);
        } else {
            result = await createReferenceHospital(hospitalForm);
        }

        if (result.success) {
            alert('✅ Hospital salvo com sucesso!');
            setShowHospitalForm(false);
            setEditingHospital(null);
            setHospitalForm({
                name: '', address: '', city: '', state: 'SP', zip_code: '',
                phone: '', emergency_phone: '', has_occupational_medicine: false, notes: ''
            });
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
        setLoading(false);
    };

    const handleEditHospital = (hospital) => {
        setEditingHospital(hospital);
        setHospitalForm(hospital);
        setShowHospitalForm(true);
    };

    const handleDeleteHospital = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este hospital?')) return;
        const result = await deleteReferenceHospital(id);
        if (result.success) {
            alert('✅ Hospital excluído!');
            loadAll();
        } else {
            alert('❌ Erro: ' + result.error);
        }
    };

    const brazilianStates = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>⚕️ Equipe Técnica</h1>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                Cadastre médicos coordenadores, responsáveis técnicos e hospitais de referência
            </p>

            {/* TABS */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #e2e8f0', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('medicos')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'medicos' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'medicos' ? 'white' : '#64748b',
                        border: 'none',
                        borderBottom: activeTab === 'medicos' ? '3px solid var(--accent)' : 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    🩺 Médicos Coordenadores ({medicos.length})
                </button>
                <button
                    onClick={() => setActiveTab('tecnicos')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'tecnicos' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'tecnicos' ? 'white' : '#64748b',
                        border: 'none',
                        borderBottom: activeTab === 'tecnicos' ? '3px solid var(--accent)' : 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    👷 Responsáveis Técnicos ({tecnicos.length})
                </button>
                <button
                    onClick={() => setActiveTab('hospitais')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: activeTab === 'hospitais' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'hospitais' ? 'white' : '#64748b',
                        border: 'none',
                        borderBottom: activeTab === 'hospitais' ? '3px solid var(--accent)' : 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    🏥 Hospitais de Referência ({hospitais.length})
                </button>
            </div>

            {/* ========== MÉDICOS TAB ========== */}
            {activeTab === 'medicos' && (
                <div>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setShowMedicoForm(!showMedicoForm);
                            setEditingMedico(null);
                            setMedicoForm({
                                name: '', crm: '', crm_state: 'SP', cpf: '', specialty: '',
                                clinic_name: '', clinic_address: '', clinic_phone: '', clinic_email: ''
                            });
                        }}
                        style={{ marginBottom: '1rem' }}
                    >
                        {showMedicoForm ? '❌ Cancelar' : '➕ Adicionar Médico'}
                    </button>

                    {/* FORM */}
                    {showMedicoForm && (
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h3>{editingMedico ? 'Editar Médico' : 'Novo Médico'}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="text" placeholder="Nome completo *" value={medicoForm.name} onChange={e => setMedicoForm({ ...medicoForm, name: e.target.value })} />
                                <input type="text" placeholder="CRM *" value={medicoForm.crm} onChange={e => setMedicoForm({ ...medicoForm, crm: e.target.value })} />
                                <select value={medicoForm.crm_state} onChange={e => setMedicoForm({ ...medicoForm, crm_state: e.target.value })}>
                                    {brazilianStates.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                                <input type="text" placeholder="CPF" value={medicoForm.cpf} onChange={e => setMedicoForm({ ...medicoForm, cpf: e.target.value })} />
                                <input type="text" placeholder="Especialidade (ex: Medicina do Trabalho)" value={medicoForm.specialty} onChange={e => setMedicoForm({ ...medicoForm, specialty: e.target.value })} />
                                <input type="text" placeholder="Nome da clínica" value={medicoForm.clinic_name} onChange={e => setMedicoForm({ ...medicoForm, clinic_name: e.target.value })} />
                                <input type="text" placeholder="Endereço da clínica" value={medicoForm.clinic_address} onChange={e => setMedicoForm({ ...medicoForm, clinic_address: e.target.value })} style={{ gridColumn: '1 / -1' }} />
                                <input type="tel" placeholder="Telefone da clínica" value={medicoForm.clinic_phone} onChange={e => setMedicoForm({ ...medicoForm, clinic_phone: e.target.value })} />
                                <input type="email" placeholder="Email da clínica" value={medicoForm.clinic_email} onChange={e => setMedicoForm({ ...medicoForm, clinic_email: e.target.value })} />
                            </div>
                            <button className="btn-primary" onClick={handleSaveMedico} disabled={loading} style={{ marginTop: '1rem' }}>
                                {loading ? 'Salvando...' : '💾 Salvar'}
                            </button>
                        </div>
                    )}

                    {/* LIST */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {medicos.map(med => (
                            <div key={med.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--primary)' }}>{med.name}</h4>
                                    <p style={{ margin: '0.25rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                                        CRM: {med.crm}/{med.crm_state} {med.specialty && `• ${med.specialty}`}
                                    </p>
                                    {med.clinic_name && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>🏥 {med.clinic_name}</p>}
                                    {med.clinic_phone && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>📞 {med.clinic_phone}</p>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-secondary" onClick={() => handleEditMedico(med)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>✏️ Editar</button>
                                    <button className="btn-danger" onClick={() => handleDeleteMedico(med.id)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: '#dc2626', color: 'white' }}>🗑️ Excluir</button>
                                </div>
                            </div>
                        ))}
                        {medicos.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Nenhum médico cadastrado ainda.</p>}
                    </div>
                </div>
            )}

            {/* ========== TÉCNICOS TAB ========== */}
            {activeTab === 'tecnicos' && (
                <div>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setShowTecnicoForm(!showTecnicoForm);
                            setEditingTecnico(null);
                            setTecnicoForm({
                                name: '', profession: 'Engenheiro de Segurança do Trabalho',
                                registration_type: 'CREA', registration_number: '', registration_state: 'SP',
                                cpf: '', specialization: '', address: '', phone: '', email: ''
                            });
                        }}
                        style={{ marginBottom: '1rem' }}
                    >
                        {showTecnicoForm ? '❌ Cancelar' : '➕ Adicionar Responsável Técnico'}
                    </button>

                    {/* FORM */}
                    {showTecnicoForm && (
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h3>{editingTecnico ? 'Editar Responsável Técnico' : 'Novo Responsável Técnico'}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="text" placeholder="Nome completo *" value={tecnicoForm.name} onChange={e => setTecnicoForm({ ...tecnicoForm, name: e.target.value })} />
                                <select value={tecnicoForm.profession} onChange={e => setTecnicoForm({ ...tecnicoForm, profession: e.target.value })}>
                                    <option value="Engenheiro de Segurança do Trabalho">Engenheiro de Segurança do Trabalho</option>
                                    <option value="Técnico de Segurança do Trabalho">Técnico de Segurança do Trabalho</option>
                                </select>
                                <select value={tecnicoForm.registration_type} onChange={e => setTecnicoForm({ ...tecnicoForm, registration_type: e.target.value })}>
                                    <option value="CREA">CREA</option>
                                    <option value="CRT">CRT</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                <input type="text" placeholder="Número do registro *" value={tecnicoForm.registration_number} onChange={e => setTecnicoForm({ ...tecnicoForm, registration_number: e.target.value })} />
                                <select value={tecnicoForm.registration_state} onChange={e => setTecnicoForm({ ...tecnicoForm, registration_state: e.target.value })}>
                                    {brazilianStates.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                                <input type="text" placeholder="CPF" value={tecnicoForm.cpf} onChange={e => setTecnicoForm({ ...tecnicoForm, cpf: e.target.value })} />
                                <input type="text" placeholder="Especialização" value={tecnicoForm.specialization} onChange={e => setTecnicoForm({ ...tecnicoForm, specialization: e.target.value })} style={{ gridColumn: '1 / -1' }} />
                                <input type="text" placeholder="Endereço" value={tecnicoForm.address} onChange={e => setTecnicoForm({ ...tecnicoForm, address: e.target.value })} style={{ gridColumn: '1 / -1' }} />
                                <input type="tel" placeholder="Telefone" value={tecnicoForm.phone} onChange={e => setTecnicoForm({ ...tecnicoForm, phone: e.target.value })} />
                                <input type="email" placeholder="Email" value={tecnicoForm.email} onChange={e => setTecnicoForm({ ...tecnicoForm, email: e.target.value })} />
                            </div>
                            <button className="btn-primary" onClick={handleSaveTecnico} disabled={loading} style={{ marginTop: '1rem' }}>
                                {loading ? 'Salvando...' : '💾 Salvar'}
                            </button>
                        </div>
                    )}

                    {/* LIST */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {tecnicos.map(tec => (
                            <div key={tec.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--primary)' }}>{tec.name}</h4>
                                    <p style={{ margin: '0.25rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                                        {tec.profession}
                                    </p>
                                    <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>
                                        📋 {tec.registration_type}: {tec.registration_number}/{tec.registration_state}
                                    </p>
                                    {tec.phone && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>📞 {tec.phone}</p>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-secondary" onClick={() => handleEditTecnico(tec)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>✏️ Editar</button>
                                    <button className="btn-danger" onClick={() => handleDeleteTecnico(tec.id)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: '#dc2626', color: 'white' }}>🗑️ Excluir</button>
                                </div>
                            </div>
                        ))}
                        {tecnicos.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Nenhum responsável técnico cadastrado ainda.</p>}
                    </div>
                </div>
            )}

            {/* ========== HOSPITAIS TAB ========== */}
            {activeTab === 'hospitais' && (
                <div>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setShowHospitalForm(!showHospitalForm);
                            setEditingHospital(null);
                            setHospitalForm({
                                name: '', address: '', city: '', state: 'SP', zip_code: '',
                                phone: '', emergency_phone: '', has_occupational_medicine: false, notes: ''
                            });
                        }}
                        style={{ marginBottom: '1rem' }}
                    >
                        {showHospitalForm ? '❌ Cancelar' : '➕ Adicionar Hospital'}
                    </button>

                    {/* FORM */}
                    {showHospitalForm && (
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                            <h3>{editingHospital ? 'Editar Hospital' : 'Novo Hospital'}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input type="text" placeholder="Nome do hospital *" value={hospitalForm.name} onChange={e => setHospitalForm({ ...hospitalForm, name: e.target.value })} style={{ gridColumn: '1 / -1' }} />
                                <input type="text" placeholder="Endereço completo *" value={hospitalForm.address} onChange={e => setHospitalForm({ ...hospitalForm, address: e.target.value })} style={{ gridColumn: '1 / -1' }} />
                                <input type="text" placeholder="Cidade *" value={hospitalForm.city} onChange={e => setHospitalForm({ ...hospitalForm, city: e.target.value })} />
                                <select value={hospitalForm.state} onChange={e => setHospitalForm({ ...hospitalForm, state: e.target.value })}>
                                    {brazilianStates.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                                </select>
                                <input type="text" placeholder="CEP" value={hospitalForm.zip_code} onChange={e => setHospitalForm({ ...hospitalForm, zip_code: e.target.value })} />
                                <input type="tel" placeholder="Telefone principal *" value={hospitalForm.phone} onChange={e => setHospitalForm({ ...hospitalForm, phone: e.target.value })} />
                                <input type="tel" placeholder="Telefone de emergência" value={hospitalForm.emergency_phone} onChange={e => setHospitalForm({ ...hospitalForm, emergency_phone: e.target.value })} />
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" checked={hospitalForm.has_occupational_medicine} onChange={e => setHospitalForm({ ...hospitalForm, has_occupational_medicine: e.target.checked })} />
                                    Possui Medicina Ocupacional
                                </label>
                                <textarea placeholder="Observações" value={hospitalForm.notes} onChange={e => setHospitalForm({ ...hospitalForm, notes: e.target.value })} style={{ gridColumn: '1 / -1', minHeight: '80px' }} />
                            </div>
                            <button className="btn-primary" onClick={handleSaveHospital} disabled={loading} style={{ marginTop: '1rem' }}>
                                {loading ? 'Salvando...' : '💾 Salvar'}
                            </button>
                        </div>
                    )}

                    {/* LIST */}
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {hospitais.map(hosp => (
                            <div key={hosp.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--primary)' }}>{hosp.name}</h4>
                                    <p style={{ margin: '0.25rem 0', color: '#64748b', fontSize: '0.9rem' }}>
                                        📍 {hosp.address}, {hosp.city}/{hosp.state}
                                    </p>
                                    <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>📞 {hosp.phone}</p>
                                    {hosp.emergency_phone && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>🚨 Emergência: {hosp.emergency_phone}</p>}
                                    {hosp.has_occupational_medicine && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--accent)' }}>✅ Medicina Ocupacional</p>}
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button className="btn-secondary" onClick={() => handleEditHospital(hosp)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>✏️ Editar</button>
                                    <button className="btn-danger" onClick={() => handleDeleteHospital(hosp.id)} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: '#dc2626', color: 'white' }}>🗑️ Excluir</button>
                                </div>
                            </div>
                        ))}
                        {hospitais.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>Nenhum hospital cadastrado ainda.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionalRegistry;

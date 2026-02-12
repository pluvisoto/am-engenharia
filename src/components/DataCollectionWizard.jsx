
import React, { useState, useEffect } from 'react';
import { getTeamMembers } from '../utils/storage';

const DataCollectionWizard = ({ onComplete, onCancel }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: RH
        horarioTrabalho: '08:00 às 18:00 (Comercial)',
        turnos: 'Diurno',
        numFuncionarios: '1',
        responsavelLegal: '',
        cpfResponsavel: '',
        cargoResponsavel: 'Sócio-Administrador',

        // Step 2: Instalações
        tipoEdificacao: 'Alvenaria',
        tipoPiso: 'Cerâmica / Porcelanato',
        tipoTeto: 'Laje de Concreto',
        iluminacao: 'Natural + Artificial (LED)',
        ventilacao: 'Natural (Janelas)',
        banheiros: 'Sim, separados por sexo',
        aguaPotavel: 'Filtro / Bebedouro',
        areaVivencia: 'Copa / Cozinha',

        // Step 3: Segurança
        possuiBrigada: 'Não',
        sistemaIncendio: 'Extintores Portáteis',
        possuiCipa: 'Designado NR-05',
        episAtuais: 'Básico (Botina de Segurança + Óculos)',
        epcsAtuais: 'Sinalização de Emergência',

        // Step 4: PCMSO Data
        hospitalReferencia: '',
        medicoCoordenador: 'Dr. Roberto Santos (Coordenador AM)',
        crmMedico: 'CRM/SP 123456',

        // Step 5: Equipe Técnica
        responsavelTecnico: ''
    });

    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        setTeamMembers(getTeamMembers());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step < 5) setStep(step + 1);
        else onComplete(formData);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else onCancel();
    };

    // Pre-defined Options
    const options = {
        horario: [
            '08:00 às 18:00 (Comercial)',
            '07:00 às 17:00 (Operacional)',
            '12x36 (Plantão)',
            '22:00 às 05:00 (Noturno)',
            'Horário Flexível'
        ],
        turnos: ['Diurno', 'Noturno', 'Revezamento (Turnos)', 'Misto'],
        cargos: ['Sócio-Administrador', 'Proprietário', 'Diretor', 'Gerente', 'Técnico Responsável'],
        edificacao: ['Alvenaria', 'Concreto Armado', 'Estrutura Metálica', 'Madeira / Pré-moldado', 'Container / Provisório', 'Galpão Industrial'],
        piso: ['Cerâmica / Porcelanato', 'Cimento Queimado / Concreto', 'Piso Vinílico / Laminado', 'Taco / Madeira', 'Chão Batido / Terra', 'Epóxi Industrial'],
        teto: ['Laje de Concreto', 'Forro de PVC', 'Forro de Gesso', 'Telha Metálica (Sem forro)', 'Telha de Fibrocimento', 'Estrutura Aparente'],
        iluminacao: ['Natural (Janelas/Domus)', 'Artificial (Lâmpadas LED)', 'Artificial (Fluorescente)', 'Mista (Natural + Artificial)'],
        ventilacao: ['Natural (Janelas/Portas)', 'Artificial (Ar Condicionado)', 'Mista (Ventiladores + Janelas)', 'Exaustão Mecânica'],
        banheiros: ['Sim, separados por sexo', 'Sim, unissex', 'Banheiros Químicos', 'Não possui (Uso externo)'],
        agua: ['Bebedouro Industrial', 'Filtro de Parede/Barro', 'Galão de Água Mineral', 'Torneira (Água da Rede)', 'Não disponibiliza'],
        vivencia: ['Copa / Cozinha Equipada', 'Refeitório', 'Área de Descanso Simples', 'Não possui'],
        brigada: ['Não', 'Sim, treinada', 'Dispensado (Menos de 20 func.)'],
        incendio: ['Extintores Portáteis', 'Extintores + Hidrantes', 'Sistema de Sprinklers', 'Não possui'],
        cipa: ['Designado NR-05', 'CIPA Constituída', 'Não se aplica'],
        epis: [
            'Básico (Botina de Segurança + Óculos)',
            'Construção (Capacete + Botina + Luva)',
            'Limpeza (Luva Látex + Bota PVC)',
            'Administrativo (Não aplicável)',
            'Eletricista (Uniforme RF + Luva + Capacete)',
            'Outros (Editar no documento final)'
        ],
        epcs: [
            'Sinalização de Emergência',
            'Sinalização + Guarda-corpos',
            'Exaustão Localizada',
            'Proteção de Partes Móveis',
            'Não aplicável'
        ]
    };

    const renderSelect = (label, name, opts) => (
        <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>{label} *</span>
            <select
                required
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white' }}
            >
                <option value="">-- Selecione --</option>
                {opts.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
        </label>
    );

    const renderInput = (label, name, type = 'text', placeholder = '') => (
        <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>{label} *</span>
            <input
                required
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
            />
        </label>
    );

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0, color: '#1e293b' }}>Assistente de Coleta ({step}/5)</h2>
                    <button onClick={onCancel} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button>
                </div>

                <div style={{ marginBottom: '1.5rem', height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${step * 20}%`, background: '#10b981', transition: 'width 0.3s' }}></div>
                </div>

                {step === 1 && (
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>1. Dados de RH e Responsáveis</h3>
                        {renderSelect('Horário de Trabalho', 'horarioTrabalho', options.horario)}
                        {renderSelect('Regime de Turnos', 'turnos', options.turnos)}
                        {renderInput('Número de Funcionários', 'numFuncionarios', 'number')}
                        {renderInput('Nome do Responsável Legal', 'responsavelLegal')}
                        {renderInput('CPF do Responsável', 'cpfResponsavel')}
                        {renderSelect('Cargo do Responsável', 'cargoResponsavel', options.cargos)}
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>2. Caracterização das Instalações</h3>
                        {renderSelect('Tipo de Edificação', 'tipoEdificacao', options.edificacao)}
                        {renderSelect('Tipo de Piso', 'tipoPiso', options.piso)}
                        {renderSelect('Tipo de Teto/Cobertura', 'tipoTeto', options.teto)}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {renderSelect('Iluminação', 'iluminacao', options.iluminacao)}
                            {renderSelect('Ventilação', 'ventilacao', options.ventilacao)}
                        </div>
                        {renderSelect('Instalações Sanitárias', 'banheiros', options.banheiros)}
                        {renderSelect('Água Potável', 'aguaPotavel', options.agua)}
                        {renderSelect('Área de Vivência', 'areaVivencia', options.vivencia)}
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>3. Segurança e Emergência</h3>
                        {renderSelect('Possui Brigada de Incêndio?', 'possuiBrigada', options.brigada)}
                        {renderSelect('Sist. Combate a Incêndio', 'sistemaIncendio', options.incendio)}
                        {renderSelect('Organização CIPA', 'possuiCipa', options.cipa)}
                        {renderSelect('EPIs Fornecidos Atualmente (Padrão)', 'episAtuais', options.epis)}
                        {renderSelect('EPCs (Proteção Coletiva)', 'epcsAtuais', options.epcs)}
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>4. Dados para PCMSO (Saúde)</h3>
                        <p style={{ fontSize: '0.9rem', color: 'gray', marginBottom: '1rem' }}>Caso não tenha médico coordenador ainda, deixe em branco.</p>
                        {renderInput('Hospital de Referência (Emergência)', 'hospitalReferencia', 'text', 'Ex: Santa Casa de Misericórdia')}
                        {renderInput('Médico Coordenador (Opcional)', 'medicoCoordenador')}
                        {renderInput('CRM do Médico', 'crmMedico')}
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <h3 style={{ marginBottom: '1rem', color: '#334155' }}>5. Responsável Técnico</h3>
                        <p style={{ fontSize: '0.9rem', color: 'gray', marginBottom: '1rem' }}>Selecione quem será o responsável técnico principal deste documento.</p>

                        <label style={{ display: 'block', marginBottom: '1rem' }}>
                            <span style={{ display: 'block', marginBottom: '0.3rem', fontWeight: '600' }}>Selecione o Profissional</span>
                            <select
                                name="responsavelTecnico"
                                value={formData.responsavelTecnico}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white' }}
                            >
                                <option value="">-- Selecione --</option>
                                {teamMembers.map(member => (
                                    <option key={member.id} value={member.id}>{member.name} - {member.role}</option>
                                ))}
                            </select>
                        </label>
                        {teamMembers.length === 0 && (
                            <p style={{ color: 'red', fontSize: '0.8rem' }}>Nenhum profissional cadastrado. Vá em "Minha Equipe" para adicionar.</p>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button
                        onClick={handleBack}
                        style={{ padding: '10px 20px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        {step === 1 ? 'Cancelar' : 'Voltar'}
                    </button>
                    <button
                        onClick={handleNext}
                        style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        {step === 5 ? 'Concluir' : 'Próximo'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default DataCollectionWizard;

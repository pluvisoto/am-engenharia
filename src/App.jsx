import React, { useState, useEffect, useRef } from 'react';
import { getFullClientData, getClientByUserId, getClients, getCompanyProfessionals } from './utils/storage';
import Dashboard from './components/Dashboard';
import ReviewView from './components/ReviewView';
import ClientDashboard from './components/ClientDashboard';
import ClientsList from './components/ClientsList';
import ProfessionalRegistry from './components/admin/ProfessionalRegistry';
import ClientIntakeForm from './components/ClientIntakeForm';
import { supabase } from './utils/supabase';

function App() {
  const [view, setView] = useState('dashboard');

  // LOGIN REMOVIDO: Usuario Admin Hardcoded para Desenvolvimento
  const [currentUser, setCurrentUser] = useState({
    id: 'dev-admin-id',
    email: 'admin@amengenharia.com',
    role: 'admin',
    name: 'Administrador (Dev Mode)'
  });

  const [companyData, setCompanyData] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState(null);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="app" style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f0f2f5' }}>
      <header className="no-print" style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 onClick={() => setView('dashboard')} style={{ cursor: 'pointer', fontSize: '1.2rem', margin: 0, fontWeight: '900' }}>AM ENGENHARIA <span style={{ fontSize: '0.7em', opacity: 0.8 }}>(Dev Mode)</span></h1>

          <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={() => setView('dashboard')} style={navLinkStyle(view === 'dashboard')}>Métricas</button>
            <button onClick={() => setView('clientes')} style={navLinkStyle(view === 'clientes')}>Clientes</button>
            <button onClick={() => setView('equipe')} style={navLinkStyle(view === 'equipe')}>Equipe Técnica</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '15px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{currentUser.name}</div>
                <div style={{ fontSize: '9px', opacity: 0.6 }}>{currentUser.role.toUpperCase()}</div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {errorHeader && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #fecaca' }}>⚠️ {errorHeader}</div>}

      <main className="container" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
        {view === 'dashboard' && <Dashboard />}
        {view === 'clientes' && <ClientsList
          onSelectClient={async (company) => {
            setErrorHeader(null);
            setLoading(true);
            try {
              setCompanyData(company);
              const result = await getFullClientData(company.id);
              if (result.success) {
                const fullData = result.data;
                setCompanyData(fullData); // Update with full data including intake_data

                // Fetch assigned professionals
                let profData = {};
                const { data: pros } = await getCompanyProfessionals(company.id);
                if (pros) {
                  profData = {
                    responsavelTecnico: pros.technical_responsible || null,
                    coordenadorMedico: pros.medical_coordinator || null
                  };
                }

                if (fullData.auto_generated_data) {
                  setExtraData({
                    sectors: fullData.auto_generated_data.sectors || [],
                    roles: fullData.auto_generated_data.roles || [],
                    epis: fullData.auto_generated_data.epis || [],
                    medical_exams: fullData.auto_generated_data.medical_exams || [],
                    action_plan: fullData.auto_generated_data.action_plan || [],
                    ...profData
                  });
                  setInventory(fullData.auto_generated_data.risk_inventory || []);
                } else {
                  setExtraData({ ...profData, sectors: [], roles: [], epis: [], medical_exams: [], action_plan: [] });
                  setInventory([]);
                }
              }
              setView('client_dashboard');
            } catch (e) {
              console.error(e);
              setErrorHeader('Erro ao carregar cliente.');
            } finally {
              setLoading(false);
            }
          }}
          onEditClient={async (company) => {
            // Reusing the same loading logic for Edit as Select for now
            setErrorHeader(null);
            setLoading(true);
            try {
              setCompanyData(company);
              const result = await getFullClientData(company.id);
              if (result.success) {
                const fullData = result.data;
                setCompanyData(fullData);

                // Fetch assigned professionals
                let profData = {};
                const { data: pros } = await getCompanyProfessionals(company.id);
                if (pros) {
                  profData = {
                    responsavelTecnico: pros.technical_responsible || null,
                    coordenadorMedico: pros.medical_coordinator || null
                  };
                }

                if (fullData.auto_generated_data) {
                  setExtraData({
                    sectors: fullData.auto_generated_data.sectors || [],
                    roles: fullData.auto_generated_data.roles || [],
                    epis: fullData.auto_generated_data.epis || [],
                    medical_exams: fullData.auto_generated_data.medical_exams || [],
                    action_plan: fullData.auto_generated_data.action_plan || [],
                    ...profData
                  });
                  setInventory(fullData.auto_generated_data.risk_inventory || []);
                } else {
                  setExtraData({ ...profData, sectors: [], roles: [], epis: [], medical_exams: [], action_plan: [] });
                  setInventory([]);
                }
              }
              setView('revisao'); // Jump straight to revision/editing
            } catch (e) {
              console.error(e);
              setErrorHeader('Erro ao carregar cliente para edição.');
            } finally {
              setLoading(false);
            }
          }}
          onNewClient={() => setView('intake')}
        />}
        {view === 'equipe' && <ProfessionalRegistry />}

        {view === 'client_dashboard' && (
          <ClientDashboard
            companyData={companyData}
            fullData={extraData}
            onStartIntake={() => setView('intake')}
            onViewDocs={(docType) => {
              const pgrType = companyData.intake_data?.pgr_type || 'FULL';
              const docLabel = (docType === 'pgr' && pgrType === 'SIMPLIFIED') ? 'Declaração de Inexistência de Risco (DIR)' : docType.toUpperCase();
              alert(`📄 Gerando documento: ${docLabel}\n\nEnquadramento: ${pgrType}\nCliente: ${companyData.name}\n\n(Funcionalidade de PDF em desenvolvimento na Fase 5)`);
            }}
          />
        )}

        {view === 'intake' && <ClientIntakeForm companyCNPJ={companyData?.cnpj} onComplete={async (cnpj, updates) => {
          console.log('[App] Intake complete. CNPJ:', cnpj);
          if (updates) {
            setCompanyData(prev => ({ ...prev, ...updates }));
          }
          setView('clientes'); // Go back to clients list after intake
        }} />}

        {view === 'simulador' && (
          <div className="card-premium">
            <h2 style={{ color: 'var(--primary)' }}>{companyData?.name}</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Operações administrativas para esta empresa:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <button onClick={() => setView('revisao')} className="btn-primary" style={{ padding: '2rem', fontSize: '1.1rem' }}>✏️ Revisar Riscos / CBO</button>
              <button onClick={() => setView('clientes')} className="btn-secondary" style={{ padding: '2rem', fontSize: '1.1rem' }}>⬅️ Voltar para Lista</button>
            </div>
          </div>
        )}

        {view === 'revisao' && (
          <ReviewView
            data={extraData}
            inventory={inventory}
            companyId={companyData?.id}
            onCancel={() => setView('clientes')}
            onSave={() => setView('clientes')}
          />
        )}
      </main>
    </div>
  );
}

const navLinkStyle = (active) => ({
  background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
  border: 'none',
  color: 'white',
  padding: '6px 14px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: active ? 'bold' : '500',
  fontSize: '0.9rem',
  transition: 'all 0.2s'
});

export default App;

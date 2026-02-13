import React, { useState, useEffect, useRef } from 'react';
import { getFullClientData, getClientByUserId, getClients, getCompanyProfessionals } from './utils/storage';
import Dashboard from './components/Dashboard';
import ReviewView from './components/ReviewView';
import ClientDashboard from './components/ClientDashboard';
import ClientsList from './components/ClientsList';
import ProfessionalRegistry from './components/admin/ProfessionalRegistry';
import ClientIntakeForm from './components/ClientIntakeForm';
import { supabase } from './utils/supabase';

import LandingPage from './components/auth/LandingPage';
import LoginPage from './components/auth/LoginPage';

function App() {
  // Auth State
  const [session, setSession] = useState(null); // { role: 'admin' | 'client', ...data }
  const [authStep, setAuthStep] = useState('landing'); // 'landing', 'login_client', 'login_admin'

  // App State
  const [view, setView] = useState('dashboard');
  const [companyData, setCompanyData] = useState(null);
  const [extraData, setExtraData] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState(null);

  // Helper to handle login
  const handleLogin = (user) => {
    setSession(user);
    if (user.role === 'client') {
      // Pre-load client data
      setCompanyData(user); // user object from login contains company data found by CNPJ
      if (user.role === 'client_new') {
        setView('intake');
      } else {
        // Fetch full data for the client dashboard
        setLoading(true);
        getFullClientData(user.id).then(result => {
          if (result.success) {
            const fullData = result.data;
            setCompanyData(fullData);
            // Setup extraData logic similar to existing
            if (fullData.auto_generated_data) {
              setExtraData({
                sectors: fullData.auto_generated_data.sectors || [],
                roles: fullData.auto_generated_data.roles || [],
                epis: fullData.auto_generated_data.epis || [],
                medical_exams: fullData.auto_generated_data.medical_exams || [],
                action_plan: fullData.auto_generated_data.action_plan || []
              });
              setInventory(fullData.auto_generated_data.risk_inventory || []);
            } else {
              setExtraData({ sectors: [], roles: [], epis: [], medical_exams: [], action_plan: [] });
              setInventory([]);
            }
          }
          setLoading(false);
          setView('client_dashboard');
        });
      }
    } else {
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setSession(null);
    setAuthStep('landing');
    setCompanyData(null);
    setExtraData(null);
    setInventory([]);
  };

  // --- RENDERING ---

  // 1. Auth Flow
  if (!session) {
    if (authStep === 'landing') {
      return <LandingPage onSelectRole={(role) => setAuthStep(role === 'client' ? 'login_client' : 'login_admin')} />;
    }
    return (
      <LoginPage
        role={authStep === 'login_client' ? 'client' : 'admin'}
        onLogin={handleLogin}
        onBack={() => setAuthStep('landing')}
      />
    );
  }

  // 2. Admin Environment
  if (session.role === 'admin') {
    return (
      <div className="app" style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f0f2f5' }}>
        <header className="no-print" style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 onClick={() => setView('dashboard')} style={{ cursor: 'pointer', fontSize: '1.2rem', margin: 0, fontWeight: '900' }}>AM ENGENHARIA <span style={{ fontSize: '0.7em', opacity: 0.8 }}>(Admin)</span></h1>
            <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <button onClick={() => setView('dashboard')} style={navLinkStyle(view === 'dashboard')}>Métricas</button>
              <button onClick={() => setView('clientes')} style={navLinkStyle(view === 'clientes')}>Clientes</button>
              <button onClick={() => setView('equipe')} style={navLinkStyle(view === 'equipe')}>Equipe</button>
              <button onClick={handleLogout} style={{ ...navLinkStyle(false), background: 'rgba(255,0,0,0.2)' }}>Sair</button>
            </nav>
          </div>
        </header>

        {errorHeader && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>⚠️ {errorHeader}</div>}

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
                  setCompanyData(fullData);

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
                // Admin views client dashboard as "Simulated View" or just details?
                // Keeping existing flow: view='client_dashboard'
                setView('client_dashboard');
              } catch (e) {
                console.error(e);
                setErrorHeader('Erro ao carregar cliente.');
              } finally {
                setLoading(false);
              }
            }}
            onEditClient={async (company) => {
              setErrorHeader(null);
              setLoading(true);
              try {
                setCompanyData(company);
                const result = await getFullClientData(company.id);
                if (result.success) {
                  const fullData = result.data;
                  setCompanyData(fullData);

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
                setView('revisao');
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

          {/* Admin viewing Client Dashboard (Read-Only/Simulated) */}
          {view === 'client_dashboard' && (
            <div style={{ border: '4px solid var(--primary)', borderRadius: '8px', position: 'relative' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '4px 10px', position: 'absolute', top: 0, left: 0, fontSize: '0.8rem', fontWeight: 'bold' }}>Modo de Visualização (Admin)</div>
              <ClientDashboard
                companyData={companyData}
                fullData={extraData}
                onStartIntake={() => setView('intake')}
                onViewDocs={() => setView('revisao')}
              />
              <button onClick={() => setView('clientes')} style={{ position: 'absolute', top: '10px', right: '10px', padding: '0.5rem', cursor: 'pointer' }}>❌ Fechar</button>
            </div>
          )}

          {/* Admin Editing Logic (ReviewView) */}
          {view === 'revisao' && (
            <ReviewView
              data={extraData}
              inventory={inventory}
              companyId={companyData?.id}
              userMode={false} // Admin Mode
              onCancel={() => setView('clientes')}
              onSave={async (updatedData, updatedInventory) => {
                setLoading(true);
                try {
                  const { updateAutoGenerated } = await import('./utils/storage');
                  const payload = { ...updatedData, risk_inventory: updatedInventory };
                  // Admin save maintains current status or sets to default if needed
                  const result = await updateAutoGenerated(companyData, payload);
                  if (result.success) {
                    setExtraData(payload);
                    setInventory(updatedInventory);
                    alert('Dados salvos com sucesso!');
                    setView('clientes');
                  } else {
                    alert('Erro: ' + result.error);
                  }
                } catch (e) {
                  console.error(e);
                } finally {
                  setLoading(false);
                }
              }}
              onApprove={async (updatedData, updatedInventory) => {
                if (!window.confirm('Tem certeza que deseja aprovar os dados e concluir a análise? O status será alterado para APROVADO.')) return;
                setLoading(true);
                try {
                  const { updateAutoGenerated } = await import('./utils/storage');
                  const payload = { ...updatedData, risk_inventory: updatedInventory };
                  // Custom status 'approved'
                  const result = await updateAutoGenerated(companyData, payload, 'approved');
                  if (result.success) {
                    setExtraData(payload);
                    setInventory(updatedInventory);
                    alert('Análise concluída com sucesso! Empresa aprovada.');
                    setView('clientes');
                  } else {
                    alert('Erro ao aprovar: ' + result.error);
                  }
                } catch (e) {
                  console.error(e);
                  alert('Erro ao aprovar.');
                } finally {
                  setLoading(false);
                }
              }}
            />
          )}

          {/* Admin starting intake for a client */}
          {view === 'intake' && (
            <div>
              <button onClick={() => setView('clientes')} style={{ marginBottom: '1rem' }}>← Voltar</button>
              <ClientIntakeForm companyCNPJ={companyData?.cnpj} onComplete={async (cnpj, updates, autoData) => {
                // Admin-side intake completion
                alert('Cadastro realizado (Modo Admin).');
                setView('clientes');
              }} />
            </div>
          )}

        </main>
      </div>
    );
  }

  // 3. Client Environment
  if (session.role === 'client' || session.role === 'client_new') {
    return (
      <div className="app" style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: '#f8fafc' }}>
        <header className="no-print" style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>AM</div>
              <div>
                <h1 style={{ fontSize: '1.2rem', margin: 0, color: '#1e293b' }}>Área do Cliente</h1>
                {companyData?.name && <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{companyData.name}</p>}
              </div>
            </div>
            <button onClick={handleLogout} style={{ border: '1px solid #cbd5e1', background: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', color: '#475569' }}>Sair</button>
          </div>
        </header>

        <main className="container" style={{ marginTop: '2rem', paddingBottom: '3rem' }}>
          {view === 'intake' && (
            <ClientIntakeForm
              companyCNPJ={session.cnpj} // For new clients
              onComplete={async (cnpj, updates, autoData) => {
                if (updates) setCompanyData(prev => ({ ...(prev || {}), ...updates }));
                if (autoData) {
                  setExtraData(autoData);
                  setInventory(autoData.risk_inventory || []);
                }
                setView('client_dashboard');
              }}
            />
          )}

          {view === 'client_dashboard' && (
            <ClientDashboard
              companyData={companyData}
              fullData={extraData}
              onStartIntake={() => setView('intake')}
              onViewDocs={() => setView('revisao')}
            />
          )}

          {view === 'revisao' && (
            <ReviewView
              data={extraData}
              inventory={inventory}
              companyId={companyData?.id}
              userMode={true} // Client Mode
              onCancel={() => setView('client_dashboard')}
              onSave={async (updatedData, updatedInventory) => {
                setLoading(true);
                try {
                  const { updateAutoGenerated } = await import('./utils/storage');
                  const payload = { ...updatedData, risk_inventory: updatedInventory };
                  const result = await updateAutoGenerated(companyData, payload);
                  if (result.success) {
                    setExtraData(payload);
                    setInventory(updatedInventory);
                    setCompanyData(prev => ({ ...prev, workflow_status: 'analysis_in_progress' }));
                    setView('client_dashboard');
                  } else {
                    alert('Erro: ' + result.error);
                  }
                } catch (e) {
                  console.error(e);
                } finally {
                  setLoading(false);
                }
              }}
            />
          )}
        </main>
      </div>
    );
  }

  return null; // Should not reach here
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

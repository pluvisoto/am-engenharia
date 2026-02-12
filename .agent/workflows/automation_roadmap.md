---
description: Roadmap de Automatização - Sistema de PGR/PCMSO Automatizado
---

# 🤖 Projeto: Automaton-SST (Sistema Especialista de Conformidade Legal)

Este documento define o roteiro técnico e estratégico para transformar a plataforma em um sistema autônomo de Segurança e Saúde no Trabalho (SST), integrando dados oficiais, inteligência artificial e conectividade opcional com o eSocial.

**Nota:** A lógica de login e cadastro complexo foi removida temporariamente para focar na engenharia principal. O sistema opera agora em "Modo Admin Direto".

## 🏛️ Arquitetura do Sistema

O sistema operará em **4 Camadas de Inteligência**:

1.  **Camada de Dados Públicos (Crawler/API)**: Coleta automática de dados cadastrais (CNPJ/CNAE) e legislação (NRs).
2.  **Camada de Dados Privados (eSocial Connect)**: Conexão opcional com a base do governo do cliente para espelhar funcionários e riscos já declarados.
3.  **Camada de Inferência (IA + Regras)**: Motor que traduz dados brutos em documentos técnicos (PGR/PCMSO).
4.  **Camada de Vigilância (Watchdog)**: Monitoramento contínuo de mudanças na lei e validade de documentos.

---

## 🗺️ Roadmap de Implementação

### FASE 1: O Cérebro Legal (Motor de Regras) - **[CONCLUÍDO]**
*   **Objetivo:** Centralizar a lógica da lei (NR-01, NR-07, NR-09, NR-15) em um banco de dados estruturado.
*   **Ações Técnicas:**
    1.  **Refinar `RiskRules.js`**: Expandir para cobrir toda a Tabela 24 do eSocial (Agentes Nocivos).
    2.  **Mapeamento de Exames (PCMSO)**: Criar tabela de ligação `Risco -> Exame` com periodicidade baseada na NR-07 (Admissional, Semestral, Anual).
    3.  **Automação:** Script para atualizar o catálogo de riscos a partir dos layouts XML oficiais do eSocial.

### FASE 2: Dados da Empresa (Enriquecimento Automático) **[CONCLUÍDO]**
*   **Objetivo:** Obter o máximo de dados possível apenas com o CNPJ.
*   **Integração:** `BrasilAPI` (Gratuito/Open Source).
*   **Dados Coletados:**
    *   CNAE Principal (Define Grau de Risco - NR-04).
    *   CNAEs Secundários (Identifica riscos ocultos, ex: Padaria secundária em Supermercado).
    *   Endereço e Natureza Jurídica.

### FASE 2.3: Intelligent PGR Selection Module (NR-1/NR-4) **[CONCLUÍDO]**
- **Objective:** Automate the decision between **Simplified PGR** (Declaração de Inexistência de Risco - DIR) and **Full PGR**.
- **Logic:**
    1. **Initial Classification:**
        - Check Company Size (MEI, ME, EPP).
        - Check Risk Degree (1, 2, 3, 4) via NR-4 mapping.
    2. **Simplified Path (NR-1.8.4):**
        - *Criteria:* (ME/EPP) AND (Risk Degree 1 or 2).
        - *Verification:* Check for Physical, Chemical, Biological agents.
        - *Outcome A (No Agents):* Generate **DIR** (Declaração de Inexistência de Risco).
        - *Outcome B (Agents Present):* Force **Full PGR**.
    3. **Full Path:**
        - *Criteria:* (Risk Degree 3/4) OR (Large Company) OR (Agents Present).
        - *Outcome:* Generate robust PGR with Methodology, Inventory, and Action Plan.
- **Data Source:** BrasilAPI (CNAE) + User Input (Agent Confirmation).

### FASE 3: Conexão eSocial (O "Super Poder" Opcional) 🆕
*   **Objetivo:** Permitir que clientes conectem sua conta gov.br/eSocial para importação massiva de dados, eliminando digitação manual.
*   **Funcionalidade:** "Logar com Certificado Digital (A1/A3)".
*   **Dados Importados (Via Eventos S-2200, S-2240):**
    *   Lista completa de Funcionários (Nome, CPF, Data Nascimento).
    *   Cargos e Funções cadastrados.
    *   Riscos já informados anteriormente (S-2240).
    *   Histórico de Exames (S-2220).
*   **Benefício:** Se o cliente usar essa opção, o PGR/PCMSO sai 99% pronto em segundos com dados reais.
*   **Obs:** Manter como **OPCIONAL** para não bloquear pequenas empresas sem acesso fácil ao certificado.

### Phase 3: eSocial Connect (Weeks 5-8)
- [ ] **3.1 S-2240 (Conditions)**
  - *Goal:* XML generation for environmental risks.
- [ ] **3.2 S-2220 (Health)**
  - *Goal:* XML for ASO/Exams.
- [ ] **3.3 S-2210 (CAT)**
  - *Goal:* Accident communication integration.

### FASE 4: O Validador de EPIs (Crawler de CAs) **[CONCLUÍDO - SIMULAÇÃO]**
*   **Objetivo:** Garantir que EPIs sugeridos sejam válidos e adequados.
*   **Estratégia:**
    *   Criar rotina mensal que baixa a base de dados do CA (Certificado de Aprovação) do site do MTE (FTP/CSV).
    *   Ao gerar o PGR, o sistema verifica: "O CA 12345 está vencido? Se sim, alertar e sugerir substituto."
    *   *Status:* Implementado validador local com cache de CAs comuns.

### Phase 4: Vigilance & Validation (Ongoing)
- [x] **4.1 EPI Validator (Simulation)**
  - *Goal:* Check CA validity (mock database).
- [ ] **4.2 NR Watchdog**
  - *Goal:* Alert on regulatory changes.

### FASE 5: Vigilância Contínua (Compliance Watchdog)
*   **Objetivo:** Monitorar mudanças na lei que impactam os documentos.
*   **Ferramenta:** `UpdateMonitor.js` (Script de monitoramento).
*   **Alvos:**
    *   Site de NRs (`gov.br/trabalho`).
    *   Site do eSocial (Layouts Técnicos).
*   **Ação:** Se detectar alteração no MD5 dos PDFs oficiais, notifica o admin: "🚨 NR-07 mudou! Revise os protocolos."

---

## 📅 Cronograma Sugerido

| Sprint | Foco | Entregáveis |
| :--- | :--- | :--- |
| **Passado** | **Fase 1 (Motor)** | LOGIN REMOVIDO. `RiskRules.js` completo. |
| **Atual** | **Fase 2 / 2.3 / 4** | Integração total BrasilAPI, Lógica NR-1 Inteligente (DIR vs PGR), Validador EPI (Local). |
| **Próxima** | **Fase 3 (eSocial)** | Módulo de Upload de Certificado A1, Leitura de XMLs do eSocial. |
| **Futuro** | **Fase 5 (Watchdog)** | Geração de PDFs (jspdf) e Monitoramento de NRs. |

## 📅 Chronogram (Estimated)

| Sprint | Phase | Focus | Status |
| :--- | :--- | :--- | :--- |
| **Current** | 2.3 / 2.4 | PGR & PCMSO Full Automation | **Completed** |
| Next | 3.1 | eSocial XML Generation | Planned |
| Future | 4.2 | Compliance Watchdog | Backlog |

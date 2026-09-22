// ==============================================================================
// Vox Studio RAD - ERP Engine (VoxERPEngine)
// Motor Completo de Gestão Fiscal (NF-e/NFC-e), Estoque, PDV Caixa, Financeiro & Configurações
// ==============================================================================

(function() {
  class VoxERPEngine {
    constructor() {
      this.state = {
        currentModule: 'cadastros',
        destinatario: {
          razaoSocial: 'Mauricio Abreu Consultoria Ltda',
          fantasia: 'Vox Consultoria & Software',
          cnpjCpf: '12.345.678/0001-95',
          ie: '123.456.789.001',
          indIEDest: '1',
          email: 'mauricio@voxlang.org',
          cep: '20040-020',
          logradouro: 'Av. Rio Branco',
          numero: '156',
          bairro: 'Centro',
          ibge: '3304557',
          cidade: 'Rio de Janeiro',
          uf: 'RJ'
        },
        emitente: {
          razaoSocial: 'Vox ERP Enterprise Softwares Ltda',
          fantasia: 'Vox Tech RAD Enterprise',
          cnpj: '00.123.456/0001-89',
          ie: '987.654.321.110',
          crt: '1',
          logradouro: 'Rua das Flores',
          numero: '500',
          bairro: 'Centro',
          ibge: '3550308',
          cidade: 'São Paulo',
          uf: 'SP',
          cep: '01001-000',
          fone: '(11) 3333-8888',
          ambiente: '2', // 1=Produção, 2=Homologação
          serieNFe: '1',
          proximaNFe: 1042,
          serieNFCe: '1',
          proximaNFCe: 520,
          cscId: '000001',
          cscToken: 'A8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3',
          certificado: 'A1 - Válido até 15/12/2027 (Certisign A1 ICP-Brasil)'
        },
        produtos: [
          { id: 1, codigo: 'PROD-001', descricao: 'Smartphone Galaxy A54 5G 128GB', ncm: '8517.12.31', cfop: '5102', unidade: 'UN', custo: 1200.00, precoVenda: 1899.00, estoqueAtual: 25, estoqueMinimo: 5 },
          { id: 2, codigo: 'PROD-002', descricao: 'Notebook Dell Inspiron Core i5 16GB', ncm: '8471.30.12', cfop: '5102', unidade: 'UN', custo: 2800.00, precoVenda: 4290.00, estoqueAtual: 12, estoqueMinimo: 3 },
          { id: 3, codigo: 'PROD-003', descricao: 'Teclado Mecânico RGB Gamer Switch Blue', ncm: '8471.60.52', cfop: '5102', unidade: 'UN', custo: 110.00, precoVenda: 249.90, estoqueAtual: 40, estoqueMinimo: 8 },
          { id: 4, codigo: 'PROD-004', descricao: 'Monitor UltraWide 29 IPS LG 75Hz', ncm: '8528.52.00', cfop: '5102', unidade: 'UN', custo: 750.00, precoVenda: 1199.00, estoqueAtual: 8, estoqueMinimo: 2 },
          { id: 5, codigo: 'PROD-005', descricao: 'Mouse Sem Fio Ergonômico 2.4GHz', ncm: '8471.60.53', cfop: '5102', unidade: 'UN', custo: 45.00, precoVenda: 89.90, estoqueAtual: 50, estoqueMinimo: 10 },
          { id: 6, codigo: 'PROD-006', descricao: 'Impressora Térmica Não Fiscal 80mm USB', ncm: '8443.32.99', cfop: '5102', unidade: 'UN', custo: 320.00, precoVenda: 580.00, estoqueAtual: 15, estoqueMinimo: 4 }
        ],
        carrinhoPDV: [
          { id: 1, codigo: 'PROD-001', descricao: 'Smartphone Galaxy A54 5G 128GB', ncm: '8517.12.31', cfop: '5102', qtd: 1, valorUnit: 1899.00, subtotal: 1899.00 },
          { id: 3, codigo: 'PROD-003', descricao: 'Teclado Mecânico RGB Gamer Switch Blue', ncm: '8471.60.52', cfop: '5102', qtd: 2, valorUnit: 249.90, subtotal: 499.80 }
        ],
        formaPagamento: 'PIX',
        valorRecebido: 2398.80,
        troco: 0.00,
        notasEmitidas: [],
        movimentacoesFinanceiras: [
          { id: 1, dataHora: '2026-09-21 08:30:00', tipo: 'ENTRADA', categoria: 'Abertura de Caixa', descricao: 'Fundo de troco inicial do operador', forma: 'DINHEIRO', valor: 500.00 },
          { id: 2, dataHora: '2026-09-21 10:15:22', tipo: 'ENTRADA', categoria: 'Venda PDV', descricao: 'Venda Balcão NFC-e #518', forma: 'PIX', valor: 289.90 },
          { id: 3, dataHora: '2026-09-21 11:40:10', tipo: 'SAIDA', categoria: 'Despesa Operacional', descricao: 'Material de escritório e bobinas 80mm', forma: 'DINHEIRO', valor: 65.00 },
          { id: 4, dataHora: '2026-09-21 14:20:05', tipo: 'ENTRADA', categoria: 'Venda PDV', descricao: 'Venda Balcão NFC-e #519', forma: 'CARTAO_CREDITO', valor: 1199.00 }
        ],
        movimentacoesEstoque: [
          { id: 1, dataHora: '2026-09-21 09:00:00', codigo: 'PROD-001', descricao: 'Smartphone Galaxy A54 5G', tipo: 'ENTRADA', qtd: 10, doc: 'NF-e 8821', saldoApos: 25 },
          { id: 2, dataHora: '2026-09-21 10:15:22', codigo: 'PROD-005', descricao: 'Mouse Sem Fio Ergonômico', tipo: 'SAIDA_PDV', qtd: 2, doc: 'NFC-e 518', saldoApos: 50 },
          { id: 3, dataHora: '2026-09-21 14:20:05', codigo: 'PROD-004', descricao: 'Monitor UltraWide 29 IPS', tipo: 'SAIDA_PDV', qtd: 1, doc: 'NFC-e 519', saldoApos: 8 }
        ]
      };

      this.initStyles();
      this.initDefaultNFeDemo();
    }

    initDefaultNFeDemo() {
      const chaveDemo = '35260900123456000189550010000010411123456781';
      this.state.notasEmitidas.push({
        chave: chaveDemo,
        numero: 1041,
        serie: 1,
        modelo: 55,
        tipo: 'NF-e',
        dataHora: '2026-09-21 15:30:12',
        destinatario: 'Mauricio Abreu Consultoria Ltda',
        cnpj: '12.345.678/0001-95',
        total: 1899.00,
        icms: 341.82,
        protocolo: '135260009871101',
        status: '100 - Autorizada SEFAZ',
        xml: this.gerarXMLNFe(chaveDemo, 1041, [this.state.produtos[0]])
      });
    }

    initStyles() {
      if (document.getElementById('vox-erp-styles')) return;
      const css = `
        .erp-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          animation: erpFadeIn 0.2s ease-out;
        }
        @keyframes erpFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .erp-modal-window {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          max-width: 960px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          color: #1e293b;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        .erp-modal-header {
          background: #1e293b;
          color: #ffffff;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #0ea5e9;
        }

        .erp-modal-header h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .erp-modal-body {
          padding: 20px;
          overflow-y: auto;
          flex: 1;
          background: #f8fafc;
        }

        .erp-modal-footer {
          background: #f1f5f9;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          border-top: 1px solid #cbd5e1;
        }

        .erp-btn {
          padding: 8px 16px;
          border-radius: 5px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s;
        }
        .erp-btn-primary { background: #0284c7; color: #fff; }
        .erp-btn-primary:hover { background: #0369a1; }
        .erp-btn-success { background: #16a34a; color: #fff; }
        .erp-btn-success:hover { background: #15803d; }
        .erp-btn-danger { background: #dc2626; color: #fff; }
        .erp-btn-danger:hover { background: #b91c1c; }
        .erp-btn-secondary { background: #64748b; color: #fff; }
        .erp-btn-secondary:hover { background: #475569; }

        .danfe-box {
          background: #fff;
          border: 1px solid #000;
          padding: 14px;
          font-family: 'Arial', sans-serif;
          font-size: 11px;
          color: #000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 860px;
          margin: 0 auto;
        }
        .danfe-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 8px;
        }
        .danfe-table th, .danfe-table td {
          border: 1px solid #000;
          padding: 4px 6px;
          font-size: 10px;
        }
        .danfe-table th {
          background: #f2f2f2;
          font-weight: bold;
          text-align: left;
        }

        .nfce-cupom {
          width: 340px;
          background: #fffffb;
          border: 1px dashed #64748b;
          padding: 16px 14px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 11px;
          color: #0f172a;
          margin: 0 auto;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }

        .erp-module-view {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 16px;
          background: #1e2430;
          color: #f8fafc;
          overflow-y: auto;
        }

        .erp-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .erp-kpi-card {
          background: #283040;
          border: 1px solid #334155;
          border-radius: 8px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .erp-kpi-val {
          font-size: 20px;
          font-weight: 700;
        }
        .erp-kpi-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .erp-table-wrapper {
          background: #283040;
          border: 1px solid #334155;
          border-radius: 6px;
          overflow: hidden;
        }
        .erp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          text-align: left;
        }
        .erp-table th {
          background: #1e293b;
          color: #94a3b8;
          padding: 10px 12px;
          font-weight: 600;
          border-bottom: 1px solid #334155;
        }
        .erp-table td {
          padding: 8px 12px;
          border-bottom: 1px solid #334155;
          color: #e2e8f0;
        }
        .erp-table tr:hover td {
          background: rgba(255, 255, 255, 0.03);
        }

        .badge-status {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          display: inline-block;
        }
        .badge-ok { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
        .badge-warn { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid #f59e0b; }
        .badge-danger { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }

        @media print {
          body * { visibility: hidden !important; }
          .erp-printable, .erp-printable * { visibility: visible !important; }
          .erp-printable { position: fixed !important; left: 0 !important; top: 0 !important; width: 100% !important; }
          .erp-modal-footer, .erp-modal-header button { display: none !important; }
        }
      `;
      const styleEl = document.createElement('style');
      styleEl.id = 'vox-erp-styles';
      styleEl.innerHTML = css;
      document.head.appendChild(styleEl);
    }

    renderNavBar(activeModule) {
      const modules = [
        { id: 'cadastros',     label: 'Cadastros',           icon: '📋' },
        { id: 'fiscal',        label: 'Fiscal (NF-e/NFC-e)', icon: '📄' },
        { id: 'estoque',       label: 'Estoque',              icon: '📦' },
        { id: 'pdv',           label: 'PDV Caixa',            icon: '🛒' },
        { id: 'financeiro',    label: 'Financeiro',           icon: '💰' },
        { id: 'configuracoes', label: 'Configurações',        icon: '⚙️' }
      ];
      const items = modules.map(m => {
        const isActive = m.id === activeModule;
        return `<button
          onclick="voxERPEngine.switchModule('${m.id}')"
          style="
            background: ${isActive ? '#0ea5e9' : 'transparent'};
            color: ${isActive ? '#fff' : '#94a3b8'};
            border: none;
            padding: 0 14px;
            height: 100%;
            font-size: 12px;
            font-weight: ${isActive ? '700' : '500'};
            cursor: pointer;
            border-radius: 0;
            border-bottom: ${isActive ? '2px solid #38bdf8' : '2px solid transparent'};
            transition: all 0.15s;
            display: flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
          "
          onmouseover="if(!${isActive})this.style.color='#e2e8f0'"
          onmouseout="if(!${isActive})this.style.color='#94a3b8'"
        >${m.icon} ${m.label}</button>`;
      }).join('');

      return `
        <nav style="
          display: flex;
          align-items: center;
          background: #111827;
          border-bottom: 1px solid #1e2a3b;
          height: 42px;
          padding: 0 8px;
          gap: 2px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ">
          <span style="font-size:13px; font-weight:700; color:#38bdf8; padding:0 12px 0 4px; border-right:1px solid #334155; margin-right:6px; white-space:nowrap;">🚀 Vox ERP</span>
          ${items}
        </nav>
      `;
    }

    switchModule(moduleName, targetCanvas) {
      console.log('[VoxERPEngine] Alternando módulo para:', moduleName);
      this.state.currentModule = moduleName;

      // Atualiza destaque no menu original (topo da tela de cadastros)
      document.querySelectorAll('.web-topbar-item, .web-sidebar-item, .vcl-menu-top-item').forEach(el => {
        const txt = el.innerText || '';
        el.classList.remove('active');
        if (
          (moduleName === 'cadastros' && (txt.includes('Cadastro') || txt.includes('Destinatário'))) ||
          (moduleName === 'fiscal' && (txt.includes('Fiscal') || txt.includes('NF-e'))) ||
          (moduleName === 'estoque' && txt.includes('Estoque')) ||
          (moduleName === 'pdv' && (txt.includes('PDV') || txt.includes('Caixa'))) ||
          (moduleName === 'financeiro' && txt.includes('Financeiro')) ||
          (moduleName === 'configuracoes' && txt.includes('Configura'))
        ) {
          el.classList.add('active');
        }
      });

      const canvas = targetCanvas || document.getElementById('webFormCanvas') || document.getElementById('delphiFormCanvas') || document.querySelector('.delphi-form-canvas') || document.querySelector('.form-canvas') || document.getElementById('live_form_body') || document.querySelector('.live-form-canvas') || document.body;
      if (!canvas) return;

      // Se voltar para Cadastros: oculta o container overlay e mostra o form original
      if (moduleName === 'cadastros') {
        const existingContainer = document.getElementById('vox_erp_module_container');
        if (existingContainer) existingContainer.style.display = 'none';
        return;
      }

      let modContainer = document.getElementById('vox_erp_module_container');
      if (!modContainer) {
        modContainer = document.createElement('div');
        modContainer.id = 'vox_erp_module_container';
        modContainer.style.cssText = [
          'position: absolute',
          'top: 0', 'left: 0', 'right: 0', 'bottom: 0',
          'z-index: 50',
          'background: #1e2430',
          'overflow-y: auto',
          'display: flex',
          'flex-direction: column'
        ].join(';');
        canvas.style.position = 'relative';
        canvas.appendChild(modContainer);
      }

      modContainer.style.display = 'flex';
      modContainer.style.flexDirection = 'column';

      let moduleContent = '';
      if (moduleName === 'fiscal') {
        moduleContent = this.renderFiscalModule();
      } else if (moduleName === 'estoque') {
        moduleContent = this.renderEstoqueModule();
      } else if (moduleName === 'pdv') {
        moduleContent = this.renderPDVModule();
      } else if (moduleName === 'financeiro') {
        moduleContent = this.renderFinanceiroModule();
      } else if (moduleName === 'configuracoes') {
        moduleContent = this.renderConfiguracoesModule();
      }

      modContainer.innerHTML = this.renderNavBar(moduleName) + moduleContent;
    }

    renderFiscalModule() {
      const emit = this.state.emitente;
      const dest = this.state.destinatario;
      const prods = this.state.produtos;
      const notas = this.state.notasEmitidas;

      const vlrTotal = prods.reduce((acc, p) => acc + (p.precoVenda * 1), 0);
      const vlrICMS = (vlrTotal * 0.18).toFixed(2);
      const vlrPIS = (vlrTotal * 0.0165).toFixed(2);
      const vlrCOFINS = (vlrTotal * 0.076).toFixed(2);

      let notasRows = notas.map(n => `
        <tr>
          <td><strong>NF-e ${n.numero}/${n.serie}</strong></td>
          <td>${n.destinatario}</td>
          <td>${n.dataHora}</td>
          <td>R$ ${parseFloat(n.total).toFixed(2)}</td>
          <td><span class="badge-status badge-ok">${n.status}</span></td>
          <td>
            <button class="erp-btn erp-btn-primary" style="padding:4px 8px; font-size:11px;" onclick="voxERPEngine.visualizarDANFE('${n.chave}')">👁️ DANFE</button>
            <button class="erp-btn erp-btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="voxERPEngine.baixarXML('${n.chave}')">📥 XML</button>
          </td>
        </tr>
      `).join('');

      if (!notasRows) {
        notasRows = '<tr><td colspan="6" style="text-align:center; padding:16px; color:#94a3b8;">Nenhuma NF-e transmitida nesta sessão.</td></tr>';
      }

      return `
        <div class="erp-module-view">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:#38bdf8; margin:0;">📋 Gestão Fiscal SEFAZ (NF-e 4.00 / NFC-e)</h2>
              <span style="font-size:12px; color:#94a3b8;">Emissor Oficial de Notas Fiscais Eletrônicas com Validação Tributária e DANFE</span>
            </div>
            <button class="erp-btn erp-btn-success" style="font-size:14px; padding:10px 20px;" onclick="voxERPEngine.emitirNFe()">
              🚀 Transmitir / Emitir NF-e 4.00
            </button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            <div style="background:#283040; border:1px solid #334155; border-radius:8px; padding:14px;">
              <div style="font-weight:700; font-size:13px; color:#38bdf8; margin-bottom:8px;">🏢 Destinatário da NF-e</div>
              <div style="font-size:12px; color:#e2e8f0; line-height:1.6;">
                <strong>${dest.razaoSocial}</strong> (${dest.fantasia})<br>
                <span>CNPJ/CPF: ${dest.cnpjCpf} | IE: ${dest.ie}</span><br>
                <span>${dest.logradouro}, ${dest.numero} - ${dest.bairro} - ${dest.cidade}/${dest.uf}</span><br>
                <span>CEP: ${dest.cep} | Código IBGE: ${dest.ibge}</span><br>
                <span>E-mail XML: ${dest.email}</span>
              </div>
            </div>

            <div style="background:#283040; border:1px solid #334155; border-radius:8px; padding:14px;">
              <div style="font-weight:700; font-size:13px; color:#38bdf8; margin-bottom:8px;">⚖️ Apuração Tributária Calculada</div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; font-size:12px;">
                <div>Base ICMS: <strong>R$ ${vlrTotal.toFixed(2)}</strong></div>
                <div>ICMS (18%): <strong style="color:#4ade80;">R$ ${vlrICMS}</strong></div>
                <div>PIS (1.65%): <strong>R$ ${vlrPIS}</strong></div>
                <div>COFINS (7.6%): <strong>R$ ${vlrCOFINS}</strong></div>
                <div style="grid-column: span 2; padding-top:6px; border-top:1px solid #334155; font-size:13px;">
                  Total da Nota: <strong style="font-size:16px; color:#38bdf8;">R$ ${vlrTotal.toFixed(2)}</strong>
                  <span style="font-size:11px; color:#94a3b8; margin-left:8px;">Ambiente: ${emit.ambiente === '1' ? 'Produção' : 'Homologação'}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top:10px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:8px; color:#f8fafc;">📑 Notas Fiscais Eletrônicas Transmitidas</div>
            <div class="erp-table-wrapper">
              <table class="erp-table">
                <thead>
                  <tr>
                    <th>Número/Série</th>
                    <th>Destinatário</th>
                    <th>Data/Hora</th>
                    <th>Valor Total</th>
                    <th>Status SEFAZ</th>
                    <th>Ações Fiscais</th>
                  </tr>
                </thead>
                <tbody>${notasRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    emitirNFe() {
      const dest = this.state.destinatario;
      const emit = this.state.emitente;
      const prods = this.state.produtos.slice(0, 2);

      if (!dest.razaoSocial || !dest.cnpjCpf || !dest.cep || !dest.ibge) {
        alert('Erro Fiscal SEFAZ: Destinatário com dados incompletos (Razão Social, CNPJ, CEP ou IBGE).');
        return;
      }

      const numNFe = emit.proximaNFe;
      emit.proximaNFe++;

      const uf = emit.ibge.substring(0, 2) || '35';
      const aamm = '2609';
      const cleanCnpj = emit.cnpj.replace(/\D/g, '').padStart(14, '0');
      const mod = '55';
      const serie = String(emit.serieNFe).padStart(3, '0');
      const nNF = String(numNFe).padStart(9, '0');
      const tpEmis = '1';
      const cNF = Math.floor(10000000 + Math.random() * 90000000);
      const chaveParcial = `${uf}${aamm}${cleanCnpj}${mod}${serie}${nNF}${tpEmis}${cNF}`;
      
      let soma = 0;
      let peso = 2;
      for (let i = chaveParcial.length - 1; i >= 0; i--) {
        soma += parseInt(chaveParcial[i], 10) * peso;
        peso = peso === 9 ? 2 : peso + 1;
      }
      const resto = soma % 11;
      const dv = (resto === 0 || resto === 1) ? 0 : 11 - resto;
      const chaveCompleta = `${chaveParcial}${dv}`;

      const totalNF = prods.reduce((acc, p) => acc + (p.precoVenda * 1), 0);
      const vlrICMS = (totalNF * 0.18).toFixed(2);
      const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);

      prods.forEach(p => {
        p.estoqueAtual = Math.max(0, p.estoqueAtual - 1);
        this.state.movimentacoesEstoque.unshift({
          id: Date.now() + Math.random(),
          dataHora: dataHora,
          codigo: p.codigo,
          descricao: p.descricao,
          tipo: 'SAIDA_NFE',
          qtd: 1,
          doc: `NF-e ${numNFe}`,
          saldoApos: p.estoqueAtual
        });
      });

      this.state.movimentacoesFinanceiras.unshift({
        id: Date.now(),
        dataHora: dataHora,
        tipo: 'ENTRADA',
        categoria: 'Faturamento NF-e',
        descricao: `Receita NF-e #${numNFe} - ${dest.razaoSocial}`,
        forma: 'A_PRAZO',
        valor: totalNF
      });

      const notaObj = {
        chave: chaveCompleta,
        numero: numNFe,
        serie: emit.serieNFe,
        modelo: 55,
        tipo: 'NF-e',
        dataHora: dataHora,
        destinatario: dest.razaoSocial,
        cnpj: dest.cnpjCpf,
        total: totalNF,
        icms: vlrICMS,
        protocolo: `1352600${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: '100 - Autorizada SEFAZ',
        xml: this.gerarXMLNFe(chaveCompleta, numNFe, prods)
      };
      this.state.notasEmitidas.unshift(notaObj);

      if (this.state.currentModule === 'fiscal') {
        this.switchModule('fiscal');
      }

      this.visualizarDANFE(chaveCompleta);
      return notaObj;
    }

    gerarXMLNFe(chave, num, prods) {
      const emit = this.state.emitente;
      const dest = this.state.destinatario;
      const total = prods.reduce((acc, p) => acc + (p.precoVenda * 1), 0).toFixed(2);
      const icms = (total * 0.18).toFixed(2);

      let itensXml = prods.map((p, idx) => `
        <det nItem="${idx + 1}">
          <prod>
            <cProd>${p.codigo}</cProd>
            <cEAN>SEM GTIN</cEAN>
            <xProd>${p.descricao}</xProd>
            <NCM>${p.ncm.replace(/\D/g, '')}</NCM>
            <CFOP>${p.cfop}</CFOP>
            <uCom>${p.unidade}</uCom>
            <qCom>1.0000</qCom>
            <vUnCom>${p.precoVenda.toFixed(2)}</vUnCom>
            <vProd>${p.precoVenda.toFixed(2)}</vProd>
            <uTrib>${p.unidade}</uTrib>
            <qTrib>1.0000</qTrib>
            <vUnTrib>${p.precoVenda.toFixed(2)}</vUnTrib>
            <indTot>1</indTot>
          </prod>
          <imposto>
            <ICMS>
              <ICMSSN102>
                <orig>0</orig>
                <CSOSN>102</CSOSN>
              </ICMSSN102>
            </ICMS>
          </imposto>
        </det>
      `).join('');

      return `<?xml version="1.0" encoding="UTF-8"?>
<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00">
  <NFe xmlns="http://www.portalfiscal.inf.br/nfe">
    <infNFe Id="NFe${chave}" versao="4.00">
      <ide>
        <cUF>${emit.ibge.substring(0, 2)}</cUF>
        <cNF>${chave.substring(35, 43)}</cNF>
        <natOp>VENDA DE MERCADORIA ADQUIRIDA DE TERCEIROS</natOp>
        <mod>55</mod>
        <serie>${emit.serieNFe}</serie>
        <nNF>${num}</nNF>
        <dhEmi>2026-09-21T18:50:00-03:00</dhEmi>
        <tpNF>1</tpNF>
        <idDest>1</idDest>
        <cMunFG>${emit.ibge}</cMunFG>
        <tpImp>1</tpImp>
        <tpEmis>1</tpEmis>
        <cDV>${chave.slice(-1)}</cDV>
        <tpAmb>${emit.ambiente}</tpAmb>
        <finNFe>1</finNFe>
        <indFinal>1</indFinal>
        <indPres>1</indPres>
        <procEmi>0</procEmi>
        <verProc>VoxERP Studio RAD 4.0</verProc>
      </ide>
      <emit>
        <CNPJ>${emit.cnpj.replace(/\D/g, '')}</CNPJ>
        <xNome>${emit.razaoSocial}</xNome>
        <xFant>${emit.fantasia}</xFant>
        <enderEmit>
          <xLgr>${emit.logradouro}</xLgr>
          <nro>${emit.numero}</nro>
          <xBairro>${emit.bairro}</xBairro>
          <cMun>${emit.ibge}</cMun>
          <xMun>${emit.cidade}</xMun>
          <UF>${emit.uf}</UF>
          <CEP>${emit.cep.replace(/\D/g, '')}</CEP>
          <fone>${emit.fone.replace(/\D/g, '')}</fone>
        </enderEmit>
        <IE>${emit.ie.replace(/\D/g, '')}</IE>
        <CRT>${emit.crt}</CRT>
      </emit>
      <dest>
        <CNPJ>${dest.cnpjCpf.replace(/\D/g, '')}</CNPJ>
        <xNome>${dest.razaoSocial}</xNome>
        <enderDest>
          <xLgr>${dest.logradouro}</xLgr>
          <nro>${dest.numero}</nro>
          <xBairro>${dest.bairro}</xBairro>
          <cMun>${dest.ibge}</cMun>
          <xMun>${dest.cidade}</xMun>
          <UF>${dest.uf}</UF>
          <CEP>${dest.cep.replace(/\D/g, '')}</CEP>
        </enderDest>
        <indIEDest>${dest.indIEDest}</indIEDest>
        <IE>${dest.ie.replace(/\D/g, '')}</IE>
        <email>${dest.email}</email>
      </dest>
      ${itensXml}
      <total>
        <ICMSTot>
          <vBC>${total}</vBC>
          <vICMS>${icms}</vICMS>
          <vICMSDeson>0.00</vICMSDeson>
          <vFCP>0.00</vFCP>
          <vBCST>0.00</vBCST>
          <vST>0.00</vST>
          <vFCPST>0.00</vFCPST>
          <vFCPSTRet>0.00</vFCPSTRet>
          <vProd>${total}</vProd>
          <vFrete>0.00</vFrete>
          <vSeg>0.00</vSeg>
          <vDesc>0.00</vDesc>
          <vII>0.00</vII>
          <vIPI>0.00</vIPI>
          <vIPIDevol>0.00</vIPIDevol>
          <vPIS>0.00</vPIS>
          <vCOFINS>0.00</vCOFINS>
          <vOutro>0.00</vOutro>
          <vNF>${total}</vNF>
        </ICMSTot>
      </total>
      <transp><modFrete>9</modFrete></transp>
      <infAdic>
        <infCpl>DOCUMENTO EMITIDO POR ME OU EPP OPTANTE PELO SIMPLES NACIONAL. NAO GERA DIREITO A CREDITO FISCAL DE IPI.</infCpl>
      </infAdic>
    </infNFe>
  </NFe>
  <protNFe versao="4.00">
    <infProt>
      <tpAmb>${emit.ambiente}</tpAmb>
      <verAplic>SP_NFE_PL_009_V4</verAplic>
      <chNFe>${chave}</chNFe>
      <dhRecbto>2026-09-21T18:50:02-03:00</dhRecbto>
      <nProt>135260009876543</nProt>
      <digVal>4F8A3BC98E0123AB789CD456EF1234567890ABCD</digVal>
      <cStat>100</cStat>
      <xMotivo>Autorizado o uso da NF-e</xMotivo>
    </infProt>
  </protNFe>
</nfeProc>`;
    }

    visualizarDANFE(chave) {
      const nota = this.state.notasEmitidas.find(n => n.chave === chave) || this.state.notasEmitidas[0];
      if (!nota) return;

      const emit = this.state.emitente;
      const dest = this.state.destinatario;
      const formatChave = nota.chave.replace(/(\d{4})(?=\d)/g, '$1 ');

      const modalHtml = `
        <div class="erp-modal-overlay" id="erp_danfe_modal">
          <div class="erp-modal-window" style="max-width:890px;">
            <div class="erp-modal-header">
              <h3>📄 DANFE - Documento Auxiliar da Nota Fiscal Eletrônica</h3>
              <div style="display:flex; gap:8px;">
                <button class="erp-btn erp-btn-success" onclick="voxERPEngine.baixarXML('${nota.chave}')">📥 Baixar XML</button>
                <button class="erp-btn erp-btn-primary" onclick="voxERPEngine.imprimirModal('erp_danfe_printable')">🖨️ Imprimir DANFE</button>
                <button class="erp-btn erp-btn-danger" onclick="voxERPEngine.fecharModal('erp_danfe_modal')">✕ Fechar</button>
              </div>
            </div>
            <div class="erp-modal-body">
              <div class="danfe-box erp-printable" id="erp_danfe_printable">
                <div style="display:grid; grid-template-columns: 2.2fr 1.2fr 2.6fr; border:1px solid #000; margin-bottom:6px;">
                  <div style="padding:8px; border-right:1px solid #000;">
                    <div style="font-size:14px; font-weight:bold; margin-bottom:4px;">${emit.razaoSocial}</div>
                    <div style="font-size:10px;">${emit.logradouro}, ${emit.numero} - ${emit.bairro}</div>
                    <div style="font-size:10px;">${emit.cidade} - ${emit.uf} | CEP: ${emit.cep}</div>
                    <div style="font-size:10px;">Fone: ${emit.fone}</div>
                  </div>
                  <div style="padding:6px; text-align:center; border-right:1px solid #000; display:flex; flex-direction:column; justify-content:center;">
                    <div style="font-size:13px; font-weight:bold;">DANFE</div>
                    <div style="font-size:8px;">Documento Auxiliar da Nota Fiscal Eletrônica</div>
                    <div style="font-size:10px; margin-top:4px;">0 - ENTRADA<br>1 - SAÍDA <strong>[ 1 ]</strong></div>
                    <div style="font-size:11px; font-weight:bold; margin-top:4px;">Nº ${nota.numero}<br>SÉRIE ${nota.serie}</div>
                  </div>
                  <div style="padding:6px; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                      <div style="font-size:9px; font-weight:bold;">CHAVE DE ACESSO:</div>
                      <div style="height:32px; background:repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 5px, #fff 5px, #fff 8px); margin:4px 0;"></div>
                      <div style="font-size:10px; font-family:monospace; text-align:center; font-weight:bold;">${formatChave}</div>
                    </div>
                    <div style="font-size:9px; border-top:1px solid #000; padding-top:2px;">
                      Protocolo de Autorização de Uso:<br>
                      <strong>${nota.protocolo} - ${nota.dataHora}</strong>
                    </div>
                  </div>
                </div>

                <table class="danfe-table">
                  <tr>
                    <td colspan="2">NATUREZA DA OPERAÇÃO<br><strong>VENDA DE MERCADORIA ADQUIRIDA DE TERCEIROS</strong></td>
                    <td>PROTOCOLO SEFAZ<br><strong>${nota.protocolo}</strong></td>
                  </tr>
                  <tr>
                    <td>INSCRIÇÃO ESTADUAL<br><strong>${emit.ie}</strong></td>
                    <td>INSC. ESTADUAL DO SUBST. TRIB.<br><strong>ISENTO</strong></td>
                    <td>CNPJ DO EMITENTE<br><strong>${emit.cnpj}</strong></td>
                  </tr>
                </table>

                <div style="font-weight:bold; font-size:10px; margin:4px 0 2px 0;">DESTINATÁRIO / REMETENTE</div>
                <table class="danfe-table">
                  <tr>
                    <td style="width:65%;">NOME / RAZÃO SOCIAL<br><strong>${dest.razaoSocial}</strong></td>
                    <td style="width:25%;">CNPJ / CPF<br><strong>${dest.cnpjCpf}</strong></td>
                    <td style="width:10%;">DATA DA EMISSÃO<br><strong>${nota.dataHora.split(' ')[0]}</strong></td>
                  </tr>
                  <tr>
                    <td>ENDEREÇO<br><strong>${dest.logradouro}, ${dest.numero} - ${dest.bairro}</strong></td>
                    <td>BAIRRO / DISTRITO<br><strong>${dest.bairro}</strong></td>
                    <td>CEP<br><strong>${dest.cep}</strong></td>
                  </tr>
                  <tr>
                    <td>MUNICÍPIO<br><strong>${dest.cidade}</strong></td>
                    <td>FONE / FAX<br><strong>(21) 98888-1111</strong></td>
                    <td>UF<br><strong>${dest.uf}</strong></td>
                  </tr>
                </table>

                <div style="font-weight:bold; font-size:10px; margin:4px 0 2px 0;">CÁLCULO DO IMPOSTO</div>
                <table class="danfe-table">
                  <tr>
                    <td>BASE DE CÁLCULO DO ICMS<br><strong>R$ ${parseFloat(nota.total).toFixed(2)}</strong></td>
                    <td>VALOR DO ICMS<br><strong>R$ ${parseFloat(nota.icms).toFixed(2)}</strong></td>
                    <td>BASE DE CÁLCULO DO ICMS ST<br><strong>R$ 0,00</strong></td>
                    <td>VALOR DO ICMS ST<br><strong>R$ 0,00</strong></td>
                    <td>VALOR TOTAL DOS PRODUTOS<br><strong>R$ ${parseFloat(nota.total).toFixed(2)}</strong></td>
                  </tr>
                  <tr>
                    <td>VALOR DO FRETE<br><strong>R$ 0,00</strong></td>
                    <td>VALOR DO SEGURO<br><strong>R$ 0,00</strong></td>
                    <td>DESCONTO<br><strong>R$ 0,00</strong></td>
                    <td>OUTRAS DESPESAS<br><strong>R$ 0,00</strong></td>
                    <td>VALOR TOTAL DA NOTA<br><strong style="font-size:12px; color:#0284c7;">R$ ${parseFloat(nota.total).toFixed(2)}</strong></td>
                  </tr>
                </table>

                <div style="font-weight:bold; font-size:10px; margin:4px 0 2px 0;">DADOS DOS PRODUTOS / SERVIÇOS</div>
                <table class="danfe-table">
                  <thead>
                    <tr>
                      <th>CÓDIGO</th>
                      <th>DESCRIÇÃO DO PRODUTO</th>
                      <th>NCM</th>
                      <th>CST</th>
                      <th>CFOP</th>
                      <th>UN</th>
                      <th>QTD</th>
                      <th>VLR UNIT</th>
                      <th>VLR TOTAL</th>
                      <th>BC ICMS</th>
                      <th>ALÍQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.state.produtos.slice(0, 2).map(p => `
                      <tr>
                        <td>${p.codigo}</td>
                        <td>${p.descricao}</td>
                        <td>${p.ncm}</td>
                        <td>102</td>
                        <td>${p.cfop}</td>
                        <td>${p.unidade}</td>
                        <td>1,00</td>
                        <td>${p.precoVenda.toFixed(2)}</td>
                        <td>${p.precoVenda.toFixed(2)}</td>
                        <td>${p.precoVenda.toFixed(2)}</td>
                        <td>18%</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <div style="font-weight:bold; font-size:10px; margin:4px 0 2px 0;">DADOS ADICIONAIS</div>
                <div style="border:1px solid #000; padding:6px; font-size:9px; min-height:45px;">
                  <strong>INFORMAÇÕES COMPLEMENTARES:</strong><br>
                  DOCUMENTO EMITIDO POR ME OU EPP OPTANTE PELO SIMPLES NACIONAL. NÃO GERA DIREITO A CRÉDITO FISCAL DE IPI.<br>
                  Protocolo de Autorização SEFAZ: ${nota.protocolo} | Ambiente: Homologação SEFAZ 4.00
                </div>
              </div>
            </div>
            <div class="erp-modal-footer">
              <span style="font-size:12px; color:#64748b; margin-right:auto;">Status SEFAZ: <strong>${nota.status}</strong></span>
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_danfe_modal')">Fechar Janela</button>
            </div>
          </div>
        </div>
      `;

      this.removerModal('erp_danfe_modal');
      const div = document.createElement('div');
      div.innerHTML = modalHtml;
      document.body.appendChild(div.firstElementChild);
    }

    baixarXML(chave) {
      const nota = this.state.notasEmitidas.find(n => n.chave === chave) || this.state.notasEmitidas[0];
      if (!nota) return;

      const blob = new Blob([nota.xml], { type: 'application/xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `NFe_${nota.chave}.xml`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    renderEstoqueModule() {
      const prods = this.state.produtos;
      const movs = this.state.movimentacoesEstoque;

      const totalItens = prods.reduce((acc, p) => acc + p.estoqueAtual, 0);
      const totalCusto = prods.reduce((acc, p) => acc + (p.custo * p.estoqueAtual), 0);
      const totalVenda = prods.reduce((acc, p) => acc + (p.precoVenda * p.estoqueAtual), 0);

      const prodsRows = prods.map(p => {
        let statusBadge = '<span class="badge-status badge-ok">Normal</span>';
        if (p.estoqueAtual <= p.estoqueMinimo) {
          statusBadge = '<span class="badge-status badge-danger">Crítico</span>';
        } else if (p.estoqueAtual <= p.estoqueMinimo * 1.5) {
          statusBadge = '<span class="badge-status badge-warn">Atenção</span>';
        }

        const margem = (((p.precoVenda - p.custo) / p.custo) * 100).toFixed(1);

        return `
          <tr>
            <td><strong>${p.codigo}</strong></td>
            <td>${p.descricao}</td>
            <td>${p.ncm}</td>
            <td>${p.unidade}</td>
            <td>R$ ${p.custo.toFixed(2)}</td>
            <td><strong>R$ ${p.precoVenda.toFixed(2)}</strong></td>
            <td style="color:#38bdf8;">+${margem}%</td>
            <td><strong style="font-size:13px;">${p.estoqueAtual}</strong> un</td>
            <td>${p.estoqueMinimo} un</td>
            <td>${statusBadge}</td>
            <td>
              <button class="erp-btn erp-btn-success" style="padding:3px 8px; font-size:10px;" onclick="voxERPEngine.modalEntradaEstoque(${p.id})">➕ Entrada</button>
              <button class="erp-btn erp-btn-danger" style="padding:3px 8px; font-size:10px;" onclick="voxERPEngine.modalBaixaEstoque(${p.id})">➖ Baixa</button>
            </td>
          </tr>
        `;
      }).join('');

      const movsRows = movs.map(m => `
        <tr>
          <td>${m.dataHora}</td>
          <td>${m.codigo} - ${m.descricao}</td>
          <td><span class="badge-status ${m.tipo.includes('ENTRADA') ? 'badge-ok' : 'badge-danger'}">${m.tipo}</span></td>
          <td>${m.qtd} un</td>
          <td>${m.doc}</td>
          <td><strong>${m.saldoApos} un</strong></td>
        </tr>
      `).join('');

      return `
        <div class="erp-module-view">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:#38bdf8; margin:0;">📦 Gestão de Estoque & Almoxarifado</h2>
              <span style="font-size:12px; color:#94a3b8;">Controle de Saldos Físicos, Entradas por NF-e e Baixas Automáticas do PDV</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="erp-btn erp-btn-success" onclick="voxERPEngine.modalEntradaEstoque()">➕ Entrada de Compra</button>
              <button class="erp-btn erp-btn-danger" onclick="voxERPEngine.modalBaixaEstoque()">➖ Ajuste / Baixa Manual</button>
            </div>
          </div>

          <div class="erp-kpi-grid">
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Volume Físico Total</span>
              <span class="erp-kpi-val" style="color:#38bdf8;">${totalItens} un</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Valor em Custo</span>
              <span class="erp-kpi-val" style="color:#f59e0b;">R$ ${totalCusto.toFixed(2)}</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Valor em Preço de Venda</span>
              <span class="erp-kpi-val" style="color:#4ade80;">R$ ${totalVenda.toFixed(2)}</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Margem Potencial Estimada</span>
              <span class="erp-kpi-val" style="color:#a855f7;">R$ ${(totalVenda - totalCusto).toFixed(2)}</span>
            </div>
          </div>

          <div>
            <div style="font-weight:700; font-size:14px; margin-bottom:8px; color:#f8fafc;">📋 Tabela de Produtos & Saldos de Almoxarifado</div>
            <div class="erp-table-wrapper">
              <table class="erp-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>NCM</th>
                    <th>UN</th>
                    <th>Custo Unit</th>
                    <th>Preço Venda</th>
                    <th>Margem</th>
                    <th>Saldo Atual</th>
                    <th>Est. Mínimo</th>
                    <th>Status</th>
                    <th>Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody>${prodsRows}</tbody>
              </table>
            </div>
          </div>

          <div style="margin-top:10px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:8px; color:#f8fafc;">🔄 Últimas Movimentações de Estoque</div>
            <div class="erp-table-wrapper">
              <table class="erp-table">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Produto</th>
                    <th>Tipo</th>
                    <th>Quantidade</th>
                    <th>Documento</th>
                    <th>Saldo Após</th>
                  </tr>
                </thead>
                <tbody>${movsRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    modalEntradaEstoque(idProd) {
      const prod = this.state.produtos.find(p => p.id === idProd) || this.state.produtos[0];
      const html = `
        <div class="erp-modal-overlay" id="erp_entrada_modal">
          <div class="erp-modal-window" style="max-width:480px;">
            <div class="erp-modal-header">
              <h3>➕ Nova Entrada de Mercadoria</h3>
              <button class="erp-btn erp-btn-danger" style="padding:4px 8px;" onclick="voxERPEngine.fecharModal('erp_entrada_modal')">✕</button>
            </div>
            <div class="erp-modal-body" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Produto:</label>
                <select id="ent_prod_id" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                  ${this.state.produtos.map(p => `<option value="${p.id}" ${p.id === prod.id ? 'selected' : ''}>${p.codigo} - ${p.descricao} (Saldo Atual: ${p.estoqueAtual})</option>`).join('')}
                </select>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div>
                  <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Quantidade a Inserir:</label>
                  <input type="number" id="ent_qtd" value="10" min="1" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Custo Unitário (R$):</label>
                  <input type="number" id="ent_custo" value="${prod.custo.toFixed(2)}" step="0.01" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                </div>
              </div>
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Documento / NF-e Fornecedor:</label>
                <input type="text" id="ent_doc" value="NF-e Compra 9021" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
              </div>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_entrada_modal')">Cancelar</button>
              <button class="erp-btn erp-btn-success" onclick="voxERPEngine.confirmarEntradaEstoque()">Confirmar Entrada</button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_entrada_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    confirmarEntradaEstoque() {
      const prodId = parseInt(document.getElementById('ent_prod_id').value, 10);
      const qtd = parseFloat(document.getElementById('ent_qtd').value) || 1;
      const custo = parseFloat(document.getElementById('ent_custo').value) || 0;
      const doc = document.getElementById('ent_doc').value || 'Entrada Manual';

      const prod = this.state.produtos.find(p => p.id === prodId);
      if (!prod) return;

      prod.estoqueAtual += qtd;
      if (custo > 0) prod.custo = custo;

      const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);

      this.state.movimentacoesEstoque.unshift({
        id: Date.now(),
        dataHora: dataHora,
        codigo: prod.codigo,
        descricao: prod.descricao,
        tipo: 'ENTRADA',
        qtd: qtd,
        doc: doc,
        saldoApos: prod.estoqueAtual
      });

      this.state.movimentacoesFinanceiras.unshift({
        id: Date.now(),
        dataHora: dataHora,
        tipo: 'SAIDA',
        categoria: 'Compra de Mercadoria',
        descricao: `Entrada estoque ${qtd} un de ${prod.descricao} (${doc})`,
        forma: 'A_PRAZO',
        valor: qtd * prod.custo
      });

      this.fecharModal('erp_entrada_modal');
      this.switchModule('estoque');
      alert(`Entrada de ${qtd} unidades de ${prod.descricao} registrada com sucesso!`);
    }

    modalBaixaEstoque(idProd) {
      const prod = this.state.produtos.find(p => p.id === idProd) || this.state.produtos[0];
      const html = `
        <div class="erp-modal-overlay" id="erp_baixa_modal">
          <div class="erp-modal-window" style="max-width:480px;">
            <div class="erp-modal-header">
              <h3>➖ Baixa / Ajuste Manual de Estoque</h3>
              <button class="erp-btn erp-btn-danger" style="padding:4px 8px;" onclick="voxERPEngine.fecharModal('erp_baixa_modal')">✕</button>
            </div>
            <div class="erp-modal-body" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Produto:</label>
                <select id="baixa_prod_id" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                  ${this.state.produtos.map(p => `<option value="${p.id}" ${p.id === prod.id ? 'selected' : ''}>${p.codigo} - ${p.descricao} (Saldo Atual: ${p.estoqueAtual})</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Quantidade a Baixar:</label>
                <input type="number" id="baixa_qtd" value="1" min="1" max="${prod.estoqueAtual}" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
              </div>
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Motivo da Baixa:</label>
                <select id="baixa_motivo" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                  <option value="Avaria / Defeito">Avaria / Defeito de Fábrica</option>
                  <option value="Consumo Interno">Consumo Interno / Uso da Empresa</option>
                  <option value="Perda / Extravio">Perda / Extravio</option>
                  <option value="Ajuste de Inventário">Ajuste de Inventário Físico</option>
                </select>
              </div>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_baixa_modal')">Cancelar</button>
              <button class="erp-btn erp-btn-danger" onclick="voxERPEngine.confirmarBaixaEstoque()">Confirmar Baixa</button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_baixa_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    confirmarBaixaEstoque() {
      const prodId = parseInt(document.getElementById('baixa_prod_id').value, 10);
      const qtd = parseFloat(document.getElementById('baixa_qtd').value) || 1;
      const motivo = document.getElementById('baixa_motivo').value;

      const prod = this.state.produtos.find(p => p.id === prodId);
      if (!prod) return;

      if (prod.estoqueAtual < qtd) {
        alert('Erro: Saldo em estoque insuficiente para realizar esta baixa!');
        return;
      }

      prod.estoqueAtual -= qtd;
      const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);

      this.state.movimentacoesEstoque.unshift({
        id: Date.now(),
        dataHora: dataHora,
        codigo: prod.codigo,
        descricao: prod.descricao,
        tipo: 'BAIXA_MANUAL',
        qtd: qtd,
        doc: motivo,
        saldoApos: prod.estoqueAtual
      });

      this.fecharModal('erp_baixa_modal');
      this.switchModule('estoque');
      alert(`Baixa de ${qtd} unidades de ${prod.descricao} registrada com sucesso!`);
    }

    renderPDVModule() {
      const carrinho = this.state.carrinhoPDV;
      const prods = this.state.produtos;
      const totalCupom = carrinho.reduce((acc, it) => acc + it.subtotal, 0);

      const cartRows = carrinho.map((it, idx) => `
        <tr>
          <td><strong>#${idx + 1}</strong></td>
          <td>${it.codigo}</td>
          <td>${it.descricao}</td>
          <td>${it.qtd} un</td>
          <td>R$ ${it.valorUnit.toFixed(2)}</td>
          <td><strong>R$ ${it.subtotal.toFixed(2)}</strong></td>
          <td>
            <button class="erp-btn erp-btn-danger" style="padding:2px 6px; font-size:11px;" onclick="voxERPEngine.removerItemPDV(${idx})">🗑️</button>
          </td>
        </tr>
      `).join('');

      return `
        <div class="erp-module-view">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:#38bdf8; margin:0;">🛒 Frente de Caixa (PDV) Rápido & NFC-e</h2>
              <span style="font-size:12px; color:#94a3b8;">Venda de Balcão com Baixa Imediata de Estoque e Cupom Térmico 80mm</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; color:#94a3b8;">Operador: <strong>Caixa 01 - Maria</strong></span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:16px;">
            <div style="background:#283040; border:1px solid #334155; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:12px;">
              <div style="font-weight:700; font-size:13px; color:#38bdf8;">📦 Selecionar Produto para Venda</div>
              <div>
                <label style="font-size:12px; color:#94a3b8; display:block; margin-bottom:4px;">Produto:</label>
                <select id="pdv_sel_produto" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;" onchange="voxERPEngine.atualizarPrecoPDV(this.value)">
                  ${prods.map(p => `<option value="${p.id}">${p.codigo} - ${p.descricao} (Estoque: ${p.estoqueAtual} un) - R$ ${p.precoVenda.toFixed(2)}</option>`).join('')}
                </select>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div>
                  <label style="font-size:12px; color:#94a3b8; display:block; margin-bottom:4px;">Quantidade:</label>
                  <input type="number" id="pdv_qtd_item" value="1" min="1" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:12px; color:#94a3b8; display:block; margin-bottom:4px;">Preço Unitário (R$):</label>
                  <input type="text" id="pdv_preco_item" value="${prods[0].precoVenda.toFixed(2)}" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;" readonly>
                </div>
              </div>
              <button class="erp-btn erp-btn-success" style="width:100%; padding:10px; font-size:14px; justify-content:center;" onclick="voxERPEngine.adicionarItemPDV()">
                ➕ Inserir no Carrinho PDV
              </button>
            </div>

            <div style="background:#1e293b; border:2px solid #0284c7; border-radius:8px; padding:16px; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="font-size:12px; color:#94a3b8; text-transform:uppercase;">Total do Cupom</div>
                <div style="font-size:36px; font-weight:800; color:#38bdf8; margin:4px 0 14px 0;">R$ ${totalCupom.toFixed(2)}</div>
                <div style="font-size:12px; color:#e2e8f0; margin-bottom:8px;">Forma Selecionada: <strong>${this.state.formaPagamento}</strong></div>
              </div>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                  <button class="erp-btn erp-btn-primary" style="justify-content:center;" onclick="voxERPEngine.abrirModalPIX()">⚡ Pagar com PIX</button>
                  <button class="erp-btn erp-btn-secondary" style="justify-content:center;" onclick="voxERPEngine.abrirModalDinheiro()">💵 Dinheiro / Troco</button>
                </div>
                <button class="erp-btn erp-btn-success" style="padding:12px; font-size:14px; font-weight:700; justify-content:center;" onclick="voxERPEngine.finalizarVendaNFCe()">
                  🧾 Finalizar Venda & Imprimir NFC-e
                </button>
              </div>
            </div>
          </div>

          <div style="margin-top:10px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:8px; color:#f8fafc;">🛒 Itens no Carrinho da Venda Atual (${carrinho.length} itens)</div>
            <div class="erp-table-wrapper">
              <table class="erp-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Qtd</th>
                    <th>Preço Unit</th>
                    <th>Subtotal</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartRows || '<tr><td colspan="7" style="text-align:center; padding:14px; color:#94a3b8;">Carrinho vazio. Insira produtos acima.</td></tr>'}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    atualizarPrecoPDV(prodId) {
      const p = this.state.produtos.find(x => x.id === parseInt(prodId, 10));
      if (!p) return;
      const el = document.getElementById('pdv_preco_item');
      if (el) el.value = p.precoVenda.toFixed(2);
    }

    adicionarItemPDV() {
      const sel = document.getElementById('pdv_sel_produto');
      const qtdEl = document.getElementById('pdv_qtd_item');
      if (!sel) return;

      const pId = parseInt(sel.value, 10);
      const qtd = parseFloat(qtdEl ? qtdEl.value : 1) || 1;
      const prod = this.state.produtos.find(p => p.id === pId);
      if (!prod) return;

      if (prod.estoqueAtual < qtd) {
        alert(`Atenção: Saldo insuficiente em estoque! Saldo disponível: ${prod.estoqueAtual} un.`);
        return;
      }

      this.state.carrinhoPDV.push({
        id: prod.id,
        codigo: prod.codigo,
        descricao: prod.descricao,
        ncm: prod.ncm,
        cfop: prod.cfop,
        qtd: qtd,
        valorUnit: prod.precoVenda,
        subtotal: qtd * prod.precoVenda
      });

      this.switchModule('pdv');
    }

    removerItemPDV(idx) {
      this.state.carrinhoPDV.splice(idx, 1);
      this.switchModule('pdv');
    }

    abrirModalPIX() {
      const total = this.state.carrinhoPDV.reduce((acc, it) => acc + it.subtotal, 0);
      if (total <= 0) {
        alert('Adicione itens ao carrinho antes de realizar o pagamento!');
        return;
      }

      const chavePixCopiaECola = `00020126580014br.gov.bcb.pix013612345678000195520400005303986540${total.toFixed(2)}5802BR5925VOX ERP ENTERPRISE LTDA6009SAO PAULO62070503***6304ABCD`;

      const html = `
        <div class="erp-modal-overlay" id="erp_pix_modal">
          <div class="erp-modal-window" style="max-width:440px;">
            <div class="erp-modal-header" style="background:#047857;">
              <h3>⚡ Pagamento Instantâneo PIX</h3>
              <button class="erp-btn erp-btn-danger" style="padding:4px 8px;" onclick="voxERPEngine.fecharModal('erp_pix_modal')">✕</button>
            </div>
            <div class="erp-modal-body" style="text-align:center;">
              <span style="font-size:12px; color:#64748b;">Valor a Pagar no QR Code</span>
              <div style="font-size:28px; font-weight:800; color:#047857; margin:4px 0 14px 0;">R$ ${total.toFixed(2)}</div>
              
              <div style="background:#fff; padding:12px; border:2px solid #047857; border-radius:8px; display:inline-block; margin-bottom:12px;">
                <svg width="180" height="180" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="#ffffff" />
                  <path d="M10 10 h25 v25 h-25 z M15 15 h15 v15 h-15 z M19 19 h7 v7 h-7 z" fill="#047857" />
                  <path d="M65 10 h25 v25 h-25 z M70 15 h15 v15 h-15 z M74 19 h7 v7 h-7 z" fill="#047857" />
                  <path d="M10 65 h25 v25 h-25 z M15 70 h15 v15 h-15 z M19 74 h7 v7 h-7 z" fill="#047857" />
                  <path d="M45 15 h10 v10 h-10 z M40 30 h8 v8 h-8 z M55 30 h10 v8 h-10 z M42 45 h16 v16 h-16 z M65 45 h8 v8 h-8 z M80 45 h10 v12 h-10 z M65 65 h12 v12 h-12 z M82 65 h8 v8 h-8 z M75 80 h15 v10 h-15 z M45 75 h10 v15 h-10 z M15 45 h12 v10 h-12 z M32 45 h6 v15 h-6 z" fill="#047857" />
                </svg>
              </div>
              <div style="font-size:11px; color:#64748b; margin-bottom:8px;">Aponte o app do seu banco para o QR Code acima</div>

              <div style="background:#f1f5f9; padding:8px; border-radius:4px; border:1px solid #cbd5e1; font-family:monospace; font-size:10px; word-break:break-all; margin-bottom:10px;">
                ${chavePixCopiaECola}
              </div>
              <button class="erp-btn erp-btn-secondary" style="width:100%; justify-content:center; margin-bottom:8px;" onclick="navigator.clipboard.writeText('${chavePixCopiaECola}'); this.innerText = '✓ Código Copiado!';">
                📋 Copiar Código PIX Copia-e-Cola
              </button>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_pix_modal')">Cancelar</button>
              <button class="erp-btn erp-btn-success" onclick="voxERPEngine.confirmarPagamento('PIX', ${total})">✓ Confirmar Recebimento PIX</button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_pix_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    abrirModalDinheiro() {
      const total = this.state.carrinhoPDV.reduce((acc, it) => acc + it.subtotal, 0);
      if (total <= 0) {
        alert('Adicione itens ao carrinho antes de realizar o pagamento!');
        return;
      }

      const html = `
        <div class="erp-modal-overlay" id="erp_dinheiro_modal">
          <div class="erp-modal-window" style="max-width:440px;">
            <div class="erp-modal-header" style="background:#1e293b;">
              <h3>💵 Pagamento em Dinheiro & Troco</h3>
              <button class="erp-btn erp-btn-danger" style="padding:4px 8px;" onclick="voxERPEngine.fecharModal('erp_dinheiro_modal')">✕</button>
            </div>
            <div class="erp-modal-body">
              <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <span style="font-size:13px; color:#64748b;">Total a Pagar:</span>
                <span style="font-size:18px; font-weight:700; color:#0284c7;">R$ ${total.toFixed(2)}</span>
              </div>
              <div style="margin-bottom:12px;">
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Valor Recebido do Cliente (R$):</label>
                <input type="number" id="din_recebido" value="${Math.ceil(total / 10) * 10}" step="0.50" class="web-input" style="width:100%; padding:10px; font-size:18px; font-weight:700; text-align:right; background:#fff; color:#000; border:2px solid #0284c7; border-radius:4px;" oninput="voxERPEngine.calcularTrocoLive(${total})">
              </div>

              <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:6px; margin-bottom:14px;">
                <button class="erp-btn erp-btn-secondary" style="padding:6px; justify-content:center;" onclick="voxERPEngine.setDinheiro(${total}, ${total})">Exato</button>
                <button class="erp-btn erp-btn-secondary" style="padding:6px; justify-content:center;" onclick="voxERPEngine.setDinheiro(${total}, 50)">R$ 50</button>
                <button class="erp-btn erp-btn-secondary" style="padding:6px; justify-content:center;" onclick="voxERPEngine.setDinheiro(${total}, 100)">R$ 100</button>
                <button class="erp-btn erp-btn-secondary" style="padding:6px; justify-content:center;" onclick="voxERPEngine.setDinheiro(${total}, 200)">R$ 200</button>
              </div>

              <div style="background:#f1f5f9; border-radius:6px; padding:12px; text-align:center; border:1px solid #cbd5e1;">
                <span style="font-size:12px; color:#64748b;">Troco a Devolver</span>
                <div id="din_troco_display" style="font-size:28px; font-weight:800; color:#16a34a; margin-top:2px;">
                  R$ ${(Math.max(0, (Math.ceil(total / 10) * 10) - total)).toFixed(2)}
                </div>
              </div>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_dinheiro_modal')">Cancelar</button>
              <button class="erp-btn erp-btn-success" onclick="voxERPEngine.confirmarPagamentoDinheiro(${total})">✓ Confirmar Pagamento</button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_dinheiro_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    setDinheiro(total, val) {
      const el = document.getElementById('din_recebido');
      if (el) {
        el.value = val;
        this.calcularTrocoLive(total);
      }
    }

    calcularTrocoLive(total) {
      const rec = parseFloat(document.getElementById('din_recebido').value) || 0;
      const troco = rec - total;
      const disp = document.getElementById('din_troco_display');
      if (disp) {
        if (troco >= 0) {
          disp.style.color = '#16a34a';
          disp.innerText = `R$ ${troco.toFixed(2)}`;
        } else {
          disp.style.color = '#dc2626';
          disp.innerText = `Falta R$ ${Math.abs(troco).toFixed(2)}`;
        }
      }
    }

    confirmarPagamento(forma, valor) {
      this.state.formaPagamento = forma;
      this.state.valorRecebido = valor;
      this.state.troco = 0;
      this.fecharModal('erp_pix_modal');
      this.switchModule('pdv');
      alert(`Pagamento via ${forma} registrado com sucesso!`);
    }

    confirmarPagamentoDinheiro(total) {
      const rec = parseFloat(document.getElementById('din_recebido').value) || 0;
      if (rec < total) {
        alert('Atenção: O valor recebido é menor que o total da venda!');
        return;
      }
      this.state.formaPagamento = 'DINHEIRO';
      this.state.valorRecebido = rec;
      this.state.troco = rec - total;
      this.fecharModal('erp_dinheiro_modal');
      this.switchModule('pdv');
      alert(`Pagamento em Dinheiro confirmado! Troco: R$ ${this.state.troco.toFixed(2)}.`);
    }

    finalizarVendaNFCe() {
      const carrinho = this.state.carrinhoPDV;
      if (carrinho.length === 0) {
        alert('Não é possível finalizar a venda: O carrinho está vazio!');
        return;
      }

      const totalVenda = carrinho.reduce((acc, it) => acc + it.subtotal, 0);
      const emit = this.state.emitente;
      const numNFCe = emit.proximaNFCe;
      emit.proximaNFCe++;

      carrinho.forEach(it => {
        const prod = this.state.produtos.find(p => p.id === it.id);
        if (prod) {
          prod.estoqueAtual = Math.max(0, prod.estoqueAtual - it.qtd);
          this.state.movimentacoesEstoque.unshift({
            id: Date.now() + Math.random(),
            dataHora: new Date().toISOString().replace('T', ' ').substring(0, 19),
            codigo: prod.codigo,
            descricao: prod.descricao,
            tipo: 'SAIDA_PDV',
            qtd: it.qtd,
            doc: `NFC-e ${numNFCe}`,
            saldoApos: prod.estoqueAtual
          });
        }
      });

      const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);
      this.state.movimentacoesFinanceiras.unshift({
        id: Date.now(),
        dataHora: dataHora,
        tipo: 'ENTRADA',
        categoria: 'Venda PDV',
        descricao: `Venda Balcão NFC-e #${numNFCe} (${carrinho.length} itens)`,
        forma: this.state.formaPagamento,
        valor: totalVenda
      });

      const chaveNFCe = `352609${emit.cnpj.replace(/\D/g, '')}65001${String(numNFCe).padStart(9, '0')}1${Math.floor(10000000 + Math.random() * 90000000)}9`;

      this.exibirCupomFiscalNFCe(numNFCe, chaveNFCe, totalVenda, carrinho);

      const nfceResult = {
        numero: numNFCe,
        chaveAcesso: chaveNFCe,
        total: totalVenda,
        itens: [...carrinho],
        dataHora: dataHora
      };

      this.state.carrinhoPDV = [];
      this.state.formaPagamento = 'PIX';
      return nfceResult;
    }

    exibirCupomFiscalNFCe(numNFCe, chave, total, itens) {
      const emit = this.state.emitente;
      const formatChave = chave.replace(/(\d{4})(?=\d)/g, '$1 ');
      const dataHora = new Date().toLocaleString('pt-BR');

      const itensHtml = itens.map((it, idx) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
          <span>${String(idx + 1).padStart(3, '0')} ${it.codigo} ${it.descricao.substring(0, 18)}</span>
          <span>${it.qtd} x ${it.valorUnit.toFixed(2)}</span>
        </div>
        <div style="text-align:right; font-weight:bold; margin-bottom:4px;">
          Subtotal: R$ ${it.subtotal.toFixed(2)}
        </div>
      `).join('');

      const html = `
        <div class="erp-modal-overlay" id="erp_nfce_modal">
          <div class="erp-modal-window" style="max-width:420px;">
            <div class="erp-modal-header">
              <h3>🧾 Cupom Fiscal Eletrônico NFC-e</h3>
              <div style="display:flex; gap:8px;">
                <button class="erp-btn erp-btn-primary" onclick="voxERPEngine.imprimirModal('erp_cupom_printable')">🖨️ Imprimir 80mm</button>
                <button class="erp-btn erp-btn-danger" onclick="voxERPEngine.fecharModal('erp_nfce_modal'); voxERPEngine.switchModule('pdv');">✕ Concluir</button>
              </div>
            </div>
            <div class="erp-modal-body" style="background:#e2e8f0; display:flex; justify-content:center;">
              <div class="nfce-cupom erp-printable" id="erp_cupom_printable">
                <div style="text-align:center; margin-bottom:8px;">
                  <strong style="font-size:12px;">${emit.razaoSocial}</strong><br>
                  CNPJ: ${emit.cnpj} | IE: ${emit.ie}<br>
                  ${emit.logradouro}, ${emit.numero} - ${emit.cidade}/${emit.uf}<br>
                  ---------------------------------------------<br>
                  <strong>DANFE NFC-e - Documento Auxiliar da<br>
                  Nota Fiscal de Consumidor Eletrônica</strong><br>
                  Não permite aproveitamento de crédito de ICMS<br>
                  ---------------------------------------------
                </div>

                <div style="margin-bottom:6px;">
                  ${itensHtml}
                </div>

                <div style="border-top:1px dashed #000; padding-top:6px; margin-bottom:8px;">
                  <div style="display:flex; justify-content:space-between;">
                    <span>QTD TOTAL DE ITENS:</span>
                    <strong>${itens.length}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:bold; margin:4px 0;">
                    <span>VALOR TOTAL R$:</span>
                    <span>R$ ${total.toFixed(2)}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span>FORMA DE PAGAMENTO:</span>
                    <strong>${this.state.formaPagamento}</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between;">
                    <span>VALOR PAGO R$:</span>
                    <span>R$ ${this.state.valorRecebido.toFixed(2)}</span>
                  </div>
                  ${this.state.troco > 0 ? `
                    <div style="display:flex; justify-content:space-between; color:#16a34a; font-weight:bold;">
                      <span>TROCO R$:</span>
                      <span>R$ ${this.state.troco.toFixed(2)}</span>
                    </div>
                  ` : ''}
                </div>

                <div style="border-top:1px dashed #000; padding-top:6px; text-align:center; font-size:10px;">
                  CONSUMIDOR NÃO IDENTIFICADO<br>
                  NFC-e nº ${numNFCe} Série ${emit.serieNFCe} - Data: ${dataHora}<br>
                  Protocolo de Autorização: 1352600${Math.floor(10000000 + Math.random() * 90000000)}<br>
                  Ambiente de Homologação - Sem Valor Fiscal<br>
                  <br>
                  <strong>CHAVE DE ACESSO</strong><br>
                  <span style="font-size:9px; word-break:break-all;">${formatChave}</span><br>
                  <br>
                  <div style="display:flex; justify-content:center; margin:6px 0;">
                    <svg width="120" height="120" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="#ffffff" />
                      <path d="M10 10 h25 v25 h-25 z M15 15 h15 v15 h-15 z M19 19 h7 v7 h-7 z" fill="#000" />
                      <path d="M65 10 h25 v25 h-25 z M70 15 h15 v15 h-15 z M74 19 h7 v7 h-7 z" fill="#000" />
                      <path d="M10 65 h25 v25 h-25 z M15 70 h15 v15 h-15 z M19 74 h7 v7 h-7 z" fill="#000" />
                      <path d="M45 15 h10 v10 h-10 z M40 30 h8 v8 h-8 z M55 30 h10 v8 h-10 z M42 45 h16 v16 h-16 z M65 45 h8 v8 h-8 z M80 45 h10 v12 h-10 z M65 65 h12 v12 h-12 z M82 65 h8 v8 h-8 z M75 80 h15 v10 h-15 z M45 75 h10 v15 h-10 z M15 45 h12 v10 h-12 z M32 45 h6 v15 h-6 z" fill="#000" />
                    </svg>
                  </div>
                  Consulte pela Chave de Acesso em:<br>
                  www.fazenda.sp.gov.br/nfce/consulta
                </div>
              </div>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-success" style="width:100%; justify-content:center;" onclick="voxERPEngine.fecharModal('erp_nfce_modal'); voxERPEngine.switchModule('pdv');">
                ✓ Concluir e Iniciar Próxima Venda
              </button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_nfce_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    renderFinanceiroModule() {
      const movs = this.state.movimentacoesFinanceiras;
      const entradas = movs.filter(m => m.tipo === 'ENTRADA').reduce((acc, m) => acc + m.valor, 0);
      const saidas = movs.filter(m => m.tipo === 'SAIDA').reduce((acc, m) => acc + m.valor, 0);
      const saldoCaixa = entradas - saidas;
      const faturamentoHoje = movs.filter(m => m.categoria.includes('Venda') || m.categoria.includes('NF-e')).reduce((acc, m) => acc + m.valor, 0);

      const rowsHtml = movs.map(m => `
        <tr>
          <td>${m.dataHora}</td>
          <td><span class="badge-status ${m.tipo === 'ENTRADA' ? 'badge-ok' : 'badge-danger'}">${m.tipo}</span></td>
          <td>${m.categoria}</td>
          <td>${m.descricao}</td>
          <td><strong>${m.forma}</strong></td>
          <td style="color:${m.tipo === 'ENTRADA' ? '#4ade80' : '#f87171'}; font-weight:bold;">
            ${m.tipo === 'ENTRADA' ? '+' : '-'} R$ ${m.valor.toFixed(2)}
          </td>
        </tr>
      `).join('');

      return `
        <div class="erp-module-view">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:#38bdf8; margin:0;">💰 Gestão Financeira & Fluxo de Caixa</h2>
              <span style="font-size:12px; color:#94a3b8;">Controle de Receitas do PDV/NF-e, Despesas Operacionais e Saldo em Caixa</span>
            </div>
            <button class="erp-btn erp-btn-success" onclick="voxERPEngine.modalNovoLancamento()">
              ➕ Novo Lançamento Manual
            </button>
          </div>

          <div class="erp-kpi-grid">
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Saldo Atual em Caixa</span>
              <span class="erp-kpi-val" style="color:#4ade80;">R$ ${saldoCaixa.toFixed(2)}</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Faturamento do Dia</span>
              <span class="erp-kpi-val" style="color:#38bdf8;">R$ ${faturamentoHoje.toFixed(2)}</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Total de Entradas</span>
              <span class="erp-kpi-val" style="color:#22c55e;">+ R$ ${entradas.toFixed(2)}</span>
            </div>
            <div class="erp-kpi-card">
              <span class="erp-kpi-label">Total de Saídas / Despesas</span>
              <span class="erp-kpi-val" style="color:#ef4444;">- R$ ${saidas.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <div style="font-weight:700; font-size:14px; margin-bottom:8px; color:#f8fafc;">📑 Extrato das Movimentações Financeiras</div>
            <div class="erp-table-wrapper">
              <table class="erp-table">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Forma Pgto</th>
                    <th>Valor (R$)</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    modalNovoLancamento() {
      const html = `
        <div class="erp-modal-overlay" id="erp_lanc_modal">
          <div class="erp-modal-window" style="max-width:480px;">
            <div class="erp-modal-header">
              <h3>➕ Novo Lançamento no Fluxo de Caixa</h3>
              <button class="erp-btn erp-btn-danger" style="padding:4px 8px;" onclick="voxERPEngine.fecharModal('erp_lanc_modal')">✕</button>
            </div>
            <div class="erp-modal-body" style="display:flex; flex-direction:column; gap:12px;">
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Tipo de Movimentação:</label>
                <select id="lanc_tipo" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                  <option value="ENTRADA">ENTRADA (+) / Receita</option>
                  <option value="SAIDA">SAÍDA (-) / Despesa Operacional</option>
                </select>
              </div>
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Categoria:</label>
                <input type="text" id="lanc_cat" value="Despesa Geral" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
              </div>
              <div>
                <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Descrição do Lançamento:</label>
                <input type="text" id="lanc_desc" value="Pagamento de conta de luz / internet" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div>
                  <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Forma de Pgto:</label>
                  <select id="lanc_forma" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                    <option value="DINHEIRO">Dinheiro em Caixa</option>
                    <option value="PIX">PIX Bancário</option>
                    <option value="BOLETO">Boleto Bancário</option>
                    <option value="CARTAO_DEBITO">Cartão de Débito</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Valor (R$):</label>
                  <input type="number" id="lanc_valor" value="150.00" step="0.01" class="web-input" style="width:100%; padding:8px; background:#fff; color:#000; border:1px solid #cbd5e1; border-radius:4px;">
                </div>
              </div>
            </div>
            <div class="erp-modal-footer">
              <button class="erp-btn erp-btn-secondary" onclick="voxERPEngine.fecharModal('erp_lanc_modal')">Cancelar</button>
              <button class="erp-btn erp-btn-success" onclick="voxERPEngine.confirmarNovoLancamento()">Salvar Lançamento</button>
            </div>
          </div>
        </div>
      `;
      this.removerModal('erp_lanc_modal');
      const div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    confirmarNovoLancamento() {
      const tipo = document.getElementById('lanc_tipo').value;
      const cat = document.getElementById('lanc_cat').value;
      const desc = document.getElementById('lanc_desc').value;
      const forma = document.getElementById('lanc_forma').value;
      const valor = parseFloat(document.getElementById('lanc_valor').value) || 0;

      const dataHora = new Date().toISOString().replace('T', ' ').substring(0, 19);
      this.state.movimentacoesFinanceiras.unshift({
        id: Date.now(),
        dataHora: dataHora,
        tipo: tipo,
        categoria: cat,
        descricao: desc,
        forma: forma,
        valor: valor
      });

      this.fecharModal('erp_lanc_modal');
      this.switchModule('financeiro');
    }

    renderConfiguracoesModule() {
      const emit = this.state.emitente;

      return `
        <div class="erp-module-view">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px;">
            <div>
              <h2 style="font-size:18px; font-weight:700; color:#38bdf8; margin:0;">⚙️ Configurações do Emitente & Parâmetros Fiscais SEFAZ</h2>
              <span style="font-size:12px; color:#94a3b8;">Dados Cadastrais da Empresa, Certificado Digital A1 e Séries de NF-e / NFC-e</span>
            </div>
            <button class="erp-btn erp-btn-success" onclick="voxERPEngine.salvarConfiguracoes()">
              💾 Salvar Parâmetros
            </button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
            <div style="background:#283040; border:1px solid #334155; border-radius:8px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:14px; color:#38bdf8; border-bottom:1px solid #334155; padding-bottom:6px;">🏢 Dados Cadastrais da Empresa</div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Razão Social:</label>
                <input type="text" id="cfg_rs" value="${emit.razaoSocial}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Nome Fantasia:</label>
                <input type="text" id="cfg_fant" value="${emit.fantasia}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">CNPJ do Emitente:</label>
                  <input type="text" id="cfg_cnpj" value="${emit.cnpj}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Inscrição Estadual:</label>
                  <input type="text" id="cfg_ie" value="${emit.ie}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Regime Tributário (CRT):</label>
                <select id="cfg_crt" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                  <option value="1" ${emit.crt === '1' ? 'selected' : ''}>1 - Simples Nacional</option>
                  <option value="2" ${emit.crt === '2' ? 'selected' : ''}>2 - Simples Nacional (Excesso sublimite)</option>
                  <option value="3" ${emit.crt === '3' ? 'selected' : ''}>3 - Regime Normal (Lucro Presumido / Real)</option>
                </select>
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Logradouro & Número:</label>
                <input type="text" id="cfg_end" value="${emit.logradouro}, ${emit.numero}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
              </div>
              <div style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:8px;">
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Cidade / Município:</label>
                  <input type="text" id="cfg_cidade" value="${emit.cidade}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">UF:</label>
                  <input type="text" id="cfg_uf" value="${emit.uf}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Cód. IBGE:</label>
                  <input type="text" id="cfg_ibge" value="${emit.ibge}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
              </div>
            </div>

            <div style="background:#283040; border:1px solid #334155; border-radius:8px; padding:16px; display:flex; flex-direction:column; gap:10px;">
              <div style="font-weight:700; font-size:14px; color:#38bdf8; border-bottom:1px solid #334155; padding-bottom:6px;">🔐 Parâmetros SEFAZ & Certificado A1</div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Ambiente SEFAZ:</label>
                <select id="cfg_amb" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                  <option value="2" ${emit.ambiente === '2' ? 'selected' : ''}>2 - Homologação (Testes SEFAZ sem valor fiscal)</option>
                  <option value="1" ${emit.ambiente === '1' ? 'selected' : ''}>1 - Produção Oficial SEFAZ</option>
                </select>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Série NF-e:</label>
                  <input type="text" id="cfg_serienfe" value="${emit.serieNFe}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Próxima NF-e:</label>
                  <input type="number" id="cfg_proxnfe" value="${emit.proximaNFe}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Série NFC-e (Cupom):</label>
                  <input type="text" id="cfg_serienfce" value="${emit.serieNFCe}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
                <div>
                  <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">Próxima NFC-e:</label>
                  <input type="number" id="cfg_proxnfce" value="${emit.proximaNFCe}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px;">
                </div>
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:2px;">CSC Token NFC-e (Código de Segurança do Contribuinte):</label>
                <input type="text" id="cfg_csctoken" value="${emit.cscToken}" class="web-input" style="width:100%; padding:6px; background:#fff; color:#000; border-radius:4px; font-family:monospace;">
              </div>
              <div style="background:#1e293b; border:1px solid #334155; border-radius:6px; padding:10px; margin-top:4px;">
                <div style="font-size:11px; color:#94a3b8; margin-bottom:2px;">Status do Certificado Digital A1 (.pfx):</div>
                <div style="font-size:12px; font-weight:bold; color:#4ade80;">✓ ${emit.certificado}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    salvarConfiguracoes() {
      const emit = this.state.emitente;
      const getVal = id => { const el = document.getElementById(id); return el ? el.value : ''; };

      emit.razaoSocial = getVal('cfg_rs') || emit.razaoSocial;
      emit.fantasia = getVal('cfg_fant') || emit.fantasia;
      emit.cnpj = getVal('cfg_cnpj') || emit.cnpj;
      emit.ie = getVal('cfg_ie') || emit.ie;
      emit.crt = getVal('cfg_crt') || emit.crt;
      emit.cidade = getVal('cfg_cidade') || emit.cidade;
      emit.uf = getVal('cfg_uf') || emit.uf;
      emit.ibge = getVal('cfg_ibge') || emit.ibge;
      emit.ambiente = getVal('cfg_amb') || emit.ambiente;
      emit.serieNFe = getVal('cfg_serienfe') || emit.serieNFe;
      emit.proximaNFe = parseInt(getVal('cfg_proxnfe'), 10) || emit.proximaNFe;
      emit.serieNFCe = getVal('cfg_serienfce') || emit.serieNFCe;
      emit.proximaNFCe = parseInt(getVal('cfg_proxnfce'), 10) || emit.proximaNFCe;
      emit.cscToken = getVal('cfg_csctoken') || emit.cscToken;

      try {
        localStorage.setItem('vox_erp_emitente', JSON.stringify(emit));
      } catch (e) {}

      alert('Configurações do emitente e parâmetros SEFAZ gravados com sucesso!');
    }

    removerModal(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
    }

    fecharModal(id) {
      this.removerModal(id);
    }

    imprimirModal(elementId) {
      const el = document.getElementById(elementId);
      if (!el) return;
      window.print();
    }
  }

  window.voxERPEngine = new VoxERPEngine();
})();

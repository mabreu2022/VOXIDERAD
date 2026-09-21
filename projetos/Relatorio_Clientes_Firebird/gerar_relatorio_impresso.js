// ==============================================================================
// projetos/Relatorio_Clientes_Firebird/gerar_relatorio_impresso.js
// Gera o arquivo HTML pronto para impressão A4 e PDF a partir da base Firebird
// ==============================================================================

const fs = require('fs');
const path = require('path');
const firebird = require('node-firebird');

const DB_PATH = path.resolve(__dirname, 'dados/clientes.fdb');
const HTML_OUTPUT_PATH = path.resolve(__dirname, 'visualizar_impressao.html');

const fbOptions = {
  host: '127.0.0.1',
  port: 3050,
  database: DB_PATH,
  user: 'SYSDBA',
  password: 'masterkey',
  pageSize: 8192,
  lowercase_keys: false
};

function formatCurrency(val) {
  const num = parseFloat(val || 0);
  return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(val) {
  if (!val) return '';
  const d = new Date(val);
  if (isNaN(d.getTime())) return String(val);
  return d.toLocaleDateString('pt-BR');
}

async function gerarRelatorio() {
  console.log('⚡ Conectando ao banco Firebird em:', DB_PATH);

  const rows = await new Promise((resolve, reject) => {
    firebird.attach(fbOptions, (err, db) => {
      if (err) return reject(err);
      const sql = 'SELECT ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO FROM CLIENTES ORDER BY ID';
      db.query(sql, [], (qErr, result) => {
        db.detach();
        if (qErr) return reject(qErr);
        resolve(result || []);
      });
    });
  });

  console.log(`✔ ${rows.length} registros obtidos com sucesso do Firebird.`);

  let totalSaldo = 0;
  let ativos = 0;
  let pendentes = 0;
  let bloqueados = 0;

  rows.forEach(r => {
    const s = parseFloat(r.SALDO || 0);
    totalSaldo += s;
    const st = r.STATUS || 'Ativo';
    if (st === 'Ativo') ativos++;
    else if (st === 'Pendente') pendentes++;
    else if (st === 'Bloqueado') bloqueados++;
  });

  const saldoMedio = rows.length > 0 ? (totalSaldo / rows.length) : 0;
  const dataEmissao = new Date().toLocaleString('pt-BR');

  const tableRowsHtml = rows.map((r, idx) => {
    const isEven = idx % 2 === 1;
    const bg = isEven ? '#f8fafc' : '#ffffff';
    const status = r.STATUS || 'Ativo';
    let statusBadge = '';
    if (status === 'Ativo') {
      statusBadge = '<span class="badge badge-success">Ativo</span>';
    } else if (status === 'Pendente') {
      statusBadge = '<span class="badge badge-warning">Pendente</span>';
    } else {
      statusBadge = '<span class="badge badge-danger">Bloqueado</span>';
    }

    return `
      <tr style="background-color: ${bg};">
        <td class="text-center font-mono text-muted">${String(r.ID).padStart(2, '0')}</td>
        <td class="font-mono font-bold text-navy">${r.CODIGO}</td>
        <td>
          <div class="client-name">${r.NOME}</div>
          <div class="client-sub">${r.EMAIL}</div>
        </td>
        <td class="font-mono text-sm">${r.CPF_CNPJ || '-'}</td>
        <td>${r.CIDADE} <span class="badge-uf">${r.UF}</span></td>
        <td class="text-sm">${r.TELEFONE}</td>
        <td class="text-center">${statusBadge}</td>
        <td class="text-right font-bold text-primary font-mono">${formatCurrency(r.SALDO)}</td>
      </tr>
    `;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório de Clientes — Vox Firebird 5.0</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    /* ==========================================================================
       ESTILOS GERAIS DE TELA E SIMULAÇÃO DE FOLHA A4
       ========================================================================== */
    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --navy: #0f172a;
      --slate-dark: #1e293b;
      --slate-muted: #64748b;
      --border-color: #cbd5e1;
      --bg-page: #f1f5f9;
      --card-bg: #ffffff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-page);
      color: #1e293b;
      font-size: 11pt;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Barra Superior Flutuante de Controle ──────────────────────────────── */
    .top-action-bar {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #0f172a;
      color: #ffffff;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      border-bottom: 1px solid #334155;
    }

    .top-action-bar .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.3px;
    }

    .top-action-bar .brand-badge {
      background: #0284c7;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
    }

    .top-action-bar .actions {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .btn {
      appearance: none;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-print {
      background: #0284c7;
      color: #ffffff;
    }
    .btn-print:hover {
      background: #0369a1;
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
    }

    .btn-pdf {
      background: #dc2626;
      color: #ffffff;
    }
    .btn-pdf:hover {
      background: #b91c1c;
      box-shadow: 0 2px 8px rgba(220, 38, 38, 0.4);
    }

    .btn-secondary {
      background: #334155;
      color: #e2e8f0;
    }
    .btn-secondary:hover {
      background: #475569;
    }

    /* ── Folha de Papel A4 com Diagramação Profissional ────────────────────── */
    .sheet-wrapper {
      padding: 30px 15px;
      display: flex;
      justify-content: center;
    }

    .a4-sheet {
      background: #ffffff;
      width: 210mm;
      min-height: 297mm;
      padding: 15mm 15mm 20mm 15mm;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* ── Cabeçalho do Relatório (Title Band) ─────────────────────────────────── */
    .report-header {
      border-bottom: 2px solid var(--primary);
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header-logo-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: 0 2px 6px rgba(2, 132, 199, 0.3);
    }

    .header-titles h1 {
      font-size: 16pt;
      font-weight: 800;
      color: var(--navy);
      letter-spacing: -0.5px;
      line-height: 1.1;
    }

    .header-titles h2 {
      font-size: 11pt;
      font-weight: 600;
      color: var(--primary);
      margin-top: 3px;
    }

    .header-titles .subtitle {
      font-size: 8.5pt;
      color: var(--slate-muted);
      margin-top: 2px;
    }

    .header-meta {
      text-align: right;
      font-size: 8pt;
      color: var(--slate-muted);
      line-height: 1.5;
    }

    .header-meta .tag-live {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #ecfdf5;
      color: #047857;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 7.5pt;
      border: 1px solid #a7f3d0;
      margin-bottom: 4px;
    }

    /* ── Cartões de Resumo / KPI (Executivo) ────────────────────────────────── */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 16px;
    }

    .kpi-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px 12px;
      border-left: 3px solid var(--primary);
    }

    .kpi-card.success { border-left-color: #10b981; }
    .kpi-card.warning { border-left-color: #f59e0b; }
    .kpi-card.neutral { border-left-color: #64748b; }

    .kpi-card .kpi-label {
      font-size: 7.5pt;
      text-transform: uppercase;
      font-weight: 700;
      color: var(--slate-muted);
      letter-spacing: 0.3px;
    }

    .kpi-card .kpi-value {
      font-size: 12pt;
      font-weight: 800;
      color: var(--navy);
      margin-top: 2px;
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── Tabela de Dados (PageHeader + Detail Band) ─────────────────────────── */
    .report-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin-bottom: 16px;
    }

    .report-table thead th {
      background: #0f172a;
      color: #ffffff;
      padding: 7px 6px;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      border-top: 1px solid #0f172a;
      border-bottom: 1px solid #0f172a;
    }

    .report-table tbody td {
      padding: 5.5px 6px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }

    .report-table tbody tr:hover {
      background-color: #f1f5f9 !important;
    }

    .client-name {
      font-weight: 600;
      color: var(--navy);
    }

    .client-sub {
      font-size: 7.5pt;
      color: var(--slate-muted);
    }

    .badge-uf {
      background: #e2e8f0;
      color: #334155;
      font-size: 7pt;
      font-weight: 700;
      padding: 1px 4px;
      border-radius: 3px;
      font-family: 'JetBrains Mono', monospace;
    }

    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }

    .badge-success { background: #dcfce7; color: #15803d; }
    .badge-warning { background: #fef3c7; color: #b45309; }
    .badge-danger  { background: #fee2e2; color: #b91c1c; }

    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    .font-bold { font-weight: 700; }
    .text-navy { color: var(--navy); }
    .text-primary { color: var(--primary); }
    .text-muted { color: var(--slate-muted); }
    .text-sm { font-size: 8pt; }

    /* ── Faixa de Resumo / Totais (Summary Band) ────────────────────────────── */
    .summary-band {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #10b981;
      border-radius: 4px;
      padding: 10px 14px;
      margin-top: auto;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .summary-band .summary-left {
      font-size: 9pt;
      color: #334155;
      font-weight: 600;
    }

    .summary-band .summary-right {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .summary-band .summary-label {
      font-size: 8.5pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
    }

    .summary-band .summary-amount {
      font-size: 13pt;
      font-weight: 800;
      color: #047857;
      font-family: 'JetBrains Mono', monospace;
    }

    /* ── Rodapé de Página (PageFooter Band) ─────────────────────────────────── */
    .report-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7.5pt;
      color: var(--slate-muted);
    }

    .footer-auth {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ==========================================================================
       REGRAS EXCLUSIVAS DE IMPRESSÃO (@media print)
       ========================================================================== */
    @media print {
      @page {
        size: A4 portrait;
        margin: 10mm 12mm 10mm 12mm;
      }

      body {
        background: #ffffff !important;
        font-size: 9pt;
        color: #000000;
      }

      .top-action-bar, .no-print {
        display: none !important;
      }

      .sheet-wrapper {
        padding: 0 !important;
        display: block !important;
      }

      .a4-sheet {
        width: 100% !important;
        min-height: auto !important;
        padding: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }

      .report-table thead th {
        background: #1e293b !important;
        color: #ffffff !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .report-table tbody tr {
        page-break-inside: avoid;
      }

      .badge, .tag-live, .kpi-card, .summary-band {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>

  <!-- Barra Superior de Controle e Impressão (Não sai na impressão) -->
  <header class="top-action-bar no-print">
    <div class="brand">
      <span style="font-size: 18px;">🪐</span>
      <span>Vox Studio RAD — Componentes de Report</span>
      <span class="brand-badge">Firebird 5.0</span>
    </div>
    <div class="actions">
      <button class="btn btn-secondary" onclick="window.location.reload();" title="Recarregar dados">
        <span>🔄</span> Atualizar
      </button>
      <button class="btn btn-pdf" onclick="window.print();" title="Salvar como PDF">
        <span>📄</span> Salvar PDF
      </button>
      <button class="btn btn-print" onclick="window.print();" title="Imprimir Relatório (Ctrl + P)">
        <span>🖨️</span> Imprimir Relatório
      </button>
    </div>
  </header>

  <!-- Simulação da Página A4 -->
  <main class="sheet-wrapper">
    <article class="a4-sheet">

      <!-- Title Band -->
      <header class="report-header">
        <div class="header-logo-area">
          <div class="header-logo-icon">📊</div>
          <div class="header-titles">
            <h1>VOX ERP SISTEMAS CORPORATIVOS</h1>
            <h2>RELATÓRIO GERENCIAL DE CLIENTES CADASTRADOS</h2>
            <div class="subtitle">Emissão de listagem analítica para auditoria, controle financeiro e impressão</div>
          </div>
        </div>

        <div class="header-meta">
          <div><span class="tag-live">🔥 FIREBIRD 5.0 LIVE</span></div>
          <div><strong>Base:</strong> <code>dados/clientes.fdb</code></div>
          <div><strong>Emissão:</strong> ${dataEmissao}</div>
          <div><strong>Usuário:</strong> SYSDBA</div>
          <div><strong>Registros:</strong> ${rows.length} clientes</div>
        </div>
      </header>

      <!-- Cartões de Resumo Executivo (KPIs) -->
      <section class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-label">Total Cadastrado</div>
          <div class="kpi-value">${rows.length}</div>
        </div>
        <div class="kpi-card success">
          <div class="kpi-label">Clientes Ativos</div>
          <div class="kpi-value">${ativos}</div>
        </div>
        <div class="kpi-card warning">
          <div class="kpi-label">Pendentes / Bloq.</div>
          <div class="kpi-value">${pendentes + bloqueados}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Saldo Acumulado</div>
          <div class="kpi-value" style="font-size: 11pt; color: #0284c7;">${formatCurrency(totalSaldo)}</div>
        </div>
      </section>

      <!-- Table Section (PageHeaderBand + DetailBand) -->
      <table class="report-table">
        <thead>
          <tr>
            <th class="text-center" style="width: 32px;">#</th>
            <th style="width: 65px;">Código</th>
            <th>Nome do Cliente / Razão Social</th>
            <th style="width: 125px;">CPF / CNPJ</th>
            <th style="width: 115px;">Cidade / UF</th>
            <th style="width: 105px;">Telefone</th>
            <th class="text-center" style="width: 70px;">Status</th>
            <th class="text-right" style="width: 95px;">Saldo Atual</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>

      <!-- Summary Band -->
      <section class="summary-band">
        <div class="summary-left">
          <span>Total de <strong>${rows.length}</strong> registros impressos com sucesso da base Firebird.</span>
          <span style="margin-left: 10px; color: #64748b; font-size: 8pt;">(Média por cliente: ${formatCurrency(saldoMedio)})</span>
        </div>
        <div class="summary-right">
          <span class="summary-label">Total Geral:</span>
          <span class="summary-amount">${formatCurrency(totalSaldo)}</span>
        </div>
      </section>

      <!-- PageFooter Band -->
      <footer class="report-footer">
        <div class="footer-auth">
          <span>🔒 Documento emitido via <strong>Vox Studio RAD (vox_Report)</strong></span>
          <span>•</span>
          <span>Driver: Firebird 5.0 (Porta 3050)</span>
        </div>
        <div>
          <span>Página <strong>1</strong> de <strong>1</strong></span>
        </div>
      </footer>

    </article>
  </main>

  <script>
    // Atalho de teclado para impressão rápida: Ctrl + P
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    });
  </script>
</body>
</html>
  `;

  fs.writeFileSync(HTML_OUTPUT_PATH, html, 'utf-8');
  console.log('✔ Arquivo HTML para impressão gerado com sucesso em:');
  console.log('📄', HTML_OUTPUT_PATH);
}

gerarRelatorio().catch(err => {
  console.error('❌ Erro ao gerar relatório impresso:', err);
  process.exit(1);
});

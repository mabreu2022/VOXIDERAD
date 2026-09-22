// ==============================================================================
// public/js/webview_component.js — TVoxWebView: WebBrowser com HTML5/CSS/JS/TypeScript
// Equivalente ao TWebBrowser / TEdgeBrowser do Delphi
// ==============================================================================

window.VoxWebViewManager = {

  // ID do componente atualmente em edição
  _currentCompId: null,

  // Referência ao modal DOM
  _modal: null,
  _activeTab: 'html',
  _babelLoaded: false,

  // ============================================================
  // Inicialização
  // ============================================================
  init() {
    this._modal = document.getElementById('webviewEditorModal');
    // Escutar mensagens vindas de iframes filhos (PostMessage)
    window.addEventListener('message', (e) => this.onIframeMessage(e), false);
  },

  // ============================================================
  // Abrir o editor de conteúdo do WebView
  // ============================================================
  openEditor(compId) {
    this._currentCompId = compId;
    const comp = this._getComp(compId);
    if (!comp) return;

    this._activeTab = 'html';
    const modal = document.getElementById('webviewEditorModal');
    if (!modal) return;

    // Preencher abas com os dados do componente
    this._setTabValue('html',       (comp.props.HTML       || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
    this._setTabValue('css',        (comp.props.CSS        || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
    this._setTabValue('javascript', (comp.props.JavaScript || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
    this._setTabValue('typescript', (comp.props.TypeScript || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));

    // Atualizar título
    const titleEl = document.getElementById('webviewEditorTitle');
    if (titleEl) titleEl.innerText = `🌐 WebView Editor — ${comp.name} (TVoxWebView)`;

    // Exibir URL se houver
    const urlInput = document.getElementById('webviewEditorURL');
    if (urlInput) urlInput.value = comp.props.URL || '';

    // Mostrar aba HTML por padrão
    this._switchEditorTab('html');
    modal.style.display = 'flex';
  },

  // ============================================================
  // Fechar modal
  // ============================================================
  closeEditor() {
    const modal = document.getElementById('webviewEditorModal');
    if (modal) modal.style.display = 'none';
  },

  // ============================================================
  // Alternar aba (html / css / javascript / typescript)
  // ============================================================
  _switchEditorTab(tab) {
    this._activeTab = tab;
    const tabs = ['html', 'css', 'javascript', 'typescript'];
    tabs.forEach(t => {
      const btn = document.getElementById(`webviewTab_${t}`);
      const pane = document.getElementById(`webviewPane_${t}`);
      if (btn) btn.classList.toggle('active', t === tab);
      if (pane) pane.style.display = t === tab ? 'block' : 'none';
    });
  },

  switchTab(tab) {
    this._switchEditorTab(tab);
  },

  // ============================================================
  // Ler valor de uma textarea de aba (decodificando HTML entities)
  // ============================================================
  _getTabValue(tab) {
    const el = document.getElementById(`webviewEditor_${tab}`);
    if (!el) return '';
    return el.value || '';
  },

  _setTabValue(tab, htmlEncoded) {
    const el = document.getElementById(`webviewEditor_${tab}`);
    if (!el) return;
    // Decodificar HTML entities para mostrar o texto real
    const txt = document.createElement('textarea');
    txt.innerHTML = htmlEncoded;
    el.value = txt.value;
  },

  // ============================================================
  // Construir o documento HTML completo para o srcdoc do iframe
  // ============================================================
  buildSrcdoc(html, css, js, ts, useTS) {
    let scriptContent = js || '';

    // Se TypeScript está em uso, verificar se já foi transpilado para JS
    if (useTS && ts && ts.trim()) {
      // Em runtime o transpile acontece via Babel
      scriptContent = ts;
    }

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
${css || ''}
</style>
${useTS && ts && ts.trim() ? `<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>` : ''}
</head>
<body>
${html || '<p style="color:#94a3b8;padding:16px;">Conteúdo do WebView</p>'}
${useTS && ts && ts.trim()
  ? `<script type="text/babel" data-presets="typescript">\n${ts}\n</script>`
  : scriptContent.trim() ? `<script>\n${scriptContent}\n</script>` : ''}
<script>
// PostMessage bridge: envia mensagens para o host
window.sendToHost = function(msg) {
  window.parent.postMessage({ from: 'webview', data: msg }, '*');
};
// Escuta mensagens do host
window.addEventListener('message', function(e) {
  if (e.data && e.data.to === 'webview') {
    if (typeof window.onHostMessage === 'function') {
      window.onHostMessage(e.data.data);
    }
  }
});
</script>
</body>
</html>`;
  },

  // ============================================================
  // Preview em tempo real no modal
  // ============================================================
  preview() {
    const html        = this._getTabValue('html');
    const css         = this._getTabValue('css');
    const js          = this._getTabValue('javascript');
    const ts          = this._getTabValue('typescript');
    const useTS       = ts.trim().length > 0;
    const urlInput    = document.getElementById('webviewEditorURL');
    const url         = urlInput ? urlInput.value.trim() : '';
    const previewFrame = document.getElementById('webviewPreviewFrame');

    if (!previewFrame) return;

    if (url) {
      previewFrame.src = url;
      previewFrame.removeAttribute('srcdoc');
    } else {
      const srcdoc = this.buildSrcdoc(html, css, js, ts, useTS);
      previewFrame.src = 'about:blank';
      previewFrame.srcdoc = srcdoc;
    }

    const previewPanel = document.getElementById('webviewPreviewPanel');
    if (previewPanel) previewPanel.style.display = 'block';
  },

  // ============================================================
  // Transpilar TypeScript → JavaScript via Babel Standalone
  // ============================================================
  async transpileTS() {
    const ts = this._getTabValue('typescript');
    if (!ts || !ts.trim()) {
      this._showToast('⚠️ Nenhum código TypeScript para transpilar.', 'warn');
      return;
    }

    const statusEl = document.getElementById('webviewTSStatus');
    if (statusEl) statusEl.innerText = '⏳ Transpilando...';

    try {
      // Carregar Babel se não estiver disponível
      if (typeof Babel === 'undefined') {
        await this._loadBabel();
      }

      const result = Babel.transform(ts, {
        presets: ['typescript'],
        filename: 'webview.ts',
        ast: false,
        code: true
      });

      // Colocar o JS gerado na aba JavaScript
      const jsEl = document.getElementById('webviewEditor_javascript');
      if (jsEl) jsEl.value = result.code;

      if (statusEl) statusEl.innerText = '✔ TypeScript transpilado para JavaScript!';
      this._switchEditorTab('javascript');
      this._showToast('✔ TypeScript transpilado com sucesso para JavaScript!', 'ok');
    } catch (err) {
      if (statusEl) statusEl.innerText = '❌ Erro: ' + err.message;
      this._showToast('❌ Erro de transpilação: ' + err.message, 'error');
    }
  },

  // ============================================================
  // Carregar Babel Standalone dinamicamente
  // ============================================================
  _loadBabel() {
    return new Promise((resolve, reject) => {
      if (typeof Babel !== 'undefined') { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
      script.onload = () => { this._babelLoaded = true; resolve(); };
      script.onerror = () => reject(new Error('Falha ao carregar Babel Standalone'));
      document.head.appendChild(script);
    });
  },

  // ============================================================
  // Aplicar conteúdo de volta para o componente no designer
  // ============================================================
  applyToComponent() {
    const comp = this._getComp(this._currentCompId);
    if (!comp) {
      this._showToast('❌ Componente não encontrado.', 'error');
      return;
    }

    comp.props.HTML       = this._getTabValue('html');
    comp.props.CSS        = this._getTabValue('css');
    comp.props.JavaScript = this._getTabValue('javascript');
    comp.props.TypeScript = this._getTabValue('typescript');

    const urlInput = document.getElementById('webviewEditorURL');
    if (urlInput) comp.props.URL = urlInput.value.trim();

    comp.props.UseTypeScript = comp.props.TypeScript.trim().length > 0;

    // Atualizar designer e inspector
    if (window.app) {
      if (window.app.designer) window.app.designer.renderCanvas();
      if (window.app.inspector) window.app.inspector.update(comp);
      window.app.onFormChanged();
      window.app.showToast(`✔ Conteúdo do WebView "${comp.name}" atualizado!`);
    }

    this.closeEditor();
  },

  // ============================================================
  // Enviar PostMessage para o iframe do WebView no runner
  // ============================================================
  sendMessage(compId, msg) {
    const frame = document.getElementById(`webview_frame_${compId}`);
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage({ to: 'webview', data: msg }, '*');
    }
  },

  // ============================================================
  // Receber mensagens do iframe
  // ============================================================
  onIframeMessage(event) {
    if (event.data && event.data.from === 'webview') {
      console.log('[TVoxWebView → Host] PostMessage recebido:', event.data.data);
      // Disparar evento OnMessage no componente se registrado
      if (window.app && window.app.runner) {
        window.app.runner.onWebViewMessage && window.app.runner.onWebViewMessage(event.data.data);
      }
    }
  },

  // ============================================================
  // Utilitários
  // ============================================================
  _getComp(compId) {
    if (!window.app || !window.app.designer) return null;
    return window.app.designer.form.components.find(c => c.id === compId || c.name === compId);
  },

  _showToast(msg, type = 'ok') {
    if (window.app && window.app.showToast) {
      window.app.showToast(msg);
    } else {
      console.log(msg);
    }
  }
};

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.VoxWebViewManager.init());
} else {
  setTimeout(() => window.VoxWebViewManager.init(), 100);
}

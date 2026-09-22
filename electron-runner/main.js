// ============================================================================
// electron-runner/main.js — Runner Nativo com WebView2 (Electron)
// Vox Studio RAD — Janela nativa sem restricoes de iframe
// ============================================================================
'use strict';

const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Argumentos recebidos do servidor Node.js
// Formato: electron main.js <formStateJSON_ou_caminhoArquivo> <serverPort>
const args = process.argv.slice(2);
let formState = null;
let serverPort = 4500;

try {
  if (args[0]) {
    if (fs.existsSync(args[0])) {
      formState = JSON.parse(fs.readFileSync(args[0], 'utf-8'));
    } else {
      formState = JSON.parse(decodeURIComponent(args[0]));
    }
  }
  if (args[1]) serverPort = parseInt(args[1], 10);
} catch (e) {
  console.error('[ElectronRunner] Erro ao parsear args:', e.message);
}

// Fallback se nao carregou formState dos args
if (!formState) {
  const fallbackPath = path.join(__dirname, 'current_state.json');
  if (fs.existsSync(fallbackPath)) {
    try {
      formState = JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));
    } catch (e) {}
  }
}

// Tamanho da janela a partir do formState
const formW = (formState && formState.width)  || 800;
const formH = (formState && formState.height) || 600;
const formTitle = (formState && (formState.title || formState.name)) || 'Vox Studio Runner';

app.whenReady().then(() => {
  // Permitir todos os sites (sem restricoes de Content-Security-Policy e X-Frame-Options)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [''],
        'X-Frame-Options': [''],
      }
    });
  });

  const win = new BrowserWindow({
    width: Math.max(450, formW + 30),
    height: Math.max(350, formH + 70),
    minWidth: 400,
    minHeight: 300,
    title: formTitle + ' — Vox Studio (WebView2)',
    icon: path.join(__dirname, '..', 'public', 'favicon.ico'),
    backgroundColor: '#f4f6f8',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true, // Obrigatorio para habilitar a tag <webview>
      webSecurity: false,
      allowRunningInsecureContent: true,
    },
  });

  // Salva o state localmente caso o renderer precise consultar
  try {
    if (formState) {
      fs.writeFileSync(path.join(__dirname, 'current_state.json'), JSON.stringify(formState, null, 2), 'utf-8');
    }
  } catch (e) {}

  const runnerUrl = `http://localhost:${serverPort}/electron-runner.html?port=${serverPort}`;
  win.loadURL(runnerUrl);

  // DevTools em modo desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools({ mode: 'detach' });
  }

  // Titulo dinamico com URL carregada
  win.webContents.on('did-navigate', (event, url) => {
    win.setTitle(`${formTitle} — ${url}`);
  });

  // IPC para controle de janela
  ipcMain.on('form-minimize', () => {
    if (win && !win.isDestroyed()) win.minimize();
  });

  ipcMain.on('form-maximize', () => {
    if (win && !win.isDestroyed()) {
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    }
  });

  ipcMain.on('form-close', () => {
    if (win && !win.isDestroyed()) win.close();
  });

  app.on('window-all-closed', () => {
    app.quit();
  });
});

// IPC: recebe mensagens do renderer (form runner)
ipcMain.on('webview-navigate', (event, { id, url }) => {
  console.log(`[ElectronRunner] Navegar WebView ${id} para: ${url}`);
  event.reply('webview-navigate-ack', { id, url });
});

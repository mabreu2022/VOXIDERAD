// ============================================================================
// electron-runner/preload.js — Bridge segura entre renderer e main process
// ============================================================================
'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Navegar um WebView para uma URL
  navigateTo: (id, url) => ipcRenderer.send('webview-navigate', { id, url }),
  // Controles de janela
  closeForm: () => ipcRenderer.send('form-close'),
  minimizeForm: () => ipcRenderer.send('form-minimize'),
  maximizeForm: () => ipcRenderer.send('form-maximize'),
  // Verificar se está rodando no Electron
  isElectron: true,
  platform: process.platform,
});

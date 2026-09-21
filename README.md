# 🪐 Vox Studio RAD (VOXIDERAD)

> **Vox Studio RAD** é o Ambiente de Desenvolvimento Integrado (IDE) Visual e RAD (*Rapid Application Development*) oficial da **Linguagem de Programação Vox**, inspirado na arquitetura canônica e consagrada do **Embarcadero Delphi / C++Builder / Lazarus**.

[![GitHub Repository](https://img.shields.io/badge/GitHub-VOXIDERAD-blue?logo=github)](https://github.com/mabreu2022/VOXIDERAD)
[![Linguagem Vox](https://img.shields.io/badge/Core-Linguagem%20Vox-8b5cf6)](https://github.com/mabreu2022/linguagemvox)
[![Version](https://img.shields.io/badge/Version-1.0.0-green.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Principais Recursos da IDE

- 🎨 **Designer Visual de Formulários**:
  - Arraste, solte e redimensione componentes com guias magnéticas de alinhamento e grade de 8px.
  - Sincronização bidirecional em tempo real entre o desenho visual (`.vxf`) e o código fonte orientado a objetos em Vox (`.vox`).
- 🔍 **Object Inspector (Inspetor de Objetos)**:
  - Edição ao vivo de propriedades (Align, Anchors, Caption, Font, Color, DriverName, SQL, DataField, etc.).
  - Aba de Eventos com vinculação direta a procedimentos de clique, alteração e impressão.
- 🗄️ **Acesso a Bancos de Dados Estilo FireDAC**:
  - Componentes nativos de conexão (`vox_Connection` / `TFDConnection`), consultas (`vox_Query` / `TFDQuery`) e pontes de dados (`vox_DataSource`).
  - Suporte multi-engine: **Firebird**, **SQLite**, **MySQL** e **Microsoft SQL Server**.
  - Teste de conexão direto no inspetor e modal dedicado de configuração de banco.
- 📑 **Motor de Relatórios Integrado (Delphi / QuickReport-Like)**:
  - Componente `vox_Report` com faixas verticais inteligentes: `rbTitle`, `rbPageHeader`, `rbColumnHeader`, `rbDetail`, `rbSummary` e `rbPageFooter`.
  - Componentes de texto dinâmico (`vox_ReportDBText`), rótulos (`vox_ReportLabel`), dados do sistema (`vox_ReportSysData`) e divisores (`vox_ReportShape`).
  - Diagramação no padrão A4 com margens milimétricas e exportação direta para **PDF** e **Impressão**.
- 📦 **Gerenciamento de Pacotes (`.vdpk`) e Paleta Expandida**:
  - Instalação dinâmica de componentes visuais personalizados.
  - Categorias organizadas: *Standard*, *Additional*, *Win32*, *Data Access*, *Data Controls*, *Reports*, *Dialogs* e *System*.
- 📁 **Gerenciamento de Projetos e Formulários**:
  - Suporte a múltiplos projetos corporativos (`.voxProj`) e grupos de projetos (`.groupproj`).
  - Exemplos completos incluídos: `Relatorio_Clientes_Firebird`, `PDV_FrenteDeCaixa`, `Calculadora_RAD`, `Relatorio_Vendas_Delphi` e `VoxERP_Comercial`.

---

## 📂 Estrutura do Repositório

```
VOXIDERAD/
├── server.js               # Servidor local Node.js e API REST da IDE
├── public/                 # Interface Web rica da IDE (HTML, CSS, JS)
│   ├── index.html          # Workspace com paleta, designer, inspector e abas
│   ├── css/                # Folhas de estilo temáticas (Dark/Delphi)
│   └── js/
│       ├── designer.js     # Motor de arrasto, encaixe e manipulação visual
│       ├── inspector.js    # Inspetor de propriedades e eventos
│       ├── components.js   # Catálogo completo de componentes
│       ├── codegen.js      # Sincronizador (.vxf <-> .vox)
│       ├── report_engine.js# Motor de relatórios A4 / PDF
│       ├── runner.js       # Executor e pré-visualizador de telas
│       └── app.js          # Orquestrador principal da aplicação
├── packages/               # Pacotes de componentes instalados (.vdpk)
├── forms/                  # Formulários visuais (.vxf) e classes (.vox)
├── projetos/               # Projetos corporativos de exemplo
│   ├── Relatorio_Clientes_Firebird/ # Relatório com Firebird 5.0
│   ├── PDV_FrenteDeCaixa/          # Frente de caixa de varejo
│   ├── Calculadora_RAD/            # Calculadora completa
│   ├── Relatorio_Vendas_Delphi/    # Demonstração de relatórios com faixas
│   └── VoxERP_Comercial/           # Sistema comercial
├── clientes_vox.db         # Banco SQLite de demonstração para componentes Data-Aware
└── package.json            # Configuração e dependências da IDE
```

---

## 🚀 Como Executar

### 1. Pré-requisitos
- Node.js (versão 18 ou superior).
- Repositório da [Linguagem Vox](https://github.com/mabreu2022/linguagemvox) para compilar e rodar binários nativos.

### 2. Instalação e Execução
Clone o repositório e inicie o servidor da IDE:

```bash
git clone git@github.com:mabreu2022/VOXIDERAD.git
cd VOXIDERAD
npm install
npm start
```

Acesse no seu navegador:
👉 **`http://localhost:4500`** (ou porta indicada no console).

---

## 🔗 Projetos Relacionados

- 🪐 **[Linguagem de Programação Vox (mabreu2022/linguagemvox)](https://github.com/mabreu2022/linguagemvox)**: O compilador C99 nativo, interpretador, tipos, concorrência CSP e biblioteca padrão da linguagem Vox.
- 🔌 **[Extensão Oficial para VS Code](https://marketplace.visualstudio.com/items?itemName=MauricioAbreu.voxlang-tools)**: Realce de sintaxe e snippets para VS Code.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais detalhes.

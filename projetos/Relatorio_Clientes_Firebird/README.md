# 📑 Exemplo de Relatório com Banco de Dados Firebird 5.0 na Linguagem Vox

Projeto de referência demonstrando o uso avançado dos **componentes de relatório** do ecossistema **Vox Studio RAD** (`vox_Report`, `vox_ReportBand`, `vox_ReportLabel`, `vox_ReportDBText`, `vox_ReportSysData`, `vox_ReportShape`), integrados diretamente a um banco de dados real **Firebird 5.0** (`clientes.fdb`) contendo 20 registros fictícios de clientes e gerando uma listagem pronta para impressão A4 e exportação em PDF.

---

## 📂 Estrutura do Projeto

```
projetos/Relatorio_Clientes_Firebird/
├── dados/
│   ├── clientes.fdb               # Banco de dados Firebird 5.0 físico
│   ├── criar_banco_firebird.js    # Script para criar a base e popular 20 registros
│   └── schema_clientes.sql        # Script DDL/DML de criação e carga
├── Relatorio_Clientes_Firebird.voxProj # Arquivo de projeto do Vox Studio RAD
├── FormRelatorioClientes.vxf      # Formulário visual RAD com componentes de relatório
├── FormRelatorioClientes.vox      # Classe Vox com as declarações e eventos
├── relatorio_firebird.vox         # Executável Vox nativo (CLI) com conexão Firebird
├── visualizar_impressao.html      # Página diagramada A4 pronta para impressão/PDF
├── relatorio_clientes.pdf         # Arquivo PDF de alta fidelidade gerado
├── gerar_relatorio_impresso.js    # Utilitário que lê o Firebird e atualiza o HTML/PDF
└── README.md                      # Documentação completa do projeto
```

---

## 🚀 Como Executar

### 1. Executar a Listagem no Terminal via Linguagem Vox

Você pode executar o script nativo em Vox que conecta na base Firebird na porta 3050, executa a query SQL e exibe a listagem com totalizadores:

```bash
node dist/cli/index.js run projetos/Relatorio_Clientes_Firebird/relatorio_firebird.vox
```

**Saída no Console:**
```
================================================================================
      VOX PROGRAMMING LANGUAGE — RELATÓRIO DE CLIENTES (FIREBIRD 5.0)           
================================================================================
[Vox Engine] Conectando ao Firebird na porta 3050...
[Vox Engine] Conexão estabelecida com sucesso!
[Vox Engine] Executando Query: SELECT ID, CODIGO, NOME, CIDADE, UF, SALDO, STATUS FROM CLIENTES ORDER BY ID
...
20 clientes listados | Saldo Total: R$ 536.054,95 | 16 Ativos
```

---

### 2. Visualizar e Imprimir no Navegador (A4 / PDF)

Para abrir a folha de relatório pronta para impressão em papel A4 ou salvar como PDF:

- Dê dois cliques em `projetos/Relatorio_Clientes_Firebird/visualizar_impressao.html`, ou execute no PowerShell:
  ```powershell
  Start-Process projetos/Relatorio_Clientes_Firebird/visualizar_impressao.html
  ```
- **Recursos da Página:**
  - 🖨️ **Botão "Imprimir Relatório"**: Dispara a impressão com margens automáticas de 10mm/12mm.
  - 📄 **Botão "Salvar PDF"**: Exporta o arquivo diretamente em formato PDF.
  - ⌨️ **Atalho de Teclado**: Pressione `Ctrl + P` a qualquer momento.
  - 🎨 **Regras `@media print`**: Remove botões de tela, ajusta contraste e preserva cabeçalhos e cores de fundo das tabelas.

---

### 3. Abrir no Vox Studio RAD Designer

Para abrir o formulário no ambiente visual RAD (Delphi-Like):

```bash
npm run rad
```

1. Abra `http://localhost:3000` no seu navegador.
2. Na árvore de arquivos do projeto à esquerda, selecione `Relatorio_Clientes_Firebird`.
3. Abra o formulário visual `FormRelatorioClientes.vxf`.
4. Você verá o componente `vox_Report` com todas as faixas organizadas (`rbTitle`, `rbPageHeader`, `rbDetail`, `rbSummary`, `rbPageFooter`).
5. Clique no botão **"Visualizar Relatório"** para abrir o modal de preview e impressão em tempo real com os dados do Firebird!

---

### 4. Recriar ou Repopular a Base de Dados Firebird

Se desejar recriar a base do zero ou alterar dados:

```bash
node projetos/Relatorio_Clientes_Firebird/dados/criar_banco_firebird.js
```

Para regenerar a página HTML de impressão após alterações no banco:

```bash
node projetos/Relatorio_Clientes_Firebird/gerar_relatorio_impresso.js
```

---

## 🧩 Componentes de Relatório Utilizados

| Componente | Função no Relatório |
| :--- | :--- |
| **`vox_Report`** | Container principal do relatório, definindo padrão A4, orientação *Retrato (Portrait)* e margens de impressão (10mm/15mm). |
| **`vox_ReportBand`** | Divide o relatório em seções lógicas: Cabeçalho do Relatório (`rbTitle`), Cabeçalho da Página (`rbPageHeader`), Linhas de Dados (`rbDetail`), Totais e Resumo (`rbSummary`) e Rodapé (`rbPageFooter`). |
| **`vox_ReportLabel`** | Rótulos de texto estáticos (título institucional, subtítulo e cabeçalhos de coluna). |
| **`vox_ReportDBText`** | Campos vinculados ao banco de dados (`ID`, `CODIGO`, `NOME`, `CIDADE`, `UF`, `SALDO`, `STATUS`) com formatação monetária automática `R$ #,##0.00`. |
| **`vox_ReportSysData`** | Dados do sistema inseridos automaticamente em tempo de execução (data/hora de emissão e paginação "Página X de Y"). |
| **`vox_ReportShape`** | Linhas e separadores decorativos para acabamento gráfico profissional. |
| **`vox_Connection`** | Driver Firebird 5.0 conectado no host local `127.0.0.1:3050`. |
| **`vox_Query`** | Consulta SQL com ordenação por ID. |
| **`vox_DataSource`** | Ponte de dados conectando a Query ao Relatório. |

---

## 📊 Registros Fictícios Inseridos (20 Clientes)

| # | Código | Nome / Razão Social | Cidade/UF | Status | Saldo Atual |
| :-: | :--- | :--- | :--- | :-: | -: |
| 01 | CLI-001 | Mauricio Abreu Consultoria & Software | Rio de Janeiro/RJ | Ativo | R$ 15.420,50 |
| 02 | CLI-002 | Beatriz Lima Tecnologia Digital ME | São Paulo/SP | Ativo | R$ 28.350,00 |
| 03 | CLI-003 | Carlos Eduardo & Filhos Distribuidora | Belo Horizonte/MG | Pendente | R$ 4.890,75 |
| 04 | CLI-004 | Daniela Rocha Logística e Transportes | Curitiba/PR | Ativo | R$ 38.900,20 |
| 05 | CLI-005 | Eduardo Martins Engenharia e Projetos | Porto Alegre/RS | Ativo | R$ 12.780,00 |
| 06 | CLI-006 | Fernanda Souza Contabilidade Corporativa | Salvador/BA | Pendente | R$ 9.450,30 |
| 07 | CLI-007 | Gabriel Santos Telecomunicações ME | Recife/PE | Ativo | R$ 18.600,00 |
| 08 | CLI-008 | Helena Carvalho Distribuidora de Alimentos | Fortaleza/CE | Ativo | R$ 42.100,90 |
| 09 | CLI-009 | Igor Silveira Automação Industrial | Campinas/SP | Ativo | R$ 21.500,00 |
| 10 | CLI-010 | Juliana Mendes Design & Marketing Digital | Florianópolis/SC | Ativo | R$ 7.820,40 |
| 11 | CLI-011 | Lucas Ferreira Metalúrgica e Usinagem | Vitória/ES | Ativo | R$ 33.400,00 |
| 12 | CLI-012 | Mariana Costa Farmacêutica e Saúde | Goiânia/GO | Ativo | R$ 16.950,80 |
| 13 | CLI-013 | Nelson Oliveira Agronegócios S/A | Campo Grande/MS | Ativo | R$ 65.200,00 |
| 14 | CLI-014 | Patrícia Ribeiro Cosméticos Naturais | Belém/PA | Bloqueado | R$ 8.640,00 |
| 15 | CLI-015 | Rodrigo Alencar Empreendimentos Imobiliários | Brasília/DF | Ativo | R$ 84.500,00 |
| 16 | CLI-016 | Sabrina Guimarães Comércio Varejista | Natal/RN | Ativo | R$ 11.320,60 |
| 17 | CLI-017 | Tiago Barbosa Segurança Eletrônica | Teresina/PI | Pendente | R$ 14.180,00 |
| 18 | CLI-018 | Vanessa Lima Importação e Exportação | São Luís/MA | Ativo | R$ 51.700,50 |
| 19 | CLI-019 | Wagner Pires Soluções Ambientais | Manaus/AM | Ativo | R$ 27.890,00 |
| 20 | CLI-020 | Yasmin Castro Consultoria Financeira | Maceió/AL | Ativo | R$ 22.460,00 |

- **Total Acumulado de Saldo**: **R$ 536.054,95**
- **Média por Cliente**: **R$ 26.802,75**
- **Distribuição de Status**: 16 Ativos, 3 Pendentes, 1 Bloqueado.

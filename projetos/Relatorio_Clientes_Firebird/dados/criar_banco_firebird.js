// ==============================================================================
// projetos/Relatorio_Clientes_Firebird/dados/criar_banco_firebird.js
// Criação e inicialização do banco de dados Firebird com 20 clientes fictícios
// ==============================================================================

const path = require('path');
const fs = require('fs');
const firebird = require('node-firebird');

const DB_PATH = path.resolve(__dirname, 'clientes.fdb');

const options = {
  host: '127.0.0.1',
  port: 3050,
  database: DB_PATH,
  user: 'SYSDBA',
  password: 'masterkey',
  pageSize: 8192,
  lowercase_keys: false
};

const CLIENTES_DATA = [
  { id: 1, codigo: 'CLI-001', nome: 'Mauricio Abreu Consultoria & Software', cpf_cnpj: '12.345.678/0001-90', email: 'mauricio@voxlang.org', telefone: '(21) 98888-1111', cidade: 'Rio de Janeiro', uf: 'RJ', saldo: 15420.50, status: 'Ativo', data: '2026-01-15' },
  { id: 2, codigo: 'CLI-002', nome: 'Beatriz Lima Tecnologia Digital ME', cpf_cnpj: '23.456.789/0001-01', email: 'beatriz.lima@tech.com.br', telefone: '(11) 97777-2222', cidade: 'São Paulo', uf: 'SP', saldo: 28350.00, status: 'Ativo', data: '2026-01-20' },
  { id: 3, codigo: 'CLI-003', nome: 'Carlos Eduardo & Filhos Distribuidora', cpf_cnpj: '34.567.890/0001-12', email: 'carlos.filhos@comercio.com.br', telefone: '(31) 96666-3333', cidade: 'Belo Horizonte', uf: 'MG', saldo: 4890.75, status: 'Pendente', data: '2026-02-02' },
  { id: 4, codigo: 'CLI-004', nome: 'Daniela Rocha Logística e Transportes', cpf_cnpj: '45.678.901/0001-23', email: 'contato@roanalog.com.br', telefone: '(41) 95555-4444', cidade: 'Curitiba', uf: 'PR', saldo: 38900.20, status: 'Ativo', data: '2026-02-10' },
  { id: 5, codigo: 'CLI-005', nome: 'Eduardo Martins Engenharia e Projetos', cpf_cnpj: '56.789.012/0001-34', email: 'eduardo@emartins.eng.br', telefone: '(51) 94444-5555', cidade: 'Porto Alegre', uf: 'RS', saldo: 12780.00, status: 'Ativo', data: '2026-02-18' },
  { id: 6, codigo: 'CLI-006', nome: 'Fernanda Souza Contabilidade Corporativa', cpf_cnpj: '67.890.123/0001-45', email: 'fernanda@souzacontab.com.br', telefone: '(71) 93333-6666', cidade: 'Salvador', uf: 'BA', saldo: 9450.30, status: 'Pendente', data: '2026-02-25' },
  { id: 7, codigo: 'CLI-007', nome: 'Gabriel Santos Telecomunicações ME', cpf_cnpj: '78.901.234/0001-56', email: 'gabriel@gstech.com.br', telefone: '(81) 92222-7777', cidade: 'Recife', uf: 'PE', saldo: 18600.00, status: 'Ativo', data: '2026-03-01' },
  { id: 8, codigo: 'CLI-008', nome: 'Helena Carvalho Distribuidora de Alimentos', cpf_cnpj: '89.012.345/0001-67', email: 'helena@carvalhodist.com.br', telefone: '(85) 91111-8888', cidade: 'Fortaleza', uf: 'CE', saldo: 42100.90, status: 'Ativo', data: '2026-03-05' },
  { id: 9, codigo: 'CLI-009', nome: 'Igor Silveira Automação Industrial', cpf_cnpj: '90.123.456/0001-78', email: 'igor@silveiraautomacao.com.br', telefone: '(19) 98765-4321', cidade: 'Campinas', uf: 'SP', saldo: 21500.00, status: 'Ativo', data: '2026-03-12' },
  { id: 10, codigo: 'CLI-010', nome: 'Juliana Mendes Design & Marketing Digital', cpf_cnpj: '01.234.567/0001-89', email: 'juliana@mendesstudio.art.br', telefone: '(48) 99876-5432', cidade: 'Florianópolis', uf: 'SC', saldo: 7820.40, status: 'Ativo', data: '2026-03-15' },
  { id: 11, codigo: 'CLI-011', nome: 'Lucas Ferreira Metalúrgica e Usinagem', cpf_cnpj: '11.223.344/0001-90', email: 'vendas@ferreirametal.com.br', telefone: '(27) 99765-1234', cidade: 'Vitória', uf: 'ES', saldo: 33400.00, status: 'Ativo', data: '2026-03-20' },
  { id: 12, codigo: 'CLI-012', nome: 'Mariana Costa Farmacêutica e Saúde', cpf_cnpj: '22.334.455/0001-01', email: 'mariana@costafarma.com.br', telefone: '(62) 98123-4567', cidade: 'Goiânia', uf: 'GO', saldo: 16950.80, status: 'Ativo', data: '2026-03-28' },
  { id: 13, codigo: 'CLI-013', nome: 'Nelson Oliveira Agronegócios S/A', cpf_cnpj: '33.445.566/0001-12', email: 'nelson@agrooliveira.com.br', telefone: '(67) 99234-5678', cidade: 'Campo Grande', uf: 'MS', saldo: 65200.00, status: 'Ativo', data: '2026-04-02' },
  { id: 14, codigo: 'CLI-014', nome: 'Patrícia Ribeiro Cosméticos Naturais', cpf_cnpj: '44.556.677/0001-23', email: 'patricia@ribeirobio.com.br', telefone: '(91) 98345-6789', cidade: 'Belém', uf: 'PA', saldo: 8640.00, status: 'Bloqueado', data: '2026-04-07' },
  { id: 15, codigo: 'CLI-015', nome: 'Rodrigo Alencar Empreendimentos Imobiliários', cpf_cnpj: '55.667.788/0001-34', email: 'rodrigo@alencaremp.com.br', telefone: '(61) 99456-7890', cidade: 'Brasília', uf: 'DF', saldo: 84500.00, status: 'Ativo', data: '2026-04-12' },
  { id: 16, codigo: 'CLI-016', nome: 'Sabrina Guimarães Comércio Varejista', cpf_cnpj: '66.778.899/0001-45', email: 'sabrina@guimaraesvar.com.br', telefone: '(84) 98567-8901', cidade: 'Natal', uf: 'RN', saldo: 11320.60, status: 'Ativo', data: '2026-04-18' },
  { id: 17, codigo: 'CLI-017', nome: 'Tiago Barbosa Segurança Eletrônica', cpf_cnpj: '77.889.900/0001-56', email: 'tiago@barbosaseg.com.br', telefone: '(86) 99678-9012', cidade: 'Teresina', uf: 'PI', saldo: 14180.00, status: 'Pendente', data: '2026-04-22' },
  { id: 18, codigo: 'CLI-018', nome: 'Vanessa Lima Importação e Exportação', cpf_cnpj: '88.990.011/0001-67', email: 'vanessa@limatrading.com.br', telefone: '(98) 98789-0123', cidade: 'São Luís', uf: 'MA', saldo: 51700.50, status: 'Ativo', data: '2026-04-26' },
  { id: 19, codigo: 'CLI-019', nome: 'Wagner Pires Soluções Ambientais', cpf_cnpj: '99.001.122/0001-78', email: 'wagner@piresambiental.eco.br', telefone: '(92) 99890-1234', cidade: 'Manaus', uf: 'AM', saldo: 27890.00, status: 'Ativo', data: '2026-05-02' },
  { id: 20, codigo: 'CLI-020', nome: 'Yasmin Castro Consultoria Financeira', cpf_cnpj: '10.112.233/0001-89', email: 'yasmin@castrofin.com.br', telefone: '(82) 98901-2345', cidade: 'Maceió', uf: 'AL', saldo: 22460.00, status: 'Ativo', data: '2026-05-05' }
];

async function run() {
  console.log('===========================================================');
  console.log('🔥 CRIANDO BANCO DE DADOS FIREBIRD 5.0:');
  console.log('📁 Destino:', DB_PATH);
  console.log('===========================================================');

  // Se o arquivo já existir, remover para recriar limpo
  if (fs.existsSync(DB_PATH)) {
    try {
      fs.unlinkSync(DB_PATH);
      console.log('ℹ️ Base anterior removida com sucesso.');
    } catch (e) {
      console.warn('⚠️ Não foi possível apagar arquivo anterior (talvez em uso):', e.message);
    }
  }

  // 1. Criar banco de dados FDB
  const db = await new Promise((resolve, reject) => {
    firebird.create(options, (err, dbInstance) => {
      if (err) return reject(err);
      resolve(dbInstance);
    });
  });

  console.log('✔ Banco Firebird (.fdb) criado com sucesso!');

  // 2. Criar a Tabela CLIENTES
  const ddl = `
    CREATE TABLE CLIENTES (
      ID INTEGER NOT NULL PRIMARY KEY,
      CODIGO VARCHAR(10) NOT NULL,
      NOME VARCHAR(80) NOT NULL,
      CPF_CNPJ VARCHAR(20),
      EMAIL VARCHAR(100),
      TELEFONE VARCHAR(20),
      CIDADE VARCHAR(60),
      UF VARCHAR(2),
      SALDO NUMERIC(15,2) DEFAULT 0.00,
      STATUS VARCHAR(15) DEFAULT 'Ativo',
      DATA_CADASTRO DATE DEFAULT CURRENT_DATE
    )
  `;

  await new Promise((resolve, reject) => {
    db.query(ddl, [], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
  console.log('✔ Tabela CLIENTES criada com sucesso!');

  // 3. Inserir os 20 registros
  const insertSql = `
    INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const c of CLIENTES_DATA) {
    await new Promise((resolve, reject) => {
      db.query(insertSql, [
        c.id, c.codigo, c.nome, c.cpf_cnpj, c.email, c.telefone, c.cidade, c.uf, c.saldo, c.status, c.data
      ], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  console.log(`✔ ${CLIENTES_DATA.length} registros fictícios inseridos com sucesso!`);

  // 4. Testar consulta e calcular totais
  const rows = await new Promise((resolve, reject) => {
    db.query('SELECT ID, CODIGO, NOME, CIDADE, UF, SALDO, STATUS FROM CLIENTES ORDER BY ID', [], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  let totalSaldo = 0;
  console.log('\n--- REGISTROS CADASTRADOS NO FIREBIRD ---');
  rows.forEach(r => {
    const id = r.ID || r.id;
    const cod = r.CODIGO || r.codigo;
    const nome = r.NOME || r.nome;
    const cid = r.CIDADE || r.cidade;
    const uf = r.UF || r.uf;
    const saldo = parseFloat(r.SALDO || r.saldo || 0);
    const status = r.STATUS || r.status;
    totalSaldo += saldo;
    console.log(`[#${String(id).padStart(2, '0')}] ${cod} | ${nome.padEnd(45, ' ')} | ${cid}/${uf} | R$ ${saldo.toFixed(2).padStart(10, ' ')} | ${status}`);
  });

  console.log('-----------------------------------------------------------');
  console.log(`Total de Registros: ${rows.length}`);
  console.log(`Saldo Total Acumulado: R$ ${totalSaldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  console.log('===========================================================');

  db.detach();
  console.log('✔ Conexão Firebird fechada.');
}

run().catch(err => {
  console.error('❌ Erro durante inicialização do Firebird:', err);
  process.exit(1);
});

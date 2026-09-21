-- ==============================================================================
-- projetos/Relatorio_Clientes_Firebird/dados/schema_clientes.sql
-- Script de Criação e Carga de Dados da Tabela CLIENTES para Firebird 5.0
-- ==============================================================================

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
);

-- Inserção dos 20 registros fictícios de clientes
INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (1, 'CLI-001', 'Mauricio Abreu Consultoria & Software', '12.345.678/0001-90', 'mauricio@voxlang.org', '(21) 98888-1111', 'Rio de Janeiro', 'RJ', 15420.50, 'Ativo', '2026-01-15');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (2, 'CLI-002', 'Beatriz Lima Tecnologia Digital ME', '23.456.789/0001-01', 'beatriz.lima@tech.com.br', '(11) 97777-2222', 'São Paulo', 'SP', 28350.00, 'Ativo', '2026-01-20');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (3, 'CLI-003', 'Carlos Eduardo & Filhos Distribuidora', '34.567.890/0001-12', 'carlos.filhos@comercio.com.br', '(31) 96666-3333', 'Belo Horizonte', 'MG', 4890.75, 'Pendente', '2026-02-02');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (4, 'CLI-004', 'Daniela Rocha Logística e Transportes', '45.678.901/0001-23', 'contato@roanalog.com.br', '(41) 95555-4444', 'Curitiba', 'PR', 38900.20, 'Ativo', '2026-02-10');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (5, 'CLI-005', 'Eduardo Martins Engenharia e Projetos', '56.789.012/0001-34', 'eduardo@emartins.eng.br', '(51) 94444-5555', 'Porto Alegre', 'RS', 12780.00, 'Ativo', '2026-02-18');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (6, 'CLI-006', 'Fernanda Souza Contabilidade Corporativa', '67.890.123/0001-45', 'fernanda@souzacontab.com.br', '(71) 93333-6666', 'Salvador', 'BA', 9450.30, 'Pendente', '2026-02-25');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (7, 'CLI-007', 'Gabriel Santos Telecomunicações ME', '78.901.234/0001-56', 'gabriel@gstech.com.br', '(81) 92222-7777', 'Recife', 'PE', 18600.00, 'Ativo', '2026-03-01');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (8, 'CLI-008', 'Helena Carvalho Distribuidora de Alimentos', '89.012.345/0001-67', 'helena@carvalhodist.com.br', '(85) 91111-8888', 'Fortaleza', 'CE', 42100.90, 'Ativo', '2026-03-05');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (9, 'CLI-009', 'Igor Silveira Automação Industrial', '90.123.456/0001-78', 'igor@silveiraautomacao.com.br', '(19) 98765-4321', 'Campinas', 'SP', 21500.00, 'Ativo', '2026-03-12');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (10, 'CLI-010', 'Juliana Mendes Design & Marketing Digital', '01.234.567/0001-89', 'juliana@mendesstudio.art.br', '(48) 99876-5432', 'Florianópolis', 'SC', 7820.40, 'Ativo', '2026-03-15');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (11, 'CLI-011', 'Lucas Ferreira Metalúrgica e Usinagem', '11.223.344/0001-90', 'vendas@ferreirametal.com.br', '(27) 99765-1234', 'Vitória', 'ES', 33400.00, 'Ativo', '2026-03-20');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (12, 'CLI-012', 'Mariana Costa Farmacêutica e Saúde', '22.334.455/0001-01', 'mariana@costafarma.com.br', '(62) 98123-4567', 'Goiânia', 'GO', 16950.80, 'Ativo', '2026-03-28');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (13, 'CLI-013', 'Nelson Oliveira Agronegócios S/A', '33.445.566/0001-12', 'nelson@agrooliveira.com.br', '(67) 99234-5678', 'Campo Grande', 'MS', 65200.00, 'Ativo', '2026-04-02');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (14, 'CLI-014', 'Patrícia Ribeiro Cosméticos Naturais', '44.556.677/0001-23', 'patricia@ribeirobio.com.br', '(91) 98345-6789', 'Belém', 'PA', 8640.00, 'Bloqueado', '2026-04-07');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (15, 'CLI-015', 'Rodrigo Alencar Empreendimentos Imobiliários', '55.667.788/0001-34', 'rodrigo@alencaremp.com.br', '(61) 99456-7890', 'Brasília', 'DF', 84500.00, 'Ativo', '2026-04-12');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (16, 'CLI-016', 'Sabrina Guimarães Comércio Varejista', '66.778.899/0001-45', 'sabrina@guimaraesvar.com.br', '(84) 98567-8901', 'Natal', 'RN', 11320.60, 'Ativo', '2026-04-18');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (17, 'CLI-017', 'Tiago Barbosa Segurança Eletrônica', '77.889.900/0001-56', 'tiago@barbosaseg.com.br', '(86) 99678-9012', 'Teresina', 'PI', 14180.00, 'Pendente', '2026-04-22');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (18, 'CLI-018', 'Vanessa Lima Importação e Exportação', '88.990.011/0001-67', 'vanessa@limatrading.com.br', '(98) 98789-0123', 'São Luís', 'MA', 51700.50, 'Ativo', '2026-04-26');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (19, 'CLI-019', 'Wagner Pires Soluções Ambientais', '99.001.122/0001-78', 'wagner@piresambiental.eco.br', '(92) 99890-1234', 'Manaus', 'AM', 27890.00, 'Ativo', '2026-05-02');

INSERT INTO CLIENTES (ID, CODIGO, NOME, CPF_CNPJ, EMAIL, TELEFONE, CIDADE, UF, SALDO, STATUS, DATA_CADASTRO)
VALUES (20, 'CLI-020', 'Yasmin Castro Consultoria Financeira', '10.112.233/0001-89', 'yasmin@castrofin.com.br', '(82) 98901-2345', 'Maceió', 'AL', 22460.00, 'Ativo', '2026-05-05');

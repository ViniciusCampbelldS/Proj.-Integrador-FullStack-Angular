# Site Development TODO

## 1. Vinicius (2 telas)

### 1.a. Gestão de EPIs
- [x] Tela de Gestão de EPIs
  - [ ] Permissão: Apenas TST altera, Gerência visualiza
  - [ ] Botão para gerar relatório de posses de EPIs
    - [ ] Exportar como: .pdf, .odf, .xlsx, .xml
  - Relatório deve conter:
    - [ ] ID único do EPI
    - [ ] Funcionário associado (o mesmo funcionário pode aparecer várias vezes)
    - [ ] CA do EPI
    - [ ] Lote do EPI
    - [ ] Data de validade
    - [ ] Aviso de relatório do estado (indicação se existe ou não foto/comentário para aquele EPI)
    - [ ] Data do registro no sistema (timestamp)
    - [ ] Situação / Estado: vencido, próximo do vencimento, em dia

### 1.b. Cadastro do EPI no sistema
- [ ] Tela de cadastro de EPI
  - [ ] Campos para preencher os dados do EPI
  - [ ] Botão para salvar/cadastrar
  - [ ] Não obrigar informar um usuário
  - [ ] ID gerado automaticamente pelo sistema
  - [ ] Campos obrigatórios (marcar com `*`):
    - [ ] Data de validade
    - [ ] CA
    - [ ] Nome
    - [ ] Lote

### 1.c. Fazer entrega de EPI (Arthur)
- [x] Tela de entrega de EPI
  - [x] Botão de upload de arquivo de ficha de EPI preenchida
    - [x] Pré-visualização do arquivo
  - [x] Perguntar se quer marcar algum EPI anterior como substituído
    - [x] Botão que abre uma janela/modal
  - [x] Possível opção de assinatura digital / preenchimento digital de ficha
    - [x] Se não implementar, deixar apenas botão fictício ou omitir
  - [x] Preenchimento digital de fichas de EPI

### 1.d. Alterações manuais (apenas ADM)
- [ ] Tela de alterações manuais de EPI
- [ ] Histórico de alterações

### 1.e. Agenda mensal
- [x] Não implementar agenda mensal

### 1.f. Relatório sobre o estado (informado pelo funcionário)
- [x] Página separada para relatório de estado
  - [x] Fotos anexadas
  - [x] Comentário do funcionário

### Observação Vinicius
- [ ] Criar tela similar à gestão de EPI para filtrar/selecionar o EPI a ser substituído

## 2. Pedro Henrique (2 telas)

### 2.a. Gestão de Treinamentos
- [X] Tela de Gestão de Treinamentos
  - [ ] Permissão: Apenas TST altera, Gerência visualiza
  - [ ] Edição manual de treinamentos por funcionário
  - [ ] Histórico de alterações (nova página)
    - [ ] Timestamp de cada modificação
    - [ ] Registrar quem fez a alteração
  - [X] Upload de documento

### 2.b. Agendar treinamento
- [X] Tela de agendamento de treinamento
  - [ ] Convidar funcionário

### 2.c. Abertura de turmas para treinamentos
- [X] Campos para criar nova turma
  - [X] Agendar data do treinamento
  - [ ] Cadastrar funcionários na turma
  - [ ] Upload da lista de presença assinada

## 3. Thales Faria

### 3.a. Tabela dos Treinamentos
- [ ] Tela/tabela de Treinamentos
  - [ ] Código da NR
  - [ ] Data do treinamento
  - [ ] Funcionário(s) envolvido(s)
  - [ ] Data do vencimento
  - [ ] Situação / Estado
  - [ ] Botão para exportar: .pdf, .odf, .xlsx, .xml

### 4. Agenda/calendário mensal
- [ ] Não obrigatório; somente se já tiver tempo após o restante

## 5. Thales Fontes

### 5.a. Gerenciar Funcionários
- [X] Tela de Gerenciamento de Funcionários
  - [ ] Setor
  - [ ] Cargo
  - [ ] NRs necessárias para a função

### Permissões
- [ ] TST: visualiza e edita requisitos de NR e EPI
- [ ] RH: registra novos funcionários

## 6. JJ: Notificações

### 6.a. TST
- [x] Aviso prévio de vencimento de NR e EPI
  - [x] Configuração da data do aviso

## 7. Pedro Henrique: Funcionário

### 7.a. Abertura de turmas
- [ ] Campos de abertura de turmas na mesma página
  - [ ] Marcar campos obrigatórios com `*`

### 7.b. Data/hora do treinamento
- [ ] Campo de data/hora do treinamento

### 7.c. Avisos de vencimento de EPIs
- [X] Lista de avisos de vencimento de EPIs na página

### 7.d. Avisos de vencimento de NRs
- [X] Lista de avisos de vencimento de NRs na página

## 8. Thales Faria: Portal do Funcionário

### 8.a. Meus EPIs
- [X] Tela "Meus EPIs"
  - [ ] Relatar estado do EPI com pop-up para upload
  - [ ] Visualizar fichas de EPI
    - [ ] Botão para baixar arquivo
    - [ ] Botão para abrir arquivo em nova guia
    - [ ] Usar ícones para essas ações

### 8.b. Meus Treinamentos (Thales Fontes)
- [X] Tela "Meus Treinamentos"
  - [ ] Visualizar treinamentos concluídos
  - [ ] Visualizar treinamentos pendentes

## 9. JJ: Login
- [x] Tela de login
  - [x] CPF
  - [x] Senha
  - [x] Esqueci minha senha: informar telefone do TI
  - [x] Bloquear acesso ao resto do site até o login ser realizado

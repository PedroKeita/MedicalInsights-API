# 🏥 MedicalInsights-API – Documentação de Épicas e User Stories

---

## Épica 01: Gestão de Pacientes

**Descrição:**  
Essa épica vai permitir que os profissionais de saúde criem, atualizem, consultem e removam informações de pacientes de maneira organizada, segura e auditável, garantindo a integridade dos dados, sua rastreabilidade e a facilidade de uso.

### Critérios de Aceitação Gerais da Épica:
- Todos os endpoints relacionados a pacientes (POST, GET, PUT, DELETE) estão funcionando corretamente.
- Todos os dados obrigatórios de pacientes são validados antes de inserir ou atualizar.
- Nenhum dado sensível do paciente é exposto indevidamente (confidencialidade).
- Operações de criação, atualização e deleção são rastreáveis para auditoria (logs ou timestamps).
- A API retorna códigos HTTP corretos e mensagens de erro claras para operações inválidas.
- A integração com o banco de dados é estável, sem perda ou inconsistência de dados.

### User Stories

#### US01 – Adicionar paciente
**Como:** profissional de saúde  
**Quero:** registrar um paciente com informações básicas (nome, idade, histórico médico)  
**Para:** ter todos os dados centralizados e acessíveis

**Critérios de Aceitação:**
- Endpoint `POST /patients` deve criar o paciente no banco de dados.
- Campos obrigatórios (nome, idade, gênero) são validados e retornam erro 400 se estiverem faltando ou inválidos.
- Histórico médico é opcional, mas se fornecido deve ser armazenado corretamente.
- Resposta retorna ID único do paciente criado e status HTTP 201.
- Nenhum dado sensível é exposto na resposta.
- Registro da criação é armazenado com timestamp para auditoria.

#### US02 – Consultar pacientes
**Como:** profissional de saúde  
**Quero:** listar todos os pacientes ou buscar por ID  
**Para:** localizar rapidamente informações de um paciente específico

**Critérios de Aceitação:**
- Endpoint `GET /patients` retorna lista completa de pacientes.
- Endpoint `GET /patients/:id` retorna apenas o paciente correspondente ao ID.
- Retorno inclui apenas informações relevantes e não expõe dados sensíveis desnecessários.
- Se o paciente não existir, retorna erro HTTP 404 com mensagem clara.
- Os dados são consistentes com o banco de dados atual.

#### US03 – Atualizar informações
**Como:** profissional de saúde  
**Quero:** atualizar dados de pacientes  
**Para:** manter registros atualizados

**Critérios de Aceitação:**
- Endpoint `PUT /patients/:id` permite atualizar qualquer campo do paciente (nome, idade, gênero, histórico médico).
- Campos obrigatórios não podem ser removidos ou ficar inválidos.
- Resposta retorna o paciente atualizado com status HTTP 200.
- Se o ID não existir, retorna erro HTTP 404.
- Atualizações são auditáveis com registro de timestamp e usuário que realizou a operação.

#### US04 – Remover paciente
**Como:** profissional de saúde  
**Quero:** remover pacientes desatualizados ou incorretos  
**Para:** manter banco de dados limpo

**Critérios de Aceitação:**
- Endpoint `DELETE /patients/:id` remove paciente do banco de dados.
- Retorno HTTP 204 quando a operação é bem-sucedida.
- Se o paciente não existir, retorna erro HTTP 404.
- Paciente removido não aparece mais em consultas `GET /patients` ou `GET /patients/:id`.
- Operação de deleção é registrada com timestamp e usuário responsável para auditoria.

---

## Épica 02: Análises Preditivas e Insights

**Descrição:**  
Essa épica vai permitir que os profissionais recebam previsões, alertas e insights médicos automatizados a partir dos dados do paciente, garantindo suporte à decisão clínica de forma confiável, segura e auditável.

### Critérios de Aceitação Gerais da Épica:
- Todas as análises solicitadas são processadas corretamente e retornam resultados válidos.
- Resultados e alertas são armazenados de forma segura e vinculados ao paciente correto.
- Histórico completo de análises pode ser consultado a qualquer momento.
- Alertas são acionados automaticamente quando métricas de risco ultrapassam thresholds pré-definidos.
- A API retorna códigos HTTP apropriados e mensagens de erro claras em casos de dados inválidos ou falhas.
- Operações críticas são auditáveis, incluindo timestamp, usuário e dados do paciente.

### User Stories

#### US01 – Solicitar análise
**Como:** profissional de saúde  
**Quero:** enviar os dados de um paciente para análise  
**Para:** receber recomendações ou insights médicos

**Critérios de Aceitação:**
- Endpoint `POST /analysis` recebe JSON contendo dados do paciente.
- Campos obrigatórios para análise (idade, gênero, histórico médico, sinais vitais) são validados.
- API retorna JSON com insights médicos, incluindo previsão de risco, recomendações e métricas relevantes.
- Tempo de resposta deve ser aceitável para uso clínico (<2s para análise básica).
- Nenhum dado sensível é exposto sem autorização.
- Operação é registrada com timestamp e usuário solicitante.

#### US02 – Visualizar histórico de análises
**Como:** profissional de saúde  
**Quero:** acessar todas as análises realizadas para um paciente  
**Para:** acompanhar evolução e histórico médico

**Critérios de Aceitação:**
- Endpoint `GET /patients/:id/analyses` retorna lista completa de análises.
- Resultados são ordenados por data de criação.
- Cada registro contém informações do paciente, métricas da análise e insights gerados.
- Retorno adequado se não houver análises (array vazio).
- Operação só retorna dados do paciente autorizado ou pertencente ao usuário logado.

#### US03 – Alertas preditivos
**Como:** profissional de saúde  
**Quero:** receber alertas de risco baseados em análises  
**Para:** identificar pacientes que precisam de atenção urgente

**Critérios de Aceitação:**
- Alertas são gerados automaticamente quando métricas ultrapassam thresholds definidos.
- Endpoint retorna alertas em JSON ou junto com a análise solicitada.
- Cada alerta contém descrição, tipo de risco e recomendação de ação.
- Alertas não bloqueiam a análise, apenas complementam os resultados.
- Registro do alerta inclui timestamp e paciente relacionado.

#### US04 – Armazenamento seguro de resultados
**Como:** profissional de saúde  
**Quero:** que resultados de análises sejam salvos de forma segura  
**Para:** consultar futuramente sem perda de dados

**Critérios de Aceitação:**
- Todos os resultados são armazenados no banco `analyses` com referência ao paciente correto (`patient_id`).
- Dados críticos são protegidos (criptografia ou armazenamento seguro).
- Consultas futuras retornam resultados consistentes e completos.
- Operações de inserção e atualização são auditáveis (timestamp, usuário, dados enviados).
- Restrições de acesso garantem que apenas usuários autorizados podem visualizar ou manipular os resultados.

---

## Épica 03: Acesso e Segurança

**Descrição:**  
Essa épica vai garantir que apenas usuários autorizados acessem os dados, mantendo confidencialidade, integridade e auditabilidade das informações médicas.

### Critérios de Aceitação Gerais da Épica:
- Apenas usuários autenticados podem acessar endpoints protegidos.
- Todas as operações críticas (criação, atualização, deleção) são auditáveis com logs detalhados.
- Dados sensíveis (histórico médico, senhas) são criptografados ou protegidos.
- A API retorna códigos HTTP corretos e mensagens de erro claras para acesso não autorizado.
- O sistema suporta diferentes níveis de permissões (usuário comum vs administrador).
- As operações de segurança não impactam negativamente a experiência do usuário final.

### User Stories

#### US01 – Autenticação básica
**Como:** profissional de saúde  
**Quero:** logar com credenciais seguras  
**Para:** garantir que só usuários autorizados usem a API

**Critérios de Aceitação:**
- Endpoint `POST /login` valida usuário e senha corretamente.
- Usuário autenticado recebe token JWT válido para requisições subsequentes.
- Token expira após período configurável e precisa de renovação.
- Tentativas de login inválidas retornam erro HTTP 401 com mensagem clara.
- Logs registram tentativas de login (bem-sucedidas e falhas).

#### US02 – Controle de permissões
**Como:** administrador  
**Quero:** definir quem pode criar, atualizar ou excluir dados  
**Para:** manter segurança e integridade dos dados

**Critérios de Aceitação:**
- Usuários com permissões inadequadas recebem erro HTTP 403 ao tentar realizar operações restritas.
- Diferentes níveis de acesso podem ser configurados (leitura apenas, CRUD completo).
- Logs registram operações críticas e usuário que tentou executá-las.
- Configurações de permissões podem ser atualizadas por administradores sem afetar dados existentes.

#### US03 – Proteção de dados sensíveis
**Como:** profissional de saúde  
**Quero:** que dados sensíveis do paciente sejam criptografados  
**Para:** proteger informações médicas

**Critérios de Aceitação:**
- Senhas de usuários são armazenadas com hash seguro (ex.: bcrypt).
- Dados críticos do paciente (histórico médico, resultados de análises) são criptografados em repouso.
- API não retorna dados sensíveis sem permissão adequada.
- Logs ou respostas de erro não expõem informações confidenciais.

#### US04 – Registro de atividades
**Como:** administrador  
**Quero:** ver histórico de operações  
**Para:** auditoria e conformidade

**Critérios de Aceitação:**
- Logs registram criação, atualização e deleção de pacientes e análises.
- Cada log contém: usuário que realizou a ação, data/hora, tipo de operação e dados afetados.
- Logs podem ser filtrados por usuário, tipo de operação e período.
- Logs não permitem alteração manual para garantir integridade.

---

## Épica 04: Experiência de Uso e Integração

**Descrição:**  
Essa épica vai garantir que a API seja fácil de usar, confiável e compatível com sistemas externos, fornecendo respostas claras, rápidas e documentação completa para desenvolvedores e profissionais de saúde.

### Critérios de Aceitação Gerais da Épica:
- Endpoints são consistentes, padronizados e seguem boas práticas REST.
- A documentação da API é completa, com exemplos claros de requisições e respostas.
- Respostas do servidor são rápidas e previsíveis, com logs detalhados de erros.
- CORS é configurado corretamente para permitir integração segura com front-end.
- Mensagens de erro são padronizadas e compreensíveis para desenvolvedores e usuários finais.
- A API é testável de forma consistente e confiável com ferramentas externas (ex.: Postman, Swagger).

### User Stories

#### US01 – Endpoints claros e consistentes
**Como:** desenvolvedor frontend  
**Quero:** endpoints REST consistentes  
**Para:** integrar facilmente com sistemas externos

**Critérios de Aceitação:**
- Todos os endpoints seguem padrão uniforme de URL e verbo HTTP (GET, POST, PUT, DELETE).
- JSON de resposta tem estrutura padronizada.
- Mensagens de erro seguem formato consistente, incluindo código e descrição.
- Endpoints respeitam o versionamento, permitindo futuras alterações sem quebrar integração.

#### US02 – Documentação da API
**Como:** usuário/developer  
**Quero:** documentação clara  
**Para:** entender como usar todos os endpoints

**Critérios de Aceitação:**
- Documentação descreve todos os endpoints com método HTTP, parâmetros de entrada e formato de resposta.
- Inclui exemplos de requisições e respostas para cada endpoint.
- Explica códigos de status HTTP retornados e mensagens de erro.
- Documentação é acessível via web (Swagger, Redoc ou Markdown).
- Instruções de autenticação e permissões estão detalhadas.

#### US03 – Feedback rápido
**Como:** profissional de saúde  
**Quero:** respostas rápidas da API  
**Para:** não atrasar o fluxo de trabalho

**Critérios de Aceitação:**
- Operações básicas (`GET /patients`, `GET /patients/:id`) respondem em < 500ms em ambiente de teste padrão.
- Logs de erros detalhados para qualquer falha na API, incluindo timestamp, endpoint e usuário.
- Mensagens de erro são compreensíveis e informam claramente o que deve ser corrigido.
- Métricas de performance podem ser monitoradas (tempos de resposta, taxa de erros).

#### US04 – Compatibilidade com front-end
**Como:** desenvolvedor frontend  
**Quero:** CORS configurado  
**Para:** permitir chamadas seguras a partir do navegador

**Critérios de Aceitação:**
- CORS habilitado apenas para domínios autorizados, evitando acesso não autorizado.
- Requisições bloqueadas de domínios não permitidos retornam erro HTTP 403.
- Cabeçalhos necessários para integração (ex.: Authorization) são aceitos corretamente.
- Integração de front-end com a API funciona sem problemas de bloqueio de navegador.

# 🏥 MedicalInsights-API – Requisitos do Sistema

Este documento descreve os **requisitos funcionais** e **não funcionais** do projeto MedicalInsights-API.

---

##  Requisitos Funcionais
Funcionalidades que o sistema deve executar.

| ID   | Requisito Funcional                  | Descrição                                                                                  |
|------|-------------------------------------|--------------------------------------------------------------------------------------------|
| RF01 | Cadastrar Paciente                   | O sistema deve permitir o registro de pacientes com dados básicos (nome, idade, gênero, histórico médico). |
| RF02 | Listar Pacientes                     | O sistema deve permitir listar todos os pacientes cadastrados ou buscar um paciente por ID. |
| RF03 | Atualizar Paciente                   | O sistema deve permitir atualização dos dados de pacientes existentes.                     |
| RF04 | Remover Paciente                     | O sistema deve permitir exclusão de pacientes.                                             |
| RF05 | Registrar Logs de Pacientes          | Todas as operações de criação, atualização e exclusão devem ser registradas com timestamp e usuário responsável. |
| RF06 | Solicitar Análise Preditiva          | O sistema deve permitir envio dos dados de pacientes para análise via integração com API de IA (Google Gemini). |
| RF07 | Retornar Insights Médicos            | A API deve processar dados e retornar insights e previsões médicas personalizadas.        |
| RF08 | Armazenar Resultados                 | O sistema deve armazenar os resultados das análises de forma segura e vinculada ao paciente. |
| RF09 | Exibir Histórico de Análises        | O sistema deve permitir consultar o histórico de análises de um paciente específico.     |
| RF10 | Gerar Alertas Preditivos             | O sistema deve gerar alertas automáticos quando indicadores clínicos ultrapassarem limites definidos. |
| RF11 | Autenticação de Usuário              | O sistema deve autenticar usuários com credenciais seguras (login/senha).                 |
| RF12 | Gerar Token JWT                       | Após autenticação, o sistema deve gerar um token JWT para uso nas requisições.           |
| RF13 | Controle de Permissões               | O sistema deve permitir diferentes níveis de acesso (usuário comum, administrador).       |
| RF14 | Criptografia de Dados Sensíveis      | O sistema deve armazenar senhas e informações sensíveis criptografadas.                  |
| RF15 | Registro de Atividades               | O sistema deve registrar todas as operações relevantes em logs para auditoria.          |
| RF16 | Habilitar CORS Seguro                | A API deve permitir integração com front-ends autorizados via configuração de CORS.      |

---

##  Requisitos Não Funcionais
Funcionalidades de qualidade e restrições que o sistema deve atender, como desempenho, segurança, escalabilidade, usabilidade, etc.

| ID   | Requisito Não Funcional              | Descrição                                                                                  |
|------|-------------------------------------|--------------------------------------------------------------------------------------------|
| RN01 | Tempo de Resposta                     | O tempo de resposta da API deve ser inferior a 500ms para operações básicas e <2s para análises preditivas. |
| RN02 | Segurança de Dados                    | Dados sensíveis devem ser criptografados.                                                  |
| RN03 | Disponibilidade                       | A API deve estar disponível 24/7 com tolerância mínima a falhas.                           |
| RN04 | Escalabilidade                         | A arquitetura deve suportar aumento de carga sem comprometer desempenho.                   |
| RN05 | Padrão de API                          | Todos os endpoints devem seguir o padrão RESTful e retorno em JSON.                        |
| RN06 | Testabilidade                          | O sistema deve permitir testes automatizados (unitários e integração) via Jest.           |
| RN07 | Manutenção e Leitura                   | O código deve seguir boas práticas de Clean Code e convenções de estilo TypeScript.        |
| RN08 | Tratamento de Erros                     | O sistema deve retornar mensagens de erro padronizadas em formato JSON, contendo statusCode, message e timestamp. Nenhuma exceção deve vazar para o cliente. |
| RN09 | Integridade de Dados                    | Todas as transações com o PostgreSQL devem ser executadas dentro de transações ACID, garantindo consistência em caso de falha. |
| RN10 | Documentação Técnica                    | A documentação da API deve estar disponível via Swagger UI e Markdown, descrevendo endpoints, parâmetros, respostas e exemplos. |



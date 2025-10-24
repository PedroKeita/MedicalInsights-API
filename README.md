# MedicalInsights-API

API RESTful para gerenciamento e análise de dados médicos, desenvolvida com Node.js, Express e TypeScript. A API permite o cadastro, visualização e análise de informações de pacientes, facilitando o acompanhamento da saúde e a geração de insights clínicos.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM para interagir com o banco de dados.
- **Swagger**: Documentação interativa da API.
- **Vitest**: Frameworks para testes automatizados.

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/PedroKeita/MedicalInsights-API.git
   cd MedicalInsights-API
   ```

2. Instale as dependências:
    ```
    npm install
    ```

3. Configure o banco de dados:
    - Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias.

    - Execute as migrações do Prisma:
    ```
    npx prisma migrate dev
    ```

4. Inicie o servidor:
    ```
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

## 📚 Endpoints Principais

**Pacientes**

- `GET /patients`: Lista todos os pacientes.

- `GET /patients/:id`: Retorna detalhes de um paciente específico.

- `POST /patients`: Cria um novo paciente.

- `PUT /patients/:id`: Atualiza informações de um paciente.

-` DELETE /patients/:id`: Remove um paciente.

**Análises**

- `GET /patients/:id/analyses`: Retorna o histórico de análises de um paciente.

- `POST /analysis`: Cria uma nova análise para um paciente.

**Autenticação (Futuro)**

- Implementação planejada para autenticação e autorização de usuários.

## 🧪 Testes
Para rodar os testes automatizados:
```
npm run test
```

## 📄 Documentação da API
A documentação interativa da API está disponível em:
```
http://localhost:3000/api/docs
```

## 📌 Épicas/User Stories e Requisitos

O projeto possui documentação detalhada de user stories e requisitos disponíveis em:

- 📄 **[User Stories e Épicas](./docs/Epics_UserStories.md)** – Lista completa das funcionalidades planejadas, com detalhes de cada épica e user stories.
- 📝 **[Requisitos do Projeto](./docs/REQUIREMENTS.md)** – Documentação de requisitos funcionais e não funcionais do sistema.
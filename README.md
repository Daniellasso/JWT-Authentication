# Desafio 02 — JWT Authentication (Node.js + Express + Sequelize + PostgreSQL)

Projeto de API REST para autenticação e gerenciamento de usuários, utilizando **JSON Web Token (JWT)** para proteger rotas.

## O que o projeto faz
- Permite que um usuário **registre** uma conta (`/register`).
- Permite que um usuário **faça login** (`/login`), validando email e senha.
- Gera um **token JWT** na autenticação.
- Protege rotas de usuário usando middleware que valida o token.
- Permite **listar**, **atualizar** e **deletar** usuários.

## Tecnologias utilizadas
- **Node.js**
- **Express** (API REST)
- **Sequelize** (ORM)
- **PostgreSQL** (banco de dados)
- **jsonwebtoken** (geração e validação do JWT)
- **bcryptjs** (hash e comparação de senhas)
- **dotenv** (carregamento de variáveis de ambiente)

## Rotas da API

### Rotas públicas

#### `POST /register`
Registra um usuário.

**Body (JSON)**
- `name`: string
- `email`: string
- `password`: string

**Resposta (exemplo)**
- `201`: retorna `id`, `name`, `email`
- `400`: caso o email já exista

#### `POST /login`
Realiza login e retorna token JWT.

**Body (JSON)**
- `email`: string
- `password`: string

**Resposta (exemplo)**
- `200`: retorna `user` e `token`
- `401`: quando email ou senha estiverem inválidos

### Rotas protegidas (JWT)
Para acessar, envie o header **`Authorization`** no formato:

`Authorization: Bearer <token>`

#### `GET /users`
Lista todos os usuários.

#### `PUT /users/:id`
Atualiza um usuário pelo `id`.

**Body (JSON)**
- `name`: string
- `email`: string
- `password`: string

> A senha é armazenada como hash no banco.

#### `DELETE /users/:id`
Deleta um usuário pelo `id`.

## Estrutura do projeto
- `src/index.js`: inicializa Express, configura middlewares, carrega rotas e conecta no banco.
- `src/routes.js`: define as rotas públicas e protegidas.
- `src/controllers/`
  - `AuthController.js`: `register` e `login`
  - `UsersControllers.js`: `getUsers`, `putUser`, `deleteUser`
- `src/middlewares/`
  - `authMiddleware.js`: valida o JWT e popula `req.user`
- `src/models/`
  - `user.js`: modelo Sequelize para `User`
  - `index.js`: inicializa o Sequelize e carrega os models
- `src/config/`
  - `database.js`: configura a conexão com PostgreSQL

## Como iniciar
1. Instale as dependências:
   - `npm install`
2. Inicie em modo desenvolvimento:
   - `npm run dev`

O servidor escuta na porta **3333**.

## Exemplos rápidos (cURL)

### Registro
```bash
curl -X POST http://localhost:3333/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"João\",\"email\":\"joao@email.com\",\"password\":\"123456\"}"
```

### Login
```bash
curl -X POST http://localhost:3333/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"joao@email.com\",\"password\":\"123456\"}"
```

### Listar usuários (protegido)
```bash
curl -X GET http://localhost:3333/users \
  -H "Authorization: Bearer SEU_TOKEN"
```


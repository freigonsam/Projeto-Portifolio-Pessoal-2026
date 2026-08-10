# API Rest de Bloco de Notas

Esta API REST permite criar, listar, buscar e atualizar blocos de notas, com autenticação simples via JWT.

## Funcionalidades
- Criar um novo bloco de notas
- Listar todos os blocos de notas
- Buscar um bloco de notas por ID
- Atualizar um bloco de notas
- Autenticação com login simples

## Estrutura do projeto
- src/routes: definição das rotas da API
- src/controllers: controle das requisições
- src/services: regras de negócio e armazenamento em memória
- src/models: modelos de dados
- src/middleware: middleware de autenticação JWT
- src/resources/swagger.json: documentação Swagger

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. A API ficará disponível em:
   - http://localhost:3000/notes
   - http://localhost:3000/api-docs

## Autenticação
Use o endpoint de login para obter um token JWT:

```bash
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

Resposta:
```json
{
  "token": "<jwt>"
}
```

Em seguida, informe o token no header:
```http
Authorization: Bearer <jwt>
```

## Endpoints
- POST /login
- POST /notes
- GET /notes
- GET /notes/:id
- PUT /notes/:id

## Documentação Swagger
A documentação Swagger está disponível em:
```text
http://localhost:3000/api-docs
```

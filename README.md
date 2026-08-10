# API Rest de Bloco de Notas

Esta API REST permite criar, listar, buscar, atualizar e remover blocos de notas, com autenticação simples via JWT.

## Funcionalidades
- Criar um novo bloco de notas
- Listar todos os blocos de notas
- Buscar um bloco de notas por ID
- Atualizar um bloco de notas
- Remover um bloco de notas
- Autenticação com login simples
- Validação de tamanho mínimo e máximo para título e conteúdo
- Prevenção de títulos duplicados
- Proteção contra múltiplas tentativas inválidas de login
- Tratamento de tokens malformados, expirados e inválidos

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

## Regras de validação
- Título: entre 3 e 20 caracteres
- Conteúdo: entre 3 e 200 caracteres
- Título e conteúdo não podem ser vazios ou compostos apenas por espaços
- Atualizações precisam informar pelo menos um campo válido
- Títulos duplicados não são permitidos

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
- DELETE /notes/:id

## Testes
Os testes funcionais da API estão localizados na pasta tests e podem ser executados com:

```bash
npm test
```

A suíte cobre cenários de:
- criação, leitura, atualização e remoção de notas
- validações de entrada e regras de negócio
- autenticação e tratamento de tokens
- tentativas repetidas de login e erros de requisição

Ao executar os testes, o projeto gera automaticamente um relatório HTML com o Mochawesome em:

```text
reports/test-report.html
```

Esse relatório também é publicado como artefato na pipeline do GitHub Actions ao final da execução, permitindo visualização e compartilhamento do resultado dos testes.

Também existe um workflow do GitHub Actions em .github/workflows/tests.yml para executar os testes automaticamente em push e pull request.

## Documentação Swagger
A documentação Swagger está disponível em:
```text
http://localhost:3000/api-docs
```

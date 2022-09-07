# kmarket

## Endpoints Resumo

### 1. /products

| Método | Rota          | Descrição                                      | Autorizaçao | Adm |
| ------ | ------------- | ---------------------------------------------- | ----------- | --- |
| GET    | /products     | Lista todos os produtos.                       | X           |     |
| GET    | /products/:id | Lista um produto usando seu ID como parâmetro. | X           |     |
| POST   | /products     | Criação de um produto.                         | X           | X   |
| PATCH  | /products/:id | Atualiza os produtos.                          | X           | X   |
| DELETE | /products/:id | Deleta os produtos.                            | X           | X   |

### 2. /carts

| Método | Rota       | Descrição                                                   | Autorizaçao | Adm |
| ------ | ---------- | ----------------------------------------------------------- | ----------- | --- |
| GET    | /carts     | Lista todos os carrinhos.                                   | X           |     |
| GET    | /carts/:id | Lista um carrinho usando seu ID como parâmetro.             | X           |     |
| POST   | /carts     | Criação de um carrinho. Rota deve atualizar fidelity points | X           |     |
| DELETE | /carts/:id | Deleta o carrinho.                                          | X           | X   |

### 3. /productsCart

| Método | Rota                  | Descrição                                                           | Autorizaçao | Adm |
| ------ | --------------------- | ------------------------------------------------------------------- | ----------- | --- |
| GET    | /productsCart         | Listar todos os produtos vendidos                                   | X           | X   |
| POST   | /productsCart/:idCart | Adicionar produtos ao carrinho. Deve atualizar o estoque do produto | X           |     |
| DELETE | /cart/:id             | Deleta o carrinho. Deve atualizar o estoque do produto              | X           | X   |

### 4. /employees

| Método | Rota           | Descrição                                                       | Autorizaçao | Adm |
| ------ | -------------- | --------------------------------------------------------------- | ----------- | --- |
| GET    | /employees     | Lista todos os funcionários.                                    | X           | X   |
| GET    | /employees/:id | Lista um funcionário usando seu ID como parâmetro.              | X           | X   |
| POST   | /employees     | Criação de um funcionário.                                      |             |     |
| PATCH  | /employees/:id | Atualiza os funcionários.                                       | X           | X   |
| DELETE | /employees/:id | Deleta os funcionários. Soft delete (mudar isActive para false) | X           | X   |

### 5. /login - Somente funcionário faz login

| Método | Rota   | Descrição                           | Autorizaçao | Adm |
| ------ | ------ | ----------------------------------- | ----------- | --- |
| POST   | /login | Faz login do employee e gera token. |             |     |

### 6. /loyaltycustomers

| Método | Rota                  | Descrição                                                   | Autorizaçao | Adm |
| ------ | --------------------- | ----------------------------------------------------------- | ----------- | --- |
| GET    | /loyaltycustomers     | Lista todos os clientes.                                    | X           |     |
| GET    | /loyaltycustomers/:id | Lista um cliente usando seu ID como parâmetro.              | X           | X   |
| POST   | /loyaltycustomers     | Criação de um cliente.                                      | X           |     |
| PATCH  | /loyaltycustomers/:id | Atualiza os clientes.                                       | X           | X   |
| DELETE | /loyaltycustomers/:id | Deleta os clientes. Soft delete (mudar isActive para false) | X           | X   |

### 7. /categories

| Método | Rota                             | Descrição                                                        | Autorizaçao | Adm |
| ------ | -------------------------------- | ---------------------------------------------------------------- | ----------- | --- |
| GET    | /categories                      | Lista todos as categorias.                                       | X           |     |
| GET    | /categories/:idCategory/products | Lista todos as produtos de uma categoria, disponiveis no mercado | X           | X   |
| POST   | /categories                      | Criação de uma categoria.                                        | X           | X   |
| PATCH  | /categories/:id                  | Atualiza as categorias.                                          | X           | X   |
| DELETE | /categories/:id                  | Deleta as categorias.                                            | X           | X   |

### 8. /suppliers

| Método | Rota           | Descrição                       | Autorizaçao | Adm |
| ------ | -------------- | ------------------------------- | ----------- | --- |
| GET    | /suppliers     | Lista todos os fornecedores.    | X           | X   |
| GET    | /suppliers/:id | Lista um forncedor especifico.  | X           | X   |
| POST   | /suppliers     | Criação de um fornecedor.       | X           | X   |
| PATCH  | /suppliers/:id | Atualiza um fornecedores.       | X           | X   |
| DELETE | /suppliers/:id | Deleta um forncedor especifico. | X           | X   |

### 9. /supplierproducts

| Método | Rota                  | Descrição                                                            | Autorizaçao | Adm |
| ------ | --------------------- | -------------------------------------------------------------------- | ----------- | --- |
| GET    | /supplierproducts     | Lista todos os produtos disponiveis nos fornecedores.                | X           | X   |
| POST   | /supplierproducts     | Criação de um produto para fornecedor (fornecedor tem este produto). | X           | X   |
| DELETE | /supplierproducts/:id | Deleta um produto do fornecedor.                                     | X           | X   |

### 10. /orderproducts

| Método | Rota               | Descrição                                    | Autorizaçao | Adm |
| ------ | ------------------ | -------------------------------------------- | ----------- | --- |
| GET    | /orderproducts     | Lista todas as ordens de compra de produtos. | X           | X   |
| POST   | /orderproducts     | Criação de ordem de compra para um produto.  | X           | X   |
| DELETE | /orderproducts/:id | Deletar ordem de compra.                     | X           | X   |

# Documentação da API

## Tabela de Conteúdos

-   [Visão Geral](#1-visão-geral)
-   [Diagrama ER](#2-diagrama-er)
-   [Início Rápido](#3-início-rápido)
    -   [Instalando Dependências](#31-instalando-dependências)
    -   [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    -   [Migrations](#33-migrations)
-   [Autenticação](#4-autenticação)
-   [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

-   [NodeJS](https://nodejs.org/en/)
-   [Express](https://expressjs.com/pt-br/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [TypeORM](https://typeorm.io/)
-   [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
http://suaapi.com/v1

---

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](DER_SP7_01.drawio.png)

---

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

-   [Users](#1-users)
    -   [POST - /users](#11-criação-de-usuário)
    -   [GET - /users](#12-listando-usuários)
    -   [GET - /users/:user_id](#13-listar-usuário-por-id)
-   [Products](#2-products)
-   [Cart](#3-cart)
-   [Users](#4-buys)

---

## 1. **Users**

[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo    | Tipo    | Descrição                                    |
| -------- | ------- | -------------------------------------------- |
| id       | string  | Identificador único do usuário               |
| name     | string  | O nome do usuário.                           |
| email    | string  | O e-mail do usuário.                         |
| password | string  | A senha de acesso do usuário                 |
| isAdm    | boolean | Define se um usuário é Administrador ou não. |

### Endpoints

| Método | Rota            | Descrição                                     |
| ------ | --------------- | --------------------------------------------- |
| POST   | /users          | Criação de um usuário.                        |
| GET    | /users          | Lista todos os usuários                       |
| GET    | /users/:user_id | Lista um usuário usando seu ID como parâmetro |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
POST /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
	"name": "eDuArDo",
	"email": "edu@mail.com",
	"password": "1234",
	"isAdm": true
}
```

### Schema de Validação com Yup:

```javascript
name: yup
        .string()
	.required()
	.transform((value, originalValue) => {
		return titlelify(originalValue)
	}),
email: yup
        .string()
	.email()
	.required()
	.transform((value, originalValue) => {
		return originalValue.toLowerCase()
	}),
password: yup
        .string()
	.required()
	.transform((value, originalValue) => {
		return bcrypt.hashSync(originalValue, 10)
	}),
isAdm: yup
        .boolean()
	.required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:

```
GET /users
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
	{
		"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
		"name": "Eduardo",
		"email": "edu@mail.com",
		"isAdm": true
	}
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Usuário por ID**

[ Voltar aos Endpoints ](#5-endpoints)

### `/users/:user_id`

### Exemplo de Request:

```
GET /users/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| user_id   | string | Identificador único do usuário (User) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"isAdm": true
}
```

### Possíveis Erros:

| Código do Erro | Descrição       |
| -------------- | --------------- |
| 404 Not Found  | User not found. |

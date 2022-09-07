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

O objeto loyaltyCustomer é definido como:

| Campo          | Tipo    | Descrição                           |
| -------------- | ------- | ----------------------------------- |
| id             | string  | Identificador único do cliente.     |
| name           | string  | O nome do cliente.                  |
| email          | string  | O e-mail único do cliente.          |
| fidelityPoints | number  | Os pontos de fidelidade do cliente. |
| isActive       | boolean | Se ele ainda é um cliente ativo.    |
| createdAt      | Date    | Data que o cliente foi cadastrado.  |
| updatedAt      | Date    | Data que o cliente foi atualizado.  |

### Endpoints

| Método | Rota                  | Descrição                                                   | Autorizaçao | Adm |
| ------ | --------------------- | ----------------------------------------------------------- | ----------- | --- |
| POST   | /loyaltycustomers     | Criação de um cliente.                                      | X           |     |
| GET    | /loyaltycustomers     | Lista todos os clientes.                                    | X           |     |
| GET    | /loyaltycustomers/:id | Lista um cliente usando seu ID como parâmetro.              | X           | X   |
| PATCH  | /loyaltycustomers/:id | Atualiza os clientes.                                       | X           | X   |
| DELETE | /loyaltycustomers/:id | Deleta os clientes. Soft delete (mudar isActive para false) | X           | X   |

---

### 6.1. **Criação do Cliente**

### `/loyaltycustomers`

### Exemplo de Request:

```
POST /loyaltycustomers
Host:
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Gabriel",
  "email": "gabriel@mail.com"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string().required(),
  email: yup.string().email().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "Gabriel",
  "email": "gabriel@mail.com",
  "id": "68ee5317-3d40-4c88-b590-18d5bbfeaec3",
  "fidelityPoints": 0,
  "isActive": true,
  "createdAt": "2022-09-07T20:13:50.871Z",
  "updatedAt": "2022-09-07T20:13:50.871Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

---

### 6.2. **Listando Clientes**

### `/loyaltycustomers`

### Exemplo de Request:

```
GET /loyaltycustomers
Host:
Authorization: Bearer token
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
    "id": "43224513-26f4-45a4-a3d9-cd94a6a0be49",
    "name": "Gabriel",
    "email": "gabriel@mail.com",
    "fidelityPoints": 50,
    "isActive": true,
    "createdAt": "2022-09-07T16:07:55.888Z",
    "updatedAt": "2022-09-07T17:45:02.657Z"
  },
  {
    "id": "70a3a183-64c8-45c8-b6d4-bcc876a7be3a",
    "name": "Gustavo",
    "email": "gustavo@mail.com",
    "fidelityPoints": 0,
    "isActive": false,
    "createdAt": "2022-09-07T17:39:02.299Z",
    "updatedAt": "2022-09-07T17:54:36.710Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 6.3. **Listar Cliente por ID**

### `/loyaltycustomers/:id`

### Exemplo de Request:

```
GET /users/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro         | Tipo   | Descrição                      |
| ----------------- | ------ | ------------------------------ |
| loyaltySustomersd | string | Identificador único do Cliente |

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
  "id": "70a3a183-64c8-45c8-b6d4-bcc876a7be3a",
  "name": "gabriel",
  "email": "gabriel@mail.com",
  "fidelityPoints": 0,
  "isActive": false,
  "createdAt": "2022-09-07T17:39:02.299Z",
  "updatedAt": "2022-09-07T17:54:36.710Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Customer not found. |

---

### 6.4. **Atualizar Cliente**

### `/loyaltycustomers/:id`

### Exemplo de Request:

```
PATCH /loyaltycustomers/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro         | Tipo   | Descrição                      |
| ----------------- | ------ | ------------------------------ |
| loyaltyCustomerId | string | Identificador único do cliente |

### Corpo da Requisição:

```json
{
  "name": "Matheus"
}
```

### Schema de Validação com Yup:

```javascript
  name: yup.string(),
  email: yup.string().email(),
  fidelityPoints: yup.number(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "70a3a183-64c8-45c8-b6d4-bcc876a7be3a",
  "name": "Matheus",
  "email": "gabriel@mail.com",
  "fidelityPoints": 0,
  "isActive": false,
  "createdAt": "2022-09-07T17:39:02.299Z",
  "updatedAt": "2022-09-07T17:54:36.710Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 404 Not Found  | Customer not found        |
| 409 Conflict   | Email already registered. |

---

### 6.5. **Deletar Cliente por ID**

### `/loyaltycustomers/:id`

### Exemplo de Request:

```
DELETE /loyaltycustomers/:id
Host:
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro         | Tipo   | Descrição                      |
| ----------------- | ------ | ------------------------------ |
| loyaltycustomerId | string | Identificador único do cliente |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Customer not found. |

---

### 7. /categories

| Método | Rota                             | Descrição                                                        | Autorizaçao | Adm |
| ------ | -------------------------------- | ---------------------------------------------------------------- | ----------- | --- |
| GET    | /categories                      | Lista todos as categorias.                                       | X           |     |
| GET    | /categories/:idCategory/products | Lista todos as produtos de uma categoria, disponiveis no mercado | X           | X   |
| POST   | /categories                      | Criação de uma categoria.                                        | X           | X   |
| PATCH  | /categories/:id                  | Atualiza as categorias.                                          | X           | X   |
| DELETE | /categories/:id                  | Deleta as categorias.                                            | X           | X   |

### 8. /suppliers

O objeto Supplier é definido como:

| Campo     | Tipo   | Descrição                             |
| --------- | ------ | ------------------------------------- |
| id        | string | Identificador único do fornecedor.    |
| name      | string | O nome do fornecedor.                 |
| email     | string | O e-mail único do fornecedor.         |
| cnpj      | string | O cnpj único do fornecedor.           |
| phone     | string | Telefone para contato do fornecedor.  |
| createdAt | Date   | Data que o fornecedor foi cadastrado. |
| updatedAt | Date   | Data que o fornecedor foi atualizado. |

### Endpoints

| Método | Rota           | Descrição                       | Autorizaçao | Adm |
| ------ | -------------- | ------------------------------- | ----------- | --- |
| POST   | /suppliers     | Criação de um fornecedor.       | X           | X   |
| GET    | /suppliers     | Lista todos os fornecedores.    | X           | X   |
| GET    | /suppliers/:id | Lista um forncedor especifico.  | X           | X   |
| PATCH  | /suppliers/:id | Atualiza um fornecedores.       | X           | X   |
| DELETE | /suppliers/:id | Deleta um forncedor especifico. | X           | X   |

---

<<<<<<< HEAD
### 8.1. **Criação do Fornecedor**
=======
### 1.1. **Criação do Fornecedor**
>>>>>>> ab715c4 (fixing merge)

### `/suppliers`

### Exemplo de Request:

```
<<<<<<< HEAD
POST /suppliers
=======
POST /users
>>>>>>> ab715c4 (fixing merge)
Host:
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "MatheusDeliver",
  "cnpj": "23272375000120",
  "phone": "3240-5060",
  "email": "matheus@mail.com"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
email: yup.string().required(),
cnpj: yup.string().required(),
<<<<<<< HEAD
phone: yup.string().email().required(),
=======
phone: yup.string().required(),
>>>>>>> ab715c4 (fixing merge)
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "3aa0fb96-57b7-4b7a-a535-84d91f825d5c",
  "name": "MatheusDeliver",
  "cnpj": "23272375000120",
  "phone": "3240-5060",
  "email": "matheus@mail.com",
  "createdAt": "2022-09-07T18:11:38.245Z",
  "updatedAt": "2022-09-07T18:11:38.245Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |
| 409 Conflict   | Cnpj already registered.  |

---

<<<<<<< HEAD
### 8.2. **Listando Fornecedores**
=======
### 1.2. **Listando Fornecedores**
>>>>>>> ab715c4 (fixing merge)

### `/suppliers`

### Exemplo de Request:

```
GET /suppliers
Host:
Authorization: Bearer token
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
    "id": "a370273b-fb11-4715-952d-d57928516702",
    "name": "MatheusDeliver",
    "cnpj": "23272375000121",
    "phone": "3240-5060",
    "email": "matheus@mail.com",
    "createdAt": "2022-09-07T18:18:53.684Z",
    "updatedAt": "2022-09-07T18:18:53.684Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

<<<<<<< HEAD
### 8.3. **Listar Fornecedor por ID**
=======
### 1.3. **Listar Fornecedor por ID**
>>>>>>> ab715c4 (fixing merge)

### `/suppliers/:id`

### Exemplo de Request:

```
GET /suppliers/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| supplierId | string | Identificador único do fornecedor |

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
  "id": "a370273b-fb11-4715-952d-d57928516702",
  "name": "MatheusDeliver",
  "cnpj": "23272375000121",
  "phone": "3240-5060",
  "email": "matheus@mail.com",
  "createdAt": "2022-09-07T18:18:53.684Z",
  "updatedAt": "2022-09-07T18:18:53.684Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Supplier not found. |

---

<<<<<<< HEAD
### 8.4. **Atualizar Fornecedor**
=======
### 1.4. **Atualizar Fornecedor**
>>>>>>> ab715c4 (fixing merge)

### `/suppliers`

### Exemplo de Request:

```
PATCH /suppliers/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| supplierId | string | Identificador único do fornecedor |

### Corpo da Requisição:

```json
{
  "name": "Deliverdex"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string(),
<<<<<<< HEAD
email: yup.string().email(),
=======
email: yup.string(),
>>>>>>> ab715c4 (fixing merge)
cnpj: yup.string(),
phone: yup.string(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "a370273b-fb11-4715-952d-d57928516702",
  "name": "Deliverdex",
  "cnpj": "23272375000121",
  "phone": "3240-5060",
  "email": "matheus@mail.com",
  "createdAt": "2022-09-07T18:18:53.684Z",
  "updatedAt": "2022-09-07T19:09:57.555Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Supplier not found |

---

<<<<<<< HEAD
### 8.5. **Deletar Fornecedor por ID**
=======
### 1.5. **Deletar Fornecedor por ID**
>>>>>>> ab715c4 (fixing merge)

### `/suppliers/:id`

### Exemplo de Request:

```
DELETE /suppliers/:id
Host:
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                         |
| ---------- | ------ | --------------------------------- |
| supplierId | string | Identificador único do fornecedor |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Supplier not found. |

---

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

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

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

- [Users](#1-users)
  - [POST - /users](#11-criação-de-usuário)
  - [GET - /users](#12-listando-usuários)
  - [GET - /users/:user_id](#13-listar-usuário-por-id)
- [Products](#2-products)
- [Cart](#3-cart)
- [Users](#4-buys)

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

### 7.1. **Criação de Categoria**

### `/categories`

### Exemplo de Request:

```
POST /categories
Host: http://suaapi.com/v1
Authorization: Yes
isAdm: Yes
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Bebidas"
}
```

### Schema de Validação com Yup:

```javascript
name: yup
        .string()
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
  "name": "Eduardo"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                |
| -------------- | ------------------------ |
| 409 Conflict   | Name already registered. |

---

### 7.2. **Listando Categorias**

### `/categories`

### Exemplo de Request:

```
GET /categories
Host: http://suaapi.com/v1
Authorization: Yes
isAdm: None
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
    "name": "Bebidas"
  },
  {
    "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
    "name": "Bebidas"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 7.3. **Listar Categoria por ID**

### `/categories/:idCategory/products`

### Exemplo de Request:

```
GET /categories/9cda28c9-e540-4b2c-bf0c-c90006d37893/products
Host: http://suaapi.com/v1
Authorization: Yes
isAdm: Yes
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro  | Tipo   | Descrição                                   |
| ---------- | ------ | ------------------------------------------- |
| idCategory | string | Identificador único da Categoria (Category) |

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
		"name": "Bebidas",
		"products":[...array de produtos]
	}
]
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Category not found. |

### 7.4 **Atualizar Categoria**

### `/categories/:id`

### Exemplo de Request:

```
PATCH /categories/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: Yes
isAdm: Yes
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Refrigerantes"
}
```

### Schema de Validação com Yup:

```javascript
name: yup
        .string()
	.required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

### Exemplo de Response:

```
202 Accepted
```

```json
Updated with success
```

### Possíveis Erros:

| Código do Erro   | Descrição                |
| ---------------- | ------------------------ |
| 304 not Modified | Name already in Use.     |
| 400 bad Request  | Property Name not found. |

---

### 7.5. **Deletando Categoria**

### `/categories/:id`

### Exemplo de Request:

```
DELETE /categories/9cda28c9-e540-4b2c-bf0c-c90006d37893
Host: http://suaapi.com/v1
Authorization: Yes
isAdm: Yes
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                   |
| --------- | ------ | ------------------------------------------- |
| id        | string | Identificador único da Categoria (Category) |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
202 Accepted
```

```json
Deleted with success
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Category not found. |

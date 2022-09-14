# kmarket

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)

A URL base da aplicação:
https://api-kmarket.herokuapp.com/

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

- [Products](#1-products)
  - [POST - /products](#11-criação-do-produto)
  - [GET - /products](#12-listando-produtos)
  - [GET - /products/:id](#13-listar-produto-por-id)
  - [PATCH - /products/:id](#14-atualizar-produto)
  - [DELETE - /products/:id](#15-deletar-produto-por-id)
- [Carts](#2-cart)
  - [POST - /cart](#21-criação-de-cart)
  - [GET - /cart](#22-listando-carts)
  - [GET - /cart/:id](#23-listar-cart-por-id)
  - [PATCH - /cart/:id](#24-vender-carrinho)
  - [DELETE - /cart/:id](#25-deletando-cart)
- [ProductsCart](#3-productsCart)
  - [POST - /productscart/:cartId](#31-adiciona-um-produto-ao-carrinho)
  - [GET - /productscart](#32-listando-todas-as-vendas)
  - [GET - /productscart/:productId](#33-lista-as-vendas-por-produto)
  - [DELETE - /productscart/:id](#34-deletar-produto-do-carrinho)
- [Employees](#4-employees)
  - [POST - /employees](#41-criação-do-funcionário)
  - [GET - /employees](#42-listando-funcionários)
  - [GET - /employees/:id](#43-listar-funcionário-por-id)
  - [PATCH - /employees/:id](#44-atualizar-funcionário)
  - [DELETE - /employees/:id](#45-deletar-funcionario-por-id)
- [Login](#5-login---somente-funcionário-faz-login)
- [LoyaltyCustomers](#6-loyaltycustomers)
  - [POST - /loyaltycustomers](#61-criação-do-cliente)
  - [GET - /loyaltycustomers](#62-listando-clientes)
  - [GET - /loyaltycustomers/:id](#63-listar-cliente-por-id)
  - [PATCH - /loyaltycustomers/:id](#64-atualizar-cliente)
  - [DELETE - /loyaltycustomers/:id](#65-deletar-cliente-por-id)
- [Categories](#7-categories)
  - [POST - /categories](#71-criação-de-categoria)
  - [GET - /categories](#72-listando-categorias)
  - [GET - /categories/:idCategory/products](#73-listar-produto-por-id-de-categoria)
  - [PATCH - /categories/:id](#74-atualizar-categoria)
  - [DELETE - /categories/:id](#75-deletando-categoria)
- [Suppliers](#8-suppliers)
  - [POST - /suppliers](#81-criação-do-fornecedor)
  - [GET - /suppliers](#82-listando-fornecedores)
  - [GET - /suppliers/:id](#83-listar-fornecedor-por-id)
  - [PATCH - /suppliers/:id](#84-atualizar-fornecedor)
  - [DELETE - /suppliers/:id](#85-deletar-fornecedor-por-id)
- [SupplierProducts](#9-supplierproducts)
  - [POST - /supplierproducts](#91-criação-de-produto-para-um-fornecedor)
  - [GET - /supplierproducts](#92-listando-produtos-dos-fornecedores)
  - [DELETE - /supplierproducts/:id](#93-deletar-produto-de-um-fornecedor-por-id)
- [OrderProducts](#10-orderproducts)
  - [POST - /orderproducts](#101-criação-de-ordem-de-compra-de-um-produto)
  - [GET - /orderproducts](#102-listando-todas-ordens-de-compra-de-um-produto)
  - [PATCH - /orderproducts/isdelivered/:id](#103-atualizando-status-de-entrega-de-uma-ordem)
  - [DELETE - /orderproducts/:id](#104-deletar-uma-ordem-de-compra-de-um-produto-por-id)

## Endpoints Resumo

### 1. /products

O objeto Supplier é definido como:

| Campo       | Tipo   | Descrição                          |
| ----------- | ------ | ---------------------------------- |
| id          | string | Identificador único do produto.    |
| name        | string | Nome do produto.                   |
| marketPrice | number | Preço do produto.                  |
| stock       | number | Quantidade do produto em estoque.  |
| description | string | Descrição do produto.              |
| discount    | number | Desconto do produto.               |
| category    | object | Categoria do produto.              |
| createdAt   | Date   | Data que o produto foi cadastrado. |
| updatedAt   | Date   | Data que o produto foi atualizado. |

### Endpoints

| Método | Rota          | Descrição                                      | Autorizaçao | Adm |
| ------ | ------------- | ---------------------------------------------- | ----------- | --- |
| GET    | /products     | Lista todos os produtos.                       | X           |     |
| GET    | /products/:id | Lista um produto usando seu ID como parâmetro. | X           |     |
| POST   | /products     | Criação de um produto.                         | X           | X   |
| PATCH  | /products/:id | Atualiza os produtos.                          | X           | X   |
| DELETE | /products/:id | Deleta os produtos.                            | X           | X   |

### 1.1. **Criação do Produto**

### `/products`

### Exemplo de Request:

```
POST /products
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Refrigerante de guaraná",
  "marketPrice": 6.0,
  "stock": 15,
  "description": "Refrescante bebida de guaraná",
  "discount": 0.2,
  "categoryId": "87066b82-b392-4fe7-a06e-dc2fa26e1415"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
marketPrice: yup.number().required(),
stock: yup.number().required(),
description: yup.string().required(),
discount: yup.number().required(),
categoryId: yup.string().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "Refrigerante de guaraná",
  "marketPrice": 6,
  "stock": 15,
  "description": "Refrescante bebida de guaraná",
  "discount": "0.20",
  "category": {
    "id": "87066b82-b392-4fe7-a06e-dc2fa26e1415",
    "name": "bebidas"
  },
  "id": "e6b49b72-b86b-42f2-8cb1-fb0104eaa5ba",
  "createdAt": "2022-09-07T21:13:36.566Z",
  "updatedAt": "2022-09-07T21:13:36.566Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                  |
| --------------- | ------------------------------------------ |
| 409 conflict    | Name of product already exists.            |
| 404 not found   | Category not found.                        |
| 400 bad request | Discount must be a number between 0 and 1. |

---

### 1.2. **Listando Produtos**

### `/products`

### Exemplo de Request:

```
GET /products
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
    "id": "801713c5-dd17-4bd0-bfbf-04ddfca11d9f",
    "name": "Amstel",
    "marketPrice": "3.00",
    "stock": 12,
    "description": "Se beber não dirija",
    "discount": "0.10",
    "createdAt": "2022-09-07T19:06:35.160Z",
    "updatedAt": "2022-09-07T20:10:57.077Z",
    "category": {
      "id": "87066b82-b392-4fe7-a06e-dc2fa26e1415",
      "name": "bebidas"
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Produto por ID**

### `/products/:id`

### Exemplo de Request:

```
GET /products/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| productId | string | Identificador único do produto |

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
  "id": "801713c5-dd17-4bd0-bfbf-04ddfca11d9f",
  "name": "Amstel",
  "marketPrice": "3.00",
  "stock": 12,
  "description": "Se beber não dirija",
  "discount": "0.10",
  "createdAt": "2022-09-07T19:06:35.160Z",
  "updatedAt": "2022-09-07T20:10:57.077Z",
  "category": {
    "id": "87066b82-b392-4fe7-a06e-dc2fa26e1415",
    "name": "bebidas"
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Product not found. |

---

### 1.4. **Atualizar Produto**

### `/products/:id`

### Exemplo de Request:

```
PATCH /products/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| productId | string | Identificador único do produto |

### Corpo da Requisição:

```json
{
  "marketPrice": 6
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string(),
marketPrice: yup.number(),
stock: yup.number(),
description: yup.string(),
discount: yup.number(),
categoryId: yup.string(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 Ok
```

```json
{
  "id": "801713c5-dd17-4bd0-bfbf-04ddfca11d9f",
  "name": "Amstel",
  "marketPrice": "6.00",
  "stock": 12,
  "description": "Se beber não dirija",
  "discount": "0.10",
  "createdAt": "2022-09-07T19:06:35.160Z",
  "updatedAt": "2022-09-07T20:10:57.077Z",
  "category": {
    "id": "87066b82-b392-4fe7-a06e-dc2fa26e1415",
    "name": "bebidas"
  }
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                                  |
| --------------- | ------------------------------------------ |
| 404 Not Found   | Product not found                          |
| 404 Not Found   | Category not found.                        |
| 400 Bad Request | Discount must be a number between 0 and 1. |

---

### 1.5. **Deletar Produto por ID**

### `/products/:id`

### Exemplo de Request:

```
DELETE /products/:id
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| productId | string | Identificador único do produto |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No Content
```

```json
{
  "message": "Product deleted successfully"
}
```

### Possíveis Erros:

| Código do Erro | Descrição         |
| -------------- | ----------------- |
| 404 Not Found  | Product not found |

---

### 2. /cart

O objeto Cart é definido como:

| Campo             | Tipo    | Descrição                           |
| ----------------- | ------- | ----------------------------------- |
| id                | string  | Identificador único do carrinho.    |
| totalPrice        | number  | valor total do carrinho.            |
| sold              | boolean | Se o carrinho já foi vendido.       |
| employeeId        | string  | Funcionário que vendeu o carrinho.  |
| loyaltyCustomerId | string  | Cliente dono do carrinho.           |
| createdAt         | Date    | Data que o carrinho foi cadastrado. |

### Endpoints

| Método | Rota      | Descrição                                                       | Autorizaçao | Adm |
| ------ | --------- | --------------------------------------------------------------- | ----------- | --- |
| POST   | /cart     | Criação de um carrinho. Rota deve atualizar fidelity points     | X           |     |
| GET    | /cart     | Lista todos os carrinhos.                                       | X           |     |
| GET    | /cart/:id | Lista um carrinho usando seu ID como parâmetro.                 | X           |     |
| PATCH  | /cart/:id | Atualiza um carrinho como vendido usando seu ID como paramêtro. | X           |     |
| DELETE | /cart/:id | Deleta o carrinho.                                              | X           | X   |

### 2.1. **Criação de Cart**

### `/cart`

### Exemplo de Request:

```
POST /cart
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "employeeId": "9cda28c9-e540-4b2c-bf0c-c90006d32893",
  "loyaltyCustomerId": "9cda28c9-e540-4b2c-bf0c-c90006d32893"
}
```

### Schema de Validação com Yup:

```javascript
employeeId: yup
    .string()
	.required(),
loyaltyCustomerId: yup
	.string()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d32891",
  "totalPrice": 0,
  "createdAt": "1995-12-17T03:24:00",
  "sold": false,
  "employeeId": "9cda28c9-e540-4b2c-bf0c-c90006d32892",
  "loyaltyCustomerId": "9cda28c9-e540-4b2c-bf0c-c90006d32893"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                       |
| --------------- | ------------------------------- |
| 400 Bad Request | Incorrect parameters.           |
| 404 Not Found   | Loyalty Customer not Found.     |
| 409 Conflict    | Loyalty Customer is not active. |
| 404 Not Found   | Employee not found.             |

---

### 2.2. **Listando Carts**

### `/cart`

### Exemplo de Request:

```
GET /cart
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
    "id": "bdd7fc92-f669-4326-8224-d3bfc9ce4710",
    "totalPrice": "0.00",
    "sold": false,
    "createdAt": "2022-09-09T17:53:13.604Z",
    "employee": {
      "id": "5ed80d0c-9f8c-44d2-a9c5-1c72b4a518e0",
      "name": "gabriel",
      "email": "gabriel@mail.com",
      "password": "$2a$10$6J8xHTnmHHPjZjILvSAcyOjuGP5.8idRcYxMUuyMepy6oCpRye.AG",
      "isAdm": false,
      "isActive": true,
      "createdAt": "2022-09-09T13:35:08.021Z",
      "updatedAt": "2022-09-09T13:35:08.021Z"
    },
    "loyaltyCustomer": {
      "id": "8541c509-69d3-4198-b3c8-08d6351c5cb8",
      "name": "gabriel",
      "email": "gabriel@mail.comm",
      "fidelityPoints": 0,
      "isActive": false,
      "createdAt": "2022-09-09T17:52:35.657Z",
      "updatedAt": "2022-09-12T12:59:49.567Z"
    },
    "productsCart": []
  },
  {
    "id": "7bdedad2-df98-4507-9156-ad2fd99dc657",
    "totalPrice": "0.00",
    "sold": false,
    "createdAt": "2022-09-09T13:36:06.452Z",
    "employee": {
      "id": "5ed80d0c-9f8c-44d2-a9c5-1c72b4a518e0",
      "name": "gabriel",
      "email": "gabriel@mail.com",
      "password": "$2a$10$6J8xHTnmHHPjZjILvSAcyOjuGP5.8idRcYxMUuyMepy6oCpRye.AG",
      "isAdm": false,
      "isActive": true,
      "createdAt": "2022-09-09T13:35:08.021Z",
      "updatedAt": "2022-09-09T13:35:08.021Z"
    },
    "loyaltyCustomer": null,
    "productsCart": []
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 2.3. **Listar Cart por ID**

### `/cart/:id`

### Exemplo de Request:

```
GET /cart/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                   |
| --------- | ------ | --------------------------- |
| id        | string | Identificador único da Cart |

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
  "id": "16d3addf-7efa-451c-9761-0b1f1616017e",
  "totalPrice": "0.00",
  "sold": false,
  "createdAt": "2022-09-08T12:38:33.237Z",
  "employee": {
    "id": "4384dc3b-ac35-48aa-bc3c-b15814eaab2f",
    "name": "gabriel",
    "email": "gabriel@mail.com",
    "password": "$2a$10$g1afERSzsk5mvDRmkqSL5uZ0TFFdL5o6/3nQuuXb9INl39FTFzJ0e",
    "isAdm": true,
    "isActive": true,
    "createdAt": "2022-09-07T20:11:30.920Z",
    "updatedAt": "2022-09-07T20:11:30.920Z"
  },
  "loyaltyCustomer": {
    "id": "70a3a183-64c8-45c8-b6d4-bcc876a7be3a",
    "name": "gabriel",
    "email": "gabriel@mail.co",
    "fidelityPoints": 0,
    "isActive": false,
    "createdAt": "2022-09-07T17:39:02.299Z",
    "updatedAt": "2022-09-07T17:54:36.710Z"
  },
  "productsCart": []
}
```

### Possíveis Erros:

| Código do Erro  | Descrição            |
| --------------- | -------------------- |
| 404 Not Found   | Cart not found.      |
| 400 Bad request | Id format not valid. |

---

### 2.4 **Vender Carrinho**

### `/cart/:id`

### Exemplo de Request:

```
PATCH /cart/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                   |
| --------- | ------ | --------------------------- |
| id        | string | Identificador único da Cart |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

### Possíveis Erros:

| Código do Erro  | Descrição           |
| --------------- | ------------------- |
| 404 not found   | Cart not found.     |
| 400 bad Request | No product in Cart. |
| 409 Conflict    | Cart already sold.  |

---

### 2.5. **Deletando Cart**

### `/cart/:id`

### Exemplo de Request:

```
DELETE /cart/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                   |
| --------- | ------ | --------------------------- |
| id        | string | Identificador único da Cart |

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
204 No content
```

```json
No body returned for response
```

### Possíveis Erros:

| Código do Erro  | Descrição          |
| --------------- | ------------------ |
| 404 Not Found   | Cart not found.    |
| 400 Bad Request | Cart already sold. |

### 3. /productscart

O objeto productCart é definido como:

| Campo    | Tipo   | Descrição                                                 |
| -------- | ------ | --------------------------------------------------------- |
| id       | string | Identificador único do produto no carrinho.               |
| quantity | number | Qauntidade do produto que vai ser adicionado no carrinho. |
| product  | object | O produto que vai ser adicionado ao carrinho.             |

### Endpoints

| Método | Rota                     | Descrição                                           | Autorizaçao | Adm |
| ------ | ------------------------ | --------------------------------------------------- | ----------- | --- |
| POST   | /productsCart/:cartId    | Adicionar produtos ao carrinho e atualiza o estoque | X           | X   |
| GET    | /productsCart            | Lista todos os produtos vendidos                    | X           | X   |
| GET    | /productsCart/:productId | Lista todas as vendas de um produto                 | X           | X   |
| DELETE | /productcart/:id         | Deleta o produto do carrinho e atualiza o estoque   | X           | X   |

---

### 3.1. **Adiciona um Produto ao Carrinho**

### `/productscart/:cartId`

### Exemplo de Request:

```
POST /productscart/:cartId
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                   |
| --------- | ------ | --------------------------- |
| cartId    | string | Identificador único do cart |

### Corpo da Requisição:

```json
{
  "productId": "a2c9df1f-69fb-4150-8851-63f29c099ec5",
  "quantity": 2
}
```

### Schema de Validação com Yup:

```javascript
  quantity: yup.number().required(),
  productId: yup.string().required()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created

```

```json
{
  "id": "3bb42c0d-a9c8-4e0e-884f-b1c17e398814",
  "quantity": 2,
  "product": {
    "id": "a2c9df1f-69fb-4150-8851-63f29c099ec5",
    "name": "Refrigerante de coca",
    "marketPrice": "6.00",
    "stock": 11,
    "description": "Refrescante bebida de coca",
    "discount": "0.20",
    "createdAt": "2022-09-08T17:17:06.701Z",
    "updatedAt": "2022-09-08T18:02:03.624Z",
    "category": {
      "id": "6ae2cf50-fccd-4167-8368-5f4fe8f6943d",
      "name": "bebidas"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Cart not found.    |
| 404 Not Found  | Product not found. |
| 409 Conflict   | Cart already sold. |

---

### 3.2. **Listando Todas as Vendas**

### `/productscart`

### Exemplo de Request:

```
GET /productscart
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
    "id": "06663188-a389-4f70-a7a9-1fefdee6a671",
    "quantity": 2,
    "product": {
      "id": "d84f5c19-ae64-47de-93cb-4b249dac776e",
      "name": "Refrigerante de guaraná",
      "marketPrice": "6.00",
      "stock": -9,
      "description": "Refrescante bebida de guaraná",
      "discount": "0.20",
      "createdAt": "2022-09-08T14:53:05.195Z",
      "updatedAt": "2022-09-08T18:02:39.904Z",
      "category": {
        "id": "6ae2cf50-fccd-4167-8368-5f4fe8f6943d",
        "name": "bebidas"
      }
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 3.3. **Lista as Vendas por Produto**

### `/productscart/:productId`

### Exemplo de Request:

```
GET /productscart/:productId
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                      |
| --------- | ------ | ------------------------------ |
| productId | string | Identificador único do produto |

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
    "id": "06663188-a389-4f70-a7a9-1fefdee6a671",
    "quantity": 2,
    "product": {
      "id": "d84f5c19-ae64-47de-93cb-4b249dac776e",
      "name": "Refrigerante de guaraná",
      "marketPrice": "6.00",
      "stock": -9,
      "description": "Refrescante bebida de guaraná",
      "discount": "0.20",
      "createdAt": "2022-09-08T14:53:05.195Z",
      "updatedAt": "2022-09-08T18:02:39.904Z",
      "category": {
        "id": "6ae2cf50-fccd-4167-8368-5f4fe8f6943d",
        "name": "bebidas"
      }
    }
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Product not found. |

---

### 3.4. **Deletar Produto do Carrinho**

### `/productcart/:id `

### Exemplo de Request:

```
DELETE /productcart/:id
Host:
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                  |
| --------- | ------ | ------------------------------------------ |
| id        | string | Identificador único do produto no carrinho |

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

| Código do Erro | Descrição                  |
| -------------- | -------------------------- |
| 404 Not Found  | Product not found in cart. |
| 404 Not Found  | Product not found.         |
| 409 Not Found  | Cart already sold.         |

---

### 4. /employees

O objeto employee é definido como:

| Campo     | Tipo    | Descrição                              |
| --------- | ------- | -------------------------------------- |
| id        | string  | Identificador único do funcionário.    |
| name      | string  | Nome do funcionário.                   |
| email     | string  | Email do funcionário.                  |
| password  | string  | senha do funcionário.                  |
| isAdm     | boolean | Se o funcionário é adiministrador.     |
| isActive  | string  | Se o funcinário é ativo.               |
| createdAt | Date    | Data que o funcionário foi cadastrado. |
| updatedAt | Date    | Data que o funcionário foi atualizado. |

### Endpoints

| Método | Rota           | Descrição                         | Autorizaçao | Adm |
| ------ | -------------- | --------------------------------- | ----------- | --- |
| POST   | /employees     | Criação de um funcionário.        | X           | X   |
| GET    | /employees     | Lista todos os funcionários.      | X           | X   |
| GET    | /employees/:id | Lista um funcionário especifico.  | X           | X   |
| PATCH  | /employees/:id | Atualiza um funcionário.          | X           | X   |
| DELETE | /employees/:id | Deleta um funcionário especifico. | X           | X   |

---

### 4.1. **Criação do Funcionário**

### `/employees`

### Exemplo de Request:

```
POST /employees
Host:
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Daniel Josias",
  "email": "danieljosias@mail.com",
  "password": "123",
  "isAdm": true
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
email: yup.string().required(),
password: yup.string().required(),
isAdm: yup.boolean().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created

```

```json
{
  "id": "96aeb523-350c-48a2-97c6-ddee624575fb",
  "name": "Daniel Josias",
  "email": "danieljosias@kenzie.com",
  "isAdm": true,
  "isActive": true,
  "createdAt": "2022-09-07T19:54:34.094Z",
  "updatedAt": "2022-09-07T19:54:34.094Z"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                 |
| --------------- | ------------------------- |
| 409 Conflict    | Email already registered. |
| 400 Bad Request | Required field.           |

---

### 4.2. **Listando Funcionários**

### `/employees`

### Exemplo de Request:

```
GET /employees
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
    "id": "6067c01f-380b-4879-8685-52a408bf5a71",
    "name": "Daniel Josias",
    "email": "danieljosias@kenzie.com",
    "isAdm": true,
    "isActive": true,
    "createdAt": "2022-09-07T19:46:12.280Z",
    "updatedAt": "2022-09-07T19:46:12.280Z"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 4.3. **Listar Funcionário por ID**

### `/employees/:id`

### Exemplo de Request:

```
GET /employees/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do funcionário |

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
  "id": "6067c01f-380b-4879-8685-52a408bf5a71",
  "name": "Daniel Josias",
  "email": "danieljosias@kenzie.com",
  "isAdm": true,
  "isActive": true,
  "createdAt": "2022-09-07T19:46:12.280Z",
  "updatedAt": "2022-09-07T19:46:12.280Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição            |
| -------------- | -------------------- |
| 404 Not Found  | Employees not found. |

---

### 4.4. **Atualizar Funcionário**

### `/employees/:id`

### Exemplo de Request:

```
PATCH /employees/:id
Host:
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do funcionário |

### Corpo da Requisição:

```json
{
  "name": "Daniel"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
email: yup.string().required(),
password: yup.string().required(),
isAdm: yup.boolean().required()
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
200 Ok
```

```json
[
  {
    "id": "6067c01f-380b-4879-8685-52a408bf5a71",
    "name": "Daniel",
    "email": "danieljosias@kenzie.com",
    "isAdm": true,
    "isActive": true,
    "createdAt": "2022-09-07T19:46:12.280Z",
    "updatedAt": "2022-09-07T19:46:12.280Z"
  }
]
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 404 Not Found  | Employee not found |

---

### 4.5. **Deletar Funcionario por ID**

### `/employees/:id`

### Exemplo de Request:

```
DELETE /employees/:id
Host:
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                          |
| --------- | ------ | ---------------------------------- |
| id        | string | Identificador único do funcionario |

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

| Código do Erro | Descrição               |
| -------------- | ----------------------- |
| 404 Not Found  | Employees not found.    |
| 409 Not Found  | Employee is not active. |

---

### 5. /login - Somente funcionário faz login

| Método | Rota   | Descrição                           | Autorizaçao | Adm |
| ------ | ------ | ----------------------------------- | ----------- | --- |
| POST   | /login | Faz login do employee e gera token. |             |     |

### Possíveis Erros:

| Código do Erro  | Descrição                   |
| --------------- | --------------------------- |
| 400 Bad Request | "Invalid employee"          |
| 403 Forbidden   | "Invalid email or password" |

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
GET /loyaltycustomers/:id
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

O objeto category é definido como:

| Campo | Tipo   | Descrição                         |
| ----- | ------ | --------------------------------- |
| id    | string | Identificador único do categoria. |
| name  | string | O nome da categoria.              |

### Endpoints

| Método | Rota                             | Descrição                                                        | Autorizaçao | Adm |
| ------ | -------------------------------- | ---------------------------------------------------------------- | ----------- | --- |
| GET    | /categories                      | Lista todos as categorias.                                       | X           |     |
| GET    | /categories/:idCategory/products | Lista todos as produtos de uma categoria, disponiveis no mercado | X           | X   |
| POST   | /categories                      | Criação de uma categoria.                                        | X           | X   |
| PATCH  | /categories/:id                  | Atualiza as categorias.                                          | X           | X   |
| DELETE | /categories/:id                  | Deleta as categorias.                                            | X           | X   |

---

### 7.1. **Criação de Categoria**

### `/categories`

### Exemplo de Request:

```
POST /categories
Authorization: Bearer token
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

### 7.3. **Listar Produto por ID de categoria**

### `/categories/:idCategory/products`

### Exemplo de Request:

```
GET /categories/9cda28c9-e540-4b2c-bf0c-c90006d37893/products
Authorization: Bearer token
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
Authorization: Bearer token
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
200 Ok
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
Authorization: Bearer token
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
204 No Content
```

```json
Deleted with success
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Category not found. |

---

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

---

### Endpoints

| Método | Rota           | Descrição                       | Autorizaçao | Adm |
| ------ | -------------- | ------------------------------- | ----------- | --- |
| POST   | /suppliers     | Criação de um fornecedor.       | X           | X   |
| GET    | /suppliers     | Lista todos os fornecedores.    | X           | X   |
| GET    | /suppliers/:id | Lista um forncedor especifico.  | X           | X   |
| PATCH  | /suppliers/:id | Atualiza um fornecedores.       | X           | X   |
| DELETE | /suppliers/:id | Deleta um forncedor especifico. | X           | X   |

---

### 8.1. **Criação do Fornecedor**

### `/suppliers`

### Exemplo de Request:

```
POST /suppliers
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
phone: yup.string().email().required(),
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

### 8.2. **Listando Fornecedores**

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

### 8.3. **Listar Fornecedor por ID**

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

### 8.4. **Atualizar Fornecedor**

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
email: yup.string().email(),
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

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |
| 409 Conflict   | Cnpj already registered.  |
| 404 Not Found  | Supplier not found.       |

---

### 8.5. **Deletar Fornecedor por ID**

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

---

### Endpoints

| Método | Rota                  | Descrição                                                            | Autorizaçao | Adm |
| ------ | --------------------- | -------------------------------------------------------------------- | ----------- | --- |
| POST   | /supplierproducts     | Criação de um produto para fornecedor (fornecedor tem este produto). | X           | X   |
| GET    | /supplierproducts     | Lista todos os produtos disponiveis nos fornecedores.                | X           | X   |
| DELETE | /supplierproducts/:id | Deleta um produto do fornecedor.                                     | X           | X   |

---

### 9.1. **Criação de produto para um fornecedor**

### `/supplierproducts`

### Exemplo de Request:

```
POST /supplierproducts
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Coca-Cola",
  "costPrice": 4,
  "categoryId": "65e6dc04-1869-4e33-b31d-8fa46784af5d",
  "supplierId": "ff7bc655-62fa-4cd9-ae1d-219dc8511b6d"
}
```

### Schema de Validação com Yup:

```javascript
name: yup.string().required(),
costPrice: yup.number().required(),
categoryId: yup.string().required(),
supplierId: yup.string().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "name": "Coca-Cola",
  "costPrice": 4,
  "supplier": {
    "id": "ff7bc655-62fa-4cd9-ae1d-219dc8511b6d",
    "name": "Bebidas de qualidade",
    "cnpj": "23272375000153",
    "phone": "3240-5061",
    "email": "matheus3@mail.com",
    "createdAt": "2022-09-08T11:43:38.907Z",
    "updatedAt": "2022-09-08T11:43:38.907Z"
  },
  "category": {
    "id": "65e6dc04-1869-4e33-b31d-8fa46784af5d",
    "name": "bebidas"
  },
  "id": "b783a941-1dd4-453a-bc2f-7d0475553ce9"
}
```

### Possíveis Erros:

| Código do Erro | Descrição           |
| -------------- | ------------------- |
| 404 Not Found  | Category not found. |
| 404 Not Found  | Supplier not found. |

---

### 9.2. **Listando produtos dos fornecedores**

### `/supplierproducts`

### Exemplo de Request:

```
GET /supplierproducts
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
    "id": "b783a941-1dd4-453a-bc2f-7d0475553ce9",
    "name": "Coca-Cola",
    "costPrice": "4.00",
    "supplier": {
      "id": "ff7bc655-62fa-4cd9-ae1d-219dc8511b6d",
      "name": "Bebidas de qualidade",
      "cnpj": "23272375000153",
      "phone": "3240-5061",
      "email": "matheus3@mail.com",
      "createdAt": "2022-09-08T11:43:38.907Z",
      "updatedAt": "2022-09-08T11:43:38.907Z"
    },
    "category": {
      "id": "65e6dc04-1869-4e33-b31d-8fa46784af5d",
      "name": "bebidas"
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 9.3. **Deletar produto de um fornecedor por ID**

### `/supplierproducts/:id`

### Exemplo de Request:

```
DELETE /supplierproducts/:id
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro         | Tipo   | Descrição                         |
| ----------------- | ------ | --------------------------------- |
| supplierProdutcId | string | Identificador único do fornecedor |

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

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 404 Not Found  | Product not found in supplier's products. |

---

### 10. /orderproducts

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

---

| Método | Rota                           | Descrição                                    | Autorizaçao | Adm |
| ------ | ------------------------------ | -------------------------------------------- | ----------- | --- |
| POST   | /orderproducts                 | Criação de ordem de compra para um produto.  | X           | X   |
| GET    | /orderproducts                 | Lista todas as ordens de compra de produtos. | X           | X   |
| PATCH  | /orderproducts/isdelivered/:id | Atualizando status de entrega de uma ordem.  | X           | X   |
| DELETE | /orderproducts/:id             | Deletar ordem de compra.                     | X           | X   |

---

### 10.1. **Criação de ordem de compra de um produto**

### `/orderproducts`

### Exemplo de Request:

```
POST /orderproducts
Authorization: Bearer token
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "quantity": 50,
  "costPrice": 3,
  "deliverySchedule": "2022-08-18",
  "isDelivered": false,
  "supplierProductId": "437f486c-5b94-4542-9658-624d0b57f2f0",
  "productId": "da118050-9641-4b52-abd8-67ec97f4ec1b"
}
```

OBS.: isDelivered pode ser omitida na requisição, e será atribuído como false por padrão.

### Schema de Validação com Yup:

```javascript
quanity: yup.number().required(),
costPrice: yup.number().required(),
deliverySchedule: yup.string().required(),
isDelivered: yup.boolean(),
supplierProductId: yup.string().required(),
productId: yup.string().required(),
```

OBS.: Chaves não presentes no schema serão removidas.

### Exemplo de Response:

```
201 Created
```

```json
{
  "quantity": 2,
  "costPrice": 14,
  "totalPrice": 28,
  "deliverySchedule": "2022-08-20T03:00:00.000Z",
  "supplierProduct": {
    "id": "437f486c-5b94-4542-9658-624d0b57f2f0",
    "name": "Barra de Chocolate",
    "costPrice": "3.00",
    "supplier": {
      "id": "a370273b-fb11-4715-952d-d57928516702",
      "name": "Deliverdex",
      "cnpj": "23272375000121",
      "phone": "3251-5060",
      "email": "matheus@mail.com",
      "createdAt": "2022-09-07T18:18:53.684Z",
      "updatedAt": "2022-09-07T22:42:47.810Z"
    },
    "category": {
      "id": "69b55ee4-53db-4d47-be40-c5123da43504",
      "name": "doces"
    }
  },
  "product": {
    "id": "da118050-9641-4b52-abd8-67ec97f4ec1b",
    "name": "Barra de chocolate laka",
    "marketPrice": "6.70",
    "stock": 30,
    "description": "Chocolate délis",
    "discount": "0.25",
    "createdAt": "2022-09-08T15:42:40.774Z",
    "updatedAt": "2022-09-08T15:42:40.774Z",
    "category": {
      "id": "69b55ee4-53db-4d47-be40-c5123da43504",
      "name": "doces"
    }
  },
  "id": "937970d6-979c-435a-a74b-e22d8281e6ea",
  "isDelivered": false,
  "createdAt": "2022-09-08T16:03:55.471Z"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                                 |
| -------------- | ----------------------------------------- |
| 404 Not Found  | Product not found in market products.     |
| 404 Not Found  | Product not found in supplier's products. |

---

### 10.2. **Listando todas ordens de compra de um produto**

### `/orderproducts`

### Exemplo de Request:

```
GET /orderproducts
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
    "id": "937970d6-979c-435a-a74b-e22d8281e6ea",
    "quantity": 2,
    "costPrice": "14.00",
    "totalPrice": "28.00",
    "deliverySchedule": "2022-08-20T03:00:00.000Z",
    "isDelivered": false,
    "createdAt": "2022-09-08T16:03:55.471Z",
    "supplierProduct": {
      "id": "437f486c-5b94-4542-9658-624d0b57f2f0",
      "name": "Barra de Chocolate",
      "costPrice": "3.00",
      "supplier": {
        "id": "a370273b-fb11-4715-952d-d57928516702",
        "name": "Deliverdex",
        "cnpj": "23272375000121",
        "phone": "3251-5060",
        "email": "matheus@mail.com",
        "createdAt": "2022-09-07T18:18:53.684Z",
        "updatedAt": "2022-09-07T22:42:47.810Z"
      },
      "category": {
        "id": "69b55ee4-53db-4d47-be40-c5123da43504",
        "name": "doces"
      }
    },
    "product": {
      "id": "da118050-9641-4b52-abd8-67ec97f4ec1b",
      "name": "Barra de chocolate laka",
      "marketPrice": "6.70",
      "stock": 30,
      "description": "Chocolate délis",
      "discount": "0.25",
      "createdAt": "2022-09-08T15:42:40.774Z",
      "updatedAt": "2022-09-08T15:42:40.774Z",
      "category": {
        "id": "69b55ee4-53db-4d47-be40-c5123da43504",
        "name": "doces"
      }
    }
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 10.3. **Atualizando status de entrega de uma ordem**

### `/orderproducts/isdelivered/:id`

### Exemplo de Request:

```
PATCH /orderproducts/isdelivered/:id
Authorization: Bearer token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro      | Tipo   | Descrição                         |
| -------------- | ------ | --------------------------------- |
| orderproductId | string | Identificador único do fornecedor |

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
  "id": "937970d6-979c-435a-a74b-e22d8281e6ea",
  "quantity": 2,
  "costPrice": "14.00",
  "totalPrice": "28.00",
  "deliverySchedule": "2022-08-20T03:00:00.000Z",
  "isDelivered": true,
  "createdAt": "2022-09-08T16:03:55.471Z",
  "supplierProduct": {
    "id": "437f486c-5b94-4542-9658-624d0b57f2f0",
    "name": "Barra de Chocolate",
    "costPrice": "3.00",
    "supplier": {
      "id": "a370273b-fb11-4715-952d-d57928516702",
      "name": "Deliverdex",
      "cnpj": "23272375000121",
      "phone": "3251-5060",
      "email": "matheus@mail.com",
      "createdAt": "2022-09-07T18:18:53.684Z",
      "updatedAt": "2022-09-07T22:42:47.810Z"
    },
    "category": {
      "id": "69b55ee4-53db-4d47-be40-c5123da43504",
      "name": "doces"
    }
  },
  "product": {
    "id": "da118050-9641-4b52-abd8-67ec97f4ec1b",
    "name": "Barra de chocolate laka",
    "marketPrice": "6.70",
    "stock": 30,
    "description": "Chocolate délis",
    "discount": "0.25",
    "createdAt": "2022-09-08T15:42:40.774Z",
    "updatedAt": "2022-09-08T15:42:40.774Z",
    "category": {
      "id": "69b55ee4-53db-4d47-be40-c5123da43504",
      "name": "doces"
    }
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 404 Not Found  | Purchase order not found. |

---

### 10.4. **Deletar uma ordem de compra de um produto por ID**

### `/orderproducts/:id`

### Exemplo de Request:

```
DELETE /orderproducts/:id
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:

| Parâmetro      | Tipo   | Descrição                         |
| -------------- | ------ | --------------------------------- |
| orderproductId | string | Identificador único do fornecedor |

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

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 404 Not Found  | Purchase order not found. |

---

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

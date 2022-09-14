import request, { Response } from "supertest"

import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"

import app from "../../../app"

import { mockedAdm, mockedCategory, mockedEmployee, mockedIdNotExist, mockedLoginAdm, mockedLoginEmployee, mockedNotFormattedId, mockedOrderProducts, mockedProductDescription, mockedProductDiscount, mockedProductMarketPrice, mockedProducts, mockedProductsInvalidDiscount1, mockedProductsInvalidDiscount2, mockedProductStock, mockedProductUpdateAll, mockedProductUpdateName, mockedSupplier, mockedSupplierProduct, mockedSupplierUpdateAll } from "../../mocks"
import { IOrderProductsResponse } from "../../../interfaces/orderProducts/index"

let orderProductTest: IOrderProductsResponse
let categoryTest: { name: string, id: string }
let idProduct: string
let idSupplierProduct: string
let idOrderProduct: string


let adminLoginResponse: Response
let notAdminLoginResponse: Response
let tokenAdm: string
let tokenNotAdm: string

describe("Testando rotas do OrderSuppliersProducts", () => {

    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((error) => {
            console.log(error)
        })

        await request(app).post("/employees").send(mockedAdm)
        adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);
        tokenAdm = adminLoginResponse.body.token

        await request(app).post("/employees").send(mockedEmployee)
        notAdminLoginResponse = await request(app).post("/login").send(mockedLoginEmployee);
        tokenNotAdm = notAdminLoginResponse.body.token

        const responseCategory = await request(app).post("/categories").set("Authorization", `Bearer ${tokenAdm}`).send(mockedCategory)
        categoryTest = responseCategory.body
        mockedProducts.categoryId = categoryTest.id
        mockedSupplierProduct.categoryId = categoryTest.id

        const respProduct = await request(app).post("/products").set("Authorization", `Bearer ${tokenAdm}`).send(mockedProducts)
        idProduct = respProduct.body.id
        mockedProducts.categoryId = categoryTest.id

        const respSupplier = await request(app)
            .post("/suppliers")
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(mockedSupplier);
        mockedSupplierProduct.supplierId = respSupplier.body.id

        const respSuppierProduct = await request(app).post("/supplierproducts").set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierProduct)
        idSupplierProduct = respSuppierProduct.body.id

        mockedOrderProducts.productId = idProduct
        mockedOrderProducts.supplierProductId = idSupplierProduct
    })

    afterAll(async () => {
        await connection.destroy()
    })

    //CREATE ORDERPRODUCTS !
    //Good requests get

    test("POST /orderSuppliersProducts - Deve ser capaz de criar um ORDERSUPPLIERPRODUCT quando for passado os dados corretamente", async () => {


        const response = await request(app).post("/orderproducts").set("Authorization", `Bearer ${tokenAdm}`).send(mockedOrderProducts)

        expect(response.status).toBe(201)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("quantity")
        expect(response.body.quantity).toEqual(expect.any(Number))
        expect(response.body).toHaveProperty("costPrice")
        expect(response.body.costPrice).toEqual(expect.any(Number))
        expect(response.body).toHaveProperty("deliverySchedule")
        expect(response.body).toHaveProperty("isDelivered")
        expect(response.body.isDelivered).toEqual(expect.any(Boolean))
        expect(response.body).toHaveProperty("supplierProduct")
        expect(response.body).toHaveProperty("product")
        expect(response.body).toHaveProperty("createdAt")

        orderProductTest = response.body
        idOrderProduct = orderProductTest.id
    })

    //Bad requests post

    test("POST /orderproducts - Deve retornar um erro caso NÃO tenha Product", async () => {

        let mockedWithOutProduct = mockedOrderProducts
        mockedWithOutProduct.productId = ""

        const response = await request(app).post(`/orderproducts`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedWithOutProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })


    test("POST /orderproducts - Deve retornar um erro caso NÃO tenha SupplierProduct", async () => {

        let mockedWithOutSupplierProduct = mockedOrderProducts
        mockedWithOutSupplierProduct.productId = ""

        const response = await request(app).post(`/orderproducts`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedWithOutSupplierProduct)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /orderproducts - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).post(`/orderproducts`).send(mockedOrderProducts)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /orderproducts - Deve retornar um erro caso NÃO seja do ADM", async () => {

        const response = await request(app).post("/orderproducts").set("Authorization", `Bearer ${tokenNotAdm}`).send(mockedOrderProducts)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    //LIST ALL ORDERPRODUCTS
    //Good requests get

    test("GET /orderproducts - Deve retornar TODOS os orderSupplierProducts com a autenticação de adm", async () => {

        const response = await request(app).get("/orderproducts").set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(200)
        expect(response.body[0].id).toEqual(orderProductTest.id)
    })

    //Bad requests get

    test("GET /orderproducts - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).get("/orderproducts")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })


    //PATCH PRODUCT
    //Good requests update

    test("PATCH /orderproducts/isdelivered/:id - Deve ATUALIZAR corretamente o PRODUCT junto orderSupplierProduct", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${idOrderProduct}`).set("Authorization", `Bearer ${tokenAdm}`)
        const respProducts = await request(app).get('/products').set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(200)
        expect(response.body.isDelivered).toEqual(true)
        expect(respProducts.body.products[0].stock).toEqual(mockedOrderProducts.quantity)

    })

    //Bad request update

    test("UPDATE /orderproducts/isdelivered/:id - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${idOrderProduct}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /orderproducts/isdelivered/:id - Deve retornar um erro caso NÃO seja o ADM", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${idOrderProduct}`).set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /orderproducts/isdelivered/:id - Deve retornar um erro caso o ID esteja ERRADO", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${idProduct}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /orderproducts/isdelivered/:id - Deve retornar um erro caso o ID tenha formato inválido", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${mockedNotFormattedId}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /orderproducts/isdelivered/:id - Deve retornar um erro caso não exista o ID na database", async () => {

        const response = await request(app).patch(`/orderproducts/isdelivered/${mockedIdNotExist}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    //REMOVE OrderSupplierProduct
    //Good requests remove
    test("DELETE /orderproducts/:id - Deve REMOVER corretamente um orderSupplierProduct", async () => {

        const response = await request(app).delete(`/orderproducts/${idOrderProduct}`).set("Authorization", `Bearer ${tokenAdm}`)

        const allOrderProducts = await (await request(app).get("/orderproducts").set("Authorization", `Bearer ${tokenAdm}`)).body
        expect(allOrderProducts).toEqual([])

        expect(response.status).toBe(204)
        expect(response.status).not.toHaveProperty("body")
    })

    //Bad requests remove

    test("DELETE /orderproducts/:id - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).delete(`/orderproducts/${idProduct}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    test("DELETE /orderproducts/:id - Deve retornar um erro caso NÃO seja o ADM", async () => {

        const response = await request(app).delete(`/orderproducts/${idProduct}`).set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /orderproducts/:id - Deve retornar um erro caso o ID tenha formato inválido", async () => {

        const response = await request(app).delete(`/orderproducts/${mockedNotFormattedId}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /orderproducts/:id - Deve retornar um erro caso não exista o ID na database", async () => {

        const response = await request(app).delete(`/orderproducts/${mockedIdNotExist}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })


})
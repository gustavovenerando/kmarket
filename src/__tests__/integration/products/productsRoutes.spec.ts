import request, { Response } from "supertest"

import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"

import app from "../../../app"

import { mockedAdm, mockedCategory, mockedEmployee, mockedIdNotExist, mockedLoginAdm, mockedLoginEmployee, mockedNotFormatedId, mockedProducts, mockedProductsInvalidDiscount1, mockedProductsInvalidDiscount2 } from "../../mocks"
import { IProductsResponse } from "../../../interfaces/products"

let productTest: IProductsResponse
let idProduct: string

let adminLoginResponse: Response
let notAdminLoginResponse: Response
let tokenAdm: string
let tokenNotAdm: string

describe("Testando rotas do Supplier", () => {

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
        mockedProducts.categoryId = responseCategory.body.id
    })

    afterAll(async () => {
        await connection.destroy()
    })

    //CREATE PRODUCTS !
    //Good requests get

    test("POST /products - Deve ser capaz de criar um novo PRODUCT quando for passado os dados corretamente", async () => {

        const response = await request(app).post("/products").set("Authorization", `Bearer ${tokenAdm}`).send(mockedProducts)


        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("marketPrice")
        expect(response.body.marketPrice).toEqual(expect.any(Number))
        expect(response.body).toHaveProperty("stock")
        expect(response.body.stock).toEqual(expect.any(Number))
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("discount")
        expect(response.body.discount).toEqual(expect.any(Number))
        expect(response.body).toHaveProperty("category")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")

        productTest = response.body
        idProduct = productTest.id
    })
    //Bad requests get

    test("GET /products - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).post(`/products`).send(mockedProducts)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /products - Deve retornar um erro caso NÃO seja do ADM", async () => {

        const response = await request(app).post("/products").set("Authorization", `Bearer ${tokenNotAdm}`).send(mockedProducts)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /products - Deve retornar um erro caso seja passado um NAME já EXISTENTE na criação do supplier", async () => {

        const response = await request(app).post("/products").set("Authorization", `Bearer ${tokenAdm}`).send(mockedProducts)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /products - Deve retornar um erro caso seja passado um DISCOUNT INVÁLIDO na criação do supplier", async () => {

        const response1 = await request(app).post("/products").set("Authorization", `Bearer ${tokenAdm}`).send(mockedProductsInvalidDiscount1)
        const response2 = await request(app).post("/products").set("Authorization", `Bearer ${tokenAdm}`).send(mockedProductsInvalidDiscount2)

        expect(response1.status).toBe(400)
        expect(response1.body).toHaveProperty("message")

        expect(response2.status).toBe(400)
        expect(response2.body).toHaveProperty("message")
    })

})
import request, { Response } from "supertest"

import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"

import app from "../../../app"
import { ISupplierResponse } from "../../../interfaces/supplier"

import { mockedAdm, mockedEmployee, mockedIdNotExist, mockedLoginAdm, mockedLoginEmployee, mockedNotFormatedId, mockedSuplier, mockedSupplierCpnjAgain, mockedSupplierEmailAgain, mockedSupplierUpdateAll, mockedSupplierUpdateCnpj, mockedSupplierUpdateEmail, mockedSupplierUpdateName, mockedSupplierUpdatePhone } from "../../mocks"

let supplierTest: ISupplierResponse
let idSupplier: string
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
    })

    afterAll(async () => {
        await connection.destroy()
    })

    //CREATE SUPPLIER !
    //Good requests get

    test("POST /suppliers - Deve ser capaz de criar um novo Supplier quando for passado os dados corretamente", async () => {

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${tokenAdm}`).send(mockedSuplier)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")

        supplierTest = response.body
        idSupplier = supplierTest.id
    })

    //Bad requests get

    test("POST /suppliers - Deve retornar um erro caso NÃO seja do ADM", async () => {

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${tokenNotAdm}`).send(mockedSuplier)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /suppliers - Deve retornar um erro caso seja passado um EMAIL já EXISTENTE na criação do supplier", async () => {

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierEmailAgain)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /suppliers - Deve retornar um erro caso seja passado um CNPJ já EXISTENTE na criação do supplier", async () => {

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierCpnjAgain)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    //LIST ALL SUPPLIER 
    //Good requests get

    test("GET /suppliers - Deve retornar TODOS os SUPPLIERS com a autenticação de adm", async () => {

        const response = await request(app).get("/suppliers").set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(200)
        expect(response.body.suppliers[0].cnpj).toEqual(supplierTest.cnpj)
        expect(response.body).toHaveProperty("suppliers")
    })

    //Bad requests get

    test("GET /suppliers - Deve retornar um erro caso NÃO seja do ADM", async () => {

        const response = await request(app).get("/suppliers").set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).get("/suppliers")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    //LIST ONE SUPPLIER
    //Good requests getById

    test("GET /suppliers/:id - Deve retornar um SUPPLIER corretamente", async () => {

        const response = await request(app).get(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`)


        expect(response.body.cnpj).toEqual(supplierTest.cnpj)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(200)
    })

    //Bad requests getById


    test("GET /suppliers/:id - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).get(`/suppliers/${idSupplier}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar um erro caso NÃO seja o ADM", async () => {

        const response = await request(app).get(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar um erro caso o ID tenha formato inválido", async () => {

        const response = await request(app).get(`/suppliers/${mockedNotFormatedId}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar um erro caso não exista o ID na database", async () => {

        const response = await request(app).get(`/suppliers/${mockedIdNotExist}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    //UPDATE SUPPLIER
    //Good requests update

    test("UPDATE /suppliers/:id - Deve ALTERAR corretamente todo o SUPPLIER", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierUpdateAll)

        const { createdAt, updatedAt, id, ...valuesToCheck } = response.body

        expect(response.status).toBe(200)
        expect(valuesToCheck).toEqual(mockedSupplierUpdateAll)
        expect(valuesToCheck).not.toEqual(mockedSuplier)
    })

    test("UPDATE /suppliers/:id - Deve Alterar corretamente o NOME do SUPPLIER", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierUpdateName)

        const nameExpected = mockedSupplierUpdateName.name

        expect(response.status).toBe(200)
        expect(response.body.name).toEqual(nameExpected)
    })

    test("UPDATE /suppliers/:id - Deve Alterar corretamente o CNPJ do SUPPLIER", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierUpdateCnpj)

        const cnpjExpected = mockedSupplierUpdateCnpj.cnpj

        expect(response.status).toBe(200)
        expect(response.body.cnpj).toEqual(cnpjExpected)
    })

    test("UPDATE /suppliers/:id - Deve Alterar corretamente o PHONE do SUPPLIER", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierUpdatePhone)

        const phoneExpected = mockedSupplierUpdatePhone.phone

        expect(response.status).toBe(200)
        expect(response.body.phone).toEqual(phoneExpected)
    })
    test("UPDATE /suppliers/:id - Deve Alterar corretamente o EMAIL do SUPPLIER", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`).send(mockedSupplierUpdateEmail)

        const emailExpected = mockedSupplierUpdateEmail.email

        expect(response.status).toBe(200)
        expect(response.body.email).toEqual(emailExpected)
    })

    //Bad requesst update

    test("UPDATE /suppliers/:id - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    test("UPDATE /suppliers/:id - Deve retornar um erro caso NÃO seja o ADM", async () => {

        const response = await request(app).patch(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /suppliers/:id - Deve retornar um erro caso o ID tenha formato inválido", async () => {

        const response = await request(app).patch(`/suppliers/${mockedNotFormatedId}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("UPDATE /suppliers/:id - Deve retornar um erro caso não exista o ID na database", async () => {

        const response = await request(app).patch(`/suppliers/${mockedIdNotExist}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

    //REMOVE SUPPLIER
    //Good requests remove
    test("DELETE /suppliers/:id - Deve REMOVER corretamente um SUPPLIER", async () => {

        const response = await request(app).delete(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenAdm}`)

        const allSuppliers = await (await request(app).get("/suppliers").set("Authorization", `Bearer ${tokenAdm}`)).body
        expect(allSuppliers).toEqual({ suppliers: [] })

        expect(response.status).toBe(204)
        expect(response.status).not.toHaveProperty("body")
    })

    //Bad requests remove

    test("DELETE /suppliers/:id - Deve retornar um erro caso NÃO tenha TOKEN", async () => {

        const response = await request(app).delete(`/suppliers/${idSupplier}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
    test("DELETE /suppliers/:id - Deve retornar um erro caso NÃO seja o ADM", async () => {

        const response = await request(app).delete(`/suppliers/${idSupplier}`).set("Authorization", `Bearer ${tokenNotAdm}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /suppliers/:id - Deve retornar um erro caso o ID tenha formato inválido", async () => {

        const response = await request(app).delete(`/suppliers/${mockedNotFormatedId}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("DELETE /suppliers/:id - Deve retornar um erro caso não exista o ID na database", async () => {

        const response = await request(app).delete(`/suppliers/${mockedIdNotExist}`).set("Authorization", `Bearer ${tokenAdm}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })

})

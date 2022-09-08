import request from "supertest"

import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { mockedAdm, mockedEmployee, mockedInvalidId, mockedLoginAdm, mockedLoginEmployee, mockedNotFormatedId, mockedSuplier, mockedSupplierCpnjAgain, mockedSupplierEmailAgain } from "../../mocks"

import app from "../../../app"
import { ISupplierResponse } from "../../../interfaces/supplier"

let supplierCreated:ISupplierResponse 

describe("Testando rotas do Supplier", () => {

    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((error) => {
            console.log(error)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /suppliers - Deve ser capaz de criar um novo Supplier quando for passado os dados corretamente", async() => {

        await request(app).post("/employees").send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);
        expect(adminLoginResponse.body).toHaveProperty("token")


        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedSuplier)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("phone")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")

        supplierCreated = response.body
    })

    test("POST /suppliers - Deve retornar um erro caso o email NÃO seja do ADM", async() => {
        await request(app).post("/employees").send(mockedEmployee)
        const notAdminLoginResponse = await request(app).post("/login").send(mockedLoginEmployee);

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`).send(mockedSuplier)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /suppliers - Deve retornar um erro caso seja passado um EMAIL já EXISTENTE na criação do supplier", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedSupplierEmailAgain)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    test("POST /suppliers - Deve retornar um erro caso seja passado um CNPJ já EXISTENTE na criação do supplier", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);

        const response = await request(app).post("/suppliers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedSupplierCpnjAgain)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers - Deve retornar TODOS os SUPPLIERS com a autenticação de adm", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);

        const response = await request(app).get("/suppliers").set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body.suppliers[0].cnpj).toEqual(supplierCreated.cnpj)
        expect(response.body).toHaveProperty("suppliers")
    })

    test("GET /suppliers - Deve retornar um erro caso o email NÃO seja do ADM", async() => {
        await request(app).post("/employees").send(mockedEmployee)
        const notAdminLoginResponse = await request(app).post("/login").send(mockedLoginEmployee);

        const response = await request(app).get("/suppliers").set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar UM SUPPLIERS com a autenticação de adm", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const adminLoginResponse = await request(app).post(`/login`).send(mockedLoginAdm);

        const response = await request(app).get(`/suppliers/${supplierCreated.id}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)


        expect(response.body.cnpj).toEqual(supplierCreated.cnpj)
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("cnpj")
        expect(response.body).toHaveProperty("id")
        expect(response.status).toBe(200)
    })

    test("GET /suppliers/:id - Deve retornar um erro caso NÃO seja o ADM", async() => {
        await request(app).post("/employees").send(mockedEmployee)
        const notAdminLoginResponse = await request(app).post(`/login`).send(mockedLoginEmployee);

        const response = await request(app).get(`/suppliers/${supplierCreated.id}`).set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar um erro caso o ID tenha formato inválido", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const AdminLoginResponse = await request(app).post(`/login`).send(mockedLoginAdm);

        const response = await request(app).get(`/suppliers/${mockedNotFormatedId}`).set("Authorization", `Bearer ${AdminLoginResponse.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("GET /suppliers/:id - Deve retornar um erro caso o ID não exista", async() => {
        await request(app).post("/employees").send(mockedAdm)
        const notAdminLoginResponse = await request(app).post(`/login`).send(mockedLoginAdm);

        const response = await request(app).get(`/suppliers/${mockedInvalidId}`).set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})

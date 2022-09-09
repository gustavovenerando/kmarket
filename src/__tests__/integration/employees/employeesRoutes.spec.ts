import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedEmployee, mockedEmployeEmpty, mockedAdm, mockedLoginAdm, mockedEmployeePatch, mockedAdmAgain, mockedLoginAdmAgain, mockedIsActiveFalse, mockedIsActiveTrue, mockedUpdateEmployee  } from "../../mocks"

describe('/employees', () => {
    let connection: DataSource

    beforeAll(async()=>{
        await AppDataSource.initialize().then((res)=>{
            connection = res
        }).catch((err)=>{
            console.log('Error during Data Source initialization',err)
        })
    })

    afterAll(async()=>{
        await connection.destroy()
    })

    test('POST/employees - Must be able to create a employee',async () =>{
        const response = await request(app).post('/employees').send(mockedEmployee)

        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).not.toHaveProperty('password')
        expect(response.body).toHaveProperty('isAdm')
        expect(response.body.isAdm).toEqual(false)
        expect(response.status).toBe(201)
    })

    test("POST /employees -  Email already exists",async () => {
        const response = await request(app).post("/employees").send({
            email: "carlos@carlos.com"
        });

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)       
    })

    test("POST /employees -  Required field",async () => {
        const response = await request(app).post('/employees').send(mockedEmployeEmpty)
        expect(response.body).not.toHaveProperty("name")
        expect(response.body).not.toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).not.toHaveProperty("false")
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /employees -  Must be able to list employees",async () => {
        await request(app).post('/employees').send(mockedAdm)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);
        const response = await request(app).get('/employees').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.body).toHaveLength(2)
     
    })

    test("GET /employees -  should not be able to list employees without authentication",async () => {
        const response = await request(app).get('/employees')

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401) 
    })

    test("GET -  should not be able to list employees with invalid id",async () => {
        await request(app).post('/employees').send(mockedAdmAgain)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdmAgain);
        const response = await request(app).get(`/employees/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /employees -  Must be able to update employees",async () => {
        const createdAdm = await request(app).post('/employees').send(mockedIsActiveTrue)
        const idEmployee = createdAdm.body.id
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdmAgain);
        const response = await request(app).patch(`/employees/${idEmployee}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedEmployeePatch)

        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('isAdm')
        expect(response.body).toHaveProperty('isActive')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.status).toBe(200) 
    })

    test("PATCH /employees -  should not be able to list employees without authentication",async () => {
        const response = await request(app).get('/employees')
        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401) 
    })

    test("DELETE /employees -  Must be able to soft delete employees",async () => {
        const createdAdm = await request(app).post('/employees').send(mockedUpdateEmployee)
        const idEmployee = createdAdm.body.id
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdmAgain);
        const response = await request(app).delete(`/employees/${idEmployee}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        const findEmployee = await request(app).get('/employees').set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(findEmployee.body[4].isActive).toBe(false)
        expect(response.status).toBe(204)
    })

    test("DELETE -  should not be able to delete employee with invalid id",async () => {
        await request(app).post('/employees').send(mockedAdmAgain)
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdmAgain);
        
        const response = await request(app).delete(`/employees/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE /users/:id -  shouldn't be able to delete employee with isActive = false",async () => {
        const createdAdm = await request(app).post('/employees').send(mockedIsActiveFalse)
        const idEmployee = createdAdm.body.id
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdmAgain);
        const response = await request(app).delete(`/employees/${idEmployee}`).set("Authorization", `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })
})
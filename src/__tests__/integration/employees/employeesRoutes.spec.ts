import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import { mockedEmployee, mockedEmployeEmpty } from "../../mocks"

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
})
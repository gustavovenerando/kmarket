import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request  from "supertest";
import app from "../../../app";
import { mockedAdm, mockedCategory, mockedEmployee, mockedLoginAdm, mockedProducts, mockedSuplier, mockedSupplierProduct } from "../../mocks";

describe("/supplierproducts", () =>{
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

        await request(app).post('/employees').send(mockedEmployee)
        await request(app).post('/employees').send(mockedAdm)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /supplierproducts - Must be able to create a supplier product", async () =>{
        const adminLoginResponse = await request(app).post("/login").send(mockedLoginAdm);
        const categoryResponse = await request(app).post('/categories').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedCategory);
        const supplierResponse = await request(app).post('/suppliers').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedSuplier);
        mockedSupplierProduct.categoryId = categoryResponse.body.id;
        mockedSupplierProduct.supplierId = supplierResponse.body.id;
        const response = await request(app).post('/supplierproducts').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedSupplierProduct)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("costPrice")
        expect(response.body).toHaveProperty("categoryId")
        expect(response.body).toHaveProperty("supplierId")
        expect(response.status).toBe(201)
    })
})

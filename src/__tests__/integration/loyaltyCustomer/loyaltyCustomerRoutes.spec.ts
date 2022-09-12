import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import {
  mockedAdm,
  mockedEmployee,
  mockedInvalidId,
  mockedLoginAdm,
  mockedLoginEmployee,
  mockedLoyaltyCustomer,
  mockedPatchFailLoyaltyCustomerName,
  mockedUpdateLoyaltyCustomerName,
} from "../../mocks";
import LoyaltyCustomer from "../../../entities/loyaltyCustomer.entity";

describe("/loyaltycustomers", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/employees").send(mockedAdm);
    await request(app).post("/employees").send(mockedEmployee);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /loyaltycustomers - Must be able to create a new Loyalty Customer", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const response = await request(app)
      .post("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(mockedLoyaltyCustomer);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fidelityPoints");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(201);
  });

  test("POST /loyaltycustomers - Should not be able to create Loyalty Customer with an email already registered", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const response = await request(app)
      .post("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(mockedLoyaltyCustomer);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("GET /loyaltycustomers - Must be able to list all Loyalty Customers", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const response = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.status).toBe(200);
  });

  test("GET /loyaltycustomers - Should not be able to list all loyalty customers without authentication", async () => {
    const response = await request(app).get("/loyaltycustomers");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /loyaltycustomers/:id - Must be able to list one Loyalty Customer by Id with Adm permission", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fidelityPoints");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(200);
  });

  test("GET /loyaltycustomers/:id - Should not be able to list one Loyalty Customer by Id without Adm permission", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    const response = await request(app)
      .get(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /loyaltycustomers/:id - Should be able to update the loyalty customer which the Id was sent in params", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedUpdateLoyaltyCustomerName);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("fidelityPoints");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.status).toBe(200);
  });

  test("PATCH /loyaltycustomers/:id - Should return an error when a customer is not found by the Id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const response = await request(app)
      .patch(`/loyaltycustomers/${mockedInvalidId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedPatchFailLoyaltyCustomerName);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /loyaltycustomers/:id - Should not be able to update the loyalty customer without Adm permission", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
      .send(mockedUpdateLoyaltyCustomerName);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("RESET /loyaltycustomers/resetfidelity = Must be reset fidelityPoints from all customers", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const customers = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    let currentCustomer = customers.body[0]

    const loyaltyCustomerRepository = await AppDataSource.getRepository(LoyaltyCustomer)

    currentCustomer.fidelityPoints = 50

    await loyaltyCustomerRepository.save(currentCustomer)

    const response = await request(app)
      .patch('/loyaltycustomers/resetfidelity')
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204)

    const customersUpdated = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(customersUpdated.body[0].fidelityPoints).toEqual(0)

  })

  test("DELETE /loyaltycustomers/:id - Must be able to soft delete a Loyalty customer with Adm permission", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test("DELETE /loyaltycustomers/:id - Should return an error when a customer is not found by the Id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const response = await request(app)
      .delete(`/loyaltycustomers/${mockedInvalidId}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /loyaltycustomers/:id - Should not be able to soft delete a Loyalty customer without Adm permission", async () => {
    const employeeLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);

    const customer = await request(app)
      .get("/loyaltycustomers")
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/loyaltycustomers/${customer.body[0].id}`)
      .set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});

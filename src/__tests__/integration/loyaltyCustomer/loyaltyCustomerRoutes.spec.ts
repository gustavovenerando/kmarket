import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import request from "supertest";
import { mockedAdm, mockedEmployee, mockedLoyaltyCustomer } from "../../mocks";

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

  test("/loyaltycustomers - Must be able to create a new Loyalty Customer", async () => {
    const employeeLoginResponse = await await request(app)
      .post("/login")
      .send(mockedEmployee);

    const response = await await request(app)
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
  });
});

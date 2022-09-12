import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdm,
  mockedEmployee,
  mockedLoginAdm,
  mockedLoginInactiveEmployee,
  mockedNotActiveUser,
  mockedWrongAdmEmail,
  mockedWrongAdmPassword,
} from "../../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });

    await request(app).post("/employees").send(mockedAdm);
    await request(app).post("/employees").send(mockedEmployee);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - Must be able to login an employee", async () => {
    const response = await request(app).post("/login").send(mockedLoginAdm);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");
  });

  test("/POST /login - Should return an error when trying to login with wrong email", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedWrongAdmEmail);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/POST /login - Should return an error when trying to login with wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedWrongAdmPassword);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("message");
  });

  test("/POST /login - Should return an error when trying to login with inactive employee", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);

    const createInactiveEmployee = await request(app)
      .post("/employees")
      .send(mockedNotActiveUser);

    await request(app)
      .delete(`/employees/${createInactiveEmployee.body.id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .post("/login")
      .send(mockedLoginInactiveEmployee);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });
});

import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
	mockedAdm,
	mockedCategory,
	mockedEmployee,
	mockedLoginAdm,
} from "../../mocks";

describe("/categories", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});

		await request(app).post("/employees").send(mockedEmployee);
		await request(app).post("/employees").send(mockedAdm);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /categories -  Must be able to create category", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);

		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("id");
		expect(response.status).toBe(201);
	});

	test("POST /categories -  should not be able to create category that already exists", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
	});

	test("POST /categories -  should not be able to create category without authentication", async () => {
		const response = await request(app)
			.post("/categories")
			.send(mockedCategory);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /categories -  Must be able to list all categories", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const response = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.body).toHaveLength(1);
		expect(response.status).toBe(200);
	});
});

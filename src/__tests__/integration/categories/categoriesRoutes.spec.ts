import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
	mockedAdm,
	mockedCategoriesPatch,
	mockedCategory,
	mockedEmployee,
	mockedIdNotExist,
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

	test("POST /categories -  should not be able to create category without ADM permission", async () => {
		const employeeLoginResponse = await request(app)
			.post("/login")
			.send(mockedEmployee);

		const response = await request(app)
			.post("/categories")
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
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

	test("GET /categories -   Should not be able to list categories without autentication", async () => {
		const response = await request(app).get("/categories");
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /categories/:id/properties -  Must be able to list one category properties", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.get(`/categories/${category.body[0].id}/products`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("name");
		expect(response.body).toHaveProperty("products");
	});

	test("GET /categories/:id/properties -  Should not be able to list one category properties without autentication", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app).get(
			`/categories/${category.body[0].id}/products`
		);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("GET /categories/:id/properties -  Should not be able to list one category properties without ADM permission", async () => {
		const employeeLoginResponse = await request(app)
			.post("/login")
			.send(mockedEmployee);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

		const response = await request(app)
			.get(`/categories/${category.body[0].id}/products`)
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("GET /categories/:id/properties -  Should not be able to list one category with invalid category id", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.get(`/categories/${mockedIdNotExist}/products`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
	});

	test("PATCH /categories/:id-  Should not be able to update category with same name", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.patch(`/categories/${category.body[0].id}`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategory);

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message");
	});

	test("PATCH /categories/:id-  Must be able to update categories", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.patch(`/categories/${category.body[0].id}`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategoriesPatch);

		expect(response.status).toBe(200);
		expect(response.body.category).toHaveProperty("name");
		expect(response.body.category).toHaveProperty("id");
	});

	test("PATCH /categories/:id-  Should not be able to update category with invalid ID", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);

		const response = await request(app)
			.patch(`/categories/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCategoriesPatch);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
	});

	test("PATCH /categories/:id - Should not be able to update category without autentication", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.patch(`/categories/${category.body[0].id}`)
			.send(mockedCategoriesPatch);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("PATCH /categories/:id - Should not be able to update category without ADM permission", async () => {
		const employeeLoginResponse = await request(app)
			.post("/login")
			.send(mockedEmployee);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

		const response = await request(app)
			.patch(`/categories/${category.body[0].id}`)
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`)
			.send(mockedCategoriesPatch);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("DELETE /categories/:id -  Should not be able to delete category without autentication", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);

		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app).delete(
			`/categories/${category.body[0].id}`
		);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("DELETE /categories/:id -  Should not be able to delete category with invalid category ID", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);

		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.delete(`/categories/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.status).toBe(404);
		expect(response.body).toHaveProperty("message");
	});

	test("DELETE /categories/:id -  Should not be able to delete category without ADM permission", async () => {
		const employeeLoginResponse = await request(app)
			.post("/login")
			.send(mockedEmployee);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

		const response = await request(app)
			.delete(`/categories/${category.body[0].id}`)
			.set("Authorization", `Bearer ${employeeLoginResponse.body.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("DELETE /categories/:id - Must be able to delete category", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const category = await request(app)
			.get("/categories")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		const response = await request(app)
			.delete(`/categories/${category.body[0].id}`)
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

		expect(response.status).toBe(204);
	});
});

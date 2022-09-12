import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
	mockedAdm,
	mockedCartEmployeeLoyaltyCustomer,
	mockedCartEmployeeNoLoyaltyCustomer,
	mockedCategory,
	mockedEmployee,
	mockedIdNotExist,
	mockedLoginAdm,
	mockedLoginEmployee,
	mockedLoyaltyCustomer,
	mockedProductCart,
	mockedProducts,
} from "../../mocks";
import Employee from "../../../entities/employee.entity";

describe("/cart", () => {
	let connection: DataSource;
  let mockedAdmId: string = "";
  let mockedEmployeeId: string = "";
	let mockedProductId: string = "";
	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res;
			})
			.catch((err) => {
				console.error("Error during Data Source initialization", err);
			});

			const mockedAdmResponse =  await request(app).post("/employees").send(mockedAdm);
			mockedAdmId = mockedAdmResponse.body.id;
			const mockedEmployeeResponse = await request(app).post("/employees").send(mockedEmployee);
			mockedEmployeeId = mockedEmployeeResponse.body.id;
			const adminLoginResponse = await request(app)
				.post("/login")
				.send(mockedLoginAdm);
			const mockedCategoryResponse = await request(app)
				.post("/categories")
				.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
				.send(mockedCategory);
			mockedProducts.categoryId = mockedCategoryResponse.body.id
			const mockedProductResponse = await request(app)
				.post("/products")
				.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
				.send(mockedProducts);
			mockedProductId = mockedProductResponse.body.id;
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("POST /cart -  Must be able to create cart being admin and without a loyalty customer", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
      mockedCartEmployeeNoLoyaltyCustomer.employeeId = mockedAdmId
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCartEmployeeNoLoyaltyCustomer);

		expect(response.body).toHaveProperty("totalPrice");
		expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("employee");
    expect(response.body).toHaveProperty("sold");
		expect(response.status).toBe(201);
	});

	test("POST /cart -  Must be able to create cart not being admin without a loyalty customer", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
      mockedCartEmployeeNoLoyaltyCustomer.employeeId = mockedEmployeeId
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedCartEmployeeNoLoyaltyCustomer);

		expect(response.body).toHaveProperty("totalPrice");
		expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("employee");
    expect(response.body).toHaveProperty("sold");
		expect(response.status).toBe(201);
	});

	test("POST /cart -  Must be able to create cart being admin and with a loyalty customer", async () => {
		const adminLoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const loyaltyCustomerResponse = await request(app)
			.post("/loyaltycustomers")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedLoyaltyCustomer);
      mockedCartEmployeeLoyaltyCustomer.employeeId = mockedEmployeeId
			mockedCartEmployeeLoyaltyCustomer.loyaltyCustomerId = loyaltyCustomerResponse.body.id
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
			.send(mockedCartEmployeeLoyaltyCustomer);

		expect(response.body).toHaveProperty("totalPrice");
		expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("employee");
    expect(response.body).toHaveProperty("sold");
		expect(response.body).toHaveProperty("loyaltyCustomer");
		expect(response.status).toBe(201);
	});

	test("POST /cart -  Must be able to create cart being not admin and with a loyalty customer", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedCartEmployeeLoyaltyCustomer);

		expect(response.body).toHaveProperty("totalPrice");
		expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("employee");
    expect(response.body).toHaveProperty("sold");
		expect(response.body).toHaveProperty("loyaltyCustomer");
		expect(response.status).toBe(201);
	});

	test("POST /cart -  should not be able to create cart with a loyalty customer that don't exists", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		mockedCartEmployeeLoyaltyCustomer.loyaltyCustomerId = mockedIdNotExist
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedCartEmployeeLoyaltyCustomer);
		
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("POST /cart -  should not be able to create cart with a loyalty customer that is not active", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const loyaltyCustomerResponse = await request(app)
			.get("/loyaltyCustomers")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
			mockedCartEmployeeLoyaltyCustomer.loyaltyCustomerId = loyaltyCustomerResponse.body[0].id
		const res = await request(app)
			.delete(`/loyaltyCustomers/${loyaltyCustomerResponse.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);

			console.log(res.body);
			
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedCartEmployeeLoyaltyCustomer);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(409);
	});

	test("POST /cart -  should not be able to create cart with a employee that don't exists", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		mockedCartEmployeeNoLoyaltyCustomer.employeeId = mockedIdNotExist
		const response = await request(app)
			.post("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedCartEmployeeNoLoyaltyCustomer);
		
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("POST /cart -  should not be able to create cart without authorization", async () => {
		const response = await request(app)
			.post("/cart")
			.send(mockedCartEmployeeNoLoyaltyCustomer);
		
		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /cart -  should be able to list all carts", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const response = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)

		expect(response.body[0]).toHaveProperty("totalPrice");
		expect(response.body[0]).toHaveProperty("id");
		expect(response.body[0]).toHaveProperty("employee");
		expect(response.body[0]).toHaveProperty("sold");
		expect(response.status).toBe(200);
	});

	test("GET /cart -  should not be able to list all carts without authorization", async () => {
		const response = await request(app)
			.get("/cart")

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /cart -  should be able to list one cart", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response = await request(app)
			.get(`/cart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);

		expect(response.body).toHaveProperty("totalPrice");
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("employee");
		expect(response.body).toHaveProperty("sold");
		expect(response.status).toBe(200);
	});

	test("GET /cart -  should not be able to list one cart without authorization", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response = await request(app)
			.get(`/cart/${listAllCarts.body[0].id}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(401);
	});

	test("GET /cart -  should not be able to list one cart that don't exists", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const response = await request(app)
			.get(`/cart/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("GET /cart -  should not be able to list one cart that don't exists", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const response = await request(app)
			.get(`/cart/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);

		expect(response.body).toHaveProperty("message");
		expect(response.status).toBe(404);
	});

	test("PATCH /cart -  should not be able to sell a cart without products", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.patch(`/cart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(400);
	});

	test("PATCH /cart -  should not be able to sell a cart that not exist", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const response  = await request(app)
			.patch(`/cart/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(404);
	});

	test("PATCH /cart -  should be able to sell a cart with products", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		mockedProductCart.productId = mockedProductId
		const addCartProduct  = await request(app)
			.post(`/productscart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedProductCart);
		const response  = await request(app)
			.patch(`/cart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const cart = await request(app)
		.get(`/cart/${listAllCarts.body[0].id}`)
		.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(cart.body.sold).toBe(true)
		expect(response.status).toBe(204);
	});

	test("PATCH /cart -  should not be able to sell a cart that is alredy sold", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.patch(`/cart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(409);
	});

	test("DELETE /cart -  should be able to delete a cart whithout products", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.delete(`/cart/${listAllCarts.body[1].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.status).toBe(204);
	});

	test("DELETE /cart -  should be able to delete a cart whit products", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		mockedProductCart.productId = mockedProductId
		const addCartProduct  = await request(app)
			.post(`/productscart/${listAllCarts.body[1].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`)
			.send(mockedProductCart);
		const listProductBeforeDelete = await request(app)
			.get(`/products/${mockedProductId}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.delete(`/cart/${listAllCarts.body[1].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const listProductAfterDelete = await request(app)
			.get(`/products/${mockedProductId}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);

		expect(listProductBeforeDelete.body.stock).toBeLessThan(listProductAfterDelete.body.stock);
		expect(response.status).toBe(204);
	});

	test("DELETE /cart -  should not be able to delete a cart whitout admin permission", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginEmployee);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.delete(`/cart/${listAllCarts.body[1].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(401);
	});

	
	test("DELETE /cart -  should not be able to delete a cart that not exists", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const response  = await request(app)
			.delete(`/cart/${mockedIdNotExist}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(404);
	});

	test("DELETE /cart -  should not be able to delete a cart that is alredy sold", async () => {
		const LoginResponse = await request(app)
			.post("/login")
			.send(mockedLoginAdm);
		const listAllCarts  = await request(app)
			.get("/cart")
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		const response  = await request(app)
			.delete(`/cart/${listAllCarts.body[0].id}`)
			.set("Authorization", `Bearer ${LoginResponse.body.token}`);
		
		expect(response.body).toHaveProperty("message")
		expect(response.status).toBe(400);
	});
});

import {
  mockedCartEmployeeLoyaltyCustomer,
  mockedCategory,
  mockedProductCart,
} from "./../../mocks/index";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdm,
  mockedCartEmployeeNoLoyaltyCustomer,
  mockedEmployee,
  mockedLoginAdm,
  mockedLoginEmployee,
  mockedProducts,
} from "../../mocks";

let tokenAdm: string;
let tokenNotAdm: string;
let mockedEmployeeId: string = "";

describe("/supplierproducts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/employees").send(mockedAdm);
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginAdm);
    tokenAdm = adminLoginResponse.body.token;

    const mockedEmployeeResponse = await request(app)
      .post("/employees")
      .send(mockedEmployee);
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedLoginEmployee);
    tokenNotAdm = notAdminLoginResponse.body.token;
    mockedEmployeeId = mockedEmployeeResponse.body.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });
  test("POST /productscart - Must be able to create a product cart", async () => {
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedCategory);
    mockedProducts.categoryId = categoryResponse.body.id;

    const createdProduct = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedProducts);
    const productId = createdProduct.body.id;
    mockedProductCart.productId = productId;
    mockedCartEmployeeNoLoyaltyCustomer.employeeId = mockedEmployeeId;

    const createdCart = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedCartEmployeeNoLoyaltyCustomer);

    const cartId = createdCart.body.id;

    const response = await request(app)
      .post(`/productscart/${cartId}`)
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedProductCart);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("quantity");
    expect(response.body).toHaveProperty("product");
    expect(response.status).toBe(201);
  });

  test("POST /supplierproducts -  must not be able to create a product cart without a productId", async () => {
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedCategory);
    mockedProducts.categoryId = categoryResponse.body.id;
    mockedCartEmployeeLoyaltyCustomer.employeeId = mockedEmployeeId;

    const createdCart = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedCartEmployeeLoyaltyCustomer);
    mockedProductCart.productId = "";
    const cartId = createdCart.body.id;
    const response = await request(app)
      .post(`/productscart/${cartId}`)
      .set("Authorization", `Bearer ${tokenAdm}`)
      .send(mockedProductCart);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /productscart - Must be able to get all products cart with adm token", async () => {
    const response = await request(app)
      .get("/productscart")
      .set("Authorization", `Bearer ${tokenAdm}`);
    expect(response.status).toBe(200);
    expect(response.body[0].product.name).toEqual(mockedProducts.name);
  });

  test("GET /productscart - Must not be able to get all products cart without adm token", async () => {
    const response = await request(app).get("/productscart");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /productscart/:id - Must be able to get all products cart with adm token", async () => {
    const product = await request(app)
      .get("/productscart")
      .set("Authorization", `Bearer ${tokenAdm}`);

    const productId = product.body[0].product.id;

    const response = await request(app)
      .get(`/productscart/${productId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("quantity");
    expect(response.body[0]).toHaveProperty("product");
  });

  test("GET /productscart/:id - Must not be able to get all products cart without adm token", async () => {
    const product = await request(app)
      .get("/productscart")
      .set("Authorization", `Bearer ${tokenAdm}`);

    const productId = product.body[0].product.id;

    const response = await request(app).get(`/productscart/${productId}`);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /productscart/:id - Must be able to delete a product from cart", async () => {
    const product = await request(app)
      .get("/productscart")
      .set("Authorization", `Bearer ${tokenAdm}`);

    const productCartId = product.body[0].id;

    const response = await request(app)
      .delete(`/productscart/${productCartId}`)
      .set("Authorization", `Bearer ${tokenAdm}`);
    expect(response.status).toBe(204);
  });
});

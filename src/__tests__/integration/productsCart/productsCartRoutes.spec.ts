import { mockedCartEmployeeLoyaltyCustomer, mockedCategory, mockedProductCart } from "./../../mocks/index";
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
});

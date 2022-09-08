import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAdm,
  mockedCategory,
  mockedCategoryTestCategoryId,
  mockedEmployee,
  mockedLoginAdm,
  mockedProducts,
  mockedSuplier,
  mockedSupliertestSupplierId,
  mockedSupplierProduct,
} from "../../mocks";

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

    await request(app).post("/employees").send(mockedEmployee);
    await request(app).post("/employees").send(mockedAdm);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /supplierproducts - Must be able to create a supplier product", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdm);
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategory);
    const supplierResponse = await request(app)
      .post("/suppliers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedSuplier);
    mockedSupplierProduct.categoryId = categoryResponse.body.id;
    mockedSupplierProduct.supplierId = supplierResponse.body.id;
    const response = await request(app)
      .post("/supplierproducts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedSupplierProduct);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("costPrice");
    expect(response.body).toHaveProperty("category");
    expect(response.body).toHaveProperty("supplier");
    expect(response.status).toBe(201);
  });

  test("POST /supplierproducts - should not be able to create supplier product not being admin", async () => {
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedEmployee);
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
      .send(mockedCategory);
    const supplierResponse = await request(app)
      .post("/suppliers")
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
      .send(mockedSuplier);
    mockedSupplierProduct.categoryId = categoryResponse.body.id;
    mockedSupplierProduct.supplierId = supplierResponse.body.id;
    const response = await request(app)
      .post("/supplierproducts")
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`)
      .send(mockedSupplierProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /properties -  should not be able to create property without authentication", async () => {
    const response = await request(app)
      .post("/supplierproducts")
      .send(mockedSupplierProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /supplierproducts -  must not be able to create a supplier product with invalid categoryId", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdm);
    const supplierResponse = await request(app)
      .post("/suppliers")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedSupliertestSupplierId);
    mockedSupplierProduct.supplierId = supplierResponse.body.id;
    mockedSupplierProduct.categoryId = "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4";
    const response = await request(app)
      .post("/supplierproducts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedSupplierProduct);
    console.log(mockedSupplierProduct, supplierResponse.body);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /supplierproducts -  must not be able to create a supplier product with invalid supplierId", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdm);
    const categoryResponse = await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedCategoryTestCategoryId);
    mockedSupplierProduct.supplierId = "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4";
    mockedSupplierProduct.categoryId = categoryResponse.body.id;
    const response = await request(app)
      .post("/supplierproducts")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedSupplierProduct);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});

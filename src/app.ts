import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

import sessionRouter from "./routers/session.routes";
import cartRoutes from "./routers/carts.routes";
import supplierRoutes from "./routers/suppliers.routes";
import loyaltyCustomerRoutes from "./routers/loyaltyCustomer.routes";
import employeeRouter from './routers/employees.routes'
import categoriesRoutes from "./routers/categories.routes";
import productsRouter from "./routers/products.routes";
import authTokenMiddleware from "./middlewares/authToken.middleware";
import supplierProductsRoutes from "./routers/supplierProducts.routes";

const app = express();
app.use(express.json());

app.use("/login", sessionRouter);
app.use("/categories", authTokenMiddleware, categoriesRoutes);
app.use("/cart", authTokenMiddleware, cartRoutes);
app.use("/products", productsRouter);
app.use("/suppliers", supplierRoutes);
app.use("/supplierproducts", supplierProductsRoutes);
app.use("/loyaltycustomers", loyaltyCustomerRoutes);
app.use("/employees", employeeRouter);

app.use(handleErrorMiddleware);

export default app;

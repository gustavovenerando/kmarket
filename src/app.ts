import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

import sessionRouter from "./routers/session.routes";
import cartRoutes from "./routers/carts.routes";
import supplierRoutes from "./routers/suppliers.routes";
import loyaltyCustomerRoutes from "./routers/loyaltyCustomer.routes";
<<<<<<< HEAD
<<<<<<< HEAD
import employeeRouter from './routers/employees.routes'
=======
import employeeRouter from "./routers/employees.routes";
>>>>>>> b0896b27732745cb2848ca9a5d3e3bbaaa81d62d
=======
import employeeRouter from "./routers/employees.routes";
>>>>>>> 8d6c803e168c0a8831688b24d4bcc16839d678d2
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

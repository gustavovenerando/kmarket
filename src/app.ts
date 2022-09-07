import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response } from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";

import sessionRouter from "./routers/session.routes";
import cartRoutes from "./routers/carts.routes";
import supplierRoutes from "./routers/suppliers.routes";
import loyaltyCustomerRoutes from "./routers/loyaltyCustomer.routes";
import employeeRouter from "./routers/employees.routes";
import categoriesRoutes from "./routers/categories.routes";
import productsRouter from "./routers/products.routes";

const app = express();
app.use(express.json());

// app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productsRouter);
// app.use("/properties", propertiesRouter);
// app.use("/schedules", scheduleRouter);
app.use("/suppliers", supplierRoutes);
app.use("/loyaltycustomers", loyaltyCustomerRoutes);
app.use("/employees", employeeRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("passou!");
});
app.use(handleErrorMiddleware);

export default app;

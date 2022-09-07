import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routers/session.routes";
import loyaltyCustomerRoutes from "./routers/loyaltyCustomer.routes";

const app = express();
app.use(express.json());

// app.use("/users", usersRouter);
app.use("/login", sessionRouter);
// app.use("/categories", categoriesRouter);
// app.use("/properties", propertiesRouter);
// app.use("/schedules", scheduleRouter);
app.use("/loyaltycustomers", loyaltyCustomerRoutes)

app.use(handleErrorMiddleware);

export default app;

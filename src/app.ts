import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routers/session.routes";
import categoriesRoutes from "./routers/categories.routes";

const app = express();
app.use(express.json());

// app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRoutes);
// app.use("/properties", propertiesRouter);
// app.use("/schedules", scheduleRouter);

app.use(handleErrorMiddleware);

export default app;

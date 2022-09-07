import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response } from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionRouter from "./routers/session.routes";
import employeeRouter from './routers/employees.routes'

const app = express();
app.use(express.json());

// app.use("/users", usersRouter);
app.use("/login", sessionRouter);
// app.use("/categories", categoriesRouter);
// app.use("/properties", propertiesRouter);
// app.use("/schedules", scheduleRouter);
app.use("/employees", employeeRouter);

app.get('/', (req:Request,res:Response)=>{
    res.send('passou!')
})
app.use(handleErrorMiddleware);

export default app;

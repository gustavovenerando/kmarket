import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const validationAdmMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const isAdm = req.employee.isAdm;

	if (!isAdm) {
		throw new AppError(401, "Adm permission requested.");
	}

	next();
};

export default validationAdmMiddleware;

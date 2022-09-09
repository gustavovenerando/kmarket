import { Request, Response } from "express";
import { IEmployeeLogin } from "../interfaces/employee";
import { createSessionService } from "../services/session/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
	const { email, password }: IEmployeeLogin = req.body;
	const token = await createSessionService({ email, password });

	return res.status(200).send({ token });
};

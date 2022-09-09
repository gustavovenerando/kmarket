import * as express from "express";

declare global {
	namespace Express {
		interface Request {
			employee: {
				isAdm: boolean;
				isActive: boolean;
				id: string;
			};
		}
	}
}

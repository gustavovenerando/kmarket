import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError(401,"Invalid token");
    }

    token = token.split(" ")[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError(401,"Invalid token");
        }

        req.employee = {
          isAdm: decoded.isAdm,
          isActive: decoded.isActive,
          id: decoded.sub
        };

        next();
      }
    );
    };

export default authTokenMiddleware;
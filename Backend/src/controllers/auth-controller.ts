import express, { NextFunction, Request, Response, Router } from "express";
import { authService } from "../services/auth-service";
import { CredentialsModel } from "../models/credentials-model";
import { StatusCode } from "../models/enums";

class AuthController {
    public router: Router = express.Router();

    public constructor() {
        this.router.post("/api/auth/login", this.login);
    }

    private login = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const credentials = new CredentialsModel(request.body);
            const token = authService.login(credentials);
            response.status(StatusCode.OK).json({ token });
        } catch (err: any) {
            next(err);
        }
    };
}

export const authController = new AuthController();

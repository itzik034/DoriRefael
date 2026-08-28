import { NextFunction, Request, Response } from "express";
import { appConfig } from "../utils/app-config";
import { RouteNotFoundError } from "../models/client-errors";
import { StatusCode } from "../models/enums";

class ErrorsMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction) {
        console.error(err);
        const status = err.status || StatusCode.InternalServerError;
        const isServerError = status >= 500 && status <= 599;
        const message = appConfig.isProduction && isServerError ? "Some error, please try again." : err.message;
        response.status(status).json({ message });
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction) {
        next(new RouteNotFoundError(request.originalUrl));
    }

}

export const errorsMiddleware = new ErrorsMiddleware();

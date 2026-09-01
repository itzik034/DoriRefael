import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../models/client-errors";
import { cyber } from "../utils/cyber";

class SecurityMiddleware {
    /**
     * Middleware to verify JWT token from the Authorization header.
     */
    public verifyToken(request: Request, response: Response, next: NextFunction): void {
        try {
            const authorizationHeader = request.header("authorization");
            if (!authorizationHeader) {
                next(new UnauthorizedError("Unauthorized: Missing Authorization header"));
                return;
            }

            const token = authorizationHeader.startsWith("Bearer ")
                ? authorizationHeader.substring(7).trim()
                : authorizationHeader.trim();

            if (!token) {
                next(new UnauthorizedError("Unauthorized: Missing token"));
                return;
            }

            const isValid = cyber.validateToken(token);
            if (!isValid) {
                next(new UnauthorizedError("Unauthorized: Invalid or expired token"));
                return;
            }

            // Attach decoded token payload to request for downstream handlers if needed
            (request as any).user = cyber.getUser(token);

            next();
        } catch (err: any) {
            next(err);
        }
    }
}

export const securityMiddleware = new SecurityMiddleware();
export const authMiddleware = securityMiddleware;

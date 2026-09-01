import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";

class Cyber {
    /**
     * Verifies whether a given JWT token is valid and not expired.
     */
    public validateToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Extracts and returns the decoded payload from the JWT token.
     */
    public getUser<T = JwtPayload | string>(token: string): T | null {
        try {
            if (!token) return null;
            return jwt.verify(token, appConfig.jwtSecret) as T;
        } catch {
            return null;
        }
    }

    /**
     * Generates a new signed JWT token.
     */
    public generateToken(payload: object, expiresIn: string | number = "3h"): string {
        const options: SignOptions = {
            expiresIn: expiresIn as any
        };
        return jwt.sign(payload, appConfig.jwtSecret, options);
    }
}

export const cyber = new Cyber();

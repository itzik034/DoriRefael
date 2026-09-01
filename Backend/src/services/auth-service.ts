import { CredentialsModel } from "../models/credentials-model";
import { UnauthorizedError } from "../models/client-errors";
import { appConfig } from "../utils/app-config";
import { cyber } from "../utils/cyber";

class AuthService {
    /**
     * Authenticates administrator credentials and returns a signed JWT token.
     */
    public login(credentials: CredentialsModel): string {
        credentials.validate();

        const isValidUsername = credentials.username === appConfig.adminUsername;
        const isValidPassword = credentials.password === appConfig.adminPassword;

        if (!isValidUsername || !isValidPassword) {
            throw new UnauthorizedError("Incorrect username or password.");
        }

        const token = cyber.generateToken({
            username: credentials.username,
            role: "admin"
        });

        return token;
    }
}

export const authService = new AuthService();

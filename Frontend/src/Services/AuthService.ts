import { CredentialsModel } from "../Models/CredentialsModel";
import { appConfig } from "../Utils/AppConfig";

class AuthService {
    private readonly tokenKey = "auth_token";

    /**
     * Authenticates administrator credentials and saves the received JWT token.
     * @param credentials The username and password.
     * @param rememberMe Whether to persist in localStorage or sessionStorage.
     * @returns The signed JWT token string.
     */
    public async login(credentials: CredentialsModel, rememberMe = true): Promise<string> {
        const response = await fetch(appConfig.loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            let errorMessage = "שם משתמש או סיסמה שגויים.";
            try {
                const errorData = await response.json();
                if (errorData?.message) {
                    errorMessage = errorData.message;
                }
            } catch {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch {
                    // Fallback to default message
                }
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        const token = data?.token;

        if (!token) {
            throw new Error("לא התקבל מזהה אימות תקין מהשרת.");
        }

        if (typeof window !== "undefined") {
            if (rememberMe) {
                localStorage.setItem(this.tokenKey, token);
                sessionStorage.removeItem(this.tokenKey);
            } else {
                sessionStorage.setItem(this.tokenKey, token);
                localStorage.removeItem(this.tokenKey);
            }
        }

        return token;
    }

    /**
     * Clears stored authentication tokens.
     */
    public logout(): void {
        if (typeof window !== "undefined") {
            localStorage.removeItem(this.tokenKey);
            sessionStorage.removeItem(this.tokenKey);
        }
    }

    /**
     * Retrieves the stored token from localStorage or sessionStorage.
     */
    public getToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    }

    /**
     * Verifies if the user is currently logged in with a valid unexpired token.
     */
    public isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const payload = this.decodeTokenPayload(token);
        if (!payload) return false;

        // Check expiration if exp field is present (exp is in seconds)
        if (payload.exp && typeof payload.exp === "number") {
            const isExpired = payload.exp * 1000 <= Date.now();
            if (isExpired) {
                this.logout();
                return false;
            }
        }

        return true;
    }

    /**
     * Extracts token payload object without external libraries.
     */
    public decodeTokenPayload(token: string): any {
        try {
            const parts = token.split(".");
            if (parts.length < 2) return null;
            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }
}

export const authService = new AuthService();

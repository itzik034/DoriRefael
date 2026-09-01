import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ quiet: true });

function resolveBackendDir(): string {
    if (process.env.BACKEND_DIR) {
        return path.resolve(process.env.BACKEND_DIR);
    }
    // Check if current working directory has package.json (standard for Node and Passenger)
    if (fs.existsSync(path.join(process.cwd(), "package.json"))) {
        return process.cwd();
    }
    // Traverse upwards from __dirname until package.json is found
    let current = __dirname;
    while (current !== path.dirname(current)) {
        if (fs.existsSync(path.join(current, "package.json"))) {
            return current;
        }
        current = path.dirname(current);
    }
    return path.resolve(__dirname, "..");
}

class AppConfig {
    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = Number(process.env.PORT);
    public readonly seoAgentSecret = process.env.SEO_AGENT_SECRET;
    public readonly jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";
    public readonly adminUsername = process.env.ADMIN_USERNAME || "admin";
    public readonly adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    public readonly backendDir = resolveBackendDir();
    public readonly frontendDir = process.env.FRONTEND_DIR || path.resolve(this.backendDir, "../Frontend");
    public readonly publicHtmlDir = process.env.PUBLIC_HTML_DIR || path.resolve(this.backendDir, "../../public_html");
    public readonly imagesDir = path.join(this.frontendDir, "src/Content/Images");
    public readonly articlesDir = path.join(this.frontendDir, "src/Content/Articles");
}

export const appConfig = new AppConfig();


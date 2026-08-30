import dotenv from "dotenv";
import path from "path";

dotenv.config({ quiet: true });

class AppConfig {
    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = Number(process.env.PORT);
    public readonly seoAgentSecret = process.env.SEO_AGENT_SECRET;
    public readonly frontendDir = path.join(__dirname, "../../../Frontend");
    public readonly imagesDir = path.join(__dirname, "../../../Frontend/src/Content/Images");
    public readonly articlesDir = path.join(__dirname, "../../../Frontend/src/Content/Articles");
}

export const appConfig = new AppConfig();

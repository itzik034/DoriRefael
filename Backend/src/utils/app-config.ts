import dotenv from "dotenv";

dotenv.config({ quiet: true });

class AppConfig {
    public readonly isDevelopment = process.env.ENVIRONMENT === "development";
    public readonly isProduction = process.env.ENVIRONMENT === "production";
    public readonly port = Number(process.env.PORT);
    public readonly seoAgentSecret = process.env.SEO_AGENT_SECRET || "";
}

export const appConfig = new AppConfig();

import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";
import { ArticleModel } from "../models/article-model";
import { ValidationError } from "../models/client-errors";
import { appConfig } from "../utils/app-config";

class ArticleService {
    private isBuilding: boolean = false;
    private buildPending: boolean = false;

    public async saveArticle(payload: any): Promise<void> {
        const article = new ArticleModel(payload);
        article.validate();

        const articlesDir = appConfig.articlesDir;
        
        await fs.mkdir(articlesDir, { recursive: true });
        
        const filePath = path.join(articlesDir, `${article.slug}.json`);

        const exists = await this.fileExists(filePath);
        if (exists) {
            throw new ValidationError(`An article with slug '${article.slug}' already exists. Please choose a different slug.`);
        }

        await fs.writeFile(filePath, JSON.stringify(article, null, 2));

        // Trigger frontend build asynchronously
        this.triggerFrontendBuild();
    }

    private triggerFrontendBuild(): void {
        if (this.isBuilding) {
            console.log("Frontend build is already in progress. Queuing next build.");
            this.buildPending = true;
            return;
        }

        this.isBuilding = true;
        console.log("Starting frontend build...");

        exec("npm run build", { cwd: appConfig.frontendDir }, (error, stdout, stderr) => {
            this.isBuilding = false;

            if (error) {
                console.error("Frontend build failed:", error.message);
            } else {
                if (stderr) {
                    console.warn("Frontend build stderr:", stderr);
                }
                console.log("Frontend build completed successfully:", stdout);
            }

            // If another build was requested while this build was in progress, execute it now
            if (this.buildPending) {
                console.log("Executing pending queued build...");
                this.buildPending = false;
                this.triggerFrontendBuild();
            }
        });
    }

    private async fileExists(filePath: string): Promise<boolean> {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}

export const articleService = new ArticleService();

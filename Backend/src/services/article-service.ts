import fs from "fs/promises";
import path from "path";
import { ArticleModel, ArticleSaveResult, BulkSaveResponse } from "../models/article-model";
import { ValidationError } from "../models/client-errors";
import { appConfig } from "../utils/app-config";
import { buildService } from "./build-service";
import { imageDownloadService } from "./image-download-service";

class ArticleService {

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

        // Download and organize external images locally before saving
        await imageDownloadService.processArticleImages(article);

        await fs.writeFile(filePath, JSON.stringify(article, null, 2));

        // Trigger frontend build asynchronously
        buildService.triggerFrontendBuild();
    }

    public async saveArticles(payloads: any[]): Promise<BulkSaveResponse> {
        const articlesDir = appConfig.articlesDir;
        await fs.mkdir(articlesDir, { recursive: true });

        const results: ArticleSaveResult[] = [];
        const seenSlugsInBatch = new Set<string>();
        let savedCount = 0;
        let failedCount = 0;

        for (const item of payloads) {
            try {
                if (!item || typeof item !== "object") {
                    throw new ValidationError("Invalid article item: expected a JSON object");
                }

                // Extract article data if wrapped in an event object
                const articleData = item.event && item.slug === undefined && item.title === undefined
                    ? (item.article || item.data || item)
                    : item;

                const article = new ArticleModel(articleData);
                article.validate();

                if (seenSlugsInBatch.has(article.slug)) {
                    throw new ValidationError(`Duplicate slug '${article.slug}' found within the same batch`);
                }

                const filePath = path.join(articlesDir, `${article.slug}.json`);
                const exists = await this.fileExists(filePath);
                if (exists) {
                    throw new ValidationError(`An article with slug '${article.slug}' already exists. Please choose a different slug.`);
                }

                // Download and organize external images locally before saving
                await imageDownloadService.processArticleImages(article);

                await fs.writeFile(filePath, JSON.stringify(article, null, 2));
                seenSlugsInBatch.add(article.slug);

                results.push({
                    slug: article.slug,
                    status: "success"
                });
                savedCount++;
            } catch (err: any) {
                results.push({
                    slug: item?.slug || "unknown",
                    status: "failed",
                    error: err?.message || "Unknown error"
                });
                failedCount++;
            }
        }

        // Trigger frontend build only once if at least one article was saved successfully
        if (savedCount > 0) {
            buildService.triggerFrontendBuild();
        }

        return {
            total: payloads.length,
            saved: savedCount,
            failed: failedCount,
            results
        };
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

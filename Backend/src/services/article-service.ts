import fs from "fs/promises";
import path from "path";
import { ArticleModel, ArticleSaveResult, BulkSaveResponse } from "../models/article-model";
import { ResourceNotFoundError, ValidationError } from "../models/client-errors";
import { appConfig } from "../utils/app-config";
import { buildService } from "./build-service";
import { imageDownloadService } from "./image-download-service";

class ArticleService {

    public async getAllArticles(): Promise<ArticleModel[]> {
        const articlesDir = appConfig.articlesDir;
        await fs.mkdir(articlesDir, { recursive: true });

        const fileNames = await fs.readdir(articlesDir);
        const jsonFiles = fileNames.filter(fileName => fileName.endsWith(".json"));

        const articles: ArticleModel[] = [];

        for (const fileName of jsonFiles) {
            try {
                const filePath = path.join(articlesDir, fileName);
                const content = await fs.readFile(filePath, "utf-8");
                const data = JSON.parse(content);
                const article = new ArticleModel(data);
                articles.push(article);
            } catch {
                // Ignore corrupted or unparseable files
            }
        }

        // Sort by published date descending if available
        articles.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });

        return articles;
    }

    public async getArticleBySlug(slug: string): Promise<ArticleModel> {
        this.validateSlugParam(slug);

        const filePath = path.join(appConfig.articlesDir, `${slug}.json`);
        const exists = await this.fileExists(filePath);
        if (!exists) {
            throw new ResourceNotFoundError(slug);
        }

        const content = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(content);
        return new ArticleModel(data);
    }

    public async addArticle(payload: any): Promise<ArticleModel> {
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

        return article;
    }

    public async updateArticle(slug: string, payload: any): Promise<ArticleModel> {
        this.validateSlugParam(slug);

        const articlesDir = appConfig.articlesDir;
        const oldFilePath = path.join(articlesDir, `${slug}.json`);
        const exists = await this.fileExists(oldFilePath);
        if (!exists) {
            throw new ResourceNotFoundError(slug);
        }

        const updatedArticle = new ArticleModel(payload);
        updatedArticle.validate();

        const newFilePath = path.join(articlesDir, `${updatedArticle.slug}.json`);

        // If slug has changed, ensure the new slug does not already exist
        if (updatedArticle.slug !== slug) {
            const newSlugExists = await this.fileExists(newFilePath);
            if (newSlugExists) {
                throw new ValidationError(`An article with slug '${updatedArticle.slug}' already exists. Please choose a different slug.`);
            }
            await fs.unlink(oldFilePath);
        }

        // Download and organize external images locally before saving
        await imageDownloadService.processArticleImages(updatedArticle);

        await fs.writeFile(newFilePath, JSON.stringify(updatedArticle, null, 2));

        // Trigger frontend build asynchronously
        buildService.triggerFrontendBuild();

        return updatedArticle;
    }

    public async deleteArticle(slug: string): Promise<void> {
        this.validateSlugParam(slug);

        const filePath = path.join(appConfig.articlesDir, `${slug}.json`);
        const exists = await this.fileExists(filePath);
        if (!exists) {
            throw new ResourceNotFoundError(slug);
        }

        await fs.unlink(filePath);

        // Trigger frontend build asynchronously
        buildService.triggerFrontendBuild();
    }

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

    private validateSlugParam(slug: string): void {
        if (!slug || typeof slug !== "string" || !slug.trim()) {
            throw new ValidationError("Slug parameter is required and cannot be empty.");
        }
        if (/[/\\]|\.\./.test(slug)) {
            throw new ValidationError("Invalid slug parameter (cannot contain path separators or '..').");
        }
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

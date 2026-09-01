import express, { NextFunction, Request, Response, Router } from "express";
import { articleService } from "../services/article-service";
import { StatusCode } from "../models/enums";
import { securityMiddleware } from "../middlewares/security-middleware";

class ArticleController {
    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/articles", securityMiddleware.verifyToken, this.getAllArticles);
        this.router.get("/api/articles/:slug", securityMiddleware.verifyToken, this.getArticleBySlug);
        this.router.post("/api/articles", securityMiddleware.verifyToken, this.addArticle);
        this.router.put("/api/articles/:slug", securityMiddleware.verifyToken, this.updateArticle);
        this.router.delete("/api/articles/:slug", securityMiddleware.verifyToken, this.deleteArticle);
    }

    private getAllArticles = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const articles = await articleService.getAllArticles();
            response.status(StatusCode.OK).json(articles);
        } catch (err: any) {
            next(err);
        }
    };

    private getArticleBySlug = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const slug = request.params.slug;
            const article = await articleService.getArticleBySlug(slug);
            response.status(StatusCode.OK).json(article);
        } catch (err: any) {
            next(err);
        }
    };

    private addArticle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const article = await articleService.addArticle(request.body);
            response.status(StatusCode.Created).json(article);
        } catch (err: any) {
            next(err);
        }
    };

    private updateArticle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const slug = request.params.slug;
            const article = await articleService.updateArticle(slug, request.body);
            response.status(StatusCode.OK).json(article);
        } catch (err: any) {
            next(err);
        }
    };

    private deleteArticle = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const slug = request.params.slug;
            await articleService.deleteArticle(slug);
            response.sendStatus(StatusCode.NoContent);
        } catch (err: any) {
            next(err);
        }
    };
}

export const articleController = new ArticleController();
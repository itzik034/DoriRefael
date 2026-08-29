import { ValidationError } from "../models/client-errors";
import { BulkSaveResponse } from "../models/article-model";
import { articleService } from "./article-service";

class WebhookService {

    public async processEvent(payload: any): Promise<string | BulkSaveResponse> {
        if (!payload || typeof payload !== "object") {
            throw new ValidationError("Invalid payload format: expected a JSON object or array");
        }

        // Handle direct array payload
        if (Array.isArray(payload)) {
            if (payload.length === 0) {
                throw new ValidationError("Payload array is empty");
            }
            return await articleService.saveArticles(payload);
        }

        // Handle object payload
        if (!payload.event || typeof payload.event !== "string" || !payload.event.trim()) {
            throw new ValidationError("Missing or invalid 'event' field in payload");
        }

        if (payload.event === "ping") {
            return "pong";
        }

        if (payload.event === "article.published" || payload.event === "articles.published") {
            // Check if articles are provided as an array inside the event payload
            if (Array.isArray(payload.articles)) {
                return await articleService.saveArticles(payload.articles);
            }
            if (Array.isArray(payload.data)) {
                return await articleService.saveArticles(payload.data);
            }

            // Single article flow
            await articleService.saveArticle(payload);
            return "Article saved successfully";
        }

        throw new ValidationError(`Unsupported event type: '${payload.event}'`);
    }
}

export const webhookService = new WebhookService();



import { ValidationError } from "../models/client-errors";
import { articleService } from "./article-service";

class WebhookService {

    public async processEvent(payload: any): Promise<string> {
        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
            throw new ValidationError("Invalid payload format: expected a JSON object");
        }

        if (!payload.event || typeof payload.event !== "string" || !payload.event.trim()) {
            throw new ValidationError("Missing or invalid 'event' field in payload");
        }

        if (payload.event === "ping") {
            return "pong";
        }

        if (payload.event === "article.published") {
            await articleService.saveArticle(payload);
            return "Article saved successfully";
        }

        throw new ValidationError(`Unsupported event type: '${payload.event}'`);
    }
}

export const webhookService = new WebhookService();


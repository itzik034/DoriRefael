import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

class WebhookService {

    public verifySignature(rawBody: Buffer, signatureHeader: string | undefined): boolean {
        if (!signatureHeader || !signatureHeader.startsWith("sha256=")) {
            return false;
        }

        const secret = process.env.SEO_AGENT_SECRET;
        if (!secret) {
            console.error("SEO_AGENT_SECRET is not defined in environment variables");
            return false;
        }

        // Calculate HMAC-SHA256
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(rawBody);
        const calculatedSignature = `sha256=${hmac.digest("hex")}`;

        // Secure compare
        const expectedBuffer = Buffer.from(signatureHeader, "utf8");
        const calculatedBuffer = Buffer.from(calculatedSignature, "utf8");

        if (expectedBuffer.length !== calculatedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, calculatedBuffer)) {
            return false;
        }

        return true;
    }

    public async processEvent(payload: any): Promise<string> {
        if (payload.event === "ping") {
            return "pong";
        }

        if (payload.event === "article.published") {
            await this.saveArticle(payload);
            return "Article saved successfully";
        }

        return "Event ignored";
    }

    public async saveArticle(payload: any): Promise<void> {
        const articleData = {
            slug: payload.slug,
            title: payload.title,
            description: payload.meta_description,
            excerpt: payload.excerpt,
            image: payload.featured_image_url,
            publishedAt: payload.published_at,
            schema: payload.schema_markup,
            faq: payload.faq_schema,
            html: payload.content
        };

        const articlesDir = path.join(__dirname, "../../../Frontend/src/content/articles");
        
        await fs.mkdir(articlesDir, { recursive: true });
        
        const filePath = path.join(articlesDir, `${payload.slug}.json`);
        await fs.writeFile(filePath, JSON.stringify(articleData, null, 2));
    }
}

export const webhookService = new WebhookService();

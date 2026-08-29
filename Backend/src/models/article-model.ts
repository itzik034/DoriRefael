import { ValidationError } from "./client-errors";

export interface ArticleSaveResult {
    slug?: string;
    status: "success" | "failed";
    error?: string;
}

export interface BulkSaveResponse {
    total: number;
    saved: number;
    failed: number;
    results: ArticleSaveResult[];
}

export class ArticleModel {
    public slug: string;
    public title: string;
    public description?: string;
    public excerpt?: string;
    public image?: string;
    public publishedAt?: string;
    public schema?: string | object;
    public faq?: string | object;
    public html: string;

    public constructor(payload: any) {
        this.slug = payload?.slug;
        this.title = payload?.title;
        this.description = payload?.meta_description;
        this.excerpt = payload?.excerpt;
        this.image = payload?.featured_image_url;
        this.publishedAt = payload?.published_at;
        this.schema = payload?.schema_markup;
        this.faq = payload?.faq_schema;
        this.html = payload?.content;
    }

    public validate(): void {
        const errorMessages: string[] = [];

        // Validate slug
        if (!this.slug || typeof this.slug !== "string" || !this.slug.trim()) {
            errorMessages.push("slug is missing or empty");
        } else if (/[/\\]|\.\./.test(this.slug)) {
            errorMessages.push("slug is invalid (cannot contain path separators or '..')");
        }

        // Validate title
        if (!this.title || typeof this.title !== "string" || !this.title.trim()) {
            errorMessages.push("title is missing or empty");
        }

        // Validate html content
        if (!this.html || typeof this.html !== "string" || !this.html.trim()) {
            errorMessages.push("content is missing or empty");
        }

        if (errorMessages.length > 0) {
            throw new ValidationError(`Article validation failed: ${errorMessages.join("; ")}`);
        }
    }
}

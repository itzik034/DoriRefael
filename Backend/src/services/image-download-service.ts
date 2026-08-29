import fs from "fs/promises";
import path from "path";
import { ArticleModel } from "../models/article-model";
import { appConfig } from "../utils/app-config";

class ImageDownloadService {
    /**
     * Downloads an external image and saves it to the article's dedicated slug folder.
     * Returns the relative web path for frontend rendering.
     */
    public async downloadAndSaveImage(
        imageUrl: string,
        slug: string,
        fileNamePrefix: string
    ): Promise<string> {
        // Return original if not a valid external web URL
        if (!imageUrl || (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://"))) {
            return imageUrl;
        }

        const targetDir = path.join(appConfig.imagesDir, slug);
        await fs.mkdir(targetDir, { recursive: true });

        // Download with 15 seconds timeout
        const response = await fetch(imageUrl, {
            signal: AbortSignal.timeout(15000),
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status} (${response.statusText}) when fetching ${imageUrl}`);
        }

        const contentType = response.headers.get("content-type") || "";
        const extension = this.getExtension(imageUrl, contentType);
        const fileName = `${fileNamePrefix}${extension}`;
        const filePath = path.join(targetDir, fileName);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        // Relative path used by frontend routing/serving
        return `/src/Content/Images/${slug}/${fileName}`;
    }

    /**
     * Processes both featured image and all <img> tags inside article HTML content.
     */
    public async processArticleImages(article: ArticleModel): Promise<void> {
        if (!article.slug) return;

        // 1. Process featured image
        if (article.image && (article.image.startsWith("http://") || article.image.startsWith("https://"))) {
            try {
                const localFeaturedPath = await this.downloadAndSaveImage(
                    article.image,
                    article.slug,
                    `${article.slug}-featured`
                );
                article.image = localFeaturedPath;
            } catch (err: any) {
                console.error(`[ImageDownloadService] Failed to download featured image for '${article.slug}':`, err?.message || err);
            }
        }

        // 2. Process body images inside HTML content
        if (article.html && typeof article.html === "string") {
            const imgRegex = /<img\s+[^>]*src=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
            const matches = Array.from(article.html.matchAll(imgRegex));

            let imageIndex = 1;
            for (const match of matches) {
                const fullImgTag = match[0];
                const originalUrl = match[1];

                try {
                    const localPath = await this.downloadAndSaveImage(
                        originalUrl,
                        article.slug,
                        `${article.slug}-image-${imageIndex}`
                    );

                    // Replace original URL with local path in HTML
                    const updatedImgTag = fullImgTag.replace(originalUrl, localPath);
                    article.html = article.html.replace(fullImgTag, updatedImgTag);
                    imageIndex++;
                } catch (err: any) {
                    console.error(`[ImageDownloadService] Failed to download body image ${originalUrl} for '${article.slug}':`, err?.message || err);
                }
            }
        }
    }

    /**
     * Resolves the proper file extension from Content-Type or URL.
     */
    private getExtension(url: string, contentType: string): string {
        const lowerType = contentType.toLowerCase();
        if (lowerType.includes("webp")) return ".webp";
        if (lowerType.includes("png")) return ".png";
        if (lowerType.includes("jpeg") || lowerType.includes("jpg")) return ".jpg";
        if (lowerType.includes("svg")) return ".svg";
        if (lowerType.includes("gif")) return ".gif";
        if (lowerType.includes("avif")) return ".avif";

        // Fallback: extract extension from URL path
        try {
            const urlPath = new URL(url).pathname;
            const ext = path.extname(urlPath);
            if (ext && ext.length <= 5) {
                return ext.toLowerCase();
            }
        } catch {
            // Ignore parse errors
        }

        return ".jpg";
    }
}

export const imageDownloadService = new ImageDownloadService();

import { ArticleModel, FaqItem } from '../Models/ArticleModel';
import { appConfig } from '../Utils/AppConfig';
import { authService } from './AuthService';

class ArticlesService {
    private articles: ArticleModel[] = [];
    private articleMap: Map<string, ArticleModel> = new Map();

    public constructor() {
        this.loadArticles();
    }

    private loadArticles(): void {
        // Load all article JSON files using Vite's import.meta.glob
        const modules = import.meta.glob<Record<string, any>>(
            ['/src/Content/Articles/*.json', '/src/content/Articles/*.json'],
            { eager: true }
        );

        const loadedSlugs = new Set<string>();

        for (const [path, rawModule] of Object.entries(modules)) {
            const data = (rawModule && typeof rawModule === 'object' && 'default' in rawModule)
                ? rawModule.default
                : rawModule;

            if (!data) continue;

            const fallbackSlug = path.split('/').pop()?.replace('.json', '') || '';
            const slug = (data.slug || fallbackSlug).trim();

            if (!slug || loadedSlugs.has(slug)) {
                continue;
            }

            const article: ArticleModel = {
                slug: slug,
                title: data.title || '',
                description: data.description || data.meta_description || '',
                excerpt: data.excerpt || '',
                image: data.image || data.featured_image_url || '',
                publishedAt: data.publishedAt || data.published_at || '',
                schema: data.schema || data.schema_markup || undefined,
                faq: data.faq || data.faq_schema || undefined,
                html: data.html || data.content || ''
            };

            loadedSlugs.add(slug);
            this.articles.push(article);
            this.articleMap.set(slug, article);
            this.articleMap.set(decodeURIComponent(slug), article);
            this.articleMap.set(encodeURIComponent(slug), article);
        }

        // Sort articles by published date descending if available
        this.articles.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA;
        });
    }

    public getAllArticles(): ArticleModel[] {
        return this.articles;
    }

    public getArticleBySlug(slug: string): ArticleModel | undefined {
        if (!slug) return undefined;
        const normalized = slug.trim();
        return this.articleMap.get(normalized) ||
            this.articleMap.get(decodeURIComponent(normalized)) ||
            this.articleMap.get(encodeURIComponent(normalized));
    }

    public getAllArticleSlugs(): string[] {
        return this.articles.map(article => article.slug);
    }

    /**
     * Fetch all articles from the backend API with authentication.
     * Falls back to local bundled articles if the backend is unavailable.
     */
    public async fetchArticlesFromBackend(): Promise<ArticleModel[]> {
        const token = authService.getToken();
        try {
            const response = await fetch(appConfig.articlesUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token || ''}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data: ArticleModel[] = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    return data;
                }
            }
        } catch {
            // Backend offline or unreachable, fallback to bundled articles
        }

        return this.getAllArticles();
    }

    /**
     * Creates a new article on the backend.
     */
    public async addArticle(article: Partial<ArticleModel>): Promise<ArticleModel> {
        const token = authService.getToken();
        const response = await fetch(appConfig.articlesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || ''}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(article)
        });

        if (!response.ok) {
            let errorMessage = 'שגיאה ביצירת המאמר';
            try {
                const errData = await response.json();
                if (errData?.message) errorMessage = errData.message;
            } catch {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch { }
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    }

    /**
     * Updates an existing article on the backend.
     */
    public async updateArticle(slug: string, article: Partial<ArticleModel>): Promise<ArticleModel> {
        const token = authService.getToken();
        const response = await fetch(`${appConfig.articlesUrl}/${encodeURIComponent(slug)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token || ''}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(article)
        });

        if (!response.ok) {
            let errorMessage = 'שגיאה בעדכון המאמר';
            try {
                const errData = await response.json();
                if (errData?.message) errorMessage = errData.message;
            } catch {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch { }
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    }

    /**
     * Deletes an article from the backend.
     */
    public async deleteArticle(slug: string): Promise<void> {
        const token = authService.getToken();
        const response = await fetch(`${appConfig.articlesUrl}/${encodeURIComponent(slug)}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token || ''}`
            }
        });

        if (!response.ok && response.status !== 204) {
            let errorMessage = 'שגיאה במחיקת המאמר';
            try {
                const errData = await response.json();
                if (errData?.message) errorMessage = errData.message;
            } catch {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch { }
            }
            throw new Error(errorMessage);
        }
    }

    public parseFaq(faqRaw: any): Array<{ question: string; answer: string }> {
        if (!faqRaw) return [];

        let parsed = faqRaw;
        if (typeof faqRaw === 'string') {
            try {
                parsed = JSON.parse(faqRaw);
            } catch {
                return [];
            }
        }

        // If it's an FAQPage schema object
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            if (Array.isArray(parsed.mainEntity)) {
                return parsed.mainEntity.map((item: any) => ({
                    question: item.name || item.question || '',
                    answer: item.acceptedAnswer?.text || item.answer || ''
                })).filter((item: { question: string; answer: string }) => item.question && item.answer);
            }
            return [];
        }

        if (Array.isArray(parsed)) {
            return parsed.map((item: FaqItem) => ({
                question: item.question || item.q || '',
                answer: item.answer || item.a || ''
            })).filter(item => item.question && item.answer);
        }

        return [];
    }

    /**
     * Uploads an image file to the backend and saves it in the images directory.
     */
    public async uploadImage(file: File, slug?: string): Promise<{ url: string; fileName: string; size: number }> {
        const token = authService.getToken();
        const formData = new FormData();
        formData.append('image', file);
        if (slug) {
            formData.append('slug', slug);
        }

        const response = await fetch(appConfig.uploadImageUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token || ''}`,
                'Accept': 'application/json'
            },
            body: formData
        });

        if (!response.ok) {
            let errorMessage = 'שגיאה בהעלאת התמונה לשרת';
            try {
                const errData = await response.json();
                if (errData?.message) errorMessage = errData.message;
            } catch {
                try {
                    const text = await response.text();
                    if (text) errorMessage = text;
                } catch { }
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    }
}

export const articlesService = new ArticlesService();

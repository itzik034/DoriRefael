import { ArticleModel, FaqItem } from '../Models/ArticleModel';

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
}

export const articlesService = new ArticlesService();
